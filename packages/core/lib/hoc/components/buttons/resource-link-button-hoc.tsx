import React, { useCallback } from 'react';
import { BaseButtonProps } from './base-button-type';
import { HocComponentType } from '../../types';
import { useResourceRedirect, UseResourceRedirectArgs } from '../../../hooks';

export type ResourceLinkButttonProps<OtherButtonProps> = OtherButtonProps &
  UseResourceRedirectArgs &
  BaseButtonProps;
export type HocResourceLinkButtonComponentType<OtherButtonProps> =
  HocComponentType<
    ResourceLinkButttonProps<OtherButtonProps>,
    UseResourceRedirectArgs
  >;

export const withResourceLinkButtonFeatures = <OtherButtonProps = {},>(
  ResourceLinkButtton: HocResourceLinkButtonComponentType<OtherButtonProps>
) => {
  const redirect = useResourceRedirect();

  return ({
    view,
    id,
    resource,
    onClick,
    ...buttonProps
  }: ResourceLinkButttonProps<OtherButtonProps>) => {
    const redirectOnClick = useCallback(() => {
      redirect({
        resource,
        id,
        view,
      } as UseResourceRedirectArgs);
    }, [resource, view, id]);

    return (
      <ResourceLinkButtton
        onClick={onClick || redirectOnClick}
        {...(buttonProps as ResourceLinkButttonProps<OtherButtonProps>)}
      />
    );
  };
};
