import {
  ResourceLinkButtonProps as CoreResourceLinkButtonProps,
  withResourceLinkButtonFeatures,
} from '@dashify/core';
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from './base-button';

export type ResourceLinkButtonProps = CoreResourceLinkButtonProps<
  HTMLButtonElement,
  BaseButtonProps
>;
export const ResourceLinkButton = withResourceLinkButtonFeatures<
  HTMLButtonElement,
  BaseButtonProps
>(BaseButton);
