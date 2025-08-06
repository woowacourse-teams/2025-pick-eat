import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type WishlistResponse = {
  id: number;
  name: string;
  roomId: number;
  isPublic: boolean;
};

export const wishlist = {
  getPublic: async () => {
    const getUrl = joinAsPath('wishLists');
    const response = await apiClient.get<WishlistResponse[]>(`${getUrl}`);

    return response ?? [];
  },

  getRoom: async (roomId: string) => {
    const getUrl = joinAsPath('room', roomId, 'wishLists');
    const response = await apiClient.get<WishlistResponse[]>(`${getUrl}`);

    return response ?? [];
  },
};
