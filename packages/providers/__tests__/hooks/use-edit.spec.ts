import { renderHook, act } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';

import { EditArgsType, useEdit } from '../../lib';
import { Dummy, setupUseMutationMock, dummyOne } from './utils';

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

    const mutationOptions: EditArgsType<
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
      useEdit<Dummy>({
        ...mutationOptions,
        resource,
        useMutatioOptions: {
          retry: 1,
        },
      })
    );

    act(() => {
      result.current.mutate(dummyOne);
      expect(dummyProviderEdit).toHaveBeenCalledWith(mutationOptions);
      expect(useMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        mutationKey: [resource],
        retry: 1,
      });
    });
  });
});
