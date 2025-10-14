import NewButton from '@components/actions/NewButton';

import ConfirmModal from './ConfirmModal';
import { useModal } from './useModal';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  title: 'Modal',
  tags: ['!autodocs'],
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const ConfirmModalDefault: Story = {
  render: () => {
    const { opened, mounted, handleCloseModal, handleOpenModal } = useModal();

    const handleConfirm = () => {
      alert('확인!');
      handleCloseModal();
    };

    return (
      <>
        <NewButton onClick={handleOpenModal}>모달 열기</NewButton>

        <ConfirmModal
          opened={opened}
          mounted={mounted}
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={handleCloseModal}
        />
      </>
    );
  },
};
