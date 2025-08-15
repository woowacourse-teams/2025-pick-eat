import Button from '@components/actions/Button';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useGA } from '@hooks/useGA';

import PickeatEndConfirm from './PickeatEndConfirm';

function PickeatEndButton() {
  const {
    opened,
    mounted,
    handleOpenModal,
    handleCloseModal,
    handleUnmountModal,
  } = useModal();

  const openEndModal = () => {
    handleOpenModal();
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '투표 종료 모달 버튼',
      value: 1,
    });
  };

  return (
    <>
      <Button text="투표 종료" size="md" onClick={openEndModal} />
      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <PickeatEndConfirm
          onCancel={handleUnmountModal}
          onConfirm={handleUnmountModal}
        />
      </Modal>
    </>
  );
}

export default PickeatEndButton;
