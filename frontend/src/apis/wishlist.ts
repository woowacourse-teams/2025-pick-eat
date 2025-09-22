import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

type WishlistResponse = {
  id: number;
  name: string;
  roomId: number;
  isPublic: boolean;
  wishCount: number;
};

type Picture = {
  id: number;
  imageDownloadUrl: string;
};

export type WishesResponse = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  pictures: Picture[];
  roadAddressName: string;
  tags: string[];
  wishlistId: number;
  placeUrl?: string;
};

export type Wishes = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  pictures: Picture[];
  roadAddressName: string;
  tags: string[];
  wishlistId: number;
  placeUrl?: string;
};

export type WishlistType = {
  id: number;
  name: string;
  isPublic: boolean;
  wishCount: number;
};

const convertResponseToWish = (data: WishlistResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    isPublic: d.isPublic,
    wishCount: d.wishCount,
  }));
};

const convertResponseToWishes = (data: WishesResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    category: d.category,
    pictures: d.pictures,
    roadAddressName: d.roadAddressName,
    tags: d.tags,
    wishlistId: d.wishlistId,
    placeUrl: d.placeUrl,
  }));
};

const BASE_URL = 'wishLists';

export const wishlist = {
  get: async (wishlistId: number, isPublic: boolean): Promise<Wishes[]> => {
    const id = wishlistId.toString();
    const url = isPublic
      ? joinAsPath(BASE_URL, 'public', id, 'wishes')
      : joinAsPath(BASE_URL, id, 'wishes');

    const response = await apiClient.get<WishesResponse[]>(url);
    if (response) return convertResponseToWishes(response);
    return [];
  },
  getWishGroup: async (roomId?: number): Promise<WishlistType[]> => {
    const url = roomId
      ? joinAsPath('room', `${roomId}`, BASE_URL)
      : joinAsPath(BASE_URL);
    const response = await apiClient.get<WishlistResponse[]>(url);
    if (response) return convertResponseToWish(response);
    return [];
  },
  post: async (roomId: number, name: string) => {
    const url = joinAsPath('room', `${roomId}`, BASE_URL);
    await apiClient.post(url, { name });
  },
  delete: async (wishlistId: number) => {
    const url = joinAsPath(BASE_URL, `${wishlistId}`);
    await apiClient.delete(url);
  },
};
