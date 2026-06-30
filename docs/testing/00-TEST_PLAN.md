# 00. 테스트 작업 계획 (Test Plan)

테스트 코드를 작성하거나 커버리지를 높이는 작업을 시작하기 전에 이 문서를 먼저 읽으세요.

## 1. 작업 시작 전 확인사항

1. `docs/back-code-convention.md` §4 "테스트 코드"를 읽고 팀 컨벤션을 숙지합니다.
2. 현재 커버리지 상태를 확인합니다.
   ```bash
   cd backend
   ./gradlew jacocoTestReport
   open build/reports/jacoco/test/html/index.html   # 또는 HTML 파일을 직접 읽어서 분석
   ```
3. [03-COVERAGE_ANALYSIS.md](03-COVERAGE_ANALYSIS.md)의 절차에 따라 부족한 부분을 분석하고, **사용자에게 결과를 보고한 뒤 승인을 받기 전에는 테스트 코드를 작성하지 않습니다.** 단순히 커버리지 숫자를 올리기 위해 의미 없는 테스트를 추가하지 않습니다.

## 2. 테스트 범위 원칙 (무엇을 테스트하는가)

`docs/back-code-convention.md` §4.1을 따릅니다.

- **항상 테스트**: `domain` 계층, `application`(Service) 계층
- **조건부 테스트**: `repository`는 커스텀 쿼리 메서드를 작성한 경우에만 테스트
- **테스트하지 않음**: 단순 getter/setter, Lombok이 생성한 코드, DTO의 정적 팩토리 메서드 외 로직 없는 변환 코드, `@Configuration` 클래스의 단순 빈 등록
- **인수 테스트**: 조각 테스트(piece) + 시나리오 테스트(scenario) 조합으로 비즈니스 플로우를 검증 (자세한 내용은 [01-WRITING_TESTS.md](01-WRITING_TESTS.md) 참고)

## 3. 작업 절차 (승인 이후)

0. **[03-COVERAGE_ANALYSIS.md](03-COVERAGE_ANALYSIS.md)에 따라 분석 결과를 보고하고 사용자 승인을 받은 상태**여야 합니다. 승인 없이 이 단계로 넘어가지 않습니다.
1. 테스트할 대상 클래스를 정하고, 기존에 비슷한 클래스의 테스트가 있다면 먼저 읽어 스타일을 파악합니다.
   - Service 테스트 예시: `backend/src/test/java/com/pickeat/backend/pickeat/application/PickeatServiceTest.java`
   - 시나리오 테스트 예시: `backend/src/test/java/com/pickeat/backend/acceptance_test/scenario/PickeatByWishScenarioTest.java`
2. [01-WRITING_TESTS.md](01-WRITING_TESTS.md)의 규칙에 따라 테스트를 작성합니다.
3. 테스트를 작성한 즉시 실행해서 통과하는지 확인합니다. 절대 여러 개를 한 번에 작성하고 마지막에 한꺼번에 실행하지 않습니다.
   ```bash
   ./gradlew test --tests "*{작성한클래스명}*"
   ```
4. 모든 변경을 마친 뒤 [02-QUALITY_CHECK.md](02-QUALITY_CHECK.md) 체크리스트를 수행합니다.

## 4. 한 번에 진행할 작업 단위

- 한 번에 한 클래스(또는 밀접하게 연관된 한 묶음) 단위로 테스트를 작성하고 검증한 뒤 다음으로 넘어갑니다.
- 커버리지를 올리기 위해 여러 클래스를 동시에 손대고 마지막에 몰아서 빌드하지 않습니다 — 실패 지점을 찾기 어려워집니다.

## 5. 하지 말아야 할 것

- 기존 프로덕션 코드의 동작을 테스트를 통과시키기 위해 임의로 변경하지 않습니다. 정말 버그를 발견했다면 별도로 보고하고, 테스트 작업과 분리합니다.
- 의미 없는 assertion(예: `assertThat(true).isTrue()`)으로 커버리지만 채우지 않습니다.
- 외부 의존성(외부 API, S3, 카카오 로그인 등)을 실제로 호출하는 테스트를 작성하지 않습니다 — 반드시 Mock 또는 기존 Fake(`backend/src/test/java/com/pickeat/backend/fake/`)를 사용합니다.
