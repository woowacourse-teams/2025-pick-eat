import Share from '@components/assets/icons/Share';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';
import SharePanel from '@components/share/SharePanel';

import ParticipantsAvatarGroup from '@domains/pickeat/participants/participantsAvatarGroup/ParticipantsAvatarGroup';

import { THEME } from '@styles/global';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

type Props = {
  children: React.ReactNode;
};

function TitleSection({ children }: Props) {
  const [searchParams] = useSearchParams();
  const pickeatCode = searchParams.get('code') ?? '';
  const pickeatLink = `${process.env.BASE_URL}pickeat-detail?code=${pickeatCode}`;
  const {
    mounted,
    opened,
    handleCloseModal,
    handleOpenModal,
    handleUnmountModal,
  } = useModal();

  return (
    <S.Container>
      {children}
      <S.ToolContainer>
        <S.ShareContainer onClick={handleOpenModal} aria-label="공유하기">
          <Share color={THEME.PALETTE.gray[70]} size="sm" />
          <Modal
            opened={opened}
            mounted={mounted}
            onClose={handleCloseModal}
            onUnmount={handleUnmountModal}
          >
            <SharePanel
              title="공유하기"
              url={pickeatLink}
              description="함께 픽잇하고 싶은 친구에게 공유해보세요!"
            />
          </Modal>
        </S.ShareContainer>
        <ParticipantsAvatarGroup />
      </S.ToolContainer>
    </S.Container>
  );
}

export default TitleSection;

const S = {
  Container: styled.div`
    width: 100%;

    display: flex;

    flex-direction: column;

    padding: ${({ theme }) => theme.PADDING.p5};
  `,
  ShareContainer: styled.button`
    height: 36px;
  `,
  ToolContainer: styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-end;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
