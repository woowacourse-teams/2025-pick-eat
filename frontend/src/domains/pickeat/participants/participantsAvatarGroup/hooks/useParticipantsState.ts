import { ParticipantsState, pickeat } from '@apis/pickeat';

import { usePolling } from '@hooks/usePolling';

import { useCallback, useState } from 'react';

export function useParticipantsPolling(pickeatCode: string) {
  const [participantsState, setParticipantsState] = useState<ParticipantsState>(
    {
      totalParticipants: 0,
      participants: [],
    }
  );

  const fetcher = useCallback(
    () => pickeat.getParticipantsState(pickeatCode),
    []
  );

  const handleDataUpdate = useCallback(
    (data: ParticipantsState) => {
      setParticipantsState(data);
    },
    [setParticipantsState]
  );

  usePolling<ParticipantsState>(fetcher, {
    onData: handleDataUpdate,
    errorHandler: error => {
      alert(`${error.message}: 참가자 정보를 불러오지 못했습니다.`);
    },
    interval: 3000,
    immediate: true,
  });

  return { participantsState };
}
