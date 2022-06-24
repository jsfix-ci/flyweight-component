import React, { useContext } from 'react';
import classNames from 'classnames';

import { MenuContext } from '../menu';

export interface MenuItemPropsInterface extends React.LiHTMLAttributes<HTMLElement> {
  /** 索引下标，如未提供则自动添加 */
  index?: React.Key;
  /** 是否禁用 */
  disabled?: boolean; //是否可点击
}

const MenuItem: React.FC<MenuItemPropsInterface> = ({ index, children, disabled = false, className }) => {
  const context = useContext(MenuContext);

  const classes = classNames(className, {
    'is-disabled': disabled, //是否禁用。
    'is-active': context.activeIndex === index, //如果menu组件中的activeIndex 和当前item的index 相等就高亮
  });

  const handleClick = () => {
    if (context.changeActiveIndex && !disabled) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      context.changeActiveIndex(index!);
    }
  };
  return (
    <>
      <li className={classes} onClick={handleClick}>
        {children}
      </li>
    </>
  );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
