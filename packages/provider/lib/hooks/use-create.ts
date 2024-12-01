import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import { CreateArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseCreateArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<CreateArgsType<T, Meta, Params>, 'payload'> &
  RequiredResourceName & {
    useMutationOptions?: Partial<UseMutationOptions<T, Error, T>>;
  };

export const useCreate = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useMutationOptions = {},
  ...mutationProps
}: UseCreateArgsType<T, Meta, Params, Error>): UseMutationResult<
  T,
  Error,
  T
> => {
  const { create } = useProvider<T>({ resource });
  const { mutationKey = [], ...restMutationOptions } = useMutationOptions;

  const response = useMutation<T, Error, T>({
    mutationFn: (payload: T) =>
      create<Meta, Params>({ payload, ...mutationProps }),
    mutationKey: [resource, mutationProps, ...mutationKey],
    ...restMutationOptions,
  });

  return response;
};
