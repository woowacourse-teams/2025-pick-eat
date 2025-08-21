FROM eclipse-temurin:21-jre

WORKDIR /app

COPY build/libs/*.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS:-} -Dspring.profiles.active=${SPRING_ACTIVE_PROFILE:-dev} -jar /app/app.jar"]
