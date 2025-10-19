import { createQueryString, joinAsPath } from '@utils/createUrl';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import {
  convertResponseToRestaurant,
  Restaurant,
  RestaurantResponse,
} from './restaurant';

type Option = {
  isExcluded?: 'true' | 'false';
  pollingInterval?: number;
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

export const restaurantsQuery = {
  useGet: (pickeatCode: string, option?: Option) => {
    const { pollingInterval = 0, ...restOption } = option ?? {};
    return useQuery({
      queryKey: [RESTAURANTS_BASE_PATH, pickeatCode],
      queryFn: async () => restaurants.get(pickeatCode, restOption),
      refetchInterval: pollingInterval,
    });
  },
  useSuspenseGet: (pickeatCode: string, option?: Option) => {
    const { pollingInterval = 0, ...restOption } = option ?? {};
    return useSuspenseQuery({
      queryKey: [RESTAURANTS_BASE_PATH, pickeatCode],
      queryFn: async () => restaurants.get(pickeatCode, restOption),
      refetchInterval: pollingInterval,
    });
  },
};
