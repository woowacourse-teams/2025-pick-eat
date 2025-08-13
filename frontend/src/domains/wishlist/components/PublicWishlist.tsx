import Carousel from '@components/Carousel';

import { WishlistType } from '@apis/wishlist';

import styled from '@emotion/styled';
import { use } from 'react';

type Props = {
  wishlistPromise: Promise<WishlistType[]>;
};

const PublicWishlist = ({ wishlistPromise }: Props) => {
  const wishlist = use(wishlistPromise);

  return (
    <Carousel stepSize={220}>
      <S.Container>
        {wishlist.map(item => (
          <S.Box key={item.id}>{item.name}</S.Box>
        ))}
      </S.Container>
    </Carousel>
  );
};

export default PublicWishlist;

const S = {
  Container: styled.div`
    width: max-content;
    height: 200px;

    display: flex;
    gap: ${({ theme }) => theme.GAP.level5};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,

  Box: styled.div`
    width: 200px;
    height: 100%;
    flex-shrink: 0;

    background-color: white;
    border-radius: ${({ theme }) => theme.RADIUS.medium3};
    cursor: pointer;
  `,
};
