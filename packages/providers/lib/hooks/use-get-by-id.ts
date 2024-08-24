import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { GetByIdArgsType, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseGetByIdArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = GetByIdArgsType<Meta, Params> & {
  useQueryOptions?: Partial<UseQueryOptions<T, Error>>;
};

export const useGetById = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  useQueryOptions,
  ...queryProps
}: UseGetByIdArgsType<T, Meta, Params, Error>) => {
  const { getById } = useProvider<T>();

  const response = useQuery<T, Error>({
    queryFn: () => getById<Meta, Params>(queryProps),
    queryKey: [queryProps.resource],
    ...useQueryOptions,
  });

  return response;
};
