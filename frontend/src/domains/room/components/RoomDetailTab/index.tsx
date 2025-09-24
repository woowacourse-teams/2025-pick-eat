import Button from '@components/actions/Button';
import Location from '@components/assets/icons/Location';
import LoadingSpinner from '@components/assets/LoadingSpinner';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';
import { makePickeatName } from '@domains/pickeat/utils/makePickeatName';

import { pickeat } from '@apis/pickeat';
import { room } from '@apis/room';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

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
  const wishlistId = Number(searchParams.get('wishId')) ?? '';
  const showToast = useShowToast();

  const getRoom = () => useMemo(() => room.get(roomId), [roomId]);
  const getIncludeMembers = () =>
    useMemo(() => room.getIncludeMembers(roomId), [roomId]);
  const getPickeats = () => useMemo(() => room.getPickeats(roomId), [roomId]);

  const clickWishPickeat = async () => {
    try {
      const code = await pickeat.post(roomId, makePickeatName());
      await pickeat.postWish(wishlistId, code);
      if (code) navigate(generateRouterPath.pickeatDetail(code));
    } catch (e) {
      if (e instanceof Error) showToast({ mode: 'ERROR', message: e.message });
    }
  };

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <RoomDetailName roomData={getRoom()} />
        <S.ButtonWrapper>
          <Button text="찜으로 픽잇" leftIcon="🤍" onClick={clickWishPickeat} />
          <Button
            text="근처에서 픽잇"
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

  ButtonWrapper: styled.div`
    width: 100%;
    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};
  `,
};
