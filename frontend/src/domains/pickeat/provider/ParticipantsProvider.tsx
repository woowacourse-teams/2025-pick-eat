import { ParticipantsState } from '@apis/pickeat';

import { createContext, useContext } from 'react';

import { useParticipantsPolling } from '../participants/participantsAvatarGroup/hooks/useParticipantsState';

type ParticipantsContextType = {
  participantsState: ParticipantsState;
  totalParticipants: number;
  completedCount: number;
};

type Props = {
  pickeatCode: string;
  children: React.ReactNode;
};

const ParticipantsContext = createContext<ParticipantsContextType | undefined>(
  undefined
);

function ParticipantsProvider({ pickeatCode, children }: Props) {
  const { participantsState } = useParticipantsPolling(pickeatCode);

  const completedCount = participantsState.participants.reduce(
    (count, participant) => (participant.isCompleted ? count + 1 : count),
    0
  );

  return (
    <ParticipantsContext.Provider
      value={{
        participantsState,
        completedCount,
        totalParticipants: participantsState.totalParticipants,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
}

export default ParticipantsProvider;

export const useParticipants = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error(
      'useParticipants 훅은 반드시 ParticipantsProvider 안에서 사용해 주세요.'
    );
  }
  return context;
};
