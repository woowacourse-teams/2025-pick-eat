import LoadingSpinner from './LoadingSpinner';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
  title: 'LoadingSpinner',
};

export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  render: () => {
    return <LoadingSpinner />;
  },
};
