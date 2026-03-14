import { accessToken } from '@domains/login/utils/authStorage';
import { joinCode } from '@domains/pickeat/utils/joinStorage';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const usePickeatSSE = (pickeatCode: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!pickeatCode) return;

    const token = accessToken.get();
    const code = joinCode.get();
    const baseUrl = (process.env.API_BASE_URL ?? '').replace(/\/api\/?$/, '');

    const params = new URLSearchParams();
    if (token) params.set('token', token);
    if (code) params.set('participantToken', code);

    const url = `${baseUrl}/sse/pickeat/${pickeatCode}?${params.toString()}`;

    const eventSource = new EventSource(url);

    const refetch = () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurants', pickeatCode],
      });
    };

    eventSource.addEventListener('PICKEAT_UPDATED', refetch);

    return () => {
      eventSource.removeEventListener('PICKEAT_UPDATED', refetch);
      eventSource.close();
    };
  }, [pickeatCode, queryClient]);
};
