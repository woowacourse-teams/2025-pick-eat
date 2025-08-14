import TabContent from '@components/tabMenus/TabContent';

import ErrorBoundary from '@domains/errorBoundary/ErrorBoundary';

import { wishlist, WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { Suspense, useState } from 'react';

import WishFormTab from './WishFormTab';
import WishlistTab from './WishlistTab';

function Wishlist({ id, name, isPublic }: WishlistType) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleCurrentTab = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      <TabContent
        selectedIndex={currentTab}
        tabContents={[
          <S.TabWrapper key="wishlistTab">
            <ErrorBoundary>
              <Suspense>
                <WishlistTab
                  wishlistPromise={wishlist.getWishes(id, isPublic)}
                  onClick={handleCurrentTab}
                  isPublic={isPublic}
                />
              </Suspense>
            </ErrorBoundary>
          </S.TabWrapper>,
          <S.TabWrapper key="wishFormTab">
            <WishFormTab wishlistId={id} />
          </S.TabWrapper>,
        ]}
      />
    </S.Container>
  );
}

export default Wishlist;

const S = {
  Container: styled.div`
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    overflow: scroll;
  `,

  Title: styled.span`
    top: 20px;

    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  TabWrapper: styled.div`
    min-height: 550px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
