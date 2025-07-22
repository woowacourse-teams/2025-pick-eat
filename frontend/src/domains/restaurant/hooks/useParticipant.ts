import { apiClient } from '@apis/apiClient';
import { ParticipantsResponse } from '@apis/prefer';
import { useState, useEffect } from 'react';

const useParticipant = () => {
  const roomCode = '36f41043-01a3-401d-bdc6-e984b62722d3';

  const [participant, setParticipant] = useState<ParticipantsResponse>({
    totalParticipants: 0,
    eliminatedParticipants: 0,
  });

  useEffect(() => {
    let isUnmounted = false;

    const fetchParticipantState = async () => {
      const response = await apiClient.get<ParticipantsResponse>(
        `rooms/${roomCode}/participants/state`
      );

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
