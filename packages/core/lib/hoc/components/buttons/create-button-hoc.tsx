import React from 'react';
import {
  HocResourceLinkButtonComponentType,
  ResourceLinkButttonProps,
  withResourceLinkButtonFeatures,
} from './resource-link-button-hoc';

export type CreateButtonProps<OtherButtonProps> = Omit<
  ResourceLinkButttonProps<OtherButtonProps>,
  'id' | 'view'
>;
export type HocCreateButtonComponentType<OtherButtonProps> =
  HocResourceLinkButtonComponentType<OtherButtonProps>;

export const withCreateButtonFeatures = <OtherButtonProps,>(
  CreateButton: HocCreateButtonComponentType<OtherButtonProps>
) => {
  const ResourceLinkButton =
    withResourceLinkButtonFeatures<OtherButtonProps>(CreateButton);

  return (props: CreateButtonProps<OtherButtonProps>) => {
    return <ResourceLinkButton view="create" {...props} />;
  };
};
