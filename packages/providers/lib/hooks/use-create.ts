import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { CreateArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseCreateArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<CreateArgsType<T, Meta, Params>, 'payload'> &
  RequiredResourceName & {
    useMutatioOptions?: Partial<UseMutationOptions<T, Error, T>>;
  };

export const useCreate = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  useMutatioOptions,
  ...mutationProps
}: UseCreateArgsType<T, Meta, Params, Error>) => {
  const { create } = useProvider<T>({ resource: mutationProps.resource });

  const response = useMutation<T, Error, T>({
    mutationFn: (payload: T) =>
      create<Meta, Params>({ payload, ...mutationProps }),
    mutationKey: [mutationProps.resource],
    ...useMutatioOptions,
  });

  return response;
};
