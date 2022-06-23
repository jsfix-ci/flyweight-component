import React, { FC } from 'react';
import classNames from 'classnames';

export interface ProgressPropsInterface {
  /** 进度条完成百分比 */
  percent: number;
  /** 是否显示数字 */
  showText?: boolean;
  /** 是否进度到100%时自动消失 */
  isAutoHidden?: boolean;
  /** 显示组题颜色 */
  style?: React.CSSProperties;
  /** 主题颜色 */
  theme?: 'primary' | 'secondary' | 'default' | 'danger' | 'info' | 'success' | 'warning' | 'light' | 'dark';
}

export const Progress: FC<ProgressPropsInterface> = ({
  percent,
  showText = true,
  isAutoHidden = false,
  style,
  theme = 'primary',
}) => {
  const AutoHiddenClass = classNames('fw-progress-wrap', {
    hidden: isAutoHidden && percent === 100,
  });

  const FixDisplayClass = classNames('fw-inner-text', {
    'less-then': percent < 8,
  });

  return (
    <div className={AutoHiddenClass} style={style}>
      {/* 进度条背景 */}
      <div className="fw-progress-bar">
        {/* 进度条 */}
        <div className={`fw-progress-inner-bar color-${theme}`} style={{ width: `${percent}%` }}>
          {/* 进度条文字 */}
          {showText && <span className={FixDisplayClass}>{`${percent}%  `}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
