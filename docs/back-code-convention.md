### 0. 기본 원칙

- 기본 컨벤션은 **우아한테크코스(우테코) 컨벤션**을 따릅니다.
- 팀 내 커스텀 컨벤션은 **페어 프로그래밍, PR 코드 리뷰를 통한 합의**로 점진적 도입을 지향합니다.
- 기술은 **단순하고 최소한**으로 적용하며, 도입 전 **토의 및 코치와의 검토**를 거칩니다.
- 개발은 **빠르게**, **리팩터링 데이**를 통해 품질을 높입니다.
- 객체 지향 생활 체조 원칙 준수를 지향합니다.

---

### 1. 프로젝트 구조 및 패키지 구조

#### 1.1 디렉토리 구성

- 디렉토리 명은 **모두 소문자 사용**

#### 1.2 패키지 구성

- 각각의 도메인 별로 아래와 같은 패키지를 구성합니다.

<pre><code>com.example.project
├── application        // Application service layer
├── ui                 // Web/controller layer
├── domain             // Domain layer
├── infrastructure     // 외부 시스템, 기술 의존성
├── global             // 공통 기능 패키지
    ├── auth           // 인증/인가 관련
    ├── config         // 설정 관련
    ├── exception      // 예외 처리
    ├── log            // 로깅 시스템
    └── datasource     // 데이터소스 관련
</code></pre>

#### 1.3 참고

- Application layer는 도메인을 사용하기 위한 비즈니스 로직을 다룹니다.
- `common` 대신 `global` 로 네이밍
- global 하위에 기능별 세분화된 패키지 구성

---

### 2. 코딩 스타일

#### 2.1 코드 스타일

- 기본적인 코딩 스타일은 기본 우테코 코드 컨벤션을 따릅니다.

#### 2.2 네이밍 규칙

- 변수/메서드: `camelCase` 사용
- Boolean 변수: `isSomething` 형태
- JPA 네이밍과 도메인 네이밍 분리
    - `find`: DB 작업
    - `get`: 도메인 작업

#### 2.3 final 규칙

- 가독성을 위해 메서드 파라미터에 final 키워드를 적용하지 않습니다.
- 기본적으로 클래스에 final 키워드를 적용하지 않습니다.
- 불변인 멤버 변수에 final 키워드를 적용합니다.

#### 2.4 어노테이션 규칙

- **아이덴티티 어노테이션을 최우선으로 배치**
- 나머지 어노테이션은 가독성을 고려한 순서로 정렬

```java

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
    // ...
}
```

---

### 3. REST API 규칙

#### 3.1 URI 및 메서드

- RESTful URI 작성:
  예) `/users/{id}`, `/posts/{id}/comments`
- HTTP 메서드: `GET`, `POST`, `PUT`, `DELETE`

#### 3.2 응답 코드

- `204` vs `404`는 **멱등성** 고려하여 선택
    - 동일한 삭제 요청을 여러 번 해도 같은 결과를 보장하려면 204(성공)
    - 리소스 존재 여부를 명확히 하려면 404(실패) 선택
    - 예: 삭제 시 없는 자원에 대한 응답을 어떻게 할 것인가? → **케이스에 따라 판단**

#### 3.3 에러 응답

- 에러응답으로는 스프링에서 제공하는 `ProblemDetail`를 활용합니다.
- 프론트 디버깅을 위한 **명확한 메시지 구성**
- **세분화된 예외 처리**: 요청 타입별, 상황별 구체적인 응답 제공

#### 3.4 HTTP 응답 처리

- **ResponseEntity<>는 세분화된 헤더 커스텀이 필요시에만 사용 (상태 코드 변경 불가)**
- 일반적인 경우 직접 DTO 반환

---

### 4. 테스트 코드

#### 4.1 테스트 범위

- 기본적으로 도메인과 서비스는 테스트합니다.
- 레파지토리의 경우 직접 쿼리를 작성한 경우에만 테스트합니다.
- 조각 테스트와 시나리오 테스트를 통하여 인수 테스트를 진행합니다.

#### 4.2 테스트 네이밍 규칙

- 테스트 클래스명: `{테스트대상클래스명}Test`
- 테스트 메서드명: `{메서드명}_{상황}_{기대결과}` 형태
- Given-When-Then 구조로 메서드 내용 작성

#### 4.3 테스트 어노테이션 및 설정

- `@DisplayName`으로 한글 설명 추가
- `@ParameterizedTest` 활용한 다양한 케이스 테스트
- Mock 객체는 **외부 의존성에 한해서만 사용**

#### 4.4 테스트 데이터 관리

- 테스트용 픽스처 데이터는 별도 클래스로 관리
- `@Sql` 어노테이션 활용한 테스트 데이터 초기화
- 테스트 간 격리를 위한 `@Transactional` 적용

#### 4.5 Repository 테스트

- `@DataJpaTest` 활용
- 커스텀 쿼리 메서드에 대한 테스트 작성
- 연관관계 매핑 검증

#### 4.6 Service 테스트

- `@ExtendWith(MockitoExtension.class)` 활용
- **외부 의존성(외부 API, 메시징 등)에 대해서만 Mock 처리**
- 내부 도메인 로직은 실제 객체 사용
- 비즈니스 로직 검증 중심

#### 4.7 인수 테스트 전략

- **조각 테스트**: 단위별 기능 검증 (Unit Test)
- **시나리오 테스트**: 여러 조각 테스트를 통합하여 비즈니스 플로우 검증
- 조각 테스트와 시나리오 테스트를 조합하여 **인수 테스트 수준의 검증** 달성

---

### 5. 기본 엔티티 설정

#### 5.1 BaseEntity 구성

```java

@Getter
@SoftDelete
@MappedSuperclass
@EqualsAndHashCode(of = "id")
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

#### 5.2 JPA 설정

```yaml
# application.yml
spring:
  jpa:
    properties:
      hibernate:
        default_batch_fetch_size: 100
    open-in-view: false  # OSIV 비활성화

# FetchType.LAZY 기본 설정
# N+1 문제는 발생 시점에 해결 (쿼리 로그 확인 용이)
```

#### 5.3 소프트 삭제 정책

- **@SoftDelete 어노테이션 활용**으로 논리적 삭제 구현
- BaseEntity에 통합 적용하여 일관성 유지
- 삭제된 데이터 조회 시 자동 필터링

---

### 6. 아키텍처 규칙

#### 6.1 의존성 방향

```
     UI Layer (Controller)
            ↓
    Application Layer (Service + DTO)
            ↓
      Domain Layer (Entity + Repository)
            ↑
  Infrastructure Layer (외부 시스템 연동)
```

- **헥사고날 아키텍처를 참고**한 계층형 구조
- **Repository는 도메인 계층에 위치** (JPA Repository 직접 사용)
- **DTO는 application 계층에만 존재**하며, 모든 데이터 변환 책임을 담당
- Infrastructure는 외부 API, 메시징 등 외부 시스템과의 연동 담당

### 7. DTO 관리 규칙

#### 7.1 DTO 위치 및 설계 원칙

- **DTO는 application 패키지에 위치**
- **Service → Controller 구간에서 DTO 변환 수행**
- 일급 컬렉션 사용하지 않음 (복잡도 증가 방지)
- 변환 로직은 정적 팩토리 메서드 활용

#### 7.2 데이터 타입 규칙

- null 안정성을 고려하여 요청/응답에 대한 데이터 타입 규칙 설정
    - **Request**: Wrapper 클래스 사용 (`Long`, `Integer`)
        - Wrapper 클래스로 null 값 허용하여 필수/선택 필드 구분 및 validation 처리 용이
    - **Response**: 원시 타입 사용 (`long`, `int`)
        - 원시 타입으로 null 안전성 보장 및 응답 데이터의 명확성 확보

```java
// Request DTO
public class UserCreateRequest {

    private Long departmentId;  // Wrapper 클래스
}

// Response DTO
public class UserResponse {

    private long id;  // 원시 타입
}
```

---

### 8. 로깅 시스템

#### 8.1 구조화된 로깅

```java

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private void logSafe(Log logObject, LogLevel level) {
        switch (level) {
            case INFO -> log.info(Markers.appendEntries(logObject.fields()), logObject.summary());
            case WARN -> log.warn(Markers.appendEntries(logObject.fields()), logObject.summary());
            case ERROR -> log.error(Markers.appendEntries(logObject.fields()), logObject.summary());
        }
    }
}
```

#### 8.2 로그 레벨별 처리

- **INFO**: 클라이언트 에러 (400번대)
- **WARN**: 인증/인가 실패 (401, 403)
- **ERROR**: 서버 에러 (500번대) 및 외부 API 에러

#### 8.3 Logstash 마커 활용

- **구조화된 로그 데이터** 생성
- 필드별 검색 및 분석 용이성 제공
- JSON 형태 로그 출력으로 파싱 효율성 증대

### 9. 데이터 검증 규칙

#### 9.1 검증 계층 분리

- **DTO 계층에서 형식 검증 수행**: null 체크, 타입 검증, 포맷 검증 등
- **도메인 계층에서 비즈니스 규칙 검증 수행**: 상태 전이, 도메인 제약사항 등

#### 9.2 DTO 검증 구현

Bean Validation 어노테이션을 활용하여 DTO 레벨에서 데이터 유효성을 검증합니다. 이를 통해 잘못된 데이터가 서비스 계층으로 전달되는 것을 사전에 방지할 수 있습니다.

```java

@Schema(description = "위치 기반 식당 생성 요청")
public record LocationRestaurantRequest(
        @Schema(description = "중심 위치의 x 좌표 (경도)", example = "127.134233269327")
        @NotNull(message = "x 좌표는 NULL일 수 없습니다.")
        Double x,

        @Schema(description = "중심 위치의 y 좌표 (위도)", example = "37.4098787808312")
        @NotNull(message = "y 좌표는 NULL일 수 없습니다.")
        Double y,

        @Schema(description = "검색 반경 (미터 단위)", example = "500")
        @NotNull(message = "반경 범위는 NULL일 수 없습니다.")
        @Positive(message = "반경은 양수여야 합니다.")
        Integer radius
) {

}
```

#### 9.3 검증 활성화

Controller 메서드 파라미터에 `@Valid` 또는 `@Validated` 어노테이션을 추가하여 자동 검증을 수행합니다. 검증 실패 시 `MethodArgumentNotValidException`이 발생하며,
이는 GlobalExceptionHandler에서 일괄 처리됩니다.

```java

@PostMapping("/restaurants/location")
public ResponseEntity<List<RestaurantResponse>> createLocationRestaurants(
        @Valid @RequestBody LocationRestaurantRequest request) {
    // 검증을 통과한 데이터만 서비스 계층으로 전달됨
}
```

---

### 10. 하위 호환성 관리

#### 10.1 API 버저닝 전략

레거시 코드의 하위 호환성을 유지하기 위해 API 버전 관리 전략을 수립합니다. 동일한 엔드포인트에서 요청/응답 스키마가 변경되는 경우, URI 경로에 버전을 명시하여 기존 클라이언트의 동작을 보장합니다.

**버저닝이 필요한 경우:**

- 요청/응답 DTO 구조 변경
- 필수 파라미터 추가 또는 제거
- 응답 데이터 형식 변경

**버저닝 방식:**

- URI 경로에 버전 명시: `/api/v1/...`, `/api/v2/...`
- 기존 버전은 deprecation 공지 후 일정 기간 유지
- 주요 변경사항은 API 문서에 명확히 기재

```java
// v1 - 기존 API
@GetMapping("/api/v1/restaurants")
public List<RestaurantResponse> getRestaurants() {
    // 기존 로직
}

// v2 - 응답 구조 변경 (페이징 추가)
@GetMapping("/api/v2/restaurants")
public PageResponse<RestaurantResponse> getRestaurants(Pageable pageable) {
    // 새로운 로직
}
```

#### 10.2 데이터베이스 스키마 마이그레이션

스키마 변경이 필요한 경우 새로운 컬럼 혹 테이블을 생성하여 마이그레이션을 수행합니다. 이는 롤백 가능성을 확보하고, 운영 중인 서비스에 대한 영향을 최소화하기 위함입니다.

**마이그레이션 절차**

1. 새로운 스키마로 테이블 생성 (예: `users_v2`)
2. 데이터 마이그레이션 스크립트 작성 및 실행
3. 애플리케이션 코드에서 새 테이블 참조로 변경
4. 충분한 검증 기간 후 기존 테이블 제거
