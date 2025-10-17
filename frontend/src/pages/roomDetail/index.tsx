import WishlistTab from '@domains/room/components/WishlistTab/WishlistTab';

import LoadingSpinner from '@components/assets/LoadingSpinner';
import TabMenu from '@components/tabMenus/TabMenu';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { room } from '@apis/room';

import { useShowToast } from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import DetailTab from './detailTab';

const TAB_MENU = 64 + 72;
function RoomDetail() {
  const [roomName, setRoomName] = useState('방 이름 없음');
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const showToast = useShowToast();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await room.get(roomId);
        if (response) setRoomName(response.name);
      } catch {
        showToast({ message: '방 이름을 불러오지 못했습니다.', mode: 'ERROR' });
      }
    };
    getRoom();
  }, []);

  return (
    <S.Container>
      <S.RoomName>{roomName}</S.RoomName>
      <TabMenu
        overflowHidden={false}
        TabBarContainer={({ children }) => (
          <S.TabBarContainer>
            <S.TabBarWrapper>{children}</S.TabBarWrapper>
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

    padding-bottom: ${({ theme }) => theme.PADDING.p5};
  `,
};
