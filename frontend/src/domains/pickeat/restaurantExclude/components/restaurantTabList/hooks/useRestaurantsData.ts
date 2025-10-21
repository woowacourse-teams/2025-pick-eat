import { restaurantsQuery } from '@apis/restaurants';

export function useRestaurantsData() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  const { data: restaurantsData } = restaurantsQuery.useSuspenseGet(
    code ?? '',
    {
      pollingInterval: 3000,
    }
  );

  return restaurantsData;
}
