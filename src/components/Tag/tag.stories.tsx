import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from './tag';

//默认导出文件
export default {
  title: '通用/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;
export const DefaultTag = Template.bind({});
DefaultTag.args = {
  children: '默认标签',
};
DefaultTag.storyName = '默认按钮示例';

//2.定义不同size的故事
export const TagWithSize: ComponentStory<typeof Tag> = () => (
  <>
    <Tag size="lg">big</Tag>
    <Tag size="md">hello</Tag>
    <Tag size="sm">small</Tag>
  </>
);
TagWithSize.storyName = '不同大小按钮';
TagWithSize.parameters = {
  docs: {
    description: {
      story: 'size 属性选择tag的大小',
    },
  },
};

//2.定义不同size的故事
export const TagWithType: ComponentStory<typeof Tag> = () => (
  <>
    <Tag theme="primary">primary</Tag>
    <Tag theme="secondary">secondary</Tag>
    <Tag theme="default">default</Tag>
    <Tag theme="danger">danger</Tag>
    <Tag theme="info">info</Tag>
    <Tag theme="success">success</Tag>
    <Tag theme="warning">warning</Tag>
    <Tag theme="dark">dark</Tag>
  </>
);
TagWithType.storyName = '不同类型的按钮';
TagWithType.parameters = {
  docs: {
    description: {
      story: 'Some story **markdown**',
    },
  },
};
