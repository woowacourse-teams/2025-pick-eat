import { wish } from '@apis/wish';
import { Wishes, wishlist } from '@apis/wishlist';

import { useEffect, useState } from 'react';

export const useManageWishlist = (wishId: number) => {
  const [wishlistData, setWishlistData] = useState<Wishes[]>([]);

  const handleGetWish = async () => {
    try {
      const response = await wishlist.get(wishId);
      setWishlistData(response);
    } catch {
      alert('찜 목록을 불러오던 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    handleGetWish();
  }, []);

  const handleDeleteWish = async (wishId: number) => {
    const isDelete = confirm('정말 삭제하시겠습니까?');
    if (isDelete) {
      try {
        await wish.delete(wishId);
        handleGetWish();
      } catch {
        alert('삭제 실패!');
      }
    }
  };

  return { wishlistData, handleGetWish, handleDeleteWish };
};
