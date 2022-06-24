import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { IconProp, RotateProp, SizeProp } from '@fortawesome/fontawesome-svg-core';

export type ThemProps =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning'
  | 'light'
  | 'dark';

//对图标进行封装
export interface IconProps extends FontAwesomeIconProps {
  /** 主题颜色 */
  theme?: ThemProps;
  /** 尺寸 */
  size?: SizeProp | undefined;
  /** 需要导入的图标*/
  icon: IconProp;
  /** 旋转角度*/
  rotation?: RotateProp | undefined;
  /** 颜色*/
  color?: string | undefined;
}

/** 图标库 */
export const Icon: React.FC<IconProps> = ({ className, theme, size, rotation, color, ...resProps }) => {
  const classes = classNames('xzw-icon', className, {
    [`fw-color-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} color={color} size={size} rotation={rotation} {...resProps} />;
};
export default Icon;
