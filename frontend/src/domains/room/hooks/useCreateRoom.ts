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
      const roomId = await room.post(roomName as string);
      await room.postMember(
        roomId,
        selectedMemberList.map(member => member.id)
      );
      alert('방생성 완료!');
      navigate(generateRouterPath.roomDetail(roomId));
    } catch {
      setError('방 생성 중 문제가 발생했습니다.');
    }
  };

  return { createRoom, error };
};
