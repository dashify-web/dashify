import React, { FC, ReactNode } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export type BaseButtonProps = ChakraButtonProps & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const BaseButton: FC<BaseButtonProps> = ({
  children,
  ...chakraButtonProps
}) => {
  return <ChakraButton {...chakraButtonProps}>{children}</ChakraButton>;
};
