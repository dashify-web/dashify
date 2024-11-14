import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List } from './list';
import {
  BrowserRouterProvider,
  ChakraProvider,
} from '../../utils/stories-provider';

const meta: Meta<typeof List> = {
  component: List,
  render: (props) => (
    <ChakraProvider>
      <BrowserRouterProvider>
        <List {...props} />
      </BrowserRouterProvider>
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {};

export const Custom: Story = {
  args: {},
};
