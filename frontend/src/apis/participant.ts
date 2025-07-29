import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type ParticipantsResponse = {
  totalParticipants: number;
  eliminatedParticipants: number;
};

export const participants = {
  get: async (roomCode: string): Promise<ParticipantsResponse | null> => {
    const getUrl = joinAsPath('rooms', roomCode, 'participants', 'state');
    const data = await apiClient.get<ParticipantsResponse>(getUrl);

    return data ?? null;
  },
};
