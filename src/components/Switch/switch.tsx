import React, { FC, useState } from 'react';

export interface SwitchPropsInterface {
  /** 点击时的回调*/
  preText?: string;
  afterText?: string;
  onChange?: (e: React.MouseEvent) => void;
}

export const Switch: FC<SwitchPropsInterface> = ({ onChange, preText, afterText }) => {
  const [state, setState] = useState(true);

  const handleClick = (e: React.MouseEvent) => {
    setState(!state);
    onChange && onChange(e);
  };

  return (
    <div className="fw-switch-wrap">
      {preText && <span className="fw-switch-pretext">{preText}</span>}
      <div
        className="fw-switch-button"
        onClick={(e) => {
          handleClick(e);
        }}
      ></div>
      {afterText && <span className="fw-switch-afttext">{afterText}</span>}
    </div>
  );
};

export default Switch;
