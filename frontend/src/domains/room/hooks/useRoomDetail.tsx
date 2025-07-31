import { pickeat, PickeatDetailType } from '@apis/pickeat';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { validateJoinRoom } from '../utils/validateJoinRoom';

export const useRoomDetail = (roomDetail: PickeatDetailType) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  const joinRoom = async (nickName: string) => {
    try {
      validateJoinRoom({
        nickName,
        roomDetail,
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }

    try {
      await pickeat.postJoin({
        nickname: nickName,
        pickeatId: roomDetail!.id,
      });
      navigate(generateRouterPath.restaurantsExclude(roomDetail.code));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
      return;
    }
  };

  return { joinRoom, error };
};
