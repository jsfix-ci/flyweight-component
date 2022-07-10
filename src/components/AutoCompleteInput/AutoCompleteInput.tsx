// 设计理念：mvp 最小可行化产品(Minimal Variable Product)，先做最小原型，然后再丰富。
// 1.custom option，用户可以自定义li 中的内容,考虑传入的数据类型。
// 2.isLoading
// 3.支持键盘移动事件
// 4.点击外部关闭下拉单。
import React, { ChangeEvent, KeyboardEvent, FC, ReactElement, useState, useRef, useEffect } from 'react';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import classNames from 'classnames';
import useClickOutside from 'src/hooks/useClickOutSide';

// 定义获取的数据类型 DataSource要求传入的是一个对象，对象上必须含有value属性
export type DataSourceType<T = Record<string, unknown>> = T & { value: string };

// 组件接口
export interface AutoCompletePropsInterface extends Omit<InputProps, 'onSelect' | 'value'> {
  value?: string;
  /** 选择回调事件*/
  onSelect?: (item: DataSourceType, event: React.MouseEvent | React.KeyboardEvent) => void;
  /** 渲染模板,传入item,返回一个组件或者 string */
  renderOption?: (item: DataSourceType) => ReactElement | string;
  /** 自动获取焦点 */
  autoFocus?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否正在加载 */
  isLoading?: boolean;
  /** 外部传入的选项 */
  options: DataSourceType[];
  /** 是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false */
  filterOption?: (inputValue: string) => DataSourceType[];
}

export const AutoCompleteInput: FC<AutoCompletePropsInterface> = ({
  value = '',
  onSelect,
  renderOption,
  disabled = false,
  options = [],
  isLoading = false,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(value); // 受控组件
  const [suggestions, setSuggestions] = useState<DataSourceType[]>(options); // 存储数据。
  const [isOptionOpen, setOptionOpen] = useState(false);

  useEffect(() => {
    setSuggestions(options);
  }, [options]);

  const [hightLightIndex, setHightLightIndex] = useState(-1); // 处理高亮显示效果
  const triggerSearch = useRef(false); // 防止连续触发搜索

  const componentRef = useRef<HTMLDivElement>(null);

  // 点击外部，不显示下拉框
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  // 处理输入值
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  // 处理高亮的下标。
  const hightLight = (index: number) => {
    if (index < 0) index = 0;
    if (index + 1 > suggestions.length) {
      index = suggestions.length - 1;
    }
    setHightLightIndex(index);
  };

  // 处理键盘事件
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    //event.keyCode已经弃用
    switch (event.key) {
      // 按“↑”方向键时要做的事。
      case 'ArrowUp':
        hightLight(hightLightIndex - 1);
        break;
      // 按“↓”方向键时要做的事。
      case 'ArrowDown':
        hightLight(hightLightIndex + 1);
        break;
      case 'Enter':
        // 按“回车”键时要做的事,如果搜索时还没有结果，按下回车会报错，因此需要等待有结果再触发。
        if (suggestions[hightLightIndex]) {
          handleItemSelect(suggestions[hightLightIndex], event);
        }
        break;
      case 'Escape':
        // 按“ESC”键时要做的事。
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  // 处理鼠标移动事件
  const handleMouseEnter = (item: DataSourceType, index: number) => {
    setInputValue(item.value);
    setHightLightIndex(index);
  };

  // 渲染模板: 如果外部传入了模板，则使用外部的模板，否则直接渲染value
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  // 处理选择事件: 当（通过使用键盘或者鼠标）选择某一项后，设置下拉框长度为0，使下拉框隐藏
  const handleItemSelect = (item: DataSourceType, event: React.MouseEvent | React.KeyboardEvent) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item, event);
    }
    triggerSearch.current = false;
  };

  // 下拉框
  const generateDropdown = () => {
    return (
      <ul className={'fw-auto-complete-result'}>
        filterOption ?
        {suggestions.map((item, index) => {
          const cNames = classNames('fw-auto-complete-item', {
            'fw-auto-complete-result-height': index === hightLightIndex,
          });
          return (
            <li
              key={index}
              className={cNames}
              onMouseEnter={() => {
                handleMouseEnter(item, index);
              }}
              onClick={(event) => {
                handleItemSelect(item, event);
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="fw-auto-complete" ref={componentRef}>
      <Input
        disabled={disabled}
        className="fw-auto-complete-input"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      ></Input>
      {isLoading ? (
        <ul className={'fw-auto-complete-result'}>
          <Icon size="3x" icon="spinner" spin />
        </ul>
      ) : (
        isOptionOpen && generateDropdown()
      )}
    </div>
  );
};
export default AutoCompleteInput;
