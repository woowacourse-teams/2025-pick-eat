import { ParticipantsResponse } from '@apis/participant';
import { participants } from '@apis/participant';

import { useState, useEffect } from 'react';

const useParticipant = (roomCode: string) => {
  const [participant, setParticipant] = useState<ParticipantsResponse>({
    totalParticipants: 0,
    eliminatedParticipants: 0,
  });

  useEffect(() => {
    let isUnmounted = false;

    const fetchParticipantState = async () => {
      const response = await participants.get(roomCode);
      if (!isUnmounted && response) {
        setParticipant(response);
      }
    };

    fetchParticipantState();

    const intervalId = setInterval(fetchParticipantState, 10000);

    return () => {
      isUnmounted = true;
      clearInterval(intervalId);
    };
  }, []);

  return { participant };
};

export default useParticipant;
