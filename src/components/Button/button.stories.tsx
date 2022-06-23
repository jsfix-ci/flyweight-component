import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';

//默认导出文件
export default {
  title: '通用/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  type: 'default', //传入的参数
  children: '默认按钮',
};
DefaultButton.storyName = '默认按钮示例';

//2.定义不同size的故事
export const ButtonWithSize: ComponentStory<typeof Button> = () => (
  <>
    <Button onClick={action('clicked')} size="lg">
      lg Button
    </Button>
    <Button onClick={action('clicked')} size="md">
      md Button
    </Button>
    <Button onClick={action('clicked')} size="sm">
      sm Button
    </Button>
  </>
);
ButtonWithSize.storyName = '不同大小按钮';
ButtonWithSize.parameters = {
  docs: {
    description: {
      story: 'Some story **markdown**',
    },
  },
};

//3.定义不同type的故事
export const ButtonWithType: ComponentStory<typeof Button> = () => (
  <>
    <Button onClick={action('clicked')} type="primary">
      primary Button
    </Button>
    <Button onClick={action('clicked')} type="default">
      default Button
    </Button>
    <Button onClick={action('clicked')} type="danger">
      danger Button
    </Button>
    <Button onClick={action('clicked')} type="link" href="#">
      link Button
    </Button>
  </>
);
ButtonWithType.storyName = '不同类型按钮';

//4.定义disabled按钮
export const ButtonWithDisabled = () => (
  <>
    <Button onClick={action('clicked')} disabled>
      primary Button
    </Button>
    <Button onClick={action('clicked')} disabled type="link" href="#">
      link Button
    </Button>
  </>
);
ButtonWithDisabled.storyName = '禁用按钮';
