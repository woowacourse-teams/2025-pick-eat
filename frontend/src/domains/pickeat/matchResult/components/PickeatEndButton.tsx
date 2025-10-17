import ProgressButton from '@components/actions/ProgressButton';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useParticipants } from '@domains/pickeat/provider/ParticipantsProvider';

import { useGA } from '@hooks/useGA';

import PickeatEndConfirm from './PickeatEndConfirm';

function PickeatEndButton() {
  const { completedCount, totalParticipants } = useParticipants();
  const remainingCount = totalParticipants - completedCount;

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
      <ProgressButton
        total={totalParticipants}
        current={completedCount}
        onClick={openEndModal}
      >
        {remainingCount === 0
          ? `투표 종료하기`
          : `투표 종료까지 ${remainingCount}명`}
      </ProgressButton>
      <Modal
        opened={opened}
        mounted={mounted}
        onUnmount={handleUnmountModal}
        onClose={handleCloseModal}
      >
        <PickeatEndConfirm
          onCancel={handleUnmountModal}
          onConfirm={handleUnmountModal}
          remainingCount={remainingCount}
        />
      </Modal>
    </>
  );
}

export default PickeatEndButton;
