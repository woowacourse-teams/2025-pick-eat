import { WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { use } from 'react';

import WishlistCard from './WishlistCard';

function PublicWishGroupTab({
  wishGroup,
}: {
  wishGroup: Promise<WishlistType[]>;
}) {
  const wishes = use(wishGroup);

  return (
    <S.Container>
      <S.Description>픽잇 찜({wishes?.length})</S.Description>

      {wishes?.map(wishlist => (
        <WishlistCard key={wishlist.id} wishlistData={wishlist} />
      ))}
    </S.Container>
  );
}

export default PublicWishGroupTab;

const S = {
  Container: styled.div``,

  Description: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};
