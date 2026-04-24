# Stage 1: Build con Maven dentro del contenedor
FROM maven:3.9.5-eclipse-temurin-17 AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

# Stage 2: Runtime ligero
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
ENV SERVER_PORT=8080
EXPOSE 8080
COPY --from=builder /workspace/target/*.jar app.jar
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:8080/v1/api/student/health || exit 1
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
