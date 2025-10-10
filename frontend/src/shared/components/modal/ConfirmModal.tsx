import styled from '@emotion/styled';
import { ReactNode } from 'react';

import Modal from './Modal';

type Props = {
  opened: boolean;
  mounted: boolean;
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({
  opened,
  mounted,
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      opened={opened}
      mounted={mounted}
      onClose={onCancel}
      size="sm"
      closeButton={false}
    >
      <S.Container>
        <S.Message>{message}</S.Message>
        <S.ButtonWrapper>
          <S.CancelButton onClick={onCancel}>닫기</S.CancelButton>
          <S.ConfirmButton onClick={onConfirm}>확인</S.ConfirmButton>
        </S.ButtonWrapper>
      </S.Container>
    </Modal>
  );
}

export default ConfirmModal;

const Button = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  font: ${({ theme }) => theme.FONTS.body.medium_bold};
  border-radius: ${({ theme }) => theme.RADIUS.small};
`;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level7};

    padding: ${({ theme }) => theme.PADDING.p6}
      ${({ theme }) => theme.PADDING.p6} 0;
  `,
  Message: styled.div`
    font: ${({ theme }) => theme.FONTS.body.large_bold};
    text-align: center;
  `,
  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
  ConfirmButton: styled(Button)`
    background-color: ${({ theme }) => theme.PALETTE.primary[50]};
  `,
  CancelButton: styled(Button)`
    background-color: ${({ theme }) => theme.PALETTE.gray[10]};
  `,
};
