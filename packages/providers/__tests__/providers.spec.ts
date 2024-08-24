import { renderHook, act } from '@testing-library/react';
import { useCalculator } from '../lib/providers';

describe('useCalculatorTest', () => {
  it('Default value', () => {
    const { value } = renderHook(() => useCalculator()).result.current;
    expect(value).toEqual(0);
  });

  it('Sum test', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.value).toEqual(0);
    act(() => {
      result.current.sum(1, 5);
    });
    expect(result.current.value).toEqual(6);
  });

  it('Diff test', () => {
    const { result } = renderHook(() => useCalculator());
    expect(result.current.value).toEqual(0);
    act(() => {
      result.current.diff(5, 1);
    });
    expect(result.current.value).toEqual(4);
  });
});
