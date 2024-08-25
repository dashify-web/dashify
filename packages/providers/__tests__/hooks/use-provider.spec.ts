import { renderHook } from '@testing-library/react';

import { Provider, useProvider, useFacadeProvider } from '../../lib';

jest.mock('../../lib/hooks/use-facade-provider', () => ({
  useFacadeProvider: jest.fn(),
}));

const mockProvider: Provider<any> = {
  resource: 'mock',
  getList: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  edit: jest.fn(),
  delete: jest.fn(),
};

describe('useProvider', () => {
  beforeAll(() => {
    (useFacadeProvider as jest.Mock).mockReturnValue({
      getProvider: jest.fn().mockReturnValue(mockProvider),
    });
  });

  it('should return the correct provider when a valid resource is provided', () => {
    const resource = 'dummy';

    const { result } = renderHook(() => useProvider({ resource }));

    expect(result.current).toBe(mockProvider);
    expect(useFacadeProvider().getProvider).toHaveBeenCalledWith({ resource });
  });
});
