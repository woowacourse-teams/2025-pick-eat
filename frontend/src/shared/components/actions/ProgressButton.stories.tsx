import { useState } from 'react';

import ProgressButton from './ProgressButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProgressButton> = {
  component: ProgressButton,
  title: 'ProgressButton',
};

export default meta;

type Story = StoryObj<typeof ProgressButton>;

export const Default: Story = {
  render: () => {
    const [completed, setCompleted] = useState(1);
    return (
      <div
        style={{
          height: '100px',
          padding: '1rem',
          background: '#f9f9f9',
        }}
      >
        <ProgressButton
          text="프로그레스 버튼 클릭해 보세용"
          total={5}
          current={completed}
          onClick={() => setCompleted(prev => (prev !== 5 ? prev + 1 : 0))}
        />
      </div>
    );
  },
};
