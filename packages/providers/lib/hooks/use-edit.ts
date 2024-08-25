import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { EditArgsType, RequiredResourceName, ResourceType } from '../types';
import { useProvider } from './use-provider';

export type UseEditArgsType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<EditArgsType<T, Meta, Params>, 'payload'> &
  RequiredResourceName & {
    useMutatioOptions?: Partial<UseMutationOptions<T, Error, T>>;
  };

export const useEdit = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  useMutatioOptions,
  ...mutationProps
}: UseEditArgsType<T, Meta, Params, Error>) => {
  const { edit } = useProvider<T>({ resource: mutationProps.resource });

  const response = useMutation<T, Error, T>({
    mutationFn: (payload: T) =>
      edit<Meta, Params>({ payload, ...mutationProps }),
    mutationKey: [mutationProps.resource],
    ...useMutatioOptions,
  });

  return response;
};
