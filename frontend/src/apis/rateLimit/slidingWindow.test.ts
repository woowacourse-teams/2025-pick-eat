import {
  pruneOutsideWindow,
  isWithinLimit,
  appendTimestamp,
} from './slidingWindow';

const windowMs = 1000;

describe('slidingWindow', () => {
  describe('pruneOutsideWindow', () => {
    it('빈 배열이면 빈 배열을 반환한다', () => {
      const now = 5000;
      expect(pruneOutsideWindow([], windowMs, now)).toEqual([]);
    });

    it('윈도우 밖(now - windowMs 이하) 타임스탬프는 제거한다', () => {
      const now = 5000;
      const timestamps = [3900, 3999, 4000, 4001, 4999, 5000];
      expect(pruneOutsideWindow(timestamps, windowMs, now)).toEqual([
        4001, 4999, 5000,
      ]);
    });

    it('모든 타임스탬프가 윈도우 밖이면 빈 배열을 반환한다', () => {
      const now = 5000;
      const timestamps = [1000, 2000, 3000, 4000];
      expect(pruneOutsideWindow(timestamps, windowMs, now)).toEqual([]);
    });

    it('모든 타임스탬프가 윈도우 안이면 그대로 반환한다', () => {
      const now = 5000;
      const timestamps = [4001, 4500, 5000];
      expect(pruneOutsideWindow(timestamps, windowMs, now)).toEqual([
        4001, 4500, 5000,
      ]);
    });

    it('원본 배열을 변경하지 않는다', () => {
      const now = 5000;
      const timestamps = [4001, 4500];
      const result = pruneOutsideWindow(timestamps, windowMs, now);
      expect(result).toEqual(timestamps);
    });
  });

  describe('isWithinLimit', () => {
    it('윈도우 내 개수가 maxCount 미만이면 true를 반환한다', () => {
      const now = 5000;
      const timestamps = [4001, 4100, 4200]; // 3개
      expect(isWithinLimit(timestamps, windowMs, 10, now)).toBe(true);
    });

    it('윈도우 내 개수가 maxCount와 같으면 false를 반환한다', () => {
      const now = 5000;
      const timestamps = Array.from({ length: 10 }, (_, i) => 4001 + i);
      expect(isWithinLimit(timestamps, windowMs, 10, now)).toBe(false);
    });

    it('윈도우 내 개수가 maxCount를 초과하면 false를 반환한다', () => {
      const now = 5000;
      const timestamps = Array.from({ length: 11 }, (_, i) => 4001 + i);
      expect(isWithinLimit(timestamps, windowMs, 10, now)).toBe(false);
    });

    it('윈도우 밖 타임스탬프는 개수에 포함하지 않는다', () => {
      const now = 5000;
      const oldOnes = [1000, 2000, 3000, 4000];
      const inWindow = [4001, 4002];
      expect(
        isWithinLimit([...oldOnes, ...inWindow], windowMs, 10, now)
      ).toBe(true);
    });

    it('빈 배열이면 maxCount와 관계없이 true를 반환한다', () => {
      expect(isWithinLimit([], windowMs, 10, 5000)).toBe(true);
      expect(isWithinLimit([], windowMs, 1, 5000)).toBe(true);
    });
  });

  describe('appendTimestamp', () => {
    it('빈 배열에 now를 붙이면 [now]를 반환한다', () => {
      const now = 5000;
      expect(appendTimestamp([], windowMs, now)).toEqual([now]);
    });

    it('윈도우 밖 항목을 제거한 뒤 now를 붙인 새 배열을 반환한다', () => {
      const now = 5000;
      const timestamps = [4000, 4001, 4500]; // 4000은 제외됨 (boundary 4000)
      expect(appendTimestamp(timestamps, windowMs, now)).toEqual([
        4001, 4500, now,
      ]);
    });

    it('원본 배열을 변경하지 않는다', () => {
      const now = 5000;
      const timestamps = [4001, 4500];
      const result = appendTimestamp(timestamps, windowMs, now);
      expect(timestamps).toEqual([4001, 4500]);
      expect(result).not.toBe(timestamps);
    });

    it('반환된 배열의 마지막 요소는 now이다', () => {
      const now = 6000;
      const timestamps = [5001, 5500];
      const result = appendTimestamp(timestamps, windowMs, now);
      expect(result[result.length - 1]).toBe(now);
    });
  });
});
