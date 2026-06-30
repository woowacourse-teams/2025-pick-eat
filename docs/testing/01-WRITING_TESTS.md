# 01. 테스트 작성 규칙 (Writing Tests)

`docs/back-code-convention.md` §4를 기반으로, 실제 코드베이스에서 관찰되는 구체적인 패턴까지 포함한 작성 가이드입니다.

## 1. 네이밍

- 테스트 클래스명: `{테스트대상클래스명}Test` (예: `PickeatServiceTest`, `RestaurantTest`)
- 테스트 메서드명: 한글로 작성하며 `{상황}_{기대결과}` 또는 `{메서드명}_{상황}_{기대결과}` 형태
  - 예: `외부용_픽잇_생성_성공`, `존재하지_않는_방_조회시_예외_발생`
- `@Nested` 클래스로 케이스를 그룹화할 때도 한글 클래스명을 사용합니다.
  - 예: `class 픽잇_생성_케이스 { ... }`
- 가능하면 `@DisplayName`으로 한글 설명을 추가합니다.

## 2. 본문 구조: Given-When-Then

테스트 메서드 내부는 `// given`, `// when`, `// then` 주석으로 구간을 명확히 구분합니다.

```java
@Test
void 외부용_픽잇_생성_성공() {
    // given
    Room room = createWithoutRoomRoom();

    // when
    PickeatResponse response = pickeatService.createForOutsider(room.getId(), request);

    // then
    assertThat(response.id()).isNotNull();
}
```

## 3. 계층별 테스트 전략

### 3.1 Domain 테스트

- 순수 Java 단위 테스트. 외부 의존성이 없으면 `@SpringBootTest` 등 무거운 어노테이션을 붙이지 않습니다.
- AssertJ(`assertThat`)를 사용합니다.

### 3.2 Service(Application) 테스트

- `@DataJpaTest` + `@Import({ServiceClass.class})` 조합을 사용해 실제 JPA 영속성 컨텍스트 위에서 서비스 로직을 검증합니다 (Mockito로 Repository를 mocking하지 않음).
  ```java
  @DataJpaTest
  @Import({PickeatService.class})
  public class PickeatServiceTest {

      @Autowired
      private TestEntityManager testEntityManager;

      @Autowired
      private PickeatService pickeatService;
  }
  ```
- 외부 의존성(외부 API 클라이언트, 메시징, S3 업로드 등)에 한해서만 `@ExtendWith(MockitoExtension.class)` + Mockito를 사용합니다. 내부 도메인 객체는 실제 객체를 사용합니다.
- 테스트 데이터는 `testEntityManager.persist(...)`로 직접 영속화하거나, `fixture/` 패키지의 Fixture 클래스를 사용합니다.
  - 예: `PickeatFixture.createWithoutRoom()`, `ParticipantFixture.create(pickeatId)`, `RoomFixture`, `UserFixture`
  - 새 Fixture가 필요하면 `backend/src/test/java/com/pickeat/backend/fixture/{Entity}Fixture.java`에 정적 팩토리 메서드로 추가합니다.

### 3.3 Repository 테스트

- 커스텀 쿼리 메서드를 작성한 경우에만 작성합니다. 단순 `findById`, `save` 등 Spring Data JPA가 자동 생성하는 메서드는 테스트하지 않습니다.
- `@DataJpaTest`를 사용하고, 연관관계 매핑이 의도대로 동작하는지도 함께 검증합니다.

### 3.4 외부 의존성 Fake/Mock

- 외부 클라이언트(SSE 서버, 이미지 업로드, 카카오 로그인 등)는 `backend/src/test/java/com/pickeat/backend/fake/` 아래 `Fake{Client}` 구현체 + `@Profile("test") @Configuration` 빈 등록 클래스 쌍으로 이미 준비되어 있는 경우가 많습니다. 새로 Mock을 만들기 전에 기존 Fake가 있는지 먼저 확인하세요.
  ```java
  @Profile({"test"})
  @Configuration
  public class FakeRestaurantSseServerClientConfig {
      @Bean
      public SseServerClient restaurantSseServerClient() {
          return new FakeRestaurantSseServerClient();
      }
  }
  ```
- Fake가 없는 새로운 외부 의존성이라면, 같은 패턴(`fake/{feature}/Fake{Client}.java` + `Fake{Client}Config.java`)으로 추가하는 것을 우선 고려합니다. 한 테스트에서만 쓰는 임시 Mock이 필요하면 Mockito `@ExtendWith(MockitoExtension.class)` + `@Mock`을 사용합니다.

## 4. 인수 테스트 (조각 + 시나리오)

- **조각 테스트 (piece)**: `backend/src/test/java/com/pickeat/backend/acceptance_test/piece/{feature}/{Feature}PieceTest.java`. `@Test`가 달린 독립 실행 테스트가 아니라, RestAssured 호출을 감싼 **정적 헬퍼 메서드 모음**입니다. 시나리오 테스트에서 재사용합니다.
- **시나리오 테스트 (scenario)**: `backend/src/test/java/com/pickeat/backend/acceptance_test/scenario/{Flow}ScenarioTest.java`. 여러 piece 헬퍼를 조합해 하나의 비즈니스 플로우(E2E)를 검증합니다.
  - `@SpringBootTest(webEnvironment = RANDOM_PORT)` + `@DirtiesContext(classMode = AFTER_CLASS)`를 클래스에 선언합니다.
  - `@BeforeEach`에서 `@LocalServerPort`를 받아 `RestAssured.port`에 설정합니다.
  - `@AfterEach`에서 `RestAssured.reset()`을 호출합니다.
- 새로운 비즈니스 플로우를 인수 테스트로 검증할 때는 새 piece를 만들기 전에 기존 piece에 재사용 가능한 헬퍼가 있는지 먼저 확인합니다.

## 5. 어노테이션 정렬

`docs/back-code-convention.md` §2.4와 동일하게, 식별성이 높은 어노테이션(`@DataJpaTest`, `@SpringBootTest` 등)을 먼저 배치하고 나머지는 가독성 순으로 정렬합니다.

## 6. ParameterizedTest

여러 입력값에 대해 동일한 검증 로직을 반복할 때는 개별 `@Test`를 복붙하지 말고 `@ParameterizedTest` + `@ValueSource`/`@MethodSource`를 사용합니다.
