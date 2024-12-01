import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import { DeleteArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseDeleteArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<DeleteArgsType<T, Meta, Params>, 'payload'> &
  RequiredResourceName & {
    useMutationOptions?: Partial<UseMutationOptions<T, Error, T>>;
  };

export const useDelete = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useMutationOptions = {},
  ...mutationProps
}: UseDeleteArgsType<T, Meta, Params, Error>): UseMutationResult<
  T,
  Error,
  T
> => {
  const { deleteOne } = useProvider<T>({ resource });
  const { mutationKey = [], ...restMutationOptions } = useMutationOptions;

  const response = useMutation<T, Error, T>({
    mutationFn: (payload) =>
      deleteOne<Meta, Params>({ payload, ...mutationProps }),
    mutationKey: [resource, mutationProps, ...mutationKey],
    ...restMutationOptions,
  });

  return response;
};
