# ms-student Frontend

Aplicación web React para gestión de estudiantes, conectada al microservicio ms-student.

## Tecnologías
- React 18
- Vite
- Nginx (producción)
- Docker

---

## Ejecutar en modo desarrollo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

> El backend debe estar corriendo en `http://localhost:8080` para que los datos carguen.

---

## Construir imagen Docker

```bash
docker build -t ms-frontend:1.0 .
```

## Ejecutar contenedor

```bash
docker run -d -p 3000:80 ms-frontend:1.0
```

Abre `http://localhost:3000`.

---

## Funcionalidades

- Listar estudiantes con estadísticas (total, activos, inactivos)
- Registrar nuevo estudiante con formulario por pasos
- Editar estudiante existente
- Desactivar / Restaurar estudiante
- Validación de campos obligatorios

---

## Estructura

```
frontend/
├── Dockerfile          # Build multi-stage con Nginx
├── nginx.conf          # Proxy hacia la API
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx         # Componente principal con tabla
    ├── StudentForm.jsx # Formulario por pasos
    ├── api.js          # Llamadas al backend
    └── index.css       # Estilos
```
