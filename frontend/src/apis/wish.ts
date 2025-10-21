import { accessToken } from '@domains/login/utils/authStorage';

import { useShowToast } from '@provider/ToastProvider';

import { joinAsPath } from '@utils/createUrl';

import { FoodCategory } from '@constants/foodCategory';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import { queryClient } from './queryClient';

type Picture = {
  id: number;
  imageDownloadUrl: string;
};

type WishResponse = {
  id: number;
  name: string;
  category: FoodCategory;
  picture: Picture;
  roadAddressName: string;
  tags: string[];
  placeUrl: string | null;
};

export type Wish = {
  id: number;
  name: string;
  category: FoodCategory;
  pictureUrls: string[];
  roadAddressName: string;
  tags: string[];
  placeUrl: string | null;
};

export type WishFormData = {
  name: string;
  category: FoodCategory;
  roadAddressName: string;
  tags: string[];
  placeUrl?: string;
};

export type WishFormDataWithImage = WishFormData & { thumbnail?: File };

const BASE_PATH = 'wishes';

const convertResponseToWish = (data: WishResponse[]) => {
  return data.map(d => ({
    id: d.id,
    name: d.name,
    category: d.category,
    pictureUrls: [d.picture?.imageDownloadUrl],
    roadAddressName: d.roadAddressName,
    tags: d.tags,
    placeUrl: d.placeUrl ? d.placeUrl.toString() : null,
  }));
};

export const wish = {
  get: async (roomId: number): Promise<Wish[]> => {
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      'rooms',
      `${roomId}`,
      BASE_PATH
    );

    const response = await apiClient.get<WishResponse[]>(url);
    if (response) return convertResponseToWish(response);
    return [];
  },
  post: async (roomId: number, data: WishFormData) => {
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      'rooms',
      `${roomId}`,
      BASE_PATH
    );
    const response = await apiClient.post<WishResponse>(url, data);
    if (response) return response.id;
  },
  postImage: async (wishId: number, data: File) => {
    const token = accessToken.get();
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      'wish',
      `${wishId}`,
      'wishpictures'
    );
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
    const url = joinAsPath(BASE_URL_VERSION[2], BASE_PATH, `${wishId}`);
    await apiClient.delete(url);
  },
};

export const wishQuery = {
  useGet: (roomId: number) => {
    return useSuspenseQuery<Wish[]>({
      queryKey: ['wish', roomId],
      queryFn: () => wish.get(roomId),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24,
    });
  },
  usePost: (roomId: number, onCreate: () => void) => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: async ({ formData }: { formData: WishFormDataWithImage }) => {
        const wishId = await wish.post(roomId, formData);
        return { wishId, thumbnail: formData.thumbnail };
      },
      onSuccess: async ({ wishId, thumbnail }) => {
        if (wishId && thumbnail) {
          try {
            await wish.postImage(wishId, thumbnail);
          } catch {
            showToast({
              mode: 'WARN',
              message:
                '식당 즐겨찾기 등록은 완료 되었지만, 이미지 등록에 실패했습니다.',
            });
            queryClient.invalidateQueries({ queryKey: ['wish', roomId] });
            onCreate();
            return;
          }
        }
        queryClient.invalidateQueries({ queryKey: ['wish', roomId] });
        showToast({
          mode: 'SUCCESS',
          message: '식당 즐겨찾기 등록 완료!',
        });
        onCreate();
      },
      onError() {
        showToast({
          mode: 'ERROR',
          message: '식당 즐겨찾기 등록 중 문제가 발생했습니다.',
        });
      },
    });
  },
  useDelete: (roomId: number) => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: (wishId: number) => wish.delete(wishId),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['wish', roomId] });
        showToast({
          mode: 'SUCCESS',
          message: '삭제 완료!',
        });
      },
      onError() {
        showToast({
          mode: 'ERROR',
          message: '삭제에 실패했습니다. 다시 시도해 주세요.',
        });
      },
    });
  },
};
