import { useCallback } from 'react';
import { useListContext } from './use-list-context';
import { Pagination } from '../../types';

export const usePagination = () => {
  const { pagination, controller } = useListContext();

  const setPagination = useCallback(
    (pagination: Pagination) => {
      controller((prev) => ({
        ...prev,
        pagination: {
          page: pagination.page ?? prev.pagination?.page,
          pageSize: pagination.pageSize ?? prev.pagination?.pageSize,
        },
      }));
    },
    [controller, pagination?.pageSize, pagination?.page]
  );

  const setPage = useCallback(
    (page: number) => {
      setPagination({ page });
    },
    [setPagination, controller]
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      setPagination({ pageSize });
    },
    [setPagination, controller]
  );

  const doNextPage = useCallback(() => {
    controller((prev) => ({
      ...prev,
      pagination: {
        pageSize: pagination?.pageSize,
        page: (prev.pagination?.page ?? 0) + 1,
      },
    }));
  }, [controller, pagination?.page, pagination?.pageSize]);

  const doPrevPage = useCallback(() => {
    controller((prev) => ({
      ...prev,
      pagination: {
        pageSize: pagination?.pageSize,
        page: (prev.pagination?.page ?? 2) - 1,
      },
    }));
  }, [controller, pagination?.page, pagination?.pageSize]);

  return {
    pagination,
    doNextPage,
    doPrevPage,
    setPagination,
    setPage,
    setPageSize,
  };
};
