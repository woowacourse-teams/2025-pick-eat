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
    const [smOpened, setSmOpened] = useState(false);
    const [lgOpened, setLgOpened] = useState(false);

    return (
      <>
        <Button text="sm" size="md" onClick={() => setSmOpened(true)} />
        <Button
          text="md"
          size="md"
          onClick={() => setOpened(true)}
          color="secondary"
        />
        <Button
          text="lg"
          size="md"
          onClick={() => setLgOpened(true)}
          color="gray"
        />
        <Modal
          opened={smOpened}
          onClose={() => {
            setSmOpened(false);
          }}
          size="sm"
        />
        <Modal
          opened={opened}
          onClose={() => {
            setOpened(false);
          }}
        />
        <Modal
          opened={lgOpened}
          onClose={() => {
            setLgOpened(false);
          }}
          size="lg"
        />
      </>
    );
  },
};
