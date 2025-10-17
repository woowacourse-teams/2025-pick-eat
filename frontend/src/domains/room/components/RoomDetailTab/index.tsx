import LoadingSpinner from '@components/assets/LoadingSpinner';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { room } from '@apis/room';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import IncludeMemberList from './IncludeMemberList';
import ProgressPickeat from './ProgressPickeat';

function RoomDetailTab() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const getIncludeMembers = () =>
    useMemo(() => room.getIncludeMembers(roomId), [roomId]);
  const getPickeats = () => useMemo(() => room.getPickeats(roomId), [roomId]);

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <IncludeMemberList members={getIncludeMembers()} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ProgressPickeat pickeats={getPickeats()} />
        </ErrorBoundary>
      </Suspense>
    </S.Container>
  );
}

export default RoomDetailTab;

const S = {
  Container: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
