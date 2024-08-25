import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { DeleteArgsType, useDelete } from '../../lib';
import { Dummy, setupUseMutationMock, dummyOne } from './utils';

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

    const mutationOptions: DeleteArgsType<
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
      useDelete<Dummy>({
        ...mutationOptions,
        resource,
        useMutatioOptions: {
          retry: 1,
        },
      })
    );

    act(() => {
      result.current.mutate(dummyOne);
      expect(dummyProviderDelete).toHaveBeenCalledWith(mutationOptions);
      expect(useMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        mutationKey: [resource],
        retry: 1,
      });
    });
  });
});
