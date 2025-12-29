FROM eclipse-temurin:21-jre

WORKDIR /app

COPY build/libs/*.jar ./app.jar
COPY agent/opentelemetry-javaagent.jar /otel/opentelemetry-javaagent.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -javaagent:/otel/opentelemetry-javaagent.jar ${JAVA_OPTS:-} -Dspring.profiles.active=${SPRING_ACTIVE_PROFILE:-dev} -jar /app/app.jar"]
