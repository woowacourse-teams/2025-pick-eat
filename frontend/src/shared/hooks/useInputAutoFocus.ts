import { useEffect, useRef } from 'react';

export const useInputAutoFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return { inputRef };
};
