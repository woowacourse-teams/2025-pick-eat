import { wish } from '@apis/wish';
import { Wishes, wishlist } from '@apis/wishlist';

import { useShowToast } from '@provider/ToastProvider';

import { useEffect, useState } from 'react';

export const useManageWishlist = (wishId: number) => {
  const [wishlistData, setWishlistData] = useState<Wishes[]>([]);
  const [error, setError] = useState<boolean>(false);
  const showToast = useShowToast();

  const handleGetWish = async () => {
    try {
      const response = await wishlist.get(wishId);
      if (response) setWishlistData(response);
    } catch {
      showToast({
        mode: 'ERROR',
        message: '찜 목록을 불러오던 중 에러가 발생했습니다.',
      });
      setError(true);
    }
  };

  useEffect(() => {
    handleGetWish();
  }, []);

  const handleDeleteWish = async (wishId: number) => {
    try {
      await wish.delete(wishId);
      handleGetWish();
    } catch {
      showToast({
        mode: 'ERROR',
        message: '삭제에 실패했습니다. 다시 시도해 주세요.',
      });
    }
  };

  return { error, wishlistData, handleGetWish, handleDeleteWish };
};
