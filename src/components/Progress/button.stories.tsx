import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Progress from './progress';

//默认导出文件
export default {
  title: '通用/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;
export const DefaultProgress = Template.bind({});
DefaultProgress.args = { percent: 100, theme: 'primary' };
DefaultProgress.storyName = 'default';

export const ProgressWithTheme: ComponentStory<typeof Progress> = () => (
  <>
    <Progress percent={0} theme={'default'}></Progress>
    <Progress percent={5} theme={'primary'}></Progress>
    <Progress percent={10} theme={'danger'}></Progress>
    <Progress percent={20} theme={'info'}></Progress>
    <Progress percent={30} theme={'success'}></Progress>
    <Progress percent={40} theme={'warning'}></Progress>
    <Progress percent={50} theme={'dark'}></Progress>
  </>
);
ProgressWithTheme.storyName = 'theme';
ProgressWithTheme.parameters = {
  docs: {
    description: {
      story: '不同主题颜色的进度条',
    },
  },
};
