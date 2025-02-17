import { InputProps } from '@chakra-ui/react';
import { FieldProps } from '../chakra/snippets/field';

export type CommonInputProps = Partial<FieldProps> & {
  inputProps?: Partial<InputProps>;
  label: string;
  source: string;
};
