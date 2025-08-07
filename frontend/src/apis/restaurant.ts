import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

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
  id: string;
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
  id: id.toString(),
  name: name.toString(),
  category: category,
  tags: tags.map(tag => tag.toString()),
  distance: Number(distance),
  placeUrl: placeUrl ? placeUrl.toString() : '',
  roadAddressName: roadAddressName.toString(),
  likeCount: Number(likeCount),
  isExcluded: isExcluded ? Boolean(isExcluded) : false,
  type: type,
  pictureUrls,
  isLiked,
});

export const RESTAURANT_BAUSE_PATH = 'restaurants';

export const restaurant = {
  patchLike: async (restaurantId: string) => {
    const patchUrl = joinAsPath(
      RESTAURANT_BAUSE_PATH,
      restaurantId.toString(),
      'like'
    );
    await apiClient.patch(patchUrl);
  },
  patchUnlike: async (restaurantId: string) => {
    const patchUrl = joinAsPath(
      RESTAURANT_BAUSE_PATH,
      restaurantId.toString(),
      'unlike'
    );
    await apiClient.patch(patchUrl);
  },
};
