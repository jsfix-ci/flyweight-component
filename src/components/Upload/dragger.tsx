import React, { FC, DragEvent } from 'react';
import { useState } from 'react';
import classNames from 'classnames';

interface DraggerPropsInterface {
  onFile: (files: FileList) => void;
  children: React.ReactNode;
}
const Dragger: FC<DraggerPropsInterface> = ({ onFile, children }) => {
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames({
    'is-dragover': dragOver,
  });

  //DragEvent是react的DragEvent，而不是原生的
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    //dataTransfer 是 drag event中共的属性
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
