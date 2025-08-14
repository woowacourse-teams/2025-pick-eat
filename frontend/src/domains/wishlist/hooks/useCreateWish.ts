import { getFormDataByAddress } from '@domains/pickeat/utils/convertAddress';

import { wish, WishFormData } from '@apis/wish';

import { useState } from 'react';

import { validateWishForm } from '../services/validateWishForm';

export type WishFormDataWithImage = WishFormData & { image?: File };

export const useCreateWish = (onCreate?: () => void) => {
  const [formData, setFormData] = useState<WishFormDataWithImage>();
  const [error, setError] = useState('');

  const initialWishFormData = async (address: string) => {
    const data = await getFormDataByAddress(address);
    if (data) setFormData({ ...data, tags: [], category: '' });
  };

  const handleFormData = <K extends keyof WishFormDataWithImage>(
    key: K,
    value: WishFormDataWithImage[K]
  ) => {
    setFormData(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const createWish = async (wishListId: number) => {
    try {
      validateWishForm(formData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        return;
      }
    }

    try {
      const wishId = await wish.post(wishListId, {
        name: formData?.name as string,
        category: formData?.category as string,
        roadAddressName: formData?.roadAddressName as string,
        tags: formData?.tags as string[],
      });

      if (formData?.image && wishId)
        await wish.postImage(wishId, formData?.image);

      alert('위시 등록!');
      onCreate?.();
      setFormData(undefined);
    } catch {
      setError('사진 등록을 실패했습니다.');
    }
  };

  return { formData, handleFormData, initialWishFormData, createWish, error };
};
