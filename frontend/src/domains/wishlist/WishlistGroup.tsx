import Button from '@components/actions/Button';

import { WishlistResponse } from '@apis/wishlist';

import styled from '@emotion/styled';
import { use, useState } from 'react';

import Wishlist from './Wishlist';

type Props = {
  wishlistGroupPromise: Promise<WishlistResponse[]>;
};

function WishlistGroup({ wishlistGroupPromise }: Props) {
  const initialData = use(wishlistGroupPromise);
  const [selectedWishlistId, setSelectedWishlistId] = useState(0);

  const handleSelectWishlist = (id: number) => {
    setSelectedWishlistId(id);
  };

  const selectedWishlist = initialData.find(
    wishlist => wishlist.id === selectedWishlistId
  );

  return (
    <>
      <S.WishlistWrapper>
        {initialData.map(wishlist => (
          <Wishlist
            key={wishlist.id}
            wishlist={wishlist}
            selected={selectedWishlistId === wishlist.id}
            onSelect={handleSelectWishlist}
          />
        ))}
      </S.WishlistWrapper>
      <Button
        text={
          selectedWishlistId
            ? `${selectedWishlist?.name}으로 픽잇 시작`
            : '픽잇 시작하기'
        }
        color="primary"
        disabled={!selectedWishlistId}
      />
    </>
  );
}

export default WishlistGroup;

const S = {
  WishlistWrapper: styled.div`
    height: 250px;
  `,
};
