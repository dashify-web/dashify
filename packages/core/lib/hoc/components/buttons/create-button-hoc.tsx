import React from 'react';
import { BaseButtonProps } from './base-button-type';
import {
  HocResourceLinkButtonComponentType,
  ResourceLinkButttonProps,
  withResourceLinkButtonFeatures,
} from './resource-link-button-hoc';

export type CreateButtonProps<ComponentProps extends BaseButtonProps> = Omit<
  ResourceLinkButttonProps<ComponentProps>,
  'id' | 'view'
>;

export type HocCreateButtonComponentType<
  ComponentProps extends BaseButtonProps,
> = HocResourceLinkButtonComponentType<ComponentProps>;

export const withCreateButtonFeatures = <
  ComponentProps extends BaseButtonProps,
>(
  CreateButton: HocCreateButtonComponentType<ComponentProps>
) => {
  const ResourceLinkButton =
    withResourceLinkButtonFeatures<ComponentProps>(CreateButton);

  return (props: CreateButtonProps<ComponentProps>) => {
    return <ResourceLinkButton view="create" {...props} />;
  };
};
