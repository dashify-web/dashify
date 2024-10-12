import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import {
  GetListsArgsType,
  RequiredResourceName,
  ResourceType,
} from '../../types';
import { useProvider } from '../use-provider';

export type UseGetListArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = GetListsArgsType<Meta, Params> &
  RequiredResourceName & {
    useQueryOptions?: Partial<UseQueryOptions<T[], Error>>;
  };

export const useGetList = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useQueryOptions = {},
  ...queryProps
}: UseGetListArgsType<T, Meta, Params, Error>): UseQueryResult<T[], Error> => {
  const { getList } = useProvider<T>({ resource });
  const { queryKey = [], ...restQueryOptions } = useQueryOptions;

  const response = useQuery<T[], Error>({
    queryFn: () => getList<Meta, Params>(queryProps),
    queryKey: [resource, ...queryKey],
    ...restQueryOptions,
  });

  return response;
};
