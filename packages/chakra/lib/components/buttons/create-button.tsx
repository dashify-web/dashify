import React, { FC } from 'react';
import { Icon } from '@chakra-ui/react';
import { MdAdd as CreateIcon } from 'react-icons/md';
import {
  CreateButtonProps as CoreCreateButtonProps,
  withCreateButtonFeatures,
} from '@dashify/core';
import { BaseButton, BaseButtonProps } from './base-button';

export type CreateButtonProps = CoreCreateButtonProps<BaseButtonProps>;
const CreateButtonIntance =
  withCreateButtonFeatures<BaseButtonProps>(BaseButton);

export const CreateButton: FC<CreateButtonProps> = ({
  children = 'Create',
  leftIcon = <Icon as={CreateIcon} />,
  ...baseButtonProps
}) => {
  return (
    <CreateButtonIntance leftIcon={leftIcon} {...baseButtonProps}>
      {children}
    </CreateButtonIntance>
  );
};
