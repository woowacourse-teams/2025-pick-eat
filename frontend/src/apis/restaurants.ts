import { createQueryString, joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import {
  Restaurant,
  RestaurantResponse,
  RESTAURANT_BAUSE_PATH,
  convertResponseToRestaurant,
  restaurantBaseUrl,
} from './restaurant';

type Option = {
  isExcluded?: 'true' | 'false';
};

const initialOption = {};

export const restaurants = {
  get: async (pickeatCode: string, option?: Option): Promise<Restaurant[]> => {
    const url = joinAsPath('pickeats', pickeatCode, RESTAURANT_BAUSE_PATH);
    const queryString = createQueryString(option ?? initialOption);
    const response = await apiClient.get<RestaurantResponse[]>(
      `${url}${queryString}`
    );
    const results = (response ?? []).map(restaurant =>
      convertResponseToRestaurant(restaurant)
    );
    return results ?? [];
  },
  patch: async (restaurantsIds: number[]) => {
    const patchUrl = joinAsPath(RESTAURANT_BAUSE_PATH, 'exclude');
    const response = await apiClient.patch<RestaurantResponse>(patchUrl, {
      restaurantIds: restaurantsIds,
    });
    if (!response) return [];
    return convertResponseToRestaurant(response);
  },
};
