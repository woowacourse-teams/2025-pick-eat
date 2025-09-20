import { ParticipantsState, pickeat } from '@apis/pickeat';

import { usePolling } from '@hooks/usePolling';

import { useCallback, useState } from 'react';

export function useParticipantsState(pickeatCode: string) {
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
    immediate: false,
  });

  // TODO : immediate 를 true 로 바꾸면 왜 무한 리렌더링 및 무한 서버 요청이 발생하는가?

  return participantsState;
}
