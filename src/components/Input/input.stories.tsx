import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './input';

//默认导出文件
export default {
  title: '通用/Input ',
  component: Input,
} as ComponentMeta<typeof Input>;

//必须要定义一个模板才能有control
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  prepend: 'http://',
  defaultValue: 'default展示不可输入，需通过下面的control控制value',
  append: '.com',
  icon: 'search',
};
DefaultInput.storyName = 'default';

//2.定义不同size的故事
export const InputWithSize: ComponentStory<typeof Input> = () => (
  <div style={{ width: '500px', margin: '0 auto' }}>
    <Input size="lg" defaultValue="it's a lg size input"></Input>
    <Input size="md" defaultValue="it's a md size input"></Input>
    <Input size="sm" defaultValue="it's a sm size input"></Input>
  </div>
);
InputWithSize.storyName = 'size';
InputWithSize.parameters = {
  docs: {
    description: {
      story: 'size属性，控制icon大小',
    },
  },
};

//3.定义前缀
export const InputWithPrepend: ComponentStory<typeof Input> = () => (
  <div style={{ width: '500px', margin: '0 auto' }}>
    <Input prepend={'http://'} size="lg" defaultValue="xiaozhiwen.cloud"></Input>
  </div>
);
InputWithPrepend.storyName = 'size';
InputWithPrepend.parameters = {
  docs: {
    description: {
      story: 'prepend定义前缀',
    },
  },
};

//4.定义后缀
export const InputWithAppend: ComponentStory<typeof Input> = () => (
  <div style={{ width: '500px', margin: '0 auto' }}>
    <Input append={'.cloud'} size="lg" defaultValue="xiaozhiwen"></Input>
  </div>
);
InputWithAppend.storyName = 'size';
InputWithAppend.parameters = {
  docs: {
    description: {
      story: 'append定义前缀',
    },
  },
};

//4.使用图标
export const InputWithIcon: ComponentStory<typeof Input> = () => (
  <div style={{ width: '500px', margin: '0 auto' }}>
    <Input icon="mail-bulk"></Input>
  </div>
);
InputWithIcon.storyName = 'Icon';
InputWithIcon.parameters = {
  docs: {
    description: {
      story: '添加图标',
    },
  },
};
