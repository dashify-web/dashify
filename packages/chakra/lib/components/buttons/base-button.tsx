import React, { FC } from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

export type BaseButtonProps = ChakraButtonProps;

export const BaseButton: FC<BaseButtonProps> = ({
  sx,
  ...chakraButtonProps
}) => {
  return (
    <ChakraButton
      variant="solid"
      sx={{ ...sx /*TODO, add custom xs*/ }}
      {...chakraButtonProps}
    />
  );
};
