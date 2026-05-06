# Health Track

Aplicación full-stack de seguimiento de salud desarrollada con Spring Boot y Angular.

## Tecnologías

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT
- Maven
- PostgreSQL

### Frontend
- Angular
- TypeScript
- Angular Material

### DevOps
- Docker
- Docker Compose

---

## Características

- Autenticación JWT
- Gestión de usuarios y roles
- Backend REST API
- Frontend desacoplado
- Persistencia con PostgreSQL
- Contenedorización completa con Docker

---

## Estructura del proyecto

```txt
health-track/
├── health-track-api
├── health-track-front
├── docker-compose.yml
└── .env.example
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
POSTGRES_DB=health_track_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

JWT_SECRET=your_secret
JWT_EXPIRATION=86400000
```

---

## Ejecutar el proyecto con Docker

```bash
docker compose up --build -d
```

---

## Backend

Disponible en:

```txt
http://localhost:8080
```

---

## Frontend

Disponible en:

```txt
http://localhost:4200
```

---

## Estado del proyecto

Proyecto en desarrollo.
