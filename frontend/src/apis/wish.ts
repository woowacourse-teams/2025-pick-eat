import { accessToken } from '@domains/login/utils/authStorage';

import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import { WishesResponse } from './wishlist';

const BASE_URL = 'wishLists';

export type WishFormData = {
  name: string;
  roadAddressName: string;
  category: string;
  tags: string[];
};

export const wish = {
  post: async (wishListId: number, data: WishFormData) => {
    const url = joinAsPath(BASE_URL, `${wishListId}`, 'wishes');
    const response = await apiClient.post<WishesResponse>(url, data);
    console.log('3', response);
    if (response) return response.id;
  },
  postImage: async (wishId: number, data: File) => {
    const token = accessToken.get();
    const url = joinAsPath('wish', `${wishId}`, 'wishpictures');
    const formData = new FormData();
    formData.append('wishPictures', data);

    // TODO: apiClient 확장으로 추 후에 변경
    await fetch(`${process.env.API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },
};
