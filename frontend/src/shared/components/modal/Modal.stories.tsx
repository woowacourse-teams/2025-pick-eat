import Button from '@components/actions/Button';

import Modal from './Modal';
import { useModal } from './useModal';

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
    const smModal = useModal();
    const mdModal = useModal();
    const lgModal = useModal();

    return (
      <>
        <Button text="sm" size="md" onClick={smModal.handleOpenModal} />
        <Button text="md" size="md" onClick={mdModal.handleOpenModal} />
        <Button text="lg" size="md" onClick={lgModal.handleOpenModal} />

        <Modal
          mounted={smModal.mounted}
          opened={smModal.opened}
          onClose={smModal.handleCloseModal}
          onUnmount={smModal.handleUnmountModal}
          size="sm"
        />
        <Modal
          mounted={mdModal.mounted}
          opened={mdModal.opened}
          onClose={mdModal.handleCloseModal}
          onUnmount={mdModal.handleUnmountModal}
          size="md"
        />
        <Modal
          mounted={lgModal.mounted}
          opened={lgModal.opened}
          onClose={lgModal.handleCloseModal}
          onUnmount={lgModal.handleUnmountModal}
          size="lg"
        />
      </>
    );
  },
};
