import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from './login-page';
import {
  BrowserRouterProvider,
  ChakraProvider,
} from '../../../utils/stories-provider';

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
  render: (props) => (
    <ChakraProvider>
      <BrowserRouterProvider>
        <LoginPage {...props} />
      </BrowserRouterProvider>
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};

export const WithoutSignup: Story = {
  args: {
    signup: false,
  },
};
