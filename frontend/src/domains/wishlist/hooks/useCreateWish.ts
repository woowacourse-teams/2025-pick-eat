import { getFormDataByAddress } from '@domains/pickeat/utils/convertAddress';

import { wish, WishFormData } from '@apis/wish';

import { useState } from 'react';

export type WishFormDataWithImage = WishFormData & { image?: File };

export const useCreateWish = () => {
  const [formData, setFormData] = useState<WishFormDataWithImage>({
    name: '',
    roadAddressName: '',
    category: '한식',
    tags: [],
  });

  const createInitialWishFormData = async (address: string) => {
    const data = await getFormDataByAddress(address);
    if (data) setFormData(prev => ({ ...prev, data }));
  };

  const handleFormData = <K extends keyof WishFormDataWithImage>(
    key: K,
    value: WishFormDataWithImage[K]
  ) => {
    setFormData(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const createWish = async (wishListId: number) => {
    try {
      const wishId = await wish.post(wishListId, {
        name: formData?.name,
        category: formData?.category,
        roadAddressName: formData?.roadAddressName,
        tags: formData?.tags || [],
      });

      if (formData?.image && wishId)
        await wish.postImage(wishId, formData?.image);
    } catch (error) {
      console.log('error', error);
    }
  };

  return { formData, handleFormData, createInitialWishFormData, createWish };
};
