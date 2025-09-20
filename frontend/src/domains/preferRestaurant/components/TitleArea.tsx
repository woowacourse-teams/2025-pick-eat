import Share from '@components/assets/icons/Share';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';
import SharePanel from '@components/share/SharePanel';

import ParticipantsAvatarGroup from '@domains/participants/participantsAvatarGroup/ParticipantsAvatarGroup';

import styled from '@emotion/styled';
import { useSearchParams } from 'react-router';

function TitleArea() {
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
    <S.TitleArea>
      <S.TopWrapper>
        <S.Title>
          가고 싶은 식당에 <br /> ❤️를 눌러 투표해 주세요.
        </S.Title>
        <S.ToolContainer>
          <S.ShareContainer onClick={handleOpenModal}>
            <Share size="sm" />
          </S.ShareContainer>
          <ParticipantsAvatarGroup />
        </S.ToolContainer>
        <Modal
          opened={opened}
          mounted={mounted}
          onClose={handleCloseModal}
          onUnmount={handleUnmountModal}
        >
          <SharePanel
            url={pickeatLink}
            description="함께 픽잇하고 싶은 친구에게 공유해보세요!"
          />
        </Modal>
      </S.TopWrapper>
    </S.TitleArea>
  );
}

export default TitleArea;

const S = {
  TitleArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: ${({ theme }) => theme.PADDING.p7}
      ${({ theme }) => theme.PADDING.p6} 0;
  `,
  TopWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  Title: styled.p`
    color: ${({ theme }) => theme.PALETTE.secondary[60]};
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
  ShareContainer: styled.div`
    cursor: pointer;
  `,
  ToolContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    align-items: flex-end;
    justify-content: space-between;
  `,
};
