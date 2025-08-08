import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

type WishlistResponse = {
  id: number;
  name: string;
  roomId: number;
  isPublic: boolean;
};

type Picture = {
  id: number;
  imageUrl: string;
};

type WishesResponse = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  pictures: Picture[];
  roadAddressName: string;
  tags: string[];
  wishListId: number;
};

export type Wishes = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  pictures: Picture[];
  roadAddressName: string;
  tags: string[];
  wishListId: number;
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

const convertResponaseToWishes = (data: WishesResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    category: d.category,
    pictures: d.pictures,
    roadAddressName: d.roadAddressName,
    tags: d.tags,
    wishListId: d.wishListId,
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

  getWishes: async (wishlistId: number): Promise<Wishes[] | null> => {
    const id = wishlistId.toString();
    const url = joinAsPath(BASE_URL, 'public', id, 'wishes');
    const response = await apiClient.get<WishesResponse[]>(url);
    if (response) return convertResponaseToWishes(response);
    return null;
  },
};
