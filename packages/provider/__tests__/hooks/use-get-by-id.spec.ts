import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';

import { GetByIdArgsType, useGetById, UseGetByIdArgsType } from '../../lib';
import { Dummy, setupUseQueryMock, dummyOne, Meta, Params } from './utils';

const dummyProviderGetById = jest.fn().mockResolvedValue(dummyOne);

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  QueryClient: jest.fn(), // have to mock 'cause @dashify/providers use an instance of QueryClient globaly
}));
jest.mock('../../lib/hooks/use-provider', () => ({
  useProvider: jest.fn(),
}));

describe('useGetById', () => {
  beforeAll(() => {
    setupUseQueryMock({
      toMock: 'getById',
      response: dummyOne,
      mockImplementation: dummyProviderGetById,
    });
  });

  it('should return the correct getByIdResponse', async () => {
    const resource = 'dummy';
    const resourceId = 'dummyId';

    const getByIdArgs: GetByIdArgsType<Meta, Params> = {
      id: resourceId,
      meta: {
        username: 'dummyName',
      },
      params: {
        minAge: 1,
      },
    };

    const useGetByIdArgs: UseGetByIdArgsType<Dummy, Meta, Params> = {
      ...getByIdArgs,
      resource,
      useQueryOptions: {
        retry: 1,
      },
    };

    const { result } = renderHook(() => useGetById<Dummy>(useGetByIdArgs));

    expect(result.current.data).toEqual(dummyOne);
    expect(dummyProviderGetById).toHaveBeenCalledWith(getByIdArgs);
    expect(useQuery).toHaveBeenCalledWith({
      queryFn: expect.any(Function),
      queryKey: [resource, getByIdArgs],
      retry: 1,
    });
  });
});
