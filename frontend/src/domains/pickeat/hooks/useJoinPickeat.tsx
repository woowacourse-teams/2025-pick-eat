import { pickeatQuery, PickeatType } from '@apis/pickeat';

import { useState } from 'react';

import { validateJoinPickeat } from '../services/validateJoinPickeat';

export const useJoinPickeat = (pickeatDetail: PickeatType) => {
  const [error, setError] = useState<string>();
  const { mutate } = pickeatQuery.usePostJoin();

  const joinPickeat = (nickname: string) => {
    try {
      validateJoinPickeat({ nickname, pickeatDetail });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }

    mutate({
      nickname,
      pickeatId: pickeatDetail.id,
      pickeatCode: pickeatDetail.code,
    });
  };

  return { joinPickeat, error };
};
