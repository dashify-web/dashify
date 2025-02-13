import React, { ComponentType, forwardRef } from 'react';
import { BaseButtonProps } from '../base-button-type';
import {
  ResourceLinkButtonProps,
  withResourceLinkButtonFeatures,
} from './resource-link-button-hoc';
import { AnyRefElement } from '../../utils/types-tools';

export type EditButtonProps<
  RefElementType extends AnyRefElement,
  ComponentProps extends BaseButtonProps<RefElementType>,
> = Omit<
  ResourceLinkButtonProps<RefElementType, ComponentProps>,
  'view' | 'id'
> & { id: string };

export const withEditButtonFeatures = <
  RefElementType extends AnyRefElement,
  ComponentProps extends BaseButtonProps<RefElementType>,
>(
  EditButton: ComponentType<ComponentProps>
) => {
  const ResourceLinkButton = withResourceLinkButtonFeatures<
    RefElementType,
    ComponentProps
  >(EditButton);

  return forwardRef<
    RefElementType,
    EditButtonProps<RefElementType, ComponentProps>
  >((props, ref) => {
    const { id, ...resourceLinkProps } = props as EditButtonProps<
      RefElementType,
      ComponentProps
    >;
    return (
      <ResourceLinkButton
        ref={ref}
        view="edit"
        id={id!}
        {...resourceLinkProps}
      />
    );
  });
};
