import { ResourceType, useCreate, UseCreateArgsType } from '@dashify/provider';
import { useForm, UseFormProps } from 'react-hook-form';
import { useResourceName } from '../../resources';

export type UseCreateFormArgs<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Partial<UseFormProps<T, any /*TODO*/>> & {
  resource?: string;
  transform?: (data: Partial<T>) => T;
  useCreateArgs?: UseCreateArgsType<T, Meta, Params, Error>;
};

export const useCreateForm = <
  T extends ResourceType,
  Meta = any,
  Params = any,
  Error = any,
>({
  transform,
  resource,
  useCreateArgs,
  ...useFormProps
}: UseCreateFormArgs<T>) => {
  const { handleSubmit: useFormHandleSubmit, ...resUseFormReturn } =
    useForm<T>(useFormProps);
  const resourceNameContext = useResourceName();
  const create = useCreate<T, Meta, Params, Error>({
    resource: resource ?? resourceNameContext,
    ...(useCreateArgs ?? {}),
  });

  const handleSubmit = useFormHandleSubmit(async (data) => {
    create.mutate(transform ? transform(data) : data);
  });

  return { ...resUseFormReturn, useCreateReturn: create, handleSubmit };
};
