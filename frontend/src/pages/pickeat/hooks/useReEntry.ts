import { pickeatQuery } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function useRejoinRedirect(pickeatCode: string) {
  const navigate = useNavigate();

  const { isRejoinAvailable, isLoading } = pickeatQuery.useRejoin(pickeatCode);

  useEffect(() => {
    if (!isLoading && isRejoinAvailable !== undefined) {
      if (!isRejoinAvailable) {
        navigate(generateRouterPath.pickeatDetail(pickeatCode));
      } else {
        navigate(generateRouterPath.restaurantsExclude(pickeatCode));
      }
    }
  }, [isLoading, isRejoinAvailable, navigate, pickeatCode]);

  return { isLoading };
}
