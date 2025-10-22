import { pickeatQuery } from '@apis/pickeat';
import { restaurantsQuery } from '@apis/restaurants';

import { generateRouterPath } from '@routes/routePath';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function usePickeatStateChecker(pickeatCode: string) {
  const [hasRestaurants, setHasRestaurants] = useState(true);
  const { data: restaurants } = restaurantsQuery.useGet(pickeatCode, {
    isExcluded: 'false',
    pollingInterval: 3000,
  });
  const { data: pickeatState } = pickeatQuery.useGetPickeatState(pickeatCode);
  const { mutate: patchDeactive } = pickeatQuery.usePatchDeactive();

  const navigate = useNavigate();
  useEffect(() => {
    if (!restaurants || !pickeatState) return;
    if (restaurants.length === 0) {
      if (pickeatState.isActive === true) {
        patchDeactive(pickeatCode);
      }
      setHasRestaurants(false);
    }
    if ((restaurants.length ?? 0) > 0 && pickeatState.isActive === false) {
      navigate(generateRouterPath.matchResult(pickeatCode), { replace: true });
    }
  }, [restaurants, pickeatState]);

  return { hasRestaurants };
}
