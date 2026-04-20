# ms-student - CRUD de Estudiantes

Microservicio REST con Spring Boot WebFlux + PostgreSQL, contenerizado con Docker y orquestado con Docker Swarm.

## Herramientas
- Java 17
- Spring Boot 3.2.5
- Spring WebFlux + R2DBC
- PostgreSQL 15 (primario + réplica solo lectura)
- Docker + Docker Swarm
- Swagger UI

---

## Cómo ejecutar el proyecto

### Paso 1: Compilar el proyecto
Antes de levantar los contenedores, necesitas generar el archivo `.jar`:
```bash
mvn clean package -DskipTests
```
Esto genera el archivo `target/ms-student-1.0.0.jar` que usa el Dockerfile.

### Paso 2: Levantar con Docker Compose
Docker Compose levanta todos los servicios definidos (API + BD primaria + BD réplica):
```bash
docker-compose up --build
```
- `--build` reconstruye la imagen del microservicio cada vez.
- Los contenedores se comunican a través de la red `ms-net`.
- La BD usa el volumen `db-data` para persistir los datos.

Para detenerlos:
```bash
docker-compose down
```

### Paso 3: Verificar que funciona
Abre el navegador en:
```
http://localhost:8082/swagger-ui.html
```
Desde Swagger puedes probar todos los endpoints visualmente.

También puedes probar el health check:
```
http://localhost:8082/v1/api/student/health
```
Debe responder: `{ "status": "UP", "service": "ms-student" }`

---

## Despliegue con Docker Swarm

### Paso 1: Inicializar el Swarm
```bash
docker swarm init
```
Convierte tu máquina en un nodo manager del clúster.

### Paso 2: Desplegar el stack
```bash
docker stack deploy -c docker-compose.yml microservice
```
Esto crea todos los servicios definidos en el compose dentro del Swarm.

### Paso 3: Verificar los servicios
```bash
docker service ls
```
Debes ver los servicios `microservice_db`, `microservice_db-replica` y `microservice_ms-student` con sus réplicas activas.

```bash
docker stack services microservice
```
Muestra el estado del stack completo.

```bash
docker service ps microservice_ms-student
```
Muestra el detalle de las tareas del microservicio.

---

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET    | /v1/api/student | Listar todos los estudiantes |
| GET    | /v1/api/student/{id} | Buscar estudiante por ID |
| POST   | /v1/api/student | Crear nuevo estudiante |
| PUT    | /v1/api/student/{id} | Actualizar estudiante |
| PATCH  | /v1/api/student/delete/{id} | Desactivar estudiante (status=I) |
| PATCH  | /v1/api/student/restore/{id} | Restaurar estudiante (status=A) |
| GET    | /v1/api/student/health | Health check del servicio |

## Ejemplo de cuerpo para POST/PUT
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

## Estructura de contenedores

| Servicio | Imagen | Puerto | Descripción |
|----------|--------|--------|-------------|
| ms-student | ms-student:1.0 | 8082 | API Spring Boot |
| db | postgres:15 | 5432 | BD primaria (lectura/escritura) |
| db-replica | postgres:15 | 5433 | BD réplica (solo lectura) |

- Red: `ms-net` (overlay para Swarm, bridge para Compose)
- Volúmenes: `db-data`, `db-replica-data`

---

## Frontend (React)

Para ejecutar el frontend en modo desarrollo:
```bash
cd frontend
npm install
npm run dev
```
Abre `http://localhost:5173` en el navegador.

Para construir la imagen Docker del frontend:
```bash
cd frontend
docker build -t ms-frontend:1.0 .
```
