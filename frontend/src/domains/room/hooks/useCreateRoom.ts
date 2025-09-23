import { room } from '@apis/room';
import { User } from '@apis/users';

import { generateRouterPath } from '@routes/routePath';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import { validateCreateRoom } from '../services/validateCreateRoom';

export const useCreateRoom = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const createRoom = async (roomName: string, selectedMemberList: User[]) => {
    try {
      validateCreateRoom(roomName);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
    }

    try {
      const roomData = await room.post(roomName as string);
      if (!roomData) return;
      if (selectedMemberList.length > 0) {
        await room.postMember(
          roomData.id,
          selectedMemberList.map(member => member.id)
        );
      }
      alert('방생성 완료!');
      navigate(generateRouterPath.roomDetail(roomData.id, roomData.wishlistId));
    } catch {
      setError('방 생성 중 문제가 발생했습니다.');
    }
  };

  return { createRoom, error };
};
