//tip: 可以使用Lodash 中的防抖函数。
import { useState, useEffect } from 'react';

//输入一个经常变换的依赖值，返回一个变换不是很快的值
export default function useDebounce<T>(value: T, delay = 200) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [value, delay]);
  return debounceValue;
}
