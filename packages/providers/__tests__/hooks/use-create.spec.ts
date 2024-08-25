import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { CreateArgsType, useCreate } from '../../lib';
import { Dummy, setupUseMutationMock, dummyOne } from './utils';

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

    const mutationOptions: CreateArgsType<
      Dummy,
      { userName: string },
      { minAge: number }
    > = {
      payload: dummyOne,
      meta: {
        userName: 'dummyName',
      },
      params: {
        minAge: 1,
      },
    };

    const { result } = renderHook(() =>
      useCreate<Dummy>({
        ...mutationOptions,
        resource,
        useMutatioOptions: {
          retry: 1,
        },
      })
    );

    act(() => {
      result.current.mutate(dummyOne);
      expect(dummyProviderCreate).toHaveBeenCalledWith(mutationOptions);
      expect(useMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        mutationKey: [resource],
        retry: 1,
      });
    });
  });
});
