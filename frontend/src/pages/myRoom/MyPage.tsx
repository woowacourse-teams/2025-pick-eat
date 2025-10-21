import ParticipantPickeat from '@domains/profile/components/ParticipantPickeat';
import RoomList from '@domains/profile/components/RoomList';

import NewButton from '@components/actions/NewButton';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import BottomSheet from '@components/BottomSheet';
import { useModal } from '@components/modal/useModal';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeatQuery } from '@apis/pickeat';

import styled from '@emotion/styled';
import { Suspense } from 'react';

import CreateRoom from './components/CreateRoom';
import Profile from './components/Profile';

function MyPage() {
  const { data: participatingPickeatData } = pickeatQuery.useGetParticipating();
  const { opened, handleOpenModal, handleCloseModal } = useModal();

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <S.ProfileSection>
          <ErrorBoundary>
            <Profile />
          </ErrorBoundary>
        </S.ProfileSection>

        <S.Section>
          <S.Title>참여 중인 픽잇</S.Title>
          <ErrorBoundary>
            <ParticipantPickeat
              participatingPickeatData={participatingPickeatData}
            />
          </ErrorBoundary>
        </S.Section>

        <S.Section>
          <S.TitleWrapper>
            <S.TitleBox>
              <S.Title>참여 중인 방</S.Title>
              <S.Description>
                팀원을 초대하고 픽잇을 시작해보세요!
              </S.Description>
            </S.TitleBox>
            <S.ButtonBox>
              <NewButton onClick={handleOpenModal}>방 만들기 +</NewButton>
            </S.ButtonBox>
          </S.TitleWrapper>
          <ErrorBoundary>
            <RoomList />
          </ErrorBoundary>
        </S.Section>
      </Suspense>
      {/* TODO: 바톰시트 언마운트 처리 */}
      <BottomSheet opened={opened} onClose={handleCloseModal}>
        <ErrorBoundary>
          <CreateRoom opened={opened} onCreate={handleCloseModal} />
        </ErrorBoundary>
      </BottomSheet>
    </S.Container>
  );
}

export default MyPage;

const S = {
  Container: styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.LAYOUT.headerHeight}
      ${({ theme }) => theme.PADDING.p7} ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,

  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  ProfileSection: styled.section`
    width: 100%;
    display: flex;
    justify-content: center;

    margin-top: 36px;
  `,

  TitleWrapper: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  TitleBox: styled.div``,

  Title: styled.h2`
    width: 100%;

    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
  Description: styled.h3`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  ButtonBox: styled.div`
    width: 110px;
  `,
};
