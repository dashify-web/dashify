import React, { FC } from 'react';
import { Icon } from '@chakra-ui/react';
import { MdAdd as EditIcon } from 'react-icons/md';
import {
  EditButtonProps as CoreEditButtonProps,
  withEditButtonFeatures,
} from '@dashify/core';
import { BaseButton, BaseButtonProps } from './base-button';

export type EditButtonProps = CoreEditButtonProps<BaseButtonProps>;
const EditButtonIntance = withEditButtonFeatures<BaseButtonProps>(BaseButton);

export const EditButton: FC<EditButtonProps> = ({
  children = 'Edit',
  leftIcon = <Icon as={EditIcon} />,
  ...baseButtonProps
}) => {
  return <EditButtonIntance {...baseButtonProps}>{children}</EditButtonIntance>;
};
