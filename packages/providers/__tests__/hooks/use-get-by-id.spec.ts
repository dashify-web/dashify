import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';

import { GetByIdArgsType, useGetById } from '../../lib';
import { Dummy, setupProviderMock, dummyOne } from './utils';

const dummyProviderGetById = jest
  .fn()
  .mockResolvedValue(dummyOne);

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  QueryClient: jest.fn() // have to mock 'cause @dashify/providers use an instance of QueryClient globaly
}));
jest.mock('../../lib/hooks/use-provider', () => ({
  useProvider: jest.fn()
}));

describe('useGetList', () => {
  beforeAll(() => {
    setupProviderMock({
      toMock: "getById",
      response: dummyOne,
      mockImplementation: dummyProviderGetById
    })
  });

  it('should return the correct getByIdResponse', async () => {
    const resource = 'dummy';
    const resourceId = 'dummyId';

    const queryOptions: GetByIdArgsType<{ userName: string }, { minAge: number }> = {
      id: resourceId,
      meta: {
        userName: 'dummyName',
      },
      params: {
        minAge: 1,
      },
    };

    const { result } = renderHook(() =>
      useGetById<Dummy>({
        ...queryOptions,
        resource,
        useQueryOptions: {
          retry: 1,
        },
      })
    );

    expect(result.current.data).toEqual(dummyOne);
    expect(dummyProviderGetById).toHaveBeenCalledWith(queryOptions);
    expect(useQuery).toHaveBeenCalledWith({
      queryFn: expect.any(Function),
      queryKey: [resource],
      retry: 1,
    });
  });
});
