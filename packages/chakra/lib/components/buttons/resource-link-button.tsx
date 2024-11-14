import {
  ResourceLinkButtonProps as CoreResourceLinkButtonProps,
  withResourceLinkButtonFeatures,
} from '@dashify/core';
import { BaseButton, BaseButtonProps } from './base-button';

export type ResourceLinkButtonProps = CoreResourceLinkButtonProps<
  HTMLButtonElement,
  BaseButtonProps
>;
export const ResourceLinkButton = withResourceLinkButtonFeatures<
  HTMLButtonElement,
  BaseButtonProps
>(BaseButton);
