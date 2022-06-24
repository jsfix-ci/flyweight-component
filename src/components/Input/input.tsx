import React, { ReactElement, FC, ChangeEvent, useState } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 输入值*/
  value?: string;
  /** 是否禁用组件 */
  disabled?: boolean;
  /** 组件的大小 */
  size?: 'lg' | 'sm' | 'md';
  /** 图标 */
  icon?: IconProp;
  /** 前缀 */
  prepend?: string | ReactElement;
  /** 后缀 */
  append?: string | ReactElement;
  /** 默认值 */
  placeholder?: string;
  /** change回调函数*/
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  /** 默认值*/
  defaultValue?: string;
}

/** input 通过鼠标或键盘输入内容，表单域的包装。*/
export const Input: FC<InputProps> = ({
  defaultValue = '',
  disabled = false,
  size = 'md',
  icon,
  prepend,
  append,
  className,
  placeholder,
  ...resProps
}) => {
  const [isFocus, setFocus] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const [init, setInit] = useState(true);

  //根据属性计算不同的className
  const inputOnFocusHandle = () => {
    setFocus(true);
    setInit(false);
  };
  const inputOnblurHandel = () => {
    setFocus(false);
  };

  const inputOnChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const wrapClasses = classNames('fw-input-wrap', className, {
    'fw-disabled': disabled,
    'is-active': isFocus,
  });

  const innerClasses = classNames(`fw-input-input`, {
    [`fw-input-size-${size}`]: size,
    'initialize-color': !!defaultValue && init,
  });

  const prependClass = classNames('fw-input-prepend', {
    [`fw-input-size-${size}`]: size,
  });

  const appendClass = classNames('fw-input-append', {
    [`fw-input-size-${size}`]: size,
  });

  return (
    <div className={wrapClasses}>
      {/* 前缀 */}
      {prepend &&
        (typeof prepend === 'string' ? (
          <div className={prependClass}>{prepend}</div>
        ) : (
          React.cloneElement(prepend, { className: prependClass, disabled })
        ))}

      {/* 输入框容器 */}
      <div className="fw-input-content">
        {/* 输入框 */}
        <input
          className={innerClasses}
          onFocus={inputOnFocusHandle}
          onBlur={inputOnblurHandel}
          onChange={(e) => {
            inputOnChangeHandle(e);
          }}
          placeholder={placeholder}
          type="text"
          value={value}
          disabled={disabled}
          // 处理受控组件与非受控组件之间冲突报错。
          {...resProps}
        ></input>

        {/* 图标 */}
        {icon && (
          <div className="fw-input-icon">
            <Icon icon={icon} />
          </div>
        )}
      </div>

      {/* 处理后缀 */}
      {append &&
        (typeof append === 'string' ? (
          <div className={appendClass}>{append}</div>
        ) : (
          React.cloneElement(append, { className: appendClass, disabled })
        ))}
    </div>
  );
};
export default Input;
