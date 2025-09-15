import PublicWishlist from '@domains/wishlist/components/Wishlist';

import TabContent from '@components/tabMenus/TabContent';

import { Wishes, wishlist, WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import WishFormTab from './WishFormTab';
import WishlistTab from './WishlistTab';

function Wishlist({ id, name, isPublic }: Omit<WishlistType, 'wishCount'>) {
  const [wishlistData, setWishlistData] = useState<Wishes[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

  const getWishlist = async () => {
    try {
      const response = await wishlist.get(id, isPublic);
      setWishlistData(response);
    } catch {
      alert('찜 목록을 불러오던 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleCurrentTab = (index: number) => {
    setCurrentTab(index);
  };

  const handleCreateWish = () => {
    getWishlist();
    setCurrentTab(0);
  };

  return (
    <S.Container>
      {isPublic ? (
        <PublicWishlist
          wishlistId={id}
          wishlistName={name}
          isPublic={isPublic}
        />
      ) : (
        <>
          <S.Title>{name}</S.Title>
          <TabContent
            overflowHidden={false}
            selectedIndex={currentTab}
            tabContents={[
              <S.TabWrapper key="wishlistTab">
                <WishlistTab
                  wishlist={wishlistData}
                  onTabChange={handleCurrentTab}
                  onRefetch={getWishlist}
                />
              </S.TabWrapper>,
              <S.TabWrapper key="wishFormTab">
                <WishFormTab
                  wishlistId={id}
                  onCreate={handleCreateWish}
                  onTabChange={handleCurrentTab}
                />
              </S.TabWrapper>,
            ]}
          />
        </>
      )}
    </S.Container>
  );
}

export default Wishlist;

const S = {
  Container: styled.div`
    max-height: 600px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level3};
    scrollbar-width: none;
  `,

  Title: styled.span`
    top: 20px;

    font: ${({ theme }) => theme.FONTS.heading.large_style};
  `,

  TabWrapper: styled.div`
    min-height: 500px;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
    overflow-y: scroll;
    scrollbar-width: none;
  `,
};
