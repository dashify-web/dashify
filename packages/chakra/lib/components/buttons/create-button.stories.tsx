import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MdExtension } from 'react-icons/md';
import { ChakraProvider, Icon } from '@chakra-ui/react';
import { CreateButton } from './create-button';
import { BrowserRouterProvider } from '../../utils/stories-provider';

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
    leftIcon: <Icon as={MdExtension} />,
    children: 'New',
    variant: 'outline',
  },
};
