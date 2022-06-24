import { FC } from 'react';
import Menu, { MenuPropsInterface } from './menu';
import SubMenu, { SubMenuPropsInterface } from './SubMenu/subMenu';
import MenuItem, { MenuItemPropsInterface } from './MenuItem/menuItem';

//类型“FC<MenuPropsInterface>”上不存在属性“item”。 解决：交叉类型 &。
// Menu.item = MenuItem
export type MenuComponent = FC<MenuPropsInterface> & {
  Item: FC<MenuItemPropsInterface>;
  SubMenu: FC<SubMenuPropsInterface>;
};

const TransMenu = Menu as MenuComponent; //类型断言

TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
