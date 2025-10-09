import Badge from './Badge';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const filledWhite: Story = {
  render: args => <Badge {...args} />,
  args: {
    variant: 'filled',
    children: 'filled white',
  },
};

export const filledPrimary: Story = {
  render: args => <Badge {...args} />,
  args: {
    variant: 'filled',
    color: 'primary',
    children: 'filled primary',
  },
};

export const outlinedWhite: Story = {
  render: args => <Badge {...args} />,
  args: {
    variant: 'outlined',
    children: 'outlined white',
  },
};

export const outlinedPrimary: Story = {
  render: args => <Badge {...args} />,
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'outlined primary',
  },
};
