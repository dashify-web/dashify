import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';

import { GetListsArgsType, useGetList, UseGetListArgsType } from '../../lib';
import { Dummy, DUMMIES, setupUseQueryMock, Meta, Params } from './utils';

const dummyProviderGetList = jest.fn().mockResolvedValue(DUMMIES);

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  QueryClient: jest.fn(), // have to mock 'cause @dashify/providers use an instance of QueryClient globaly
}));
jest.mock('../../lib/hooks/use-provider', () => ({
  useProvider: jest.fn(),
}));

jest.mock('../../lib/hooks/use-facade-provider', () => ({
  useFacadeProvider: () => ({
    options: {},
  }),
}));

describe('useGetList', () => {
  beforeAll(() => {
    setupUseQueryMock({
      toMock: 'getList',
      response: DUMMIES,
      mockImplementation: dummyProviderGetList,
    });
  });

  it('should return the correct getListResponse', async () => {
    const resource = 'dummy';

    const { result } = renderHook(() => useGetList<Dummy>({ resource }));

    expect(result.current.data).toEqual(DUMMIES);
    expect(dummyProviderGetList).toHaveBeenCalledWith({});
    expect(useQuery).toHaveBeenCalledWith({
      queryFn: expect.any(Function),
      queryKey: [resource, {}],
    });
  });

  it('should return the correct getListResponse with queryOptions', async () => {
    const resource = 'dummy';
    const getListArgs: GetListsArgsType<Meta, Params> = {
      meta: {
        username: 'dummyName',
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

    const useGetListArgs: UseGetListArgsType<Dummy, Meta, Params> = {
      ...getListArgs,
      resource,
      useQueryOptions: {
        retry: 1,
      },
    };

    const { result } = renderHook(() => useGetList<Dummy>(useGetListArgs));

    expect(result.current.data).toEqual(DUMMIES);
    expect(dummyProviderGetList).toHaveBeenCalledWith(getListArgs);
    expect(useQuery).toHaveBeenCalledWith({
      queryFn: expect.any(Function),
      queryKey: [resource, getListArgs],
      retry: 1,
    });
  });
});
