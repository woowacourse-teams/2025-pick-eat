import { joinAsPath } from '@utils/createUrl';

import { apiClient } from './apiClient';

export type Participant = {
  id: number;
  nickname: string;
  isCompleted: boolean;
};

const basePath = 'participants';

export const participants = {
  patchComplete: async (): Promise<void> => {
    await apiClient.patch(joinAsPath(basePath, 'me', 'completion', 'complete'));
  },
  patchCancel: async (): Promise<void> => {
    await apiClient.patch(joinAsPath(basePath, 'me', 'completion', 'cancel'));
  },
  getMyStatus: async (): Promise<Participant> => {
    const response = await apiClient.get<Participant>(
      joinAsPath(basePath, 'me')
    );
    if (response) return response;
    return { id: -1, nickname: 'Unknown', isCompleted: false };
  },
};
