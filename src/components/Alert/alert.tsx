import React, { FC, useEffect, useState, useRef, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface AlertPropsInterface extends HTMLAttributes<HTMLElement> {
  /** alert警告提示四种样式 */
  type?: 'success' | 'info' | 'warning' | 'error';
  /** 是否可以关闭 */
  closeable?: boolean;
  /** 自定义关闭文字 */
  closeText?: string;
  /** 标题 */
  message?: string;
  /** 详细描述 */
  description?: string;
  /** 隐藏时间，单位ms*/
  hiddenTime?: number;
  /** 关闭时触发的回调函数 */
  onClose?: (e: React.MouseEvent) => void;
}

export const Alert: FC<AlertPropsInterface> = ({
  type = 'primary',
  closeable = true,
  closeText,
  message,
  description,
  hiddenTime = -1,
  onClose,
  children,
  ...resProps
}) => {
  const [close, setClose] = useState(false);
  const classes = classNames(
    'fw-alert',
    { [`fw-${type}`]: type },
    { hidden: closeable && close }, //
  );

  const closeBtnClass = classNames('fw-alert-close-btn', { hidden: !closeable });

  const handleClick = (e: React.MouseEvent) => {
    setClose(true);
    if (onClose) {
      onClose(e);
    }
  };

  const closeButton = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let time: NodeJS.Timeout;
    if (hiddenTime >= 0) {
      time = setTimeout(() => {
        closeButton.current && closeButton.current.click();
      }, hiddenTime);
    }
    return () => {
      clearTimeout(time);
    };
  }, [hiddenTime]);

  return (
    <div className={classes} {...resProps}>
      <div className={'fw-alert-message'}>{message}</div>
      <div className={'fw-alert-description'}>{description}</div>
      {children}
      <span className={closeBtnClass} onClick={handleClick} ref={closeButton}>
        {closeText ? closeText : 'x'}
      </span>
    </div>
  );
};

export default Alert;
