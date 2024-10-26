import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MdEditNote } from 'react-icons/md';
import { Icon } from '@chakra-ui/react';
import { EditButton } from './edit-button';
import {
  ChakraProvider,
  BrowserRouterProvider,
} from '../../utils/stories-provider';

const meta: Meta<typeof EditButton> = {
  component: EditButton,
  render: (props) => (
    <ChakraProvider>
      <BrowserRouterProvider>
        <EditButton {...props} />
      </BrowserRouterProvider>
    </ChakraProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof EditButton>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    leftIcon: <Icon as={MdEditNote} />,
    children: 'Modify',
    variant: 'outline',
  },
};
