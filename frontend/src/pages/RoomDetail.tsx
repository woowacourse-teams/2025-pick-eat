import PublicWishGroupTab from '@domains/room/components/PublicWishGroupTab';
import RoomDetailTab from '@domains/room/components/RoomDetailTab';
import WishlistGroupTab from '@domains/room/components/WishlistGroupTab';

import { HEADER_HEIGHT } from '@components/layouts/Header';
import TabMenu from '@components/tabMenus/TabMenu';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';

function RoomDetail() {
  const getWishGroup = useMemo(() => wishlist.getWishGroup(), []);
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
                    <RoomDetailTab />
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
          {
            tab: '픽잇 위시',
            content: (
              <S.TabWrapper>
                <ErrorBoundary>
                  <Suspense fallback={<div>로딩중</div>}>
                    <PublicWishGroupTab wishGroup={getWishGroup} />
                  </Suspense>
                </ErrorBoundary>
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
