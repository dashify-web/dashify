import { useState } from "react"

export const useCalculator = () => {
  const [result, setResult] = useState(0);

  const sum = (a: number, b: number) => {
    setResult(a + b);
  }

  const diff = (a: number, b: number) => {
    setResult(a - b);
  }

  return {
    result,
    diff,
    sum
  }
}
