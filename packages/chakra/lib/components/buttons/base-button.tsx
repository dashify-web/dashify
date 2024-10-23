import React, { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export type BaseButtonProps = ChakraButtonProps;

export const BaseButton: FC<BaseButtonProps> = (chakraButtonProps) => {
  return <ChakraButton {...chakraButtonProps} />;
};
