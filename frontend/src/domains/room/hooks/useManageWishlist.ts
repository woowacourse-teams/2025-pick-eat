import { queryClient } from '@apis/queryClient';
import { wish } from '@apis/wish';

import { useShowToast } from '@provider/ToastProvider';

import { useMutation } from '@tanstack/react-query';

export const useManageWishlist = (wishId: number) => {
  const showToast = useShowToast();

  const { mutate } = useMutation({
    mutationFn: (wishId: number) => wish.delete(wishId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['wishlist', wishId] });
    },
    onError() {
      showToast({
        mode: 'ERROR',
        message: '삭제에 실패했습니다. 다시 시도해 주세요.',
      });
    },
  });

  const handleDeleteWish = async (wishId: number) => {
    mutate(wishId);
  };

  return { handleDeleteWish };
};
