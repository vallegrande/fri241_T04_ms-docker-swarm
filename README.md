# ms-student - CRUD de Estudiantes

Microservicio REST con Spring Boot WebFlux + PostgreSQL, contenerizado con Docker y orquestado con Docker Swarm.

## Herramientas
- Java 17
- Spring Boot 3.2.5
- Spring WebFlux + R2DBC
- PostgreSQL 15
- Docker + Docker Swarm
- Swagger UI

## Ejecutar con Docker Compose
```bash
mvn clean package -DskipTests
docker-compose up --build
```

## Ejecutar con Docker Swarm
```bash
docker swarm init
docker stack deploy -c docker-compose.yml microservice
docker service ls
```

## Endpoints
- `GET    /v1/api/student`
- `GET    /v1/api/student/{id}`
- `POST   /v1/api/student`
- `PUT    /v1/api/student/{id}`
- `DELETE /v1/api/student/{id}`

## Swagger
http://localhost:8080/swagger-ui.html
