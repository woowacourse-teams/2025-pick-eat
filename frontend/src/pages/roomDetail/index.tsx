import MoreMenuButton from '@domains/room/components/MoreMenuButton';
import WishlistTab from '@domains/room/components/WishlistTab/WishlistTab';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import TabMenu from '@components/tabMenus/TabMenu';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { roomQuery } from '@apis/room';

import styled from '@emotion/styled';
import { Suspense } from 'react';
import { useSearchParams } from 'react-router';

import DetailTab from './detailTab';

const TAB_MENU = 64 + 72;
function RoomDetail() {
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';
  const { data } = roomQuery.useGet(roomId);

  return (
    <S.Container>
      <S.RoomName>{data?.name || '방 이름 없음'}</S.RoomName>
      <TabMenu
        overflowHidden={false}
        TabBarContainer={({ children }) => (
          <S.TabBarContainer>
            <S.TabBarWrapper>
              {children}
              <S.MoreButton>
                <MoreMenuButton />
              </S.MoreButton>
            </S.TabBarWrapper>
          </S.TabBarContainer>
        )}
        tabData={[
          {
            tab: '방 상세',
            content: (
              <S.TabWrapper>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <DetailTab />
                  </Suspense>
                </ErrorBoundary>
              </S.TabWrapper>
            ),
          },
          {
            tab: '식당 즐겨찾기',
            content: (
              <S.TabWrapper>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner />}>
                    <WishlistTab />
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
    padding-top: ${({ theme }) => theme.LAYOUT.headerHeight};
  `,
  MoreButton: styled.div`
    position: absolute;
    top: 16px;
    right: -36px;
  `,
  RoomName: styled.div`
    margin: 8px 0;

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.heading.medium};
    text-align: center;
  `,
  TabWrapper: styled.div`
    height: calc(
      100vh - ${({ theme }) => theme.LAYOUT.headerHeight} - ${TAB_MENU}px
    );

    padding: ${({ theme }) => theme.PADDING.p6};
  `,
  TabBarContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
  TabBarWrapper: styled.div`
    width: 270px;
    position: relative;

    padding-bottom: ${({ theme }) => theme.PADDING.p5};
  `,
};
