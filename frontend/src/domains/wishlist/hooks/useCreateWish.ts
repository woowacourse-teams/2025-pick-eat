import { getFormDataByAddress } from '@domains/pickeat/utils/kakaoLocalAPI';

import { WishFormData, WishFormDataWithImage, wishQuery } from '@apis/wish';

import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { validateWishForm } from '../services/validateWishForm';

const DEFAULT_FORM_DATA: WishFormData = {
  name: '',
  roadAddressName: '',
  category: '한식',
  tags: [],
  placeUrl: '',
};

type Props = {
  onCreate: () => void;
  onCloseBottomSheet: () => void;
};

export const useCreateWish = ({ onCreate, onCloseBottomSheet }: Props) => {
  const [formData, setFormData] =
    useState<WishFormDataWithImage>(DEFAULT_FORM_DATA);
  const [searchParams] = useSearchParams();
  const roomId = Number(searchParams.get('roomId')) ?? '';

  const { mutate } = wishQuery.usePost(roomId, onCreate);

  const initialWishFormData = async (address: string) => {
    const data = await getFormDataByAddress(address);
    if (data) setFormData({ ...data, thumbnail: undefined, tags: [] });
    onCloseBottomSheet();
  };

  const handleFormData = <K extends keyof WishFormDataWithImage>(
    key: K,
    value: WishFormDataWithImage[K]
  ) => {
    setFormData(prev => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleCreateWish = async () => {
    try {
      validateWishForm(formData);
    } catch {
      return;
    }

    mutate({ formData });
  };

  return {
    formData,
    handleFormData,
    initialWishFormData,
    handleCreateWish,
  };
};
