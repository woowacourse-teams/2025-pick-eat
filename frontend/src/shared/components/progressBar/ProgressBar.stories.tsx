import { useEffect, useState } from 'react';

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
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
      setPercentage(50);
    }, []);

    return (
      <div style={{ width: '100%' }}>
        <ProgressBar percentage={percentage} icon={<p>🧀</p>} />
      </div>
    );
  },
};
