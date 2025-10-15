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
  placeUrl: string | null;
};

export type Wishes = {
  id: number;
  name: string;
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  pictureUrls: string[];
  roadAddressName: string;
  tags: string[];
  wishlistId: number;
  placeUrl: string | null;
};

export type WishlistType = {
  id: number;
  name: string;
  isPublic: boolean;
  wishCount: number;
};

const convertResponseToWishlist = (data: WishlistResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    isPublic: d.isPublic,
    wishCount: d.wishCount,
  }));
};

const convertResponseToWish = (data: WishesResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    category: d.category,
    pictureUrls: [d.pictures[0]?.imageDownloadUrl],
    roadAddressName: d.roadAddressName,
    tags: d.tags,
    wishlistId: d.wishlistId,
    placeUrl: d.placeUrl ? d.placeUrl.toString() : null,
  }));
};

const BASE_URL = 'wishLists';

export const wishlist = {
  get: async (wishlistId: number): Promise<Wishes[]> => {
    const id = wishlistId.toString();
    const url = joinAsPath(BASE_URL, id, 'wishes');

    const response = await apiClient.get<WishesResponse[]>(url);
    if (response) return convertResponseToWish(response);
    return [];
  },
  getWishTemplates: async (): Promise<WishlistType[]> => {
    const url = joinAsPath(BASE_URL, 'templates');
    const response = await apiClient.get<WishlistResponse[]>(url);
    if (response) return convertResponseToWishlist(response);
    return [];
  },
};
