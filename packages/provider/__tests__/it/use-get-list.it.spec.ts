import { renderHook, waitFor } from '@testing-library/react';
import { DUMMIES_MOCKS, ItWrapper } from './utils';
import { useGetList } from '../../lib';

describe('useGetList.it', () => {
  it('can return empty list', () => {
    const { result } = renderHook(
      () =>
        useGetList({
          resource: 'dummies',
          pagination: {
            page: 10,
          },
        }),
      { wrapper: ItWrapper }
    );

    waitFor(() => {
      expect(result.current.data).toBe([]);
    });
  });

  it('should return correct data', () => {
    const { result } = renderHook(() => useGetList({ resource: 'dummies' }), {
      wrapper: ItWrapper,
    });

    waitFor(() => {
      expect(result.current.data).toBe(DUMMIES_MOCKS.slice(0, 2));
    });
  });

  it('should handle loading', () => {
    const { result } = renderHook(() => useGetList({ resource: 'persons' }), {
      wrapper: ItWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe(DUMMIES_MOCKS.slice(0, 2));
    });
  });

  it('should handle loading', () => {
    const { result } = renderHook(() => useGetList({ resource: 'persons' }), {
      wrapper: ItWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBe(DUMMIES_MOCKS.slice(0, 2));
    });
  });
});
