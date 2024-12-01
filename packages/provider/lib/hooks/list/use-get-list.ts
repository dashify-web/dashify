import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  GetListsArgsType,
  PageInfos,
  RequiredResourceName,
  ResourceType,
} from '../../types';
import { useProvider } from '../use-provider';
import { useFacadeProvider } from '../use-facade-provider';

export type UseGetListArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = GetListsArgsType<Meta, Params> &
  RequiredResourceName & {
    useQueryOptions?: Partial<UseQueryOptions<T[], Error>>;
  };

export const PAGE_INFOS_KEYS = 'pageInfos';
export const useGetList = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useQueryOptions = {},
  ...queryProps
}: UseGetListArgsType<T, Meta, Params, Error>): UseQueryResult<T[], Error> & {
  pageInfosQueryResult: UseQueryResult<PageInfos, Error>;
} => {
  const provider = useProvider<T>({ resource });
  const { queryKey = [], ...restQueryOptions } = useQueryOptions;
  const { options } = useFacadeProvider();

  const pageInfosResponse = useQuery<PageInfos, Error>({
    queryFn: () =>
      options.getPageListInfos
        ? options.getPageListInfos({
            currentProvider: provider,
            resource,
            ...queryProps,
          })
        : Promise.resolve({}),
    queryKey: [resource, queryProps, ...queryKey, 'pageInfos'],
  });

  const dataResponse = useQuery<T[], Error>({
    queryFn: () => provider.getList<Meta, Params>(queryProps),
    queryKey: [resource, queryProps, ...queryKey],
    ...restQueryOptions,
  });

  return { ...dataResponse, pageInfosQueryResult: pageInfosResponse };
};
