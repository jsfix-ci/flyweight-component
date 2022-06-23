import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonPropsInterface } from './button';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonPropsInterface = {
  type: 'primary',
  size: 'lg',
  className: 'testClass',
};

const disabledProps: ButtonPropsInterface = {
  disabled: true,
  onClick: jest.fn(),
};

describe('测试按钮组件', () => {
  it('是否正确渲染组件', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement; //获取button组件
    expect(element).toBeInTheDocument(); //判断文档中是否存在该组件
    expect(element.tagName).toEqual('BUTTON'); //判断该元素的标签是否是button
    expect(element).toHaveClass('fw-btn fw-btn-default'); //判断是否有类
    expect(element.disabled).toBeFalsy(); //disable属性是否为false
    fireEvent.click(element); //测试按钮点击事件
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('根据不同的props是否正常渲染组件', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('fw-btn-primary fw-btn-lg testClass');
  });
  it('传入的link组件是否正常渲染', () => {
    const wrapper = render(
      <Button type="link" target="http://dummyurl">
        Link
      </Button>,
    );
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('fw-btn fw-btn-link');
  });
  it('disable时候是正常渲染', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText('Nice') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
