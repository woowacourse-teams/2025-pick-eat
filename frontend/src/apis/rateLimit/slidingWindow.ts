export const RATE_LIMIT_WINDOW_MS = 1000;
export const RATE_LIMIT_MAX_COUNT = 10;

/**
 * 타임스탬프 배열에서 윈도우 밖(now - windowMs 이전) 항목을 제거한 새 배열 반환.
 * 순수 함수.
 */
export function pruneOutsideWindow(
  timestamps: number[],
  windowMs: number,
  now: number
): number[] {
  const boundary = now - windowMs;
  return timestamps.filter(t => t > boundary);
}

/**
 * 슬라이딩 윈도우 기준으로 허용 여부 판단.
 * prune 적용 후 개수가 maxCount 미만이면 true.
 * 순수 함수.
 */
export function isWithinLimit(
  timestamps: number[],
  windowMs: number,
  maxCount: number,
  now: number
): boolean {
  const pruned = pruneOutsideWindow(timestamps, windowMs, now);
  return pruned.length < maxCount;
}

/**
 * 윈도우 밖 항목 제거 후 now를 붙인 새 배열 반환. 불변.
 * 순수 함수.
 */
export function appendTimestamp(
  timestamps: number[],
  windowMs: number,
  now: number
): number[] {
  const pruned = pruneOutsideWindow(timestamps, windowMs, now);
  return [...pruned, now];
}
