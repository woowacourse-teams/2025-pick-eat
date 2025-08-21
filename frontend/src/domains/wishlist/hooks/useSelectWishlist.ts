import { WishlistType } from '@apis/wishlist';

import { useState } from 'react';

const useSelectWishlist = (wishlistGroup: WishlistType[]) => {
  const [selectedWishlistId, setSelectedWishlistId] = useState(0);

  const handleSelectWishlist = (id: number) => {
    const wishCount = wishlistGroup.find(
      wishlist => wishlist.id === selectedWishlistId
    )?.wishCount;
    if (wishCount === 0) {
      alert('해당 리스트에 위시가 존재하지 않습니다.');
      return;
    }
    setSelectedWishlistId(id);
  };

  const selectedWishlist = wishlistGroup.find(
    wishlist => wishlist.id === selectedWishlistId
  );

  return { selectedWishlistId, handleSelectWishlist, selectedWishlist };
};

export default useSelectWishlist;
