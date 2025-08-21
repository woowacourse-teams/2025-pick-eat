import { Restaurant } from '@apis/restaurant';
import { restaurants } from '@apis/restaurants';

import { usePolling } from '@hooks/usePolling';

import { useCallback, useState } from 'react';

export function useRestaurantsData(initialData: Restaurant[] = []) {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  const [restaurantsData, setRestaurantsData] =
    useState<Restaurant[]>(initialData);

  const handleDataUpdate = useCallback(
    (data: Restaurant[]) => {
      setRestaurantsData(data);
    },
    [setRestaurantsData]
  );

  const fetcher = useCallback(() => restaurants.get(code ?? ''), [code]);

  usePolling<Restaurant[]>(fetcher, {
    onData: handleDataUpdate,
    interval: 3000,
    enabled: !!code,
    errorHandler: error => {
      console.error('식당 목록 가져오기 실패:', error.message);
      setRestaurantsData([]);
    },
  });

  return restaurantsData;
}
