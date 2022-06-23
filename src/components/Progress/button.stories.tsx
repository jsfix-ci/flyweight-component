import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Progress from './progress';

//默认导出文件
export default {
  title: '通用/Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>;

export const ProgressDefault: ComponentStory<typeof Progress> = () => (
  <>
    <Progress percent={100} theme={'primary'}></Progress>
  </>
);

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
ProgressWithTheme.storyName = '不同theme的进度条';
ProgressWithTheme.parameters = {
  docs: {
    description: {
      story: '不同主题颜色的进度条',
    },
  },
};
