import RoomInfo from '@domains/room/components/RoomInfo';

import { getRoom } from '@apis/room';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

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

    /* TODO: 변수화하기 */

    height: calc(100% - 72px);
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
