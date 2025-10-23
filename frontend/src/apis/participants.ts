import { useShowToast } from '@provider/ToastProvider';

import { joinAsPath } from '@utils/createUrl';

import { useMutation, useQuery } from '@tanstack/react-query';

import { apiClient, BASE_URL_VERSION } from './apiClient';
import { queryClient } from './queryClient';

export type Participant = {
  id: number;
  nickname: string;
  isCompleted: boolean;
};

const BASE_PATH = 'participants';

export const participants = {
  getMyStatus: async (): Promise<Participant> => {
    const response = await apiClient.get<Participant>(
      joinAsPath(BASE_URL_VERSION[1], BASE_PATH, 'me')
    );
    if (response) return response;
    return { id: -1, nickname: 'Unknown', isCompleted: false };
  },
  patchComplete: async (): Promise<void> => {
    await apiClient.patch(
      joinAsPath(BASE_URL_VERSION[1], BASE_PATH, 'me', 'completion', 'complete')
    );
  },
};

export const participantsQuery = {
  useGetMyStatus: (pickeatCode: string) => {
    const showToast = useShowToast();

    return useQuery({
      queryKey: [BASE_PATH, pickeatCode, 'me'],
      queryFn: async () => {
        try {
          const status = await participants.getMyStatus();

          return status;
        } catch {
          showToast({
            mode: 'ERROR',
            message:
              '내 투표 상태를 불러오는데 실패했습니다. 새로고침 후 다시 시도해 주세요.',
          });
        }
      },
      throwOnError: false,
    });
  },

  usePatchComplete: (pickeatCode: string, onVoteComplete: () => void) => {
    const showToast = useShowToast();

    return useMutation({
      mutationFn: participants.patchComplete,
      onSuccess: () => {
        showToast({
          mode: 'SUCCESS',
          message:
            '투표 완료 상태가 되었습니다. (계속 투표에 참여하실 수 있습니다.)',
        });

        onVoteComplete?.();

        queryClient.invalidateQueries({
          queryKey: [BASE_PATH, pickeatCode, 'me'],
        });
      },
      onError: () => {
        showToast({
          mode: 'ERROR',
          message: '투표 완료 상태 변경에 실패했습니다. 다시 시도해 주세요.',
        });
      },
    });
  },
};
