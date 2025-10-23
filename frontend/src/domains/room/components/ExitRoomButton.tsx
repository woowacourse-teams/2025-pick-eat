import ConfirmModal from '@components/modal/ConfirmModal';

import { roomQuery } from '@apis/room';

import { useBoolean } from '@hooks/useBoolean';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router';

function ExitRoomButton() {
  const [opened, , closeModal, toggleModal] = useBoolean(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const { mutate: exitRoom } = roomQuery.useExitRoom({
    onExit: () => {
      navigate(ROUTE_PATH.MY_PAGE, { replace: true });
    },
  });

  const handleExitButtonClick = () => {
    toggleModal();
  };

  const handleConfirmExit = () => {
    exitRoom(Number(roomId));
  };

  return (
    <>
      <S.ExitButton onClick={handleExitButtonClick}>방 나가기</S.ExitButton>
      <ConfirmModal
        opened={opened}
        mounted={opened}
        onCancel={closeModal}
        onConfirm={handleConfirmExit}
        message="방을 나가시겠습니까?"
      />
    </>
  );
}

export default ExitRoomButton;

const S = {
  Container: styled.button``,
  ExitButton: styled.button`
    width: 100%;

    padding: ${({ theme }) => theme.PADDING.px3};

    color: ${({ theme }) => theme.PALETTE.gray[0]};
    font: ${({ theme }) => theme.FONTS.body.small_bold};
  `,
};
