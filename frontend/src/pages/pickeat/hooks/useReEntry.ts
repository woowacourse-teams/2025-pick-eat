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
    const checkRejoinAndRedirect = async () => {
      try {
        const rejoined = await pickeat.getRejoin(pickeatCode);
        if (!rejoined) {
          navigate(generateRouterPath.pickeatDetail(pickeatCode));
          return;
        }
        navigate(generateRouterPath.restaurantsExclude(pickeatCode));
      } catch {
        showToast({
          mode: 'ERROR',
          message: '유효한 접근이 아닙니다. 입장 페이지로 이동합니다.',
        });
        navigate(generateRouterPath.pickeatDetail(pickeatCode));
      } finally {
        setLoading(false);
      }
    };
    checkRejoinAndRedirect();
  }, []);

  return loading;
}
