import { roomQuery } from '@apis/room';
import { User } from '@apis/users';

import { FormEvent, useState } from 'react';

import { validateCreateRoom } from '../services/validateCreateRoom';

type Props = () => void;
export const useCreateRoom = (onCreate: Props) => {
  const [error, setError] = useState<string>();

  const { mutate } = roomQuery.usePost(onCreate);

  const createRoom = async (
    e: FormEvent<HTMLFormElement>,
    roomName: string,
    selectedMemberList: User[]
  ) => {
    e.preventDefault();
    try {
      validateCreateRoom(roomName);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
    }

    mutate({
      name: roomName,
      userIds: selectedMemberList.map(member => member.id),
    });
  };

  return { createRoom, error };
};
