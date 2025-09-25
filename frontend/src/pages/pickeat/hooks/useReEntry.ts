import { pickeat } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export function useRejoinRedirect(pickeatCode: string) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        navigate(generateRouterPath.pickeatDetail(pickeatCode));
      } finally {
        setLoading(false);
      }
    };
    checkRejoinAndRedirect();
  }, []);

  return loading;
}
