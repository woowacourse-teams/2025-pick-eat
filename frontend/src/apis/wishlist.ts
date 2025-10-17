import { joinAsPath } from '@utils/createUrl';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from './apiClient';

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

// TODO: 대체 완료되면 export 제거
export const wishlist = {
  get: async (wishlistId: number): Promise<Wishes[]> => {
    const id = wishlistId.toString();
    const url = joinAsPath(BASE_URL, id, 'wishes');

    const response = await apiClient.get<WishesResponse[]>(url);
    if (response) return convertResponseToWish(response);
    return [];
  },
  getTemplate: async (templateId: number): Promise<Wishes[]> => {
    const url = joinAsPath('templates', `${templateId}`, 'wishes');
    const response = await apiClient.get<WishesResponse[]>(url);
    if (response) return convertResponseToWish(response);
    return [];
  },
};

export const wishlistQuery = {
  useGet: (wishlistId: number) => {
    return useQuery<Wishes[]>({
      queryKey: ['wishlist', wishlistId],
      queryFn: () => wishlist.get(wishlistId),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24,
    });
  },
  useGetTemplate: (templateId: number) => {
    return useQuery<Wishes[]>({
      queryKey: ['templates', templateId],
      queryFn: () => wishlist.getTemplate(templateId),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24,
    });
  },
};
