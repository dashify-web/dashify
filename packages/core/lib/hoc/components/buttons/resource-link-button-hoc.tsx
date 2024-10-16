import React, { useCallback } from 'react';
import { BaseButtonProps } from './base-button-type';
import { HocComponentType } from '../../types';
import { UseResourceRedirectArgs, useResourceRedirect } from '../../../hooks';

export type ResourceLinkButttonProps<ComponentProps extends BaseButtonProps> =
  ComponentProps & UseResourceRedirectArgs;

export type HocResourceLinkButtonComponentType<
  ComponentProps extends BaseButtonProps,
> = HocComponentType<
  ResourceLinkButttonProps<ComponentProps>,
  UseResourceRedirectArgs
>;

export const withResourceLinkButtonFeatures = <
  ComponentProps extends BaseButtonProps,
>(
  ResourceLinkButtton: HocResourceLinkButtonComponentType<ComponentProps>
) => {
  const redirect = useResourceRedirect();

  return ({
    view,
    id,
    resource,
    onClick,
    ...componentProps
  }: ResourceLinkButttonProps<ComponentProps>) => {
    const redirectOnClick = useCallback(() => {
      redirect({
        id,
        view,
        resource,
      } as UseResourceRedirectArgs);
    }, [resource, view, id]);

    return (
      <ResourceLinkButtton
        onClick={onClick || redirectOnClick}
        {...(componentProps as ResourceLinkButttonProps<ComponentProps>)}
      />
    );
  };
};
