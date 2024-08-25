import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';

import { GetListsArgsType, useGetList } from '../../lib';
import { Dummy, setupProviderMock } from './utils';

const DUMMIES: Dummy[] = [{ id: 'dummy', name: 'dummy' }];
const dummyProviderGetList = jest
  .fn()
  .mockResolvedValue(DUMMIES);

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
      toMock: "getList",
      response: DUMMIES,
      mockImplementation: dummyProviderGetList
    })
  });

  it('should return the correct getListResponse', async () => {
    const resource = 'dummy';

    const { result } = renderHook(() => useGetList<Dummy>({ resource }));

    expect(result.current.data).toEqual(DUMMIES);
    expect(dummyProviderGetList).toHaveBeenCalledWith({});
    expect(useQuery).toHaveBeenCalledWith({
      queryFn: expect.any(Function),
      queryKey: [resource],
    });
  });

  it('should return the correct getListResponse with queryOptions', async () => {
    const resource = 'dummy';
    const queryOptions: GetListsArgsType<
      { userName: string },
      { minAge: number }
    > = {
      meta: {
        userName: 'dummyName',
      },
      params: {
        minAge: 1,
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
      sorts: [
        {
          orderBy: 'age',
          order: 'DESC',
        },
      ],
    };

    const { result } = renderHook(() =>
      useGetList<Dummy>({
        ...queryOptions,
        resource,
        useQueryOptions: {
          retry: 1,
        },
      })
    );

    expect(result.current.data).toEqual(DUMMIES);
    expect(dummyProviderGetList).toHaveBeenCalledWith(queryOptions);
    expect(useQuery).toHaveBeenCalledWith({
      queryFn: expect.any(Function),
      queryKey: [resource],
      retry: 1,
    });
  });
});
