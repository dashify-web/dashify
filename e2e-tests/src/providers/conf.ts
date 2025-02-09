import { FacadeProviderOptions, Pagination } from '@dashify/provider';
import { ADMIN_MOCKS } from '../mocks';

export const DEFAULT_PAGINATION: Pagination = {
  pageSize: 2,
  page: 1,
};

export const getPageListInfos: FacadeProviderOptions['getPageListInfos'] =
  async ({ sorts, params, meta, pagination, currentProvider }) => {
    const nexPagination: Pagination = {
      pageSize: pagination?.pageSize ?? 2,
      page: (pagination?.page ?? 1) + 1,
    };

    const nextPageResult = await currentProvider.getList!({
      meta,
      sorts,
      params,
      pagination: nexPagination,
    });

    return {
      total: ADMIN_MOCKS.length,
      nextPage: nexPagination.page,
      prevPage: (pagination?.page ?? 2) - 1,
      hasNextPage: nextPageResult.length > 0,
      hasPreviousPage: (pagination?.page ?? 1) > 1,
    };
  };
