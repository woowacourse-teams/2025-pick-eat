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
    return (
      <div style={{ width: '100%' }}>
        <ProgressBar total={3} current={1} />
      </div>
    );
  },
};
