# 클라이언트 Rate Limit 설계 요약

과도한 API 요청(무한 루프 추정, 서버 429) 방어 및 Sentry 보고를 위한 설계 요약.

---

## 목적

- **클라이언트 rate limit**: 동일 API를 짧은 시간에 과도하게 호출할 때 요청을 막고, 사용자를 에러 페이지로 이동.
- **서버 429**: 응답 수신 시 Sentry에 보고.
- **Sentry**: 발생 페이지, 문제된 API, 클라이언트/서버 구분, (클라이언트 시) store 스냅샷을 보고.

---

## 파일별 역할

### `apis/rateLimit/slidingWindow.ts`

- **역할**: 슬라이딩 윈도우 알고리즘의 **순수 계산 함수**만 제공.
- **내용**:
  - `pruneOutsideWindow`: 윈도우 밖 타임스탬프 제거.
  - `isWithinLimit`: 윈도우 내 개수로 허용 여부 판단.
  - `appendTimestamp`: 윈도우 밖 제거 후 타임스탬프 추가 (불변).
- **특징**: 부수 효과 없음, 테스트 용이.

---

### `apis/rateLimit/rateLimiter.ts`

- **역할**: **싱글톤**에 가까운 단일 모듈. 한도(윈도우·최대 횟수), 적용 대상 정책, 호출된 API별 타임스탬프를 **계산·기록·관리**.
- **내용**:
  - **정책 상수**: `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_COUNT`, `RATE_LIMIT_ENABLED_BY_METHOD`, `SKIP_LIST`.
  - **store**: `Map<key, number[]>` — 키별 타임스탬프 배열 (key = `method\nendPoint`).
  - **메서드**: `tryAcquire(method, endPoint, options?, now?)` — 적용 대상이면 체크 후 기록, 초과 시 `false` 반환.
  - **보고용**: `getSnapshotForReporting(method, endPoint)` — 해당 키의 타임스탬프 배열 복사본 반환 (Sentry용).
- **특징**: 모든 API 요청이 이 모듈 하나를 통해 제한되며, 페이지 이동 후에도 store는 유지됨.

---

### `apis/apiClient.ts`

- **역할**: 실제 HTTP 요청을 보내기 **직전**에 rate limit 적용, 초과 시 Sentry 보고 후 **리다이렉트**만 수행 (에러 throw 없음).
- **내용**:
  - `requestApi` 진입 시 `rateLimiter.tryAcquire(method, endPoint, options)` 호출.
  - **초과 시**: `getSnapshotForReporting` → `monitor.reportClientRateLimitError` → `window.location.replace(TOO_MANY_REQUESTS)` → pending Promise 반환 (fetch 미실행).
  - **서버 429 시**: `monitor.reportServerTooManyRequest` 호출 후 기존대로 `ApiError` throw.
- **특징**: 개별 API/훅에 에러 분기 추가 없이, apiClient 한 곳에서만 처리.

---

### `shared/utils/sentry.ts` (monitor)

- **역할**: Rate limit 관련 **Sentry 보고만** 담당 (클라이언트 초과 / 서버 429).
- **내용**:
  - `reportClientRateLimitError(method, endPoint, timestamps)`: 태그 `rate_limit_source: client`, Extra에 page, api_method, api_endpoint, rate_limit_timestamps, rate_limit_request_count.
  - `reportServerTooManyRequest(method, endPoint, serverMessage?)`: 태그 `rate_limit_source: server`, Extra에 page, api_method, api_endpoint, (선택) server_message.
- **특징**: `window.location`으로 현재 페이지 계산, Sentry에만 의존.

---

## 흐름 요약

1. **요청 시**: `apiClient` → `rateLimiter.tryAcquire` (slidingWindow 로직 사용).
2. **클라이언트 초과**: tryAcquire false → 스냅샷 수집 → Sentry 보고 → `window.location.replace` → 요청 중단.
3. **서버 429**: fetch 응답 429 → Sentry 보고 → ApiError throw.

---

## 에러 페이지

- **경로**: `ROUTE_PATH.TOO_MANY_REQUESTS` (`/error/too-many-requests`).
- **역할**: 안내 문구, 새로고침 버튼, (필요 시) Sentry 연동. `window.location.replace`로 진입하므로 SPA 상태 초기화.
