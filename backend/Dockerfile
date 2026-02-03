FROM eclipse-temurin:21-jre

WORKDIR /app

RUN mkdir -p /logs/dumps && chmod -R 777 /logs

COPY build/libs/*.jar ./app.jar
COPY agent/opentelemetry-javaagent.jar /otel/opentelemetry-javaagent.jar

EXPOSE 8080

ENV JAVA_OPTS="-XX:InitialRAMPercentage=70.0 \
           -XX:MaxRAMPercentage=70.0 \
           -XX:MetaspaceSize=128M \
           -XX:MaxMetaspaceSize=256M \
           -XX:+UseG1GC \
           -XX:+UseContainerSupport \
           -XX:+HeapDumpOnOutOfMemoryError \
           -XX:HeapDumpPath=/logs/dumps/heapdump.hprof \
           -XX:ErrorFile=/logs/hs_err_pid%p.log \
           -Xlog:gc=info:file=/logs/gc.log:time,uptime:filecount=3,filesize=5M"

ENTRYPOINT ["sh", "-c", "java -javaagent:/otel/opentelemetry-javaagent.jar ${JAVA_OPTS:-} -Dspring.profiles.active=${SPRING_ACTIVE_PROFILE:-dev} -jar /app/app.jar"]
