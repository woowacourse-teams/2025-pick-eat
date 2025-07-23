import { postJoinRoom, RoomDetailType } from '@apis/room';
import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { validateJoinRoom } from '../utils/validateJoinRoom';

export const useRoomDetail = (roomDetail: RoomDetailType) => {
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
      await postJoinRoom({
        nickname: nickName,
        roomId: roomDetail!.id,
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
