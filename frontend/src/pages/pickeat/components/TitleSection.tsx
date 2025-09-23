import Share from '@components/assets/icons/Share';
import Modal from '@components/modal/Modal';
import { useModal } from '@components/modal/useModal';
import SharePanel from '@components/share/SharePanel';

import ParticipantsAvatarGroup from '@domains/pickeat/participants/participantsAvatarGroup/ParticipantsAvatarGroup';

import { THEME } from '@styles/global';
import { setMobileStyle } from '@styles/mediaQuery';

import { css } from '@emotion/react';
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
        <S.ToolWrapper>
          <S.ShareContainer onClick={handleOpenModal}>
            <Share color={THEME.PALETTE.gray[70]} size="sm" />
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
          </S.ShareContainer>
          <ParticipantsAvatarGroup />
        </S.ToolWrapper>
      </S.ToolContainer>
    </S.Container>
  );
}

export default TitleSection;

const S = {
  Container: styled.div`
    width: 100%;
    height: 200px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 ${({ theme }) => theme.PADDING.px7};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};

    ${setMobileStyle(css`
      height: 158px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 14px;
    `)}
  `,
  DeleteButton: styled.div`
    width: 20px;
    height: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  IconContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  `,
  IconWrapper: styled.div`
    width: 24px;
    height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p1};

    background-color: ${({ theme }) => theme.PALETTE.primary[50]};

    border-radius: 1000px;
  `,
  ShareContainer: styled.button`
    height: 36px;
  `,
  ToolContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    align-items: flex-end;
    justify-content: space-between;
    ${setMobileStyle(css`
      width: 100%;
      flex-direction: row;
    `)}
  `,
  ToolWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    gap: ${({ theme }) => theme.GAP.level4};
    ${setMobileStyle(css`
      flex-direction: row-reverse;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    `)}
  `,
};
