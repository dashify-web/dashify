import React, { FC } from 'react';
import { Input } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Field } from '../../chakra/snippets/field';
import { CommonInputProps } from '../types';
import { getFormFieldProps } from '../utils/get-form-field-props';

export type TextInputProps = CommonInputProps;

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
