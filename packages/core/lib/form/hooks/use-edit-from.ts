import {
  GetByIdArgsType,
  ResourceType,
  useEdit,
  UseEditArgsType,
  useProvider,
} from '@dashify/provider';
import { useForm, UseFormProps } from 'react-hook-form';
import { useResourceName } from '../../resources';

export type UseEditFormArgs<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Partial<UseFormProps<T, any /*TODO*/>> &
  ResourceType & {
    resource?: string;
    transform?: (data: Partial<T>) => T;
    useEditArgs?: UseEditArgsType<T, Meta, Params, Error>;
    getByIdArgs?: Partial<GetByIdArgsType<T>>;
  };

export const useEditForm = <
  T extends ResourceType,
  Meta = any,
  Params = any,
  Error = any,
>({
  id,
  transform,
  defaultValues,
  resource,
  useEditArgs,
  ...useFormProps
}: UseEditFormArgs<T>) => {
  const resourceNameContext = useResourceName();
  const resourceNameValue = resource ?? resourceNameContext;
  const edit = useEdit<T, Meta, Params, Error>({
    resource: resourceNameValue,
    ...(useEditArgs ?? {}),
  });
  const { getById } = useProvider({ resource: resourceNameValue });
  const { handleSubmit: useFormHandleSubmit, ...resUseFormReturn } = useForm<T>(
    {
      defaultValues: async () => getById({ id }),
      ...(useFormProps ?? {}),
    }
  );

  const handleSubmit = useFormHandleSubmit(async (data) => {
    edit.mutate(transform ? transform(data) : data);
  });

  return { ...resUseFormReturn, useEditReturn: edit, handleSubmit };
};
