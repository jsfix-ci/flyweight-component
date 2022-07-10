import { RefObject, useEffect } from 'react';

export default function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      //使用类型断言，表示event.target 一定是 HTMLElement类型
      //整个 input和select框 包选所有的组件，判断当前点击的节点是否包含点击的事件的节点   .contains
      if (ref.current && ref.current.contains(event.target as HTMLElement)) {
        return;
      } else {
        handler(); //处理的回调
      }
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}
