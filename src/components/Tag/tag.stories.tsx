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
DefaultTag.storyName = 'default';

//2.定义不同size的故事
export const TagWithSize: ComponentStory<typeof Tag> = () => (
  <>
    <Tag size="lg">big</Tag>
    <Tag size="md">hello</Tag>
    <Tag size="sm">small</Tag>
  </>
);
TagWithSize.storyName = 'size';
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
TagWithType.storyName = 'theme';
TagWithType.parameters = {
  docs: {
    description: {
      story: 'tag主题',
    },
  },
};

//3. 带有图标的tag标签
export const TagWithIcon: ComponentStory<typeof Tag> = () => (
  <>
    <Tag theme="primary" icon={'anchor'}>
      primary
    </Tag>
  </>
);
TagWithIcon.storyName = 'icon';
TagWithIcon.parameters = {
  docs: {
    description: {
      story: '使用icon图标',
    },
  },
};
