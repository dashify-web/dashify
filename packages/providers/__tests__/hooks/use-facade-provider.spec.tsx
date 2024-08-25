import React, { FC, ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { undefinedContextMessage } from '@dashify/utils';

import { ProviderContext, Provider, useFacadeProvider } from '../../lib';

const MOCK_DUMMY_PROVIDER: Provider<any> = {
  resource: 'dummy',
  getList: jest.fn(),
  edit: jest.fn(),
  create: jest.fn(),
  deleteOne: jest.fn(),
  getById: jest.fn(),
};

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ProviderContext providers={[MOCK_DUMMY_PROVIDER]}>
      {children}
    </ProviderContext>
  );
};

describe('useFacadeProvider', () => {
  it('Should throw if not wrapped by ProviderContext', () => {
    expect(() => {
      renderHook(() => useFacadeProvider());
    }).toThrow(undefinedContextMessage('useFacadeProvider', 'ProviderContext'));
  });

  it('should return the provider if context is provided', () => {
    const { result } = renderHook(() => useFacadeProvider(), {
      wrapper: Wrapper,
    });

    expect(result.current.providers).toEqual([MOCK_DUMMY_PROVIDER]);
  });

  it('can get provider with getProvider', () => {
    const { result } = renderHook(() => useFacadeProvider(), {
      wrapper: Wrapper,
    });

    expect(result.current.getProvider({ resource: 'dummy' })).toEqual(
      MOCK_DUMMY_PROVIDER
    );
  });

  it('should throw unknown resource if resourceName does not exist in providers', () => {
    const { result } = renderHook(() => useFacadeProvider(), {
      wrapper: Wrapper,
    });

    expect(() => {
      result.current.getProvider({ resource: 'doesNotExist' });
    }).toThrow('Unknown resource: doesNotExist');
  });
});
