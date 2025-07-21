# 빌드용 jdk
FROM eclipse-temurin:21 as build

WORKDIR /app

# Gradle 관련 파일 복사
COPY build.gradle .
COPY settings.gradle .
COPY gradlew .
COPY gradle ./gradle

# 의존성 다운로드
RUN ./gradlew clean --no-daemon || true

# 소스 코드 복사
COPY src ./src

# 빌드 (테스트 제외)
RUN ./gradlew bootJar -x test --no-daemon

# 실행용 jre
FROM eclipse-temurin:21-jre

WORKDIR /app

# 빌드 결과물 복사
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

# 실행 (실시간 로그 확인 가능)
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS:-} -Dspring.profiles.active=dev -jar /app/app.jar"]
