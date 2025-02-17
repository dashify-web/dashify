import React, { forwardRef, ReactNode, RefAttributes } from 'react';
import {
  ButtonProps as ChakraButtonProps,
  Button as ChakraButton,
} from '../../chakra/snippets/button';

export type ButtonProps = ChakraButtonProps & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & RefAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, leftIcon, rightIcon, ...chakraButtonProps } = props;
    return (
      <ChakraButton
        data-testid="dashify-base-button"
        ref={ref}
        {...chakraButtonProps}
      >
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </ChakraButton>
    );
  }
);
