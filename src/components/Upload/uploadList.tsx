import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';
interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = ({ fileList, onRemove }) => {
  return (
    <ul className="rs-upload-list">
      {fileList.map((item) => {
        return (
          <li className="rs-upload-list-item" key={item.uid}>
            <span className={`rs-upload-file-name rs-upload-file-name-${item.status}`}>
              <Icon icon="paperclip" theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="rs-upload-file-sut">
              {item.status === 'uploading' && (
                <>
                  <Icon icon="spinner" spin theme="primary"></Icon>
                  <Progress percent={item.percent || 0}></Progress>
                </>
              )}
              {item.status === 'success' && <Icon icon="check-circle" theme="success"></Icon>}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger"></Icon>}
            </span>
            <span className="rs-upload-remove">
              <Icon
                icon="times-circle"
                theme="danger"
                onClick={() => {
                  onRemove(item);
                }}
              ></Icon>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
