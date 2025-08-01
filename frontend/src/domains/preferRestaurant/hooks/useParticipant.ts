import { pickeat } from '@apis/pickeat';

import { useState, useEffect } from 'react';

const useParticipant = (pickeatCode: string) => {
  const [participant, setParticipant] = useState({
    totalParticipants: 0,
    eliminatedParticipants: 0,
  });

  useEffect(() => {
    let isUnmounted = false;

    const fetchParticipantState = async () => {
      const response = await pickeat.getParticipantsCount(pickeatCode);
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
