import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classnames from 'classnames';
import React, { FC, ReactNode, useState } from 'react';
import Icon from '../Icon';

export interface TagPropsInterface {
  /** 是否可以关闭 */
  closeable?: boolean;
  /** 标签关闭时的回调 */
  onClose?: (e: React.MouseEvent) => void;
  /** 标签的颜色,不设置则为默认颜色*/
  theme?: 'primary' | 'secondary' | 'default' | 'danger' | 'info' | 'success' | 'warning' | 'light' | 'dark';
  /** 图标*/
  icon?: IconProp;
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

  return (
    <div className={classes} {...resProps}>
      {icon && <Icon icon={icon} className={`fw-tag-icon`}></Icon>}
      <div className={`fw-tag-content fw-tag-${size}`}> {children}</div>
      {closeable && (
        <span className={`fw-tag-close`} onClick={handleClose}>
          <Icon icon={'xmark'}></Icon>
        </span>
      )}
    </div>
  );
};

export default Tag;
