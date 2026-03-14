import { useShowToast } from '@provider/ToastProvider';

import { createQueryString, joinAsPath } from '@utils/createUrl';

import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import {
  convertResponseToRestaurant,
  Restaurant,
  RestaurantResponse,
} from './restaurant';

type GetApiOption = {
  isExcluded?: 'true' | 'false';
};

type QueryOption = GetApiOption;

type MutationOption = {
  onSuccess?: () => void;
  onError?: () => void;
};

const initialOption = {};

const RESTAURANTS_BASE_PATH = 'restaurants';

export const restaurants = {
  get: async (
    pickeatCode: string,
    option?: GetApiOption
  ): Promise<Restaurant[]> => {
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
  useGet: (pickeatCode: string, option?: QueryOption) => {
    const showToast = useShowToast();
    return useQuery({
      queryKey: [RESTAURANTS_BASE_PATH, pickeatCode, option ?? {}],
      queryFn: async () => {
        try {
          return restaurants.get(pickeatCode, option);
        } catch {
          showToast({
            mode: 'ERROR',
            message: '식당 정보를 불러오는 데 실패했습니다.',
          });
        }
      },
      throwOnError: false,
    });
  },
  useSuspenseGet: (pickeatCode: string, option?: QueryOption) => {
    return useSuspenseQuery({
      queryKey: [RESTAURANTS_BASE_PATH, pickeatCode, option ?? {}],
      queryFn: async () => restaurants.get(pickeatCode, option),
    });
  },
  usePatch: (restaurantsIds: number[], option?: MutationOption) => {
    const showToast = useShowToast();
    return useMutation({
      mutationFn: async () => restaurants.patch(restaurantsIds),
      onSuccess: () => {
        option?.onSuccess?.();
      },
      onError: () => {
        option?.onError?.();
        showToast({
          mode: 'ERROR',
          message: '식당 제외 요청에 실패하였습니다.',
        });
      },
    });
  },
};
