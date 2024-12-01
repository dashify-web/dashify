import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { DeleteArgsType, useDelete, UseDeleteArgsType } from '../../lib';
import { Dummy, setupUseMutationMock, dummyOne, Meta, Params } from './utils';

const dummyProviderDelete = jest.fn().mockResolvedValue(dummyOne);

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  QueryClient: jest.fn(), // have to mock 'cause @dashify/providers use an instance of QueryClient globaly
}));
jest.mock('../../lib/hooks/use-provider', () => ({
  useProvider: jest.fn(),
}));

describe('useDelete', () => {
  beforeAll(() => {
    setupUseMutationMock({
      toMock: 'deleteOne',
      response: dummyOne,
      mockImplementation: dummyProviderDelete,
    });
  });

  it('should return the correct deleteOneResponse', async () => {
    const resource = 'dummy';
    const baseArgs: Omit<DeleteArgsType<Dummy, Meta, Params>, 'payload'> = {
      meta: {
        username: 'dummyName',
      },
      params: {
        minAge: 1,
      },
    };
    const deleteArgs: DeleteArgsType<Dummy, Meta, Params> = {
      payload: dummyOne,
      ...baseArgs,
    };

    const useDeleteArgs: UseDeleteArgsType<Dummy, Meta, Params> = {
      resource,
      useMutationOptions: {
        retry: 1,
      },
      ...baseArgs,
    };

    const { result } = renderHook(() => useDelete<Dummy>(useDeleteArgs));

    act(() => {
      result.current.mutate(dummyOne);
      expect(dummyProviderDelete).toHaveBeenCalledWith(deleteArgs);
      expect(useMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        mutationKey: [resource, baseArgs],
        retry: 1,
      });
    });
  });
});
