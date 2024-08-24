import { renderHook } from "@testing-library/react";
import { useCalculator } from "../lib/providers";

describe('useCalculatorTest', () => {
  it("Default result", () => {
    const { result } = renderHook(() => useCalculator()).result.current;
    expect(result).toEqual(0);
  });

  it("Sum test", () => {
    const { result, sum } = renderHook(() => useCalculator()).result.current;
    expect(result).toEqual(0);
    sum(5, 7);
    expect(result).toEqual(12);
  });

  it("Diff test", () => {
    const { result, sum } = renderHook(() => useCalculator()).result.current;
    expect(result).toEqual(0);
    sum(5, 7);
    expect(result).toEqual(-2);
  });
});
