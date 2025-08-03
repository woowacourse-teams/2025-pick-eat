import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import { usePolling } from '@hooks/usePolling';

import { useCallback, useState } from 'react';

export function useRestaurantsPolling(initialData: Restaurant[] = []) {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  const [restaurantsData, setRestaurantsData] =
    useState<Restaurant[]>(initialData);

  const fetcher = useCallback(() => {
    return restaurants.get(code ?? '');
  }, [code]);

  usePolling<Restaurant[]>(fetcher, {
    setData: setRestaurantsData,
    interval: 3000,
    enabled: !!code,
    errorHandler: (error) => {
      console.error('식당 목록 가져오기 실패:', error.message);
      setRestaurantsData([]);
    },
  });

  return restaurantsData;
}
