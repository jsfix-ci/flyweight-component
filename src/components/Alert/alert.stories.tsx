import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './alert';

export default {
  title: '反馈/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => (
  <div style={{ position: 'relative', height: '120px' }}>
    <Alert {...args} />
  </div>
);
export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  type: 'success',
  message: '《百年孤独》',
  description:
    '“过去都是假的，回忆是一条没有归途的路，以往的一切春天都无法复原，即使最狂热最坚贞的爱情，归根结底也不过是一种瞬息即逝的现实，唯有孤独永恒。”',
};
DefaultAlert.storyName = 'default';

export const AlertWithType: ComponentStory<typeof Alert> = () => (
  <>
    <div>
      <div style={{ position: 'relative', height: '60px' }}>
        <Alert type="info" message="info 提示" style={{ top: '0' }}></Alert>
      </div>
      <div style={{ position: 'relative', height: '80px' }}>
        <Alert type="success" message="success" description="success 提示"></Alert>
      </div>
      <div style={{ position: 'relative', height: '80px' }}>
        <Alert type="warning" message="warning" description="warning 提示"></Alert>
      </div>
      <div style={{ position: 'relative', height: '50px' }}>
        <Alert type="error" message="error" description="error 提示"></Alert>
      </div>
    </div>
  </>
);
AlertWithType.storyName = 'type';
AlertWithType.parameters = {
  docs: {
    description: {
      story: '类型属性，改变Alert的外观',
    },
  },
};

//closeable 为 false 的 alert组件
export const AlertWithCloseable: ComponentStory<typeof Alert> = () => (
  <div>
    <div style={{ position: 'relative', height: '80px' }}>
      <Alert type="success" message="success" description="success 提示" closeable={false}></Alert>
    </div>
    <div style={{ position: 'relative', height: '80px' }}>
      <Alert type="warning" message="warning" description="warning 提示" closeable={false}></Alert>
    </div>
    <div style={{ position: 'relative', height: '80px' }}>
      <Alert type="error" message="error" description="error 提示" closeable={false}></Alert>
    </div>
  </div>
);
AlertWithCloseable.storyName = 'closeable';
AlertWithCloseable.parameters = {
  docs: {
    description: {
      story: 'closeable属性，是否可以点击关闭。',
    },
  },
};
