import Confetti from './Confetti';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Confetti> = {
  component: Confetti,
  title: 'Confetti',
};

export default meta;

type Story = StoryObj<typeof Confetti>;

export const Default: Story = {
  render: () => {
    return (
      <div
        style={{
          width: '300px',
          height: '300px',
          border: 'solid 1px lightgray',
          position: 'relative',
        }}
      >
        <Confetti />
      </div>
    );
  },
};
