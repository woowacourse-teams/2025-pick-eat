import { useState } from 'react';

type UseBooleanReturn = [boolean, () => void, () => void, () => void];

export function useBoolean(initial = false): UseBooleanReturn {
  const [value, setValue] = useState(initial);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(value => !value);

  return [value, setTrue, setFalse, toggle];
}
