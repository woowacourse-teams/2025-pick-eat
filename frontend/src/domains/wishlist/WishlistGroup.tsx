import Button from '@components/actions/Button';

import styled from '@emotion/styled';
import { useState } from 'react';

import Wishlist from './Wishlist';

function WishlistGroup() {
  const WISH_MOCK_DATA = [
    {
      id: '1',
      name: '잠실 루터회관',
      pickeatId: '10',
      isPublic: true,
    },
    {
      id: '2',
      name: '선릉 성담빌딩',
      pickeatId: '11',
      isPublic: true,
    },
  ];

  const [selectedWishlistId, setSelectedWishlistId] = useState('');

  const isSelected = (id: string) => {
    return selectedWishlistId === id;
  };

  const handleSelectWishlist = (id: string) => {
    setSelectedWishlistId(id);
  };

  const selectedWishlist = WISH_MOCK_DATA.find(
    wishlist => wishlist.id === selectedWishlistId
  );

  return (
    <>
      <S.WishlistWrapper>
        {WISH_MOCK_DATA.map(wishlist => (
          <Wishlist
            key={wishlist.id}
            wishlist={wishlist}
            selected={isSelected(wishlist.id)}
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
