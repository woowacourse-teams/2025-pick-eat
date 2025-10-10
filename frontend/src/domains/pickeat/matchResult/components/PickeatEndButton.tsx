import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';

import { useParticipants } from '@domains/pickeat/provider/ParticipantsProvider';

import { useGA } from '@hooks/useGA';

import styled from '@emotion/styled';
import { ButtonHTMLAttributes } from 'react';

import PickeatEndConfirm from './PickeatEndConfirm';

type AnimatedResultButtonProps = {
  totalParticipants: number;
  completedCount: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

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
      <AnimatedResultButton
        totalParticipants={totalParticipants}
        completedCount={completedCount}
        onClick={openEndModal}
      >
        {remainingCount === 0
          ? `투표 종료하기`
          : `투표 종료까지 ${remainingCount}명`}
      </AnimatedResultButton>
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

//TODO: 지우기
function AnimatedResultButton({
  children,
  totalParticipants,
  completedCount,
  ...props
}: AnimatedResultButtonProps) {
  const progress = totalParticipants ? completedCount / totalParticipants : 0;

  return (
    <S.ButtonContainer {...props}>
      <S.ProgressBar progress={progress} />
      <S.ButtonWrapper>{children}</S.ButtonWrapper>
    </S.ButtonContainer>
  );
}

const S = {
  ButtonContainer: styled.button`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;

    background-color: #ddd;

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: 6px;
    cursor: pointer;
  `,
  ProgressBar: styled.div<{ progress: number }>`
    width: ${({ progress }) => progress * 100}%;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    background-color: ${({ theme }) => theme.PALETTE.secondary[50]};

    transition: width 0.3s ease;
    border-radius: 6px 0 0 6px;

    &::after {
      width: 50%;
      height: 100%;
      position: absolute;
      top: 0;
      left: -150%;

      background: linear-gradient(
        120deg,
        rgb(255 255 255 / 0%) 0%,
        rgb(255 255 255 / 30%) 50%,
        rgb(255 255 255 / 0%) 100%
      );

      animation: shimmer 2s infinite;
      border-radius: 6px 0 0 6px;
      content: '';
      pointer-events: none;
    }

    @keyframes shimmer {
      0% {
        left: -150%;
      }

      100% {
        left: 150%;
      }
    }
  `,
  ButtonWrapper: styled.div`
    position: relative;
    z-index: 1;

    font: ${({ theme }) => theme.FONTS.body.medium_bold};
  `,
};
