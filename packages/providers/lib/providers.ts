import { useState } from 'react';

export const useCalculator = () => {
  const [value, setValue] = useState(0);

  const sum = (a: number, b: number) => {
    setValue(a + b);
  };

  const diff = (a: number, b: number) => {
    setValue(a - b);
  };

  return {
    value,
    diff,
    sum,
  };
};
