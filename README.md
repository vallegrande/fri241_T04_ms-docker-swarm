# ms-student - CRUD de Estudiantes

Microservicio REST con Spring Boot WebFlux + PostgreSQL, contenerizado con Docker y orquestado con Docker Swarm.

## Herramientas
- Java 17
- Spring Boot 3.2.5
- Spring WebFlux + R2DBC
- PostgreSQL 15
- React + Vite + Nginx
- Docker + Docker Swarm

---

## Despliegue desde cero

### Paso 1: Inicializar Docker Swarm
```bash
docker swarm init
```

### Paso 2: Crear red y volumen externos
```bash
docker network create --driver overlay --attachable ms-net-swarm
docker volume create db-data
```

### Paso 3: Construir imágenes
```bash
# Backend
docker build -t ms-student:1.0 .

# Frontend
cd frontend
docker build -t ms-frontend:1.0 .
cd ..
```

### Paso 4: Desplegar el stack
```bash
docker stack deploy -c docker-compose.yml microservice
```

### Paso 5: Verificar servicios
```bash
docker service ls
docker stack services microservice
docker service ps microservice_ms-student
```

---

## Probar la aplicación

| URL | Descripción |
|-----|-------------|
| http://localhost:3000 | Frontend React |
| http://localhost:8080/swagger-ui.html | Swagger UI |
| http://localhost:8080/v1/api/student/health | Health check |

---

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /v1/api/student | Listar todos |
| GET    | /v1/api/student/{id} | Buscar por ID |
| POST   | /v1/api/student | Crear estudiante |
| PUT    | /v1/api/student/{id} | Actualizar |
| PATCH  | /v1/api/student/delete/{id} | Desactivar |
| PATCH  | /v1/api/student/restore/{id} | Restaurar |
| GET    | /v1/api/student/health | Health check |

## Ejemplo POST
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "documentType": "DNI",
  "documentNumber": "12345678",
  "email": "juan.perez@email.com",
  "grade": "10",
  "section": "A"
}
```

---

## Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   PostgreSQL    │
│   React + Nginx │◄──►│   Spring Boot   │◄──►│   Database      │
│   Port: 3000    │    │   Port: 8080    │    │   Port: 5432    │
│   2 réplicas    │    │   2 réplicas    │    │   1 réplica     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
          │                     │                      │
          └─────────────────────┼──────────────────────┘
                                │
                    ┌─────────────────┐
                    │  Docker Swarm   │
                    │  ms-net-swarm   │
                    └─────────────────┘
```

## Bonus implementados
- Healthchecks en Dockerfile y docker-compose
- Endpoint /health en la API
- Políticas de reinicio automático
- 2 réplicas del microservicio
- Frontend React contenerizado con Nginx
- Red overlay personalizada
- Volumen persistente para datos

---

## Limpiar todo
```bash
docker stack rm microservice
docker swarm leave --force
docker system prune -a -f
```
