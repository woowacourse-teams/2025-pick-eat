import { accessToken } from '@domains/login/utils/authStorage';
import { joinCode } from '@domains/pickeat/utils/joinStorage';

import { useShowToast } from '@provider/ToastProvider';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const usePickeatSSE = (pickeatCode: string) => {
  const queryClient = useQueryClient();
  const showToast = useShowToast();

  useEffect(() => {
    if (!pickeatCode) return;

    const token = accessToken.get();
    const code = joinCode.get();
    const baseUrl = (process.env.API_BASE_URL ?? '').replace(/\/api\/?$/, '');

    const params = new URLSearchParams();
    if (token) params.set('token', token);
    if (code) params.set('participantToken', code);

    const url = `${baseUrl}/sse/pickeat/${pickeatCode}?${params.toString()}`;

    const MAX_RETRY = 2;
    let retryCount = 0;

    const eventSource = new EventSource(url);

    const refetch = () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurants', pickeatCode],
      });
    };

    eventSource.onerror = () => {
      retryCount++;
      if (retryCount >= MAX_RETRY) {
        eventSource.close();
        showToast({
          mode: 'ERROR',
          message: '연결에 실패했습니다. 페이지를 새로고침 해주세요.',
        });
      }
    };

    eventSource.addEventListener('PICKEAT_UPDATED', refetch);

    return () => {
      eventSource.removeEventListener('PICKEAT_UPDATED', refetch);
      eventSource.close();
    };
  }, [pickeatCode, queryClient]);
};
