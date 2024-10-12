import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './base-button';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Basic: Story = {};

export const Primary: Story = {
  args: {
    primary: true,
  },
};
