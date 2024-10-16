import React from 'react';
import {
  ResourceLinkButttonProps as CoreResourceLinkButttonProps,
  withResourceLinkButtonFeatures,
} from '@dashify/core';
import { BaseButton, BaseButtonProps } from './base-button';

export type ResourceLinkButtonProps =
  CoreResourceLinkButttonProps<BaseButtonProps>;
export const ResourceLinkButton =
  withResourceLinkButtonFeatures<BaseButtonProps>(BaseButton);
