import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Menu from './index';

//默认导出文件
export default {
  title: '导航/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

//必须要定义一个模板才能有control
const Template: ComponentStory<typeof Menu> = (args) => {
  return (
    <div style={{ height: '150px' }}>
      <Menu {...args}>
        <Menu.SubMenu title="主页" index={'1'}>
          <Menu.Item index={'1-1'}>子菜单1</Menu.Item>
          <Menu.Item index={'1-2'}>子菜单2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item index={'2'}>菜单</Menu.Item>
        <Menu.Item index={'3'}>菜单</Menu.Item>
        <Menu.Item index={'4'}>菜单</Menu.Item>
      </Menu>
    </div>
  );
};

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  mode: 'horizontal',
  activeIndex: '1',
  defaultOpenSubmenus: [1],
};
DefaultInput.storyName = 'default';

//水平menu展示
export const MenuHorizontal: ComponentStory<typeof Menu> = () => (
  <Menu>
    <Menu.SubMenu title="主页" index={'1'}>
      <Menu.Item index={'1-1'}>子菜单1</Menu.Item>
      <Menu.Item index={'1-2'}>子菜单2</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item index={'2'}>菜单</Menu.Item>
    <Menu.Item index={'3'}>菜单</Menu.Item>
    <Menu.Item index={'4'}>菜单</Menu.Item>
  </Menu>
);
MenuHorizontal.storyName = 'Horizontal';
MenuHorizontal.parameters = {
  docs: {
    description: {
      story: 'Horizontal Menu',
    },
  },
};

//垂直menu展示
export const MenuVertical: ComponentStory<typeof Menu> = () => (
  <Menu mode="vertical">
    <Menu.SubMenu title="主页" index={'1'}>
      <Menu.Item index={'1-1'}>子菜单1</Menu.Item>
      <Menu.Item index={'1-2'}>子菜单2</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item index={'2'}>菜单</Menu.Item>
    <Menu.Item index={'3'}>菜单</Menu.Item>
    <Menu.Item index={'4'}>菜单</Menu.Item>
  </Menu>
);
MenuVertical.storyName = 'Vertical';
MenuVertical.parameters = {
  docs: {
    description: {
      story: 'Vertical Menu',
    },
  },
};
