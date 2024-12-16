import React, { ComponentType, forwardRef, useCallback } from 'react';
import { BaseButtonProps } from '../base-button-type';
import {
  UseResourceRedirectArgs,
  useResourceRedirect,
} from '../../resources/hooks';
import { AnyRefElement } from '../../utils/types-tools';

export type ResourceLinkButtonProps<
  RefElementType extends AnyRefElement,
  ComponentProps extends BaseButtonProps<RefElementType>,
> = ComponentProps & UseResourceRedirectArgs;

export const withResourceLinkButtonFeatures = <
  RefElementType extends AnyRefElement,
  ComponentProps extends BaseButtonProps<RefElementType>,
>(
  ResourceLinkButton: ComponentType<ComponentProps>
) => {
  return forwardRef<
    RefElementType,
    ResourceLinkButtonProps<RefElementType, ComponentProps>
  >((props, ref) => {
    const { id, view, resource, onClick, ...componentProps } = props;
    const redirect = useResourceRedirect();
    const redirectOnClick = useCallback(() => {
      redirect({
        id: id,
        view: view,
        resource: resource,
      } as UseResourceRedirectArgs);
    }, [resource, view, id]);

    return (
      <ResourceLinkButton
        ref={ref}
        onClick={onClick || redirectOnClick}
        {...(componentProps as unknown as ComponentProps)} //FIXME: fix type
      />
    );
  });
};
