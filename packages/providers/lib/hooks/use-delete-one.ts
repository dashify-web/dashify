import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { DeleteArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseDeleteArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<DeleteArgsType<T, Meta, Params>, 'payload'> &
  RequiredResourceName & {
    useMutatioOptions?: Partial<UseMutationOptions<T, Error, T>>;
  };

export const useDelete = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useMutatioOptions,
  ...mutationProps
}: UseDeleteArgsType<T, Meta, Params, Error>) => {
  const { deleteOne } = useProvider<T>({ resource });

  const response = useMutation<T, Error, T>({
    mutationFn: (payload) =>
      deleteOne<Meta, Params>({ payload, ...mutationProps }),
    mutationKey: [resource],
    ...useMutatioOptions,
  });

  return response;
};
