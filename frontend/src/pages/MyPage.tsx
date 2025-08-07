import Profile from '@domains/profile/components/Profile';
import RoomList from '@domains/profile/components/RoomList';

import Button from '@components/actions/Button';
import { HEADER_HEIGHT } from '@components/layouts/Header';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { rooms } from '@apis/rooms';
import { users } from '@apis/users';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useNavigate } from 'react-router';

function MyPage() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense fallback={<div>로딩중...</div>}>
          <Profile user={users.get()} />
          <RoomList roomsData={rooms.get()} />
        </Suspense>
      </ErrorBoundary>
      <Button
        text="방 만들기"
        onClick={() => navigate(ROUTE_PATH.CREATE_ROOM)}
      />
    </S.Container>
  );
}

export default MyPage;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    gap: ${({ theme }) => theme.GAP.level7};

    padding: 0 ${({ theme }) => theme.PADDING.p7};
  `,
};
