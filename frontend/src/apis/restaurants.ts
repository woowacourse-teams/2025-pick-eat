import { convert } from '@utils/convert';
import { joinAsPath } from '@utils/createUrl';
import { createQueryString } from '@utils/createUrl';

import { apiClient } from './apiClient';
import {
  Restaurant,
  RestaurantResponse,
  restaurantBaseUrl,
  convertResponseToRestaurant,
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
