import { joinAsPath } from '@utils/createUrl';

import { useMutation, useQuery } from '@tanstack/react-query';

import { apiClient } from './apiClient';
import { queryClient } from './queryClient';

export type Participant = {
  id: number;
  nickname: string;
  isCompleted: boolean;
};

const basePath = 'participants';

export const participants = {
  getMyStatus: async (): Promise<Participant> => {
    const response = await apiClient.get<Participant>(
      joinAsPath(basePath, 'me')
    );
    if (response) return response;
    return { id: -1, nickname: 'Unknown', isCompleted: false };
  },
  patchComplete: async (): Promise<void> => {
    await apiClient.patch(joinAsPath(basePath, 'me', 'completion', 'complete'));
  },
};

export const participantsQuery = {
  useGetMyStatus: () =>
    useQuery<Participant>({
      queryKey: ['participants', 'status', 'me'],
      queryFn: participants.getMyStatus,
      gcTime: 0,
    }),

  usePatchComplete: () =>
    useMutation({
      mutationFn: participants.patchComplete,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['participants', 'status', 'me'],
        });
      },
    }),
};
