import { accessToken } from '@domains/login/utils/authStorage';

import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import { WishesResponse } from './wishlist';

const BASE_URL = 'wishes';

export type WishFormData = {
  name: string;
  roadAddressName: string;
  category: string;
  tags: string[];
};

export const wish = {
  post: async (wishListId: number, data: WishFormData) => {
    const url = joinAsPath('wishLists', `${wishListId}`, BASE_URL);
    const response = await apiClient.post<WishesResponse>(url, data);
    if (response) return response.id;
  },
  postImage: async (wishId: number, data: File) => {
    const token = accessToken.get();
    const url = joinAsPath('wish', `${wishId}`, 'wishpictures');
    const formData = new FormData();
    formData.append('wishPictures', data);

    // TODO: apiClient 확장으로 추 후에 변경
    const response = await fetch(`${process.env.API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error('요청 실패');
  },
  delete: async (wishId: number) => {
    const url = joinAsPath(BASE_URL, `${wishId}`);
    await apiClient.delete(url);
  },
};
