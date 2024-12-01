import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { EditArgsType, useEdit, UseEditArgsType } from '../../lib';
import { Dummy, setupUseMutationMock, dummyOne, Meta, Params } from './utils';

const dummyProviderEdit = jest.fn().mockResolvedValue(dummyOne);

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  QueryClient: jest.fn(), // have to mock 'cause @dashify/providers use an instance of QueryClient globaly
}));
jest.mock('../../lib/hooks/use-provider', () => ({
  useProvider: jest.fn(),
}));

describe('useEdit', () => {
  beforeAll(() => {
    setupUseMutationMock({
      toMock: 'edit',
      response: dummyOne,
      mockImplementation: dummyProviderEdit,
    });
  });

  it('should return the correct editResponse', async () => {
    const resource = 'dummy';
    const baseArgs: Omit<EditArgsType<Dummy, Meta, Params>, 'payload'> = {
      meta: {
        username: 'dummyName',
      },
      params: {
        minAge: 1,
      },
    };
    const editArgs: EditArgsType<Dummy, Meta, Params> = {
      payload: dummyOne,
      ...baseArgs,
    };

    const useEditArgs: UseEditArgsType<Dummy, Meta, Params> = {
      resource,
      useMutationOptions: {
        retry: 1,
      },
      ...baseArgs,
    };

    const { result } = renderHook(() => useEdit<Dummy>(useEditArgs));

    act(() => {
      result.current.mutate(dummyOne);
      expect(dummyProviderEdit).toHaveBeenCalledWith(editArgs);
      expect(useMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        mutationKey: [resource, baseArgs],
        retry: 1,
      });
    });
  });
});
