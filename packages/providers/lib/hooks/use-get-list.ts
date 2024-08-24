import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { GetListsArgsType, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseGetListArgsType<
  T extends ResourceType[] = any,
  Meta = any,
  Params = any,
  Error = any,
> = GetListsArgsType<Meta, Params> & {
  useQueryOptions?: Partial<UseQueryOptions<T, Error>>;
};

export const useGetList = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  useQueryOptions,
  ...queryProps
}: UseGetListArgsType<T[], Meta, Params, Error>) => {
  const { getList } = useProvider<T>();

  const response = useQuery<T[], Error>({
    queryFn: () => getList<Meta, Params>(queryProps),
    queryKey: [queryProps.resource],
    ...useQueryOptions,
  });

  return response;
};
