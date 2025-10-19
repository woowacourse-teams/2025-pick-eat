import { createQueryString, joinAsPath } from '@utils/createUrl';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import {
  Restaurant,
  RestaurantResponse,
  convertResponseToRestaurant,
} from './restaurant';

type Option = {
  isExcluded?: 'true' | 'false';
};

const initialOption = {};

export const RESTAURANTS_BASE_PATH = 'restaurants';

export const restaurants = {
  get: async (pickeatCode: string, option?: Option): Promise<Restaurant[]> => {
    const url = joinAsPath(
      BASE_URL_VERSION[2],
      'pickeats',
      pickeatCode,
      RESTAURANTS_BASE_PATH
    );
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
    const patchUrl = joinAsPath(
      BASE_URL_VERSION[2],
      RESTAURANTS_BASE_PATH,
      'exclude'
    );
    const response = await apiClient.patch<RestaurantResponse>(patchUrl, {
      restaurantIds: restaurantsIds,
    });
    if (!response) return [];
    return convertResponseToRestaurant(response);
  },
};
