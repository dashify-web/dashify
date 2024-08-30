import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import { GetByIdArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseGetByIdArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = GetByIdArgsType<Meta, Params> &
  RequiredResourceName & {
    useQueryOptions?: Partial<UseQueryOptions<T, Error>>;
  };

export const useGetById = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useQueryOptions,
  ...queryProps
}: UseGetByIdArgsType<T, Meta, Params, Error>): UseQueryResult<T, Error> => {
  const { getById } = useProvider<T>({ resource });

  const response = useQuery<T, Error>({
    queryFn: () => getById<Meta, Params>(queryProps),
    queryKey: [resource],
    ...useQueryOptions,
  });

  return response;
};
