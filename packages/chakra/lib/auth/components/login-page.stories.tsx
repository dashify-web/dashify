import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage } from './login-page';
import {
  BrowserRouterProvider,
  ChakraProvider,
} from '../../utils/stories-provider';
import { AuthProviderContext } from '@dashify/auth';

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
  render: (props) => (
    <ChakraProvider>
      <BrowserRouterProvider>
        <AuthProviderContext
          provider={
            {
              signin: async () =>
                new Promise((resolve) => setTimeout(resolve, 2000)),
              signup: async () =>
                new Promise((resolve) => setTimeout(resolve, 2000)),
            } as any
          }
        >
          <LoginPage {...props} />
        </AuthProviderContext>
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
