import { convert } from '@utils/convert';
import { joinAsPath, createQueryString } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type RestaurantResponse = {
  id: number;
  name: string;
  category: string;
  distance: number;
  placeUrl: string;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  distance: number;
  placeUrl: string;
  roadAddressName: string;
  likeCount: number;
  x: number;
  y: number;
};

const convertResponseToRestaurant = ({
  id,
  name,
  category,
  distance,
  placeUrl,
  roadAddressName,
  likeCount,
  x,
  y,
}: RestaurantResponse): Restaurant => ({
  id: id.toString(),
  name: name.toString(),
  category: category.toString(),
  distance: Number(distance),
  placeUrl: placeUrl.toString(),
  roadAddressName: roadAddressName.toString(),
  likeCount: Number(likeCount),
  x: Number(x),
  y: Number(y),
});

const restaurantBaseUrl = 'restaurants';

export const restaurants = {
  get: async (roomCode: string): Promise<Restaurant[]> => {
    const getUrl = joinAsPath('rooms', roomCode, restaurantBaseUrl);
    const data = await apiClient.get<RestaurantResponse[]>(getUrl);
    const results = (data ?? []).map(restaurant =>
      convertResponseToRestaurant(restaurant)
    );
    return results ?? [];
  },
  patch: async (restaurantsIds: string[]) => {
    const convertedRestaurantsIds =
      convert.stringArrayToNumberArray(restaurantsIds);
    const patchUrl = joinAsPath(restaurantBaseUrl, 'exclude');
    const response = await apiClient.patch<RestaurantResponse>(patchUrl, {
      restaurantIds: convertedRestaurantsIds,
    });
    if (!response) return [];
    return convertResponseToRestaurant(response);
  },
};

export const includedRestaurants = {
  get: async (roomCode: string): Promise<Restaurant[]> => {
    const getUrl = joinAsPath('rooms', roomCode, 'restaurants');
    const queryString = createQueryString({
      isExcluded: 'false',
    });
    const response = await apiClient.get<RestaurantResponse[]>(
      `${getUrl}${queryString}`
    );
    const results = (response ?? []).map(restaurant =>
      convertResponseToRestaurant(restaurant)
    );
    return results ?? [];
  },
};

export const like = {
  patch: async (restaurantId: string) => {
    const patchUrl = joinAsPath('restaurants', restaurantId.toString(), 'like');
    await apiClient.patch(patchUrl, undefined, {
      'Content-Type': 'application/json',
    });
  },
};

export const unlike = {
  patch: async (restaurantId: string) => {
    const patchUrl = joinAsPath(
      'restaurants',
      restaurantId.toString(),
      'unlike'
    );
    await apiClient.patch(patchUrl, undefined, {
      'Content-Type': 'application/json',
    });
  },
};

export const matchResult = {
  get: async (roomCode: string): Promise<RestaurantResponse[] | null> => {
    const getUrl = joinAsPath('rooms', roomCode, 'result');
    const response = await apiClient.get<RestaurantResponse[]>(`${getUrl}`);
    return response ?? null;
  },
};
