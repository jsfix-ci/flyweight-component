import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Alert from './alert';

export default {
  title: '反馈/Alert 警告提示',
  component: Alert,
} as ComponentMeta<typeof Alert>;

//定义不同类型的alert
export const AlertDefault: ComponentStory<typeof Alert> = () => (
  <div style={{ position: 'relative', height: '100px' }}>
    <Alert type="info" message="info 提示"></Alert>
  </div>
);

export const AlertWithType: ComponentStory<typeof Alert> = () => (
  <>
    <div>
      <div style={{ position: 'relative', height: '60px' }}>
        <Alert type="info" message="info 提示" style={{ top: '0' }}></Alert>
      </div>
      <div style={{ position: 'relative', height: '80px' }}>
        <Alert type="success" message="success" description="success 提示" style={{ top: '0' }}></Alert>
      </div>
      <div style={{ position: 'relative', height: '80px' }}>
        <Alert type="warning" message="warning" description="warning 提示" style={{ top: '0' }}></Alert>
      </div>
      <div style={{ position: 'relative', height: '50px' }}>
        <Alert type="error" message="error" description="error 提示" style={{ top: '0' }}></Alert>
      </div>
    </div>
  </>
);
AlertWithType.storyName = '不同类型的Alert组件';

//closeable 为 false 的 alert组件
export const AlertWithCloseable: ComponentStory<typeof Alert> = () => (
  <div>
    <div style={{ position: 'relative', height: '80px' }}>
      <Alert type="success" message="success" description="success 提示" closeable={false} style={{ top: '0' }}></Alert>
    </div>
    <div style={{ position: 'relative', height: '80px' }}>
      <Alert type="warning" message="warning" description="warning 提示" closeable={false} style={{ top: '0' }}></Alert>
    </div>
    <div style={{ position: 'relative', height: '80px' }}>
      <Alert type="error" message="error" description="error 提示" closeable={false} style={{ top: '0' }}></Alert>
    </div>
  </div>
);
AlertWithCloseable.storyName = 'closeable 为 false 的 alert组件';
