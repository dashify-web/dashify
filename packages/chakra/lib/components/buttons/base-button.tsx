import React, { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export type ButtonProps = ChakraButtonProps;

export const Button: FC<ButtonProps> = ({ sx, ...chakraButtonProps }) => {
  return <ChakraButton variant="solid" {...chakraButtonProps} />;
};
