import { ApiError } from '@apis/apiClient';
import { pickeat, PickeatResult } from '@apis/pickeat';

import { ROUTE_PATH } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function usePickeatResult(pickeatCode: string) {
  const [pickeatResult, setPickeatResult] = useState<PickeatResult | null>(
    null
  );

  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    const handleFetchResult = async () => {
      try {
        const result = await pickeat.getResult(pickeatCode);
        setPickeatResult(result);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          showToast({
            mode: 'ERROR',
            message: '해당 픽잇에 접근할 수 없습니다.',
          });
          navigate(ROUTE_PATH.MAIN);
          return;
        }
        showToast({
          mode: 'ERROR',
          message: '픽잇 결과를 불러오지 못했습니다!',
        });
        throw e;
      }
    };
    handleFetchResult();
  }, []);

  return pickeatResult;
}
