import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import { EditArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseEditArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<EditArgsType<T, Meta, Params>, 'payload'> &
  RequiredResourceName & {
    useMutationOptions?: Partial<UseMutationOptions<T, Error, T>>;
  };

export const useEdit = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  resource,
  useMutationOptions = {},
  ...mutationProps
}: UseEditArgsType<T, Meta, Params, Error>): UseMutationResult<T, Error, T> => {
  const { edit } = useProvider<T>({ resource });
  const { mutationKey = [], ...restMutationOptions } = useMutationOptions;

  const response = useMutation<T, Error, T>({
    mutationFn: (payload: T) =>
      edit<Meta, Params>({ payload, ...mutationProps }),
    mutationKey: [resource, ...mutationKey],
    ...restMutationOptions,
  });

  return response;
};
