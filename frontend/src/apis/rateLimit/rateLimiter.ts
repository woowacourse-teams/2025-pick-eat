import {
  RATE_LIMIT_MAX_COUNT,
  RATE_LIMIT_WINDOW_MS,
  appendTimestamp,
  isWithinLimit,
} from './slidingWindow';

const store = new Map<string, number[]>();

function getTimestamps(key: string): number[] {
  return store.get(key) ?? [];
}

export function check(key: string, now: number = Date.now()): boolean {
  const timestamps = getTimestamps(key);
  return isWithinLimit(
    timestamps,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_COUNT,
    now
  );
}

export function record(key: string, now: number = Date.now()): void {
  const timestamps = getTimestamps(key);
  const next = appendTimestamp(timestamps, RATE_LIMIT_WINDOW_MS, now);
  store.set(key, next);
}

export const rateLimiter = { check, record };
