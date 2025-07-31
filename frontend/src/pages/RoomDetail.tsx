import RoomInfo from '@domains/room/components/RoomInfo';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { getRoom } from '@apis/pickeat';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

function RoomDetail() {
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('code') ?? '';
  return (
    <S.Container>
      <ErrorBoundary>
        <Suspense>
          <RoomInfo roomData={getRoom(roomCode)} />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
}
export default RoomDetail;

const S = {
  Container: styled.div`
    width: 100%;
    height: calc(100% - 72px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
