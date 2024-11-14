import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '@chakra-ui/react';
import { MdExtension } from 'react-icons/md';
import { CreateButton } from './create-button';
import {
  BrowserRouterProvider,
  ChakraProvider,
} from '../../utils/stories-provider';

const meta: Meta<typeof CreateButton> = {
  component: CreateButton,
  render: (props) => (
    <ChakraProvider>
      <BrowserRouterProvider>
        <CreateButton {...props} />
      </BrowserRouterProvider>
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof CreateButton>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    leftIcon: (
      <Icon>
        <MdExtension />
      </Icon>
    ),
    children: 'New',
    variant: 'outline',
  },
};
