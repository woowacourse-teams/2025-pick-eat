import { pickeat, PickeatStateResponse } from '@apis/pickeat';

import { usePolling } from '@hooks/usePolling';

import { generateRouterPath, ROUTE_PATH } from '@routes/routePath';

import { useNavigate } from 'react-router';

export function usePickeatStateChecker(pickeatCode: string) {
  const navigate = useNavigate();

  const fetchPickeatState = async (): Promise<PickeatStateResponse | null> => {
    return await pickeat.getPickeatState(pickeatCode);
  };

  usePolling<PickeatStateResponse | null>(fetchPickeatState, {
    setData: data => {
      if (data?.isActive === false) {
        navigate(generateRouterPath.matchResult(pickeatCode));
      }
    },
    errorHandler: error => {
      if (error.message === 'PICKEAT_NOT_FOUND') {
        alert('종료된 접근입니다.');
        navigate(ROUTE_PATH.MAIN);
      } else {
        console.error('Polling error:', error.message);
      }
    },
    interval: 3000,
  });
}
