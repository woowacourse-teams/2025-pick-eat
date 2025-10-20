import { useShowToast } from '@provider/ToastProvider';

import { joinAsPath } from '@utils/createUrl';

import { useMutation } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import { RESTAURANTS_BASE_PATH } from './restaurants';

export type RestaurantResponse = {
  id: number;
  name: string;
  tags: string[];
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  distance: number | null;
  placeUrl: string | null;
  roadAddressName: string;
  likeCount: number;
  isExcluded: boolean;
  x: number | null;
  y: number | null;
  pictureUrls: string[] | [];
  type: 'WISH' | 'LOCATION';
  isLiked: boolean;
};

export type Restaurant = {
  id: number;
  name: string;
  tags: string[];
  category: '한식' | '중식' | '일식' | '양식' | '기타';
  distance: number | null;
  placeUrl: string | null;
  roadAddressName: string;
  likeCount: number;
  isExcluded?: boolean;
  pictureUrls: string[];
  type: 'WISH' | 'LOCATION';
  isLiked: boolean;
};

export const convertResponseToRestaurant = ({
  id,
  name,
  category,
  tags,
  distance,
  placeUrl,
  roadAddressName,
  likeCount,
  isExcluded,
  type,
  pictureUrls,
  isLiked,
}: RestaurantResponse): Restaurant => ({
  id: id,
  name: name.toString(),
  category: category,
  tags: tags.map(tag => tag.toString()),
  distance: distance ? Number(distance) : null,
  placeUrl: placeUrl ? placeUrl.toString() : '',
  roadAddressName: roadAddressName.toString(),
  likeCount: Number(likeCount),
  isExcluded: isExcluded ? Boolean(isExcluded) : false,
  type: type,
  pictureUrls,
  isLiked,
});

const restaurant = {
  patchLike: async (restaurantId: number) => {
    const patchUrl = joinAsPath(
      BASE_URL_VERSION[2],
      RESTAURANTS_BASE_PATH,
      restaurantId.toString(),
      'like'
    );
    await apiClient.patch(patchUrl);
  },
  patchUnlike: async (restaurantId: number) => {
    const patchUrl = joinAsPath(
      BASE_URL_VERSION[2],
      RESTAURANTS_BASE_PATH,
      restaurantId.toString(),
      'unlikesss'
    );
    await apiClient.patch(patchUrl);
  },
};

export const restaurantQuery = {
  usePatchLike: (pickeatCode: string) => {
    const showToast = useShowToast();
    return useMutation({
      mutationFn: async (id: number) => await restaurant.patchLike(id),
      onMutate: async (id: number, context) => {
        context.client.setQueryData(
          [RESTAURANTS_BASE_PATH, pickeatCode, { isExcluded: 'false' }],
          (oldData: Restaurant[] | undefined) => {
            return [
              ...(oldData || []).map(restaurant => {
                if (restaurant.id === id) {
                  return {
                    ...restaurant,
                    isLiked: true,
                    likeCount: restaurant.likeCount + 1,
                  };
                }
                return restaurant;
              }),
            ];
          }
        );
      },

      onError: () => {
        showToast({
          mode: 'ERROR',
          message: '좋아요 요청에 실패하였습니다.',
        });
      },
    });
  },
  usePatchUnlike: (pickeatCode: string) => {
    const showToast = useShowToast();
    return useMutation({
      mutationFn: async (id: number) => restaurant.patchUnlike(id),
      onMutate: async (id: number, context) => {
        context.client.setQueryData(
          [RESTAURANTS_BASE_PATH, pickeatCode, { isExcluded: 'false' }],
          (oldData: Restaurant[] | undefined) => {
            return [
              ...(oldData || []).map(restaurant => {
                if (restaurant.id === id) {
                  return {
                    ...restaurant,
                    isLiked: false,
                    likeCount: restaurant.likeCount - 1,
                  };
                }
                return restaurant;
              }),
            ];
          }
        );
      },
      onError: () => {
        showToast({
          mode: 'ERROR',
          message: '좋아요 취소 요청에 실패하였습니다.',
        });
      },
    });
  },
};
