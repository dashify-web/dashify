import React, { FC, forwardRef } from 'react';
import { Icon } from '@chakra-ui/react';
import { MdEdit as EditIcon } from 'react-icons/md';
import {
  EditButtonProps as CoreEditButtonProps,
  withEditButtonFeatures,
} from '@dashify/core';
import { BaseButton, BaseButtonProps } from './base-button';

export type EditButtonProps = CoreEditButtonProps<
  HTMLButtonElement,
  BaseButtonProps
>;

const EditButtonIntance = withEditButtonFeatures<
  HTMLButtonElement,
  BaseButtonProps
>(BaseButton);

export const EditButton: FC<EditButtonProps> = forwardRef<
  HTMLButtonElement,
  EditButtonProps
>((props, ref) => {
  const {
    children = 'Edit',
    leftIcon = (
      <Icon>
        <EditIcon />
      </Icon>
    ),
    ...baseButtonProps
  } = props;

  return (
    <EditButtonIntance ref={ref} leftIcon={leftIcon} {...baseButtonProps}>
      {children}
    </EditButtonIntance>
  );
});
