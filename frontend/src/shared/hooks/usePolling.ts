import { useEffect, useRef } from 'react';

export function usePolling<T>(
  fetcher: () => Promise<T>,
  {
    setData,
    interval = 3000,
    enabled = true,
    errorHandler = (error: Error) => {
      console.error('Polling error:', error.message);
    },
  }: {
    setData: (data: T) => void;
    interval?: number;
    enabled?: boolean;
    errorHandler?: (error: Error) => void;
  }
) {
  const isUnmounted = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    isUnmounted.current = false;

    const run = async () => {
      try {
        const result = await fetcher();
        if (!isUnmounted.current) setData(result);
      } catch (err) {
        if (isUnmounted.current) return;
        if (err instanceof Error) {
          errorHandler(err);
          return;
        }
        errorHandler(new Error(String(err)));
      }
    };

    const intervalId = setInterval(run, interval);

    return () => {
      isUnmounted.current = true;
      clearInterval(intervalId);
    };
  }, [fetcher, interval, enabled, setData, errorHandler]);
}
