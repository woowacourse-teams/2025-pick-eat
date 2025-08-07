import { createQueryString, joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';
import {
  Restaurant,
  RestaurantResponse,
  convertResponseToRestaurant,
  restaurantBaseUrl,
} from './restaurant';

type Option = {
  isExcluded?: 'true' | 'false';
};

const initialOption = {};

export const restaurants = {
  get: async (pickeatCode: string, option?: Option): Promise<Restaurant[]> => {
    const getUrl = joinAsPath('pickeats', pickeatCode, 'restaurants');
    const queryString = createQueryString(option ?? initialOption);
    const response = await apiClient.get<RestaurantResponse[]>(
      `${getUrl}${queryString}`
    );
    const results = (response ?? []).map(restaurant =>
      convertResponseToRestaurant(restaurant)
    );
    return results ?? [];
  },
  patch: async (restaurantsIds: number[]) => {
    const patchUrl = joinAsPath(restaurantBaseUrl, 'exclude');
    const response = await apiClient.patch<RestaurantResponse>(patchUrl, {
      restaurantIds: restaurantsIds,
    });
    if (!response) return [];
    return convertResponseToRestaurant(response);
  },
};
