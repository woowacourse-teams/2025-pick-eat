import ParticipantPickeat from '@domains/profile/components/ParticipantPickeat';
import RoomList from '@domains/profile/components/RoomList';

import Button from '@components/actions/Button';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { pickeat } from '@apis/pickeat';
import { rooms } from '@apis/rooms';
import { users } from '@apis/users';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router';

import Profile from './components/Profile';

function MyRoom() {
  const userData = useMemo(() => users.get(), []);
  const participatingPickeatData = useMemo(
    () => pickeat.getParticipating(),
    []
  );
  const roomsData = useMemo(() => rooms.get(), []);
  const navigate = useNavigate();
  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <S.Section>
            <Profile user={userData} />
          </S.Section>
        </ErrorBoundary>
        <ErrorBoundary>
          <S.Section>
            <S.Title>참여 중인 픽잇</S.Title>
            <ParticipantPickeat
              participatingPickeatData={participatingPickeatData}
            />
          </S.Section>
        </ErrorBoundary>
        <ErrorBoundary>
          <S.Section>
            <S.TitleWrapper>
              <S.TitleBox>
                <S.Title>참여 중인 방</S.Title>
                <S.Description>
                  팀원을 초대하고 픽잇을 시작해보세요!
                </S.Description>
              </S.TitleBox>
              <Button
                text="방 생성 + "
                size="sm"
                color="gray"
                onClick={() => navigate(ROUTE_PATH.CREATE_ROOM)}
              />
            </S.TitleWrapper>
            <RoomList roomsData={roomsData} />
          </S.Section>
        </ErrorBoundary>
      </Suspense>
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
};
