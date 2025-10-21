import { pickeatQuery } from '@apis/pickeat';
import { restaurantsQuery } from '@apis/restaurants';

import { generateRouterPath } from '@routes/routePath';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function usePickeatStateChecker(pickeatCode: string) {
  const [hasRestaurants, setHasRestaurants] = useState(true);
  const { data: restaurants, isLoading: isRestaurantsLoading } =
    restaurantsQuery.useGet(pickeatCode, {
      isExcluded: 'false',
      pollingInterval: 3000,
    });
  const { data: pickeatState, isLoading: isPickeatLoading } =
    pickeatQuery.useGetPickeatState(pickeatCode);
  const { mutate: patchDeactive } = pickeatQuery.usePatchDeactive();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isRestaurantsLoading && !isPickeatLoading) {
      if (restaurants?.length === 0) {
        if (pickeatState?.isActive === true) {
          patchDeactive(pickeatCode);
        }
        setHasRestaurants(false);
      }
      if ((restaurants?.length ?? 0) > 0 && pickeatState?.isActive === false) {
        navigate(generateRouterPath.matchResult(pickeatCode));
      }
    }
  }, [isRestaurantsLoading, isPickeatLoading, restaurants, pickeatState]);

  return { hasRestaurants };
}
