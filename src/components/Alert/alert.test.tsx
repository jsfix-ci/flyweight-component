import React from 'react';
import Alert, { AlertPropsInterface } from './alert';
import { fireEvent, render } from '@testing-library/react';

const fnProps = {
  onClick: jest.fn(),
};

describe('test Alert components', () => {
  //是否正确渲染了class类
  it('should render the correct default button', () => {
    const wrapper = render(<Alert title="close" description="详情"></Alert>); //只是找到包含该字体的父元素。
    const element = wrapper.getByText(/详情/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('fw-alert-description');
  });
});
