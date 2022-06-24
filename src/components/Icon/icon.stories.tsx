import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './icon';

//默认导出文件
export default {
  title: '通用/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

//必须要定义一个模板才能有control
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const DefaultIcon = Template.bind({});
DefaultIcon.args = {
  icon: 'baby-carriage',
};
DefaultIcon.storyName = 'default';

//2.定义不同size的故事
export const IconWithSize: ComponentStory<typeof Icon> = () => (
  <>
    <Icon icon={'dice-one'} size="1x" style={{ marginLeft: '10px' }}></Icon>
    <Icon icon={'dice-two'} size="3x" style={{ marginLeft: '10px' }}></Icon>
    <Icon icon={'dice-three'} size="6x" style={{ marginLeft: '10px' }}></Icon>
    <Icon icon={'dice-four'} size="9x" style={{ marginLeft: '10px' }}></Icon>
  </>
);
IconWithSize.storyName = 'size';
IconWithSize.parameters = {
  docs: {
    description: {
      story: 'size属性，控制icon大小',
    },
  },
};

//3.定义不同type的故事
export const IconWithType: ComponentStory<typeof Icon> = () => (
  <>
    <Icon icon={'phone'} theme="danger" style={{ marginLeft: '10px' }}></Icon>
    <Icon icon={'phone'} theme="info" style={{ marginLeft: '10px' }}></Icon>
    <Icon icon={'phone'} theme="primary" style={{ marginLeft: '10px' }}></Icon>
    <Icon icon={'phone'} theme="secondary" style={{ marginLeft: '10px' }}></Icon>
  </>
);
IconWithType.storyName = 'theme';
IconWithType.parameters = {
  docs: {
    description: {
      story: 'theme属性，控制icon主题',
    },
  },
};
