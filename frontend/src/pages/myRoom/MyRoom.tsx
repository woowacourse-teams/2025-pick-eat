import ParticipantPickeat from '@domains/profile/components/ParticipantPickeat';
import RoomList from '@domains/profile/components/RoomList';

import Button from '@components/actions/Button';
import Plus from '@components/assets/icons/Plus';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import BottomSheet from '@components/BottomSheet';
import { useModal } from '@components/modal/useModal';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeat } from '@apis/pickeat';
import { rooms } from '@apis/rooms';
import { users } from '@apis/users';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';

import CreateRoom from './components/CreateRoom';
import Profile from './components/Profile';

function MyRoom() {
  const userData = useMemo(() => users.get(), []);
  const participatingPickeatData = useMemo(
    () => pickeat.getParticipating(),
    []
  );
  const roomsData = useMemo(() => rooms.get(), []);
  const { opened, handleOpenModal, handleCloseModal } = useModal();

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <S.Section>
          <ErrorBoundary>
            <Profile user={userData} />
          </ErrorBoundary>
        </S.Section>
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
              <Button
                text="방 생성"
                rightIcon={<Plus size="xs" />}
                color="gray"
                onClick={handleOpenModal}
              />
            </S.ButtonBox>
          </S.TitleWrapper>
          <ErrorBoundary>
            <RoomList roomsData={roomsData} />
          </ErrorBoundary>
        </S.Section>
      </Suspense>
      <BottomSheet opened={opened} onClose={handleCloseModal}>
        <CreateRoom opened={opened} />
      </BottomSheet>
    </S.Container>
  );
}

export default MyRoom;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level8};

    padding: ${({ theme }) => theme.PADDING.p7};
  `,

  Section: styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
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

    font: ${({ theme }) => theme.FONTS.heading.medium};
  `,
  Description: styled.h3`
    color: ${({ theme }) => theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.small};
  `,
  ButtonBox: styled.div`
    width: 90px;
  `,
};
