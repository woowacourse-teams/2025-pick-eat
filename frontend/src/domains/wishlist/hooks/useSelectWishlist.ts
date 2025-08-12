import { WishlistType } from '@apis/wishlist';

import { useState } from 'react';

const useSelectWishlist = (data: WishlistType[]) => {
  const [selectedWishlistId, setSelectedWishlistId] = useState(0);

  const handleSelectWishlist = (id: number) => {
    setSelectedWishlistId(id);
  };

  const selectedWishlist = data.find(
    wishlist => wishlist.id === selectedWishlistId
  );

  return { selectedWishlistId, handleSelectWishlist, selectedWishlist };
};

export default useSelectWishlist;
