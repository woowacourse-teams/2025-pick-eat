import RoomDetailTab from '@domains/room/components/RoomDetailTab';
import TemplatesTab from '@domains/room/components/TemplatesTab/TemplatesTab';
import WishlistTab from '@domains/room/components/WishlistTab/WishlistTab';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import { HEADER_HEIGHT } from '@components/layouts/Header';
import TabMenu from '@components/tabMenus/TabMenu';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { wishlist } from '@apis/wishlist';

import styled from '@emotion/styled';
import { Suspense, useMemo } from 'react';

function RoomDetail() {
  const getWishGroup = useMemo(() => wishlist.getWishTemplates(), []);
  return (
    <S.Container>
      <TabMenu
        overflowHidden={false}
        tabData={[
          {
            tab: '방 상세',
            content: (
              <S.TabWrapper>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <RoomDetailTab />
                  </Suspense>
                </ErrorBoundary>
              </S.TabWrapper>
            ),
          },
          {
            tab: '나의 찜',
            content: (
              <S.TabWrapper>
                <WishlistTab />
              </S.TabWrapper>
            ),
          },
          {
            tab: '픽잇 찜',
            content: (
              <S.TabWrapper>
                <ErrorBoundary>
                  <Suspense fallback={<div>로딩중</div>}>
                    <TemplatesTab wishGroup={getWishGroup} />
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
