import React, { ComponentType, forwardRef } from 'react';
import { BaseButtonProps } from '../base-button-type';
import {
  ResourceLinkButtonProps,
  withResourceLinkButtonFeatures,
} from './resource-link-button-hoc';
import { AnyRefElement } from '../../../utils/types-tools';

export type CreateButtonProps<
  RefElementType extends AnyRefElement,
  ComponentProps extends BaseButtonProps<RefElementType>,
> = Omit<
  ResourceLinkButtonProps<RefElementType, ComponentProps>,
  'id' | 'view'
>;

export const withCreateButtonFeatures = <
  RefElementType extends AnyRefElement,
  ComponentProps extends BaseButtonProps<RefElementType>,
>(
  CreateButton: ComponentType<ComponentProps>
) => {
  const ResourceLinkButton = withResourceLinkButtonFeatures<
    RefElementType,
    ComponentProps
  >(CreateButton);

  return forwardRef<
    RefElementType,
    CreateButtonProps<RefElementType, ComponentProps>
  >((props, ref) => {
    return (
      <ResourceLinkButton
        ref={ref}
        view="create"
        {...(props as ComponentProps)}
      />
    );
  });
};
