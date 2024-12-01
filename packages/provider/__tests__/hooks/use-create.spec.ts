import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { CreateArgsType, useCreate, UseCreateArgsType } from '../../lib';
import { Dummy, setupUseMutationMock, dummyOne, Params, Meta } from './utils';

const dummyProviderCreate = jest.fn().mockResolvedValue(dummyOne);

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  QueryClient: jest.fn(), // have to mock 'cause @dashify/providers use an instance of QueryClient globaly
}));
jest.mock('../../lib/hooks/use-provider', () => ({
  useProvider: jest.fn(),
}));

describe('useCreate', () => {
  beforeAll(() => {
    setupUseMutationMock({
      toMock: 'create',
      response: dummyOne,
      mockImplementation: dummyProviderCreate,
    });
  });

  it('should return the correct createResponse', async () => {
    const resource = 'dummy';
    const baseArgs: Omit<CreateArgsType<Dummy, Meta, Params>, 'payload'> = {
      meta: {
        username: 'dummyName',
      },
      params: {
        minAge: 1,
      },
    };

    const createArgs: CreateArgsType<Dummy, Meta, Params> = {
      payload: dummyOne,
      ...baseArgs,
    };

    const useCreateArgs: UseCreateArgsType<Dummy, Meta, Params> = {
      ...baseArgs,
      resource,
      useMutationOptions: { retry: 1 },
    };

    const { result } = renderHook(() => useCreate<Dummy>(useCreateArgs));

    act(() => {
      result.current.mutate(dummyOne);
      expect(dummyProviderCreate).toHaveBeenCalledWith({
        ...createArgs,
        payload: dummyOne,
      });
      expect(useMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        mutationKey: [resource, baseArgs],
        retry: 1,
      });
    });
  });
});
