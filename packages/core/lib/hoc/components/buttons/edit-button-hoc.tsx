import React from 'react';
import { BaseButtonProps } from './base-button-type';
import {
  HocResourceLinkButtonComponentType,
  ResourceLinkButttonProps,
  withResourceLinkButtonFeatures,
} from './resource-link-button-hoc';

export type EditButtonProps<ComponentProps extends BaseButtonProps> = Omit<
  ResourceLinkButttonProps<ComponentProps>,
  'view'
>;

export type HocEditButtonComponentType<ComponentProps extends BaseButtonProps> =
  HocResourceLinkButtonComponentType<ComponentProps>;

export const withEditButtonFeatures = <ComponentProps extends BaseButtonProps>(
  EditButton: HocEditButtonComponentType<ComponentProps>
) => {
  const ResourceLinkButton =
    withResourceLinkButtonFeatures<ComponentProps>(EditButton);

  return ({ id, ...props }: EditButtonProps<ComponentProps>) => {
    return <ResourceLinkButton view="edit" id={id!} {...props} />;
  };
};
