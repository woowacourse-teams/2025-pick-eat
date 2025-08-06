import { pickeat, PickeatDetailType } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { validateJoinPickeat } from '../services/validateJoinPickeat';

export const usePickeatDetail = (pickeatDetail: PickeatDetailType) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const joinPickeat = async (nickname: string) => {
    try {
      validateJoinPickeat({
        nickname,
        pickeatDetail,
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }

    try {
      await pickeat.postJoin({
        nickname: nickname,
        pickeatId: pickeatDetail!.id,
      });
      navigate(generateRouterPath.restaurantsExclude(pickeatDetail.code));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }
  };

  return { joinPickeat, error };
};
