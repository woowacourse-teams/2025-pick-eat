import { accessToken } from '@domains/login/utils/authStorage';
import { joinCode } from '@domains/pickeat/utils/joinStorage';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const usePickeatSSE = (pickeatCode: string) => {
  const queryClient = useQueryClient();
  const [connectionStatus, setConnectionStatus] = useState<
    'CONNECTING' | 'OPEN' | 'CLOSED'
  >('CLOSED');

  useEffect(() => {
    if (!pickeatCode) return;

    const token = accessToken.get();
    const code = joinCode.get();
    const baseUrl = (process.env.API_BASE_URL ?? '').replace(/\/api\/?$/, '');

    const params = new URLSearchParams();
    if (token) params.set('token', token);
    if (code) params.set('participantToken', code);

    const url = `${baseUrl}/sse/pickeat/${pickeatCode}?${params.toString()}`;

    setConnectionStatus('CONNECTING');

    const eventSource = new EventSource(url);

    const refetch = () => {
      queryClient.invalidateQueries({
        queryKey: ['restaurants', pickeatCode],
      });
    };

    const handlePickeatUpdated = () => {
      refetch();
    };

    eventSource.onopen = () => {
      setConnectionStatus('OPEN');
    };

    eventSource.addEventListener('PICKEAT_UPDATED', handlePickeatUpdated);

    eventSource.onerror = () => {
      setConnectionStatus('CLOSED');
    };

    return () => {
      eventSource.removeEventListener('PICKEAT_UPDATED', handlePickeatUpdated);
      eventSource.close();
      setConnectionStatus('CLOSED');
    };
  }, [pickeatCode, queryClient]);

  return connectionStatus;
};
