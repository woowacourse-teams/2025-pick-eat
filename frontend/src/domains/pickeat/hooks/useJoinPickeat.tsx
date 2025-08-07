import { pickeat, PickeatType } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { validateJoinPickeat } from '../services/validateJoinPickeat';

export const useJoinPickeat = (pickeatDetail: PickeatType) => {
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
      const token = await pickeat.postJoin({
        nickname: nickname,
        pickeatId: pickeatDetail!.id,
      });

      localStorage.setItem('joinCode', token);

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
