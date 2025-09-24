import { getFormDataByAddress } from '@domains/pickeat/utils/kakaoLocalAPI';

import { wish, WishFormData } from '@apis/wish';

import { useState } from 'react';

import { validateWishForm } from '../services/validateWishForm';

export type WishFormDataWithImage = WishFormData & { thumbnail?: File };

export const useCreateWish = (onCreate?: () => void) => {
  const [formData, setFormData] = useState<WishFormDataWithImage>();
  const [error, setError] = useState('');

  const initialWishFormData = async (address: string) => {
    const data = await getFormDataByAddress(address);
    if (data) setFormData({ ...data, tags: [] });
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
      if (!formData) return;
      const wishId = await wish.post(wishListId, {
        name: formData.name as string,
        category: formData.category as string,
        roadAddressName: formData.roadAddressName as string,
        tags: formData.tags as string[],
        placeUrl: formData.placeUrl as string,
      });

      let imageUploadError = false;
      if (formData.thumbnail && wishId) {
        try {
          await wish.postImage(wishId, formData.thumbnail);
        } catch {
          imageUploadError = true;
        }
      }

      if (imageUploadError) {
        alert('찜은 등록되었으나, 이미지 등록에 실패했습니다.');
      } else {
        alert('찜 등록!');
      }
      onCreate?.();
      setFormData(undefined);
      setError('');
    } catch {
      setError('찜 등록 중 에러가 발생했습니다.');
    }
  };

  return { formData, handleFormData, initialWishFormData, createWish, error };
};
