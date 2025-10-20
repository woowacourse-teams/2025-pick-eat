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

type QueryOption = {
  pollingInterval?: number;
} & GetApiOption;

type MutationOption = {
  onSuccess?: () => void;
  onError?: () => void;
};

const initialOption = {};

export const RESTAURANTS_BASE_PATH = 'restaurants';

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
    const { pollingInterval = 0, ...restOption } = option ?? {};
    return useQuery({
      queryKey: [RESTAURANTS_BASE_PATH, pickeatCode, restOption],
      queryFn: async () => restaurants.get(pickeatCode, restOption),
      refetchInterval: pollingInterval,
    });
  },
  useSuspenseGet: (pickeatCode: string, option?: QueryOption) => {
    const { pollingInterval = 0, ...restOption } = option ?? {};
    return useSuspenseQuery({
      // TODO : isExcluded 에 따라 관리하는 캐시를 분리해야해서 restOption 을 키로 포함시켰는데 더 나은 방법 있을지 고민
      queryKey: [RESTAURANTS_BASE_PATH, pickeatCode, restOption],
      queryFn: async () => restaurants.get(pickeatCode, restOption),
      refetchInterval: pollingInterval,
    });
  },
  // TODO : api 에 필요한 값 제외하고 query 옵션은 다 option 객체로 받는 건 어떤지 제안
  usePatch: (restaurantsIds: number[], option?: MutationOption) => {
    const showToast = useShowToast();
    return useMutation({
      mutationFn: async () => restaurants.patch(restaurantsIds),
      onSuccess: () => {
        // TODO : [RESTAURANTS_BASE_PATH, pickeatCode, restOption] 키를 가진 캐시의 무효화는
        // 각 Get 에서의 책임이라고 판단.
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
