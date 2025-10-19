import { pickeat, PickeatStateResponse } from '@apis/pickeat';
import { restaurantsQuery } from '@apis/restaurants';

import { usePolling } from '@hooks/usePolling';

import { generateRouterPath, ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { useState } from 'react';
import { useNavigate } from 'react-router';

export function usePickeatStateChecker(pickeatCode: string) {
  const [hasRestaurants, setHasRestaurants] = useState(true);
  const navigate = useNavigate();
  const showToast = useShowToast();
  const { data: restaurants } = restaurantsQuery.useGet(pickeatCode, {
    isExcluded: 'false',
    pollingInterval: 3000,
  });

  const fetchPickeatState = async (): Promise<PickeatStateResponse | null> => {
    return await pickeat.getPickeatState(pickeatCode);
  };

  usePolling<PickeatStateResponse | null>(fetchPickeatState, {
    onData: async data => {
      if (data?.isActive === true) return;
      // TODO : 처음엔 무조건 undefined 일텐데 nullish 처리로 괜찮은지?
      if (restaurants?.length === 0) {
        setHasRestaurants(false);
        return;
      }
      navigate(generateRouterPath.matchResult(pickeatCode));
    },
    errorHandler: error => {
      if (error.message === 'PICKEAT_NOT_FOUND') {
        showToast({ mode: 'ERROR', message: '해당 픽잇이 종료되었습니다' });
        navigate(ROUTE_PATH.MAIN);
      } else {
        console.error('Polling error:', error.message);
      }
    },
    interval: 3000,
    immediate: true,
  });

  return { hasRestaurants };
}
