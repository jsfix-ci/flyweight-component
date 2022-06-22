import React from 'react';
import classNames from 'classnames';

export interface BaseButtonProps
  extends Omit<
    Partial<
      React.ButtonHTMLAttributes<HTMLElement> &
        React.AnchorHTMLAttributes<HTMLElement>
    >,
    'type'
  > {
  /** 设置Button组件的大小 */
  size?:
    | 'lg'
    | 'sm'
    | 'md';
  /** 设置button的类型*/
  type?:
    | 'primary'
    | 'default'
    | 'danger'
    | 'link';
  /** 设置button是否禁用 */
  disabled?: boolean;
  /** 当Button 组件的btnType是link的时候传入的url*/
  target?: string;
  /** 点击时触发的回调 */
  onClick?: (
    event: React.MouseEvent,
  ) => void;
}

/** Button 组件描述: 按钮用于开始一个即时操作。 */
export const Button: React.FC<
  BaseButtonProps
> = ({
  size = 'md',
  type = 'default',
  disabled = false,
  target = '',
  className,
  children,
  ...restProps
}) => {
  //设置类名
  const classes =
    classNames(
      'btn',
      className,
      {
        [`btn-${size}`]:
          size, //如果size存在，则添加相应的类型。
        [`btn-${type}`]:
          type,

        //disable需要分情况
        //如果是a标签，a标签没有disabled，添加类，类中阻止 pointer-events: none，
        //如果是button，则无需添加类，因为button有disabled属性。
        disabled:
          type ===
            'link' &&
          disabled,
      },
    );

  // 处理link类型
  if (
    type ===
      'link' &&
    target
  ) {
    return (
      <a
        className={
          classes
        }
        href={
          target
        }
        {...restProps}
      >
        {
          children
        }
      </a>
    );
  } else {
    return (
      <button
        className={
          classes
        }
        disabled={
          disabled
        }
        {...restProps}
      >
        {
          children
        }
      </button>
    );
  }
};

export default Button;
