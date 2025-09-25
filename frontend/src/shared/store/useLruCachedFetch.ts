import { useState, useEffect, useRef } from 'react';

import { apiLruCache } from './LRUCache';

export function useLruCachedFetch<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const latestKey = useRef(key);

  useEffect(() => {
    if (!key) return;

    latestKey.current = key;

    const cachedData = apiLruCache.get(key) as T | null;
    if (cachedData) {
      setData(cachedData);
      return;
    }

    setLoading(true);
    fetcher()
      .then(json => {
        if (latestKey.current !== key) return;

        apiLruCache.set(key, json);
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (latestKey.current !== key) return;
        setError(err);
        setLoading(false);
      });
  }, [key, fetcher, apiLruCache]);

  return { data, loading, error };
}
