import TabContent from '@components/tabMenus/TabContent';

import { Wishes, wishlist, WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import WishFormTab from './WishFormTab';
import WishlistTab from './WishlistTab';

function Wishlist({ id, name, isPublic }: WishlistType) {
  const [wishlistData, setWishlistData] = useState<Wishes[]>([]);

  const getWishlist = async () => {
    const response = await wishlist.get(id, isPublic);
    setWishlistData(response);
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const [currentTab, setCurrentTab] = useState(0);

  const handleCurrentTab = (index: number) => {
    setCurrentTab(index);
  };

  const handleCreateWish = () => {
    getWishlist();
    setCurrentTab(0);
  };

  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      <TabContent
        selectedIndex={currentTab}
        tabContents={[
          <S.TabWrapper key="wishlistTab">
            <WishlistTab
              wishlist={wishlistData}
              onClick={handleCurrentTab}
              isPublic={isPublic}
            />
          </S.TabWrapper>,
          <S.TabWrapper key="wishFormTab">
            <WishFormTab wishlistId={id} onCreate={handleCreateWish} />
          </S.TabWrapper>,
        ]}
      />
    </S.Container>
  );
}

export default Wishlist;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
  `,

  Title: styled.span`
    top: 20px;

    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  TabWrapper: styled.div`
    min-height: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
};
