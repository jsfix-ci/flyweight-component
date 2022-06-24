import classnames from 'classnames';
import React, { FC, ReactNode, useState } from 'react';

export interface TagPropsInterface {
  /** 是否可以关闭 */
  closeable?: boolean;
  /** 标签关闭时的回调 */
  onClose?: (e: React.MouseEvent) => void;
  /** 标签的颜色,不设置则为默认颜色*/
  theme?: 'primary' | 'secondary' | 'default' | 'danger' | 'info' | 'success' | 'warning' | 'light' | 'dark';
  /** 图标*/
  icon?: 'string';
  /** 图标尺寸大小*/
  size?: 'lg' | 'md' | 'sm';
  /** 子元素*/
  children?: ReactNode;
}

export const Tag: FC<TagPropsInterface> = ({
  closeable = true,
  children,
  onClose,
  theme = 'primary',
  // todo
  icon,
  size = 'md',
  ...resProps
}) => {
  const [isHidden, setHidden] = useState(false);
  const handleClose = (e: React.MouseEvent) => {
    onClose && onClose(e);
    setHidden(true);
  };
  const classes = classnames(`fw-tag fw-bg-color-${theme}`, {
    hidden: isHidden,
  });
  console.log(isHidden);
  return (
    <div className={classes} {...resProps}>
      <div className={`fw-tag-content fw-tag-${size}`}> {children}</div>
      {closeable && (
        <span className={`fw-tag-close`} onClick={handleClose}>
          x
        </span>
      )}
    </div>
  );
};

export default Tag;
