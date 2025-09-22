import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { room } from '@apis/room';

import { generateRouterPath } from '@routes/routePath';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import IncludeMemberList from './IncludeMemberList';
import ProgressPickeat from './ProgressPickeat';
import RoomDetailName from './RoomDetailName';

function RoomDetailTab() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const getRoom = () => useMemo(() => room.get(roomId), [roomId]);
  const getIncludeMembers = () =>
    useMemo(() => room.getIncludeMembers(roomId), [roomId]);
  const getPickeats = () => useMemo(() => room.getPickeats(roomId), [roomId]);

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <RoomDetailName roomData={getRoom()} />
        <S.ButtonWrapper>
          <Button
            text="찜으로 픽잇!"
            leftIcon="🤍"
            onClick={() => navigate(generateRouterPath.pickeatWithWish(roomId))}
          />
          <Button
            text="위치로 픽잇!"
            leftIcon={<Location size="sm" color="white" />}
            onClick={() =>
              navigate(generateRouterPath.pickeatWithLocation(roomId))
            }
          />
        </S.ButtonWrapper>
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

    padding: ${({ theme }) => theme.PADDING.p7};
  `,

  Name: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
