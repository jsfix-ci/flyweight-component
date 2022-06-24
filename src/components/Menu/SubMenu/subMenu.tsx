import React, { useContext, useState, useRef } from 'react';
import classNames from 'classnames';
import { MenuContext } from '../menu';
import { MenuItemPropsInterface } from '../MenuItem/menuItem';
import Icon from '../../Icon/icon';

export interface SubMenuPropsInterface extends Partial<React.HTMLAttributes<HTMLElement>> {
  /** subMenu的索引 */
  index?: React.Key;
  /** subMenu的标题 */
  title: string;
  /** 是否禁用 */
  disabled?: boolean;
}

const SubMenu: React.FC<SubMenuPropsInterface> = ({ index, title, children, className, disabled }) => {
  const subMenuItemKey = useRef<React.Key[]>([]);
  const context = useContext(MenuContext);
  //根据是否传入defaultOpenMenus，以及排列方式是否是垂直，设置默认值。
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const verticalDefaultOpenMenus = !context.isHorizontal && context.defaultOpenSubmenus.includes(index!) ? true : false;
  const horizontalDefaultOpenMenus = context.isHorizontal;
  //使用状态值存储当前状态是否打开或者关闭。
  const [subMenuHidden, setSubMenuHidden] = useState(!verticalDefaultOpenMenus || horizontalDefaultOpenMenus);

  //处理点击事件
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSubMenuHidden(!subMenuHidden);
  };
  //处理鼠标移动事件
  let timer: NodeJS.Timeout;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setSubMenuHidden(toggle);
    }, 0);
  };

  //如果是水平则鼠标移动点击事件，如果是垂直绑定点击事件
  const clickEvent = context.isHorizontal ? {} : { onClick: handleClick };
  const hoverEvent = context.isHorizontal
    ? {
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouse(e, false);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouse(e, true);
        },
      }
    : {};

  //给subMenu组件添加 css类名。
  const subMenuClasses = classNames('submenu', className, {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    'is-active': context.activeIndex === index || subMenuItemKey.current.includes(context.activeIndex!),
    'is-disabled': disabled,
  });

  //绝对定位面板css类名 控制是否
  const subMenuPanelClass = classNames('submenu-panel', {
    hidden: subMenuHidden && !disabled,
  });

  const repeatMap = new Map();
  //渲染孩子节点
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, subIndex) => {
      const childElement = child as React.FunctionComponentElement<MenuItemPropsInterface>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        if (childElement.props.index) {
          repeatMap.has(childElement.props.index)
            ? console.error('index can not repeat')
            : repeatMap.set(childElement.props.index, childElement.props.index);
          subMenuItemKey.current.push(childElement.props.index);
          return React.cloneElement(childElement, { className: 'submenu-item', index: childElement.props.index });
        } else {
          subMenuItemKey.current.push(`${index}-${subIndex}`);
          return React.cloneElement(childElement, { className: 'submenu-item', index: `${index}-${subIndex}` });
        }
      } else {
        console.error('warning:subMenu children must be MenuItem');
      }
    });
    return <ul className={subMenuPanelClass}>{childrenComponent}</ul>;
  };

  return (
    <>
      <li key={index} className={subMenuClasses} {...hoverEvent}>
        {/*占据 menu-item的标题*/}
        <div className="submenu-title" {...clickEvent}>
          {title}
          <Icon icon="angle-down" className="submenu-icon"></Icon>
        </div>
        {/* 相对定位的子面板 */}
        {renderChildren()}
      </li>
    </>
  );
};

//设置默认props
SubMenu.defaultProps = {
  disabled: false,
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
