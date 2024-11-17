import React, { forwardRef, ReactNode, RefAttributes } from 'react';
import {
  ChakraSnippetButtonProps as ChakraButtonProps,
  ChakraSnippetButton as ChakraButton,
} from '../../chakra/snippets/button';

export type BaseButtonProps = ChakraButtonProps & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & RefAttributes<HTMLButtonElement>;

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (props, ref) => {
    const { children, leftIcon, rightIcon, ...chakraButtonProps } = props;
    return (
      <ChakraButton ref={ref} {...chakraButtonProps}>
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </ChakraButton>
    );
  }
);
