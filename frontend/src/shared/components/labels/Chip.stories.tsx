import Chip from './Chip';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: 'Chip',
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'filled white',
  },
};

export const DefaultSm: Story = {
  args: {
    children: 'sm',
    size: 'sm',
  },
};

export const DefaultLg: Story = {
  args: {
    children: 'lg',
    size: 'lg',
  },
};

export const RemoveButton: Story = {
  args: {
    removeButton: true,
    onRemove: () => {},
    children: 'remove button',
  },
};

export const FilledPrimary: Story = {
  args: {
    color: 'primary',
    children: 'filled primary',
  },
};

export const OutlinedWhite: Story = {
  args: {
    variant: 'outlined',
    children: 'outlined white',
  },
};

export const OutlinedPrimary: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    children: 'outlined primary',
  },
};
