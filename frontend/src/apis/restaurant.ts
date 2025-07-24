import { convert } from '@utils/convert';
import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type RestaurantResponse = {
  id: number;
  name: string;
  category: string;
  distance: number;
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
  roadAddressName,
  likeCount,
  x,
  y,
}: RestaurantResponse): Restaurant => ({
  id: id.toString(),
  name: name.toString(),
  category: category.toString(),
  distance: Number(distance),
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
