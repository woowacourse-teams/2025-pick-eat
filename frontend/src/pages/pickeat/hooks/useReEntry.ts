import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useShowToast } from '@provider/ToastProvider';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function useRejoinRedirect(pickeatCode: string) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const showToast = useShowToast();

  useEffect(() => {
    try {
      const checkRejoinAndRedirect = async () => {
        const rejoined = await pickeat.getRejoin(pickeatCode);
        if (rejoined) {
          navigate(generateRouterPath.restaurantsExclude(pickeatCode));
        } else {
          navigate(generateRouterPath.pickeatDetail(pickeatCode));
        }
      };
      checkRejoinAndRedirect();
    } catch {
      showToast({
        mode: 'ERROR',
        message: '유효한 접근이 아닙니다. 입장 페이지로 이동합니다.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return loading;
}
