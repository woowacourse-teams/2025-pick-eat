import BottomSheet from './BottomSheet';
import { useModal } from './modal/useModal';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BottomSheet> = {
  component: BottomSheet,
  title: 'BottomSheet',
};

export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const { opened, handleCloseModal, handleOpenModal } = useModal();
    return (
      <>
        <button onClick={() => handleOpenModal()}>바텀 시트 열기</button>
        <BottomSheet opened={opened} onClose={handleCloseModal}>
          hi
        </BottomSheet>
      </>
    );
  },
};
