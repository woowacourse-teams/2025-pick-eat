import { useWishCarousel } from '@widgets/wishCarousel/hooks/useWishCarousel';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import Carousel from '@components/Carousel';

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
  const wishlistId = Number(searchParams.get('wishId')) ?? '';

  const wishCardContents = useMemo(() => {
    return [
      {
        id: wishlistId,
        name: '즐겨찾기에서',
        imageUrl: '/images/carousel/room_favorite_thumbnail.png',
        errorMessage: '식당 즐겨찾기에 식당이 존재하는지 확인해 주세요.',
      },
    ];
  }, []);

  const { getWishCardContent } = useWishCarousel();

  const pickeatContents = useMemo(
    () => getWishCardContent(wishCardContents),
    []
  );

  const getIncludeMembers = () =>
    useMemo(() => room.getIncludeMembers(roomId), [roomId]);
  const getPickeats = () => useMemo(() => room.getPickeats(roomId), [roomId]);

  return (
    <S.Container>
      <Suspense fallback={<LoadingSpinner />}>
        <Carousel contentArr={pickeatContents} />
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
