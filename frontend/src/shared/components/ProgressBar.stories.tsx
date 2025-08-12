import ProgressBar from './ProgressBar';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'ProgressBar',
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: () => {
    return <ProgressBar value="50" />;
  },
};
