import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export type ButtonProps = ChakraButtonProps;

export const Button = () => {
  return <ChakraButton>Hello</ChakraButton>;
};
