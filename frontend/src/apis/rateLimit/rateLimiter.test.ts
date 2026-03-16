import {
  rateLimiter,
  RATE_LIMIT_MAX_COUNT,
  RATE_LIMIT_WINDOW_MS,
} from './rateLimiter';

describe('rateLimiter', () => {
  describe('tryAcquire', () => {
    it('PATCH 메서드는 rate limit 적용 대상이 아니므로 항상 true를 반환한다', () => {
      const endPoint = '/test-patch-unique';
      const now = 10_000;

      for (let i = 0; i < 15; i++) {
        expect(rateLimiter.tryAcquire('PATCH', endPoint, undefined, now)).toBe(
          true
        );
      }
    });

    it('skipRateLimit 옵션이 true면 항상 true를 반환한다', () => {
      const endPoint = '/test-skip-unique';
      const now = 20_000;

      for (let i = 0; i < 15; i++) {
        expect(
          rateLimiter.tryAcquire('GET', endPoint, { skipRateLimit: true }, now)
        ).toBe(true);
      }
    });

    it(`동일 method+endPoint로 ${RATE_LIMIT_WINDOW_MS / 1000}초 창 내 ${RATE_LIMIT_MAX_COUNT}회까지는 true, ${RATE_LIMIT_MAX_COUNT + 1}회째는 false를 반환한다`, () => {
      const endPoint = '/test-limit-unique';
      const now = 30_000;

      for (let i = 0; i < RATE_LIMIT_MAX_COUNT; i++) {
        expect(rateLimiter.tryAcquire('GET', endPoint, undefined, now)).toBe(
          true
        );
      }
      expect(rateLimiter.tryAcquire('GET', endPoint, undefined, now)).toBe(
        false
      );
    });

    it('윈도우가 지나면 슬라이딩 윈도우가 밀려 다시 허용된다', () => {
      const endPoint = '/test-window-unique';
      const nowFirst = 40_000;
      const nowAfterWindow = nowFirst + RATE_LIMIT_WINDOW_MS + 1;

      for (let i = 0; i < RATE_LIMIT_MAX_COUNT; i++) {
        rateLimiter.tryAcquire('GET', endPoint, undefined, nowFirst);
      }
      expect(
        rateLimiter.tryAcquire('GET', endPoint, undefined, nowFirst)
      ).toBe(false);

      expect(
        rateLimiter.tryAcquire('GET', endPoint, undefined, nowAfterWindow)
      ).toBe(true);
    });

    it('서로 다른 endpoint는 별도로 카운트되어 각각 한도까지 허용된다', () => {
      const endPointA = '/test-key-a-unique';
      const endPointB = '/test-key-b-unique';
      const now = 50_000;

      for (let i = 0; i < RATE_LIMIT_MAX_COUNT; i++) {
        expect(
          rateLimiter.tryAcquire('GET', endPointA, undefined, now)
        ).toBe(true);
      }
      for (let i = 0; i < RATE_LIMIT_MAX_COUNT; i++) {
        expect(
          rateLimiter.tryAcquire('GET', endPointB, undefined, now)
        ).toBe(true);
      }

      expect(rateLimiter.tryAcquire('GET', endPointA, undefined, now)).toBe(
        false
      );
      expect(rateLimiter.tryAcquire('GET', endPointB, undefined, now)).toBe(
        false
      );
    });


  });
});
