# CLAUDE.md

이 저장소에서 Claude Code(AI 에이전트)가 작업할 때 따라야 하는 진입점 문서입니다.

## 프로젝트 구조

- `backend/` — Spring Boot 3.5 (Java 21) 백엔드. Gradle 멀티 모듈 아님, 단일 모듈.
- `frontend/` — 프론트엔드 (이 문서의 범위 밖).
- `docs/back-code-convention.md` — 백엔드 코드 컨벤션 전체 (패키지 구조, 네이밍, REST 규칙, 테스트 규칙 §4, 아키텍처 등). 백엔드 코드를 작성/수정하기 전에 반드시 먼저 읽으세요.
- `docs/testing/` — 테스트 코드 작성 및 커버리지 향상 작업 전용 가이드. **테스트 코드를 작성하는 작업일 경우 아래 문서를 순서대로 읽고 따르세요.**

## 테스트 작성 작업 워크플로우

테스트 커버리지를 높이거나 새 테스트를 작성하는 작업이라면, 다음 순서로 문서를 읽으세요.

1. [docs/testing/00-TEST_PLAN.md](docs/testing/00-TEST_PLAN.md) — 작업 시작 전 워크플로우와 필수 확인사항
2. [docs/testing/03-COVERAGE_ANALYSIS.md](docs/testing/03-COVERAGE_ANALYSIS.md) — 커버리지 분석 → 사용자 보고 → **승인 후에만** 작성 진행 (먼저 코드를 쓰지 않습니다)
3. [docs/testing/01-WRITING_TESTS.md](docs/testing/01-WRITING_TESTS.md) — 테스트 작성 규칙 (네이밍, Given-When-Then, Mock 범위 등)
4. [docs/testing/02-QUALITY_CHECK.md](docs/testing/02-QUALITY_CHECK.md) — 빌드/커밋 전 검증 체크리스트

## 빌드 및 테스트 명령어

모든 명령어는 `backend/` 디렉토리에서 실행합니다.

```bash
./gradlew test                       # 전체 테스트 실행
./gradlew test --tests "*PickeatServiceTest"   # 특정 테스트 클래스만 실행
./gradlew jacocoTestReport           # 커버리지 리포트 생성 (test 이후 자동 실행됨)
./gradlew jacocoTestCoverageVerification  # 커버리지 기준(60%) 통과 여부 검증
./gradlew check                      # test + jacoco 검증 포함 전체 체크
```

커버리지 HTML 리포트: `backend/build/reports/jacoco/test/html/index.html`
