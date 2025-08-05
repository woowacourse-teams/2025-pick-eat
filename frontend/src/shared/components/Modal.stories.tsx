import { useState } from 'react';

import Button from './actions/Button';
import Modal from './Modal';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Modal',
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);

    return (
      <>
        <Button text="모달 열기" size="md" onClick={() => setOpened(true)} />
        <Modal opened={opened} onClose={() => setOpened(false)} />
      </>
    );
  },
};
