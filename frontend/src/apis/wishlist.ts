import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

type WishlistResponse = {
  id: number;
  name: string;
  roomId: number;
  isPublic: boolean;
};

export type WishlistType = {
  id: number;
  name: string;
};

const convertResponseToWish = (data: WishlistResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
  }));
};

const BASE_URL = 'wishLists';

export const wishlist = {
  get: async (roomId: string): Promise<WishlistType[]> => {
    const url = roomId
      ? joinAsPath('room', roomId, BASE_URL)
      : joinAsPath(BASE_URL);
    const response = await apiClient.get<WishlistResponse[]>(url);
    if (response) return convertResponseToWish(response);
    return [];
  },
};
