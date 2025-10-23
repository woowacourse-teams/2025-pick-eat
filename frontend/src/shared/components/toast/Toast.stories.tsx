import Button from '@components/actions/Button';

import { useShowToast } from 'shared/provider/ToastProvider';

import Toast from './Toast';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Toast',
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => {
    const showToast = useShowToast();
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        <Button
          text="error"
          size="sm"
          onClick={() => showToast({ mode: 'ERROR', message: '실패했습니다.' })}
        />
        <Button
          text="success"
          color="secondary"
          size="sm"
          onClick={() =>
            showToast({ mode: 'SUCCESS', message: '성공했습니다.' })
          }
        />
      </div>
    );
  },
};
