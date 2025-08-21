import { useEffect, useRef } from 'react';

export function usePolling<T>(
  fetcher: () => Promise<T>,
  {
    onData,
    interval = 3000,
    immediate = false,
    enabled = true,
    errorHandler = (error: Error) => {
      console.error('Polling error:', error.message);
    },
  }: {
    onData: (data: T) => void;
    interval?: number;
    immediate?: boolean;
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
        if (!isUnmounted.current) onData(result);
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

    if (immediate) run();

    return () => {
      isUnmounted.current = true;
      clearInterval(intervalId);
    };
  }, [fetcher, interval, enabled, onData, errorHandler]);
}
