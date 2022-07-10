import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import { v4 as uuidv4 } from 'uuid';
import UploadList from './uploadList';
import Icon from '../Icon/icon';
import Dragger from './dragger';

//上传文件接口类型
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: 'ready' | 'uploading' | 'success' | 'error'; //状态
  percent?: number;
  raw?: File; //原文件信息
  response?: any; //响应信息
  error?: any;
}

export interface UploadPropsInterface {
  /** 输入上传的接口路径 */
  action: string;
  /** 上传前的校验 */
  beforeUpload?: (file: File) => boolean | Promise<File>; //boolean表示完成验证或者 promise表示完成文件转换，如名字。
  /** 上传中 percentage表示进度，file区别文件 */
  onProgress?: (percentage: number, file: File) => void;
  /** 成功的回调 */
  onSuccess?: (data: any, file: File) => void;
  /** 失败的回调  */
  onError?: (err: any, file: File) => void;
  /** 取消上传 */
  onChange?: (file: File) => void;
  /** 仅用于测试uploadList */
  defaultFileList?: UploadFile[];
  /** 删除后的回调 */
  onRemove?: (file: UploadFile) => void;
  /** 额外的请求头 */
  htmlHeaders?: { [key: string]: any };
  /** 存储对象的中，获取文件的key值 */
  filename?: string;
  /** */
  data?: { [key: string]: any };
  /** 是否携带cookie */
  withCredentials?: boolean;
  /** 是否支持多个文件上传 */
  multiple?: boolean;
  /** 接收的类型 */
  accept?: string;
  /** 按钮 */
  children?: React.ReactNode;
  /** drag */
  drag?: boolean;
}

export const Upload: React.FC<UploadPropsInterface> = ({
  action,
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  defaultFileList = [],
  onRemove,
  htmlHeaders,
  filename = 'file',
  data,
  withCredentials = false,
  multiple = true,
  accept,
  children,
  drag,
}) => {
  //存储上传文件数组
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList);

  //使用ref获取上传input
  const fileInputRef = useRef<HTMLInputElement>(null);

  //处理button点击事件，只要点击就触发fileInputRef的点击事件。
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); //触发点击文件上传功能。
    }
  };

  //只有当选择文件发生变化时候才会调用
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    //如果files为空。
    if (!files) {
      return;
    }
    //如果存在file, 立即调用上传函数
    uploadFiles(files);
    //执行上传函数后清空
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  //上传文件函数
  const uploadFiles = (files: FileList) => {
    //files是一个类数组结构，调用数组方法，需要先转换成数组。
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      //上传前，有beforeUpload先执行beforeUpload
      if (beforeUpload) {
        const result = beforeUpload(file);
        //如果返回的是Promise，
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result === true) {
          post(file);
        }
      } else {
        post(file);
      }
    });
  };
  const updateFileList = (updateFile: UploadFile, updateParam: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateParam };
        } else {
          return file;
        }
      });
    });
  };

  const post = (file: File) => {
    const _file: UploadFile = {
      uid: uuidv4(), //文件id
      status: 'ready', //文件状态
      name: file.name, //文件名
      size: file.size, //文件大小
      percent: 0, //上传进度
      raw: file, //文件原始数据
    };
    //添加上传的文件到state中。不能写成如下形式，会照成多个文件上传时候被异步覆盖。
    //bug： setFileList([_file,...fileList])
    setFileList((preFileList) => {
      return [_file, ...preFileList];
    });
    const formData = new FormData();
    formData.append(filename || 'file', file);

    //将传入额外的data，存储在发送的对象上。
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    axios
      .post(action, formData, {
        headers: {
          ...htmlHeaders,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials, //是否携带cookie
        //axios 提供的onUploadProgress 显示上传的百分比，传入一个e为any,上面有 e.loaded， e.total属性。可以用来计算百分比。
        onUploadProgress: (e: any) => {
          const percentage = Math.floor((e.loaded * 100) / e.total) || 0;
          //更新状态 和 进度
          updateFileList(_file, { percent: percentage, status: 'uploading' });
          if (percentage < 100) {
            //当上传进度未完成的时候，如果传入了onProgress函数就调用。
            onProgress && onProgress(percentage, file);
          }
        },
      })
      .then((res: any) => {
        updateFileList(_file, { status: 'success', response: res.data });
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
      })
      .catch((err: any) => {
        updateFileList(_file, { status: 'error', error: err });
        onError && onError(err.data, file);
        onChange && onChange(file);
      });
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((preList) => {
      return preList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  return (
    <div className="upload-warp">
      {/* 使用button来触发点击上传文件 */}
      {children}
      ?(
      {drag}?
      <Dragger
        onFile={(files) => {
          uploadFiles(files);
        }}
      >
        {' '}
        {children}
      </Dragger>
      :{children}) :(
      <Button className="upload-button" type="primary" onClick={handleClick}>
        <Icon icon="upload"></Icon>
        上传文件
      </Button>
      )
      <input
        style={{ display: 'none' }}
        type="file"
        name="uploadFile"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      ></input>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
