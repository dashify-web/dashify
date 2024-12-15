import React, { FC, forwardRef } from 'react';
import { Icon } from '@chakra-ui/react';
import { MdAdd as CreateIcon } from 'react-icons/md';
import {
  CreateButtonProps as CoreCreateButtonProps,
  withCreateButtonFeatures,
} from '@dashify/core';
import { BaseButton, BaseButtonProps } from './base-button';

export type CreateButtonProps = CoreCreateButtonProps<
  HTMLButtonElement,
  BaseButtonProps
>;

const CreateButtonInstance = withCreateButtonFeatures<
  HTMLButtonElement,
  CreateButtonProps
>(BaseButton);

export const CreateButton: FC<CreateButtonProps> = forwardRef<
  HTMLButtonElement,
  CreateButtonProps
>((props, ref) => {
  const {
    children = 'Create',
    leftIcon = (
      <Icon>
        <CreateIcon />
      </Icon>
    ),
    ...baseButtonProps
  } = props;

  return (
    <CreateButtonInstance ref={ref} leftIcon={leftIcon} {...baseButtonProps}>
      {children}
    </CreateButtonInstance>
  );
});
