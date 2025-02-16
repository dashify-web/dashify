import React, { FC } from 'react';
import { InputProps, Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Field, FieldProps } from '../../chakra/snippets/field';
import { getFormFieldProps } from '../utils/get-form-field-props';

export type TextInputProps = Partial<FieldProps> & {
  inputProps?: Partial<InputProps>;
  label: string;
  source: string;
};

export const TextInput: FC<TextInputProps> = ({
  label,
  source,
  inputProps = {},
  ...fieldProps
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <Field
      label={label}
      {...getFormFieldProps({ errors, source })}
      {...fieldProps}
    >
      <Input {...register(source)} {...inputProps} />
    </Field>
  );
};
