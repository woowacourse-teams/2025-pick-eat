# 02. 빌드 전 검증 체크리스트 (Quality Check)

테스트 작성/수정 작업을 마쳤다면, 커밋하거나 작업을 마무리로 보고하기 전에 아래를 모두 확인하세요.

## 1. 전체 테스트 통과 확인

```bash
cd backend
./gradlew test
```

- 새로 추가한 테스트뿐 아니라 **전체 테스트 스위트**가 통과해야 합니다. 기존 테스트를 깨뜨리지 않았는지 반드시 확인합니다.
- 실패가 있다면 원인을 분석합니다. 테스트를 통과시키기 위해 production 코드의 동작을 임의로 바꾸지 않습니다 (의도된 버그 수정이 아닌 한).

## 2. 커버리지 리포트 확인

```bash
./gradlew jacocoTestReport
```

- 리포트 경로: `backend/build/reports/jacoco/test/html/index.html` (HTML), `backend/build/reports/jacoco/test/jacocoTestReport.xml` (XML)
- 작업 전/후 커버리지를 비교해 의도한 패키지/클래스의 커버리지가 실제로 올라갔는지 확인합니다.
- 커버리지 수치만 올리고 의미 없는 테스트가 섞이지 않았는지 다시 검토합니다 ([00-TEST_PLAN.md](00-TEST_PLAN.md) §5 참고).

## 3. 커버리지 기준 검증 (선택)

```bash
./gradlew jacocoTestCoverageVerification
```

- 프로젝트 전체 최소 커버리지 기준(현재 60%, `backend/build.gradle`의 `jacocoTestCoverageVerification` 블록에서 조정 가능)을 통과하는지 확인합니다.
- 이 태스크는 `check`에 포함되어 있으므로 `./gradlew check` 한 번으로 test + jacoco 검증을 모두 수행할 수 있습니다.

## 4. 컨벤션 재확인

작성한 테스트가 다음을 만족하는지 다시 확인합니다.

- [ ] 클래스명이 `{대상클래스}Test` 형식인가
- [ ] 메서드명이 `{상황}_{기대결과}` 형식의 한글인가
- [ ] `// given / when / then` 구조를 따르는가
- [ ] 외부 의존성만 Mock/Fake 처리하고, 내부 도메인 객체는 실제 객체를 사용했는가
- [ ] 불필요하게 무거운 컨텍스트(`@SpringBootTest` 등)를 단위 테스트에 남용하지 않았는가
- [ ] 기존 Fixture/Fake를 재사용 가능한 경우 새로 만들지 않고 재사용했는가

## 5. 최종 보고 시 포함할 내용

작업을 마치고 사용자에게 보고할 때는 다음을 함께 전달합니다.

- 작성/수정한 테스트 클래스 목록과 경로
- `./gradlew test` 실행 결과 (통과 여부)
- 작업 전후 커버리지 변화 (가능하면 패키지 단위로)
- 의도적으로 테스트하지 않은 부분과 그 이유 (있다면)
