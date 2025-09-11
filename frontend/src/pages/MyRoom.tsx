import RoomList from '@domains/profile/components/RoomList';

import Button from '@components/actions/Button';
import LoadingSpinner from '@components/assets/LoadingSpinner';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { rooms } from '@apis/rooms';
import { users } from '@apis/users';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router';

function MyRoom() {
  const navigate = useNavigate();
  const userData = useMemo(() => users.get(), []);
  const roomsData = useMemo(() => rooms.get(), []);
  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <RoomList roomsData={roomsData} userData={userData} />
        </Suspense>
      </ErrorBoundary>
      <Button
        text="방 만들기"
        onClick={() => navigate(ROUTE_PATH.CREATE_ROOM)}
      />
    </S.Container>
  );
}

export default MyRoom;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: 0 ${({ theme }) => theme.PADDING.p7};
  `,
};
