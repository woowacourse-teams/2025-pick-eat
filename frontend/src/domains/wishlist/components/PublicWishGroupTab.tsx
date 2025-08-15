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
      <S.Description>픽잇 위시({wishes?.length})</S.Description>

      {wishes?.map(wishlist => (
        <WishlistCard key={wishlist.id} wishlistData={wishlist} />
      ))}
    </S.Container>
  );
}

export default PublicWishGroupTab;

const S = {
  Container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,

  TitleArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Description: styled.span`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.GAP.level2};

    font: ${({ theme }) => theme.FONTS.heading.small};
  `,

  ModalContent: styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.GAP.level4};
  `,

  ModalTitle: styled.span`
    font: ${({ theme }) => theme.FONTS.heading.medium_style};
  `,
};
