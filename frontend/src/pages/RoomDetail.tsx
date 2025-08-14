import RoomDetailTab from '@domains/room/components/RoomDetailTab';
import WishlistGroupTab from '@domains/wishlist/components/WishlistGroupTab';

import { HEADER_HEIGHT } from '@components/layouts/Header';
import TabMenu from '@components/tabMenus/TabMenu';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { room } from '@apis/room';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

function RoomDetail() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  return (
    <S.Container>
      <TabMenu
        tabData={[
          {
            tab: '방 상세',
            content: (
              <S.TabWrapper>
                <ErrorBoundary>
                  <Suspense fallback={<div>로딩중</div>}>
                    <RoomDetailTab roomName={room.get(roomId)} />
                  </Suspense>
                </ErrorBoundary>
              </S.TabWrapper>
            ),
          },
          {
            tab: '위시리스트',
            content: (
              <S.TabWrapper>
                <WishlistGroupTab />
              </S.TabWrapper>
            ),
          },
        ]}
      />
    </S.Container>
  );
}

export default RoomDetail;

const S = {
  Container: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT});
  `,

  TabWrapper: styled.div`
    height: calc(100vh - ${HEADER_HEIGHT} - 56px);
    padding: ${({ theme }) => theme.PADDING.p6};
  `,
};
