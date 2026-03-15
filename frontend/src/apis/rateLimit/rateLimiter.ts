import {
  appendTimestamp,
  isWithinLimit,
} from './slidingWindow';

export type RateLimitMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type RateLimitRequestOptions = { skipRateLimit?: boolean };

const RATE_LIMIT_WINDOW_MS = 5000;
const RATE_LIMIT_MAX_COUNT = 20;

const RATE_LIMIT_ENABLED_BY_METHOD: Record<RateLimitMethod, boolean> = {
  GET: true,
  POST: false,
  PATCH: false,
  DELETE: false,
};

const SKIP_LIST: ((endPoint: string) => boolean)[] = [];

const shouldApplyRateLimit = (
  method: RateLimitMethod,
  endPoint: string,
  options?: RateLimitRequestOptions
): boolean => {
  if (options?.skipRateLimit) return false;
  if (!RATE_LIMIT_ENABLED_BY_METHOD[method]) return false;
  if (SKIP_LIST.some(fn => fn(endPoint))) return false;
  return true;
}

const buildKey = (method: RateLimitMethod, endPoint: string): string => {
  return `${method}\n${endPoint}`;
};

const store = new Map<string, number[]>();

const getTimestamps = (key: string): number[] => {
  return store.get(key) ?? [];
};

const check = (key: string, now: number = Date.now()): boolean => {
  const timestamps = getTimestamps(key);
  return isWithinLimit(
    timestamps,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_COUNT,
    now
  );
};

const record = (key: string, now: number = Date.now()): void => {
  const timestamps = getTimestamps(key);
  const next = appendTimestamp(timestamps, RATE_LIMIT_WINDOW_MS, now);
  store.set(key, next);
};

const tryAcquire = (
  method: RateLimitMethod,
  endPoint: string,
  options?: RateLimitRequestOptions,
  now: number = Date.now()
): boolean => {
  if (!shouldApplyRateLimit(method, endPoint, options)) return true;
  const key = buildKey(method, endPoint);
  if (!check(key, now)) return false;
  record(key, now);
  return true;
};

const getSnapshotForReporting = (
  method: RateLimitMethod,
  endPoint: string
): number[] => {
  const key = buildKey(method, endPoint);
  const timestamps = getTimestamps(key);
  return [...timestamps];
};

export const rateLimiter = { tryAcquire, getSnapshotForReporting };
