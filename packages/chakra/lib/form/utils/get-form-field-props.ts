import { FieldErrors } from 'react-hook-form';
import { FieldProps } from '../../chakra/snippets/field';

export const getFormFieldProps = <FieldValues extends object>({
  errors,
  source,
}: {
  errors: FieldErrors<FieldValues>;
  source: keyof FieldValues;
}): Pick<FieldProps, 'invalid' | 'errorText'> => {
  const errorMessage = errors[source]?.message as string;
  return {
    invalid: Boolean(errorMessage),
    errorText: errorMessage,
  };
};
