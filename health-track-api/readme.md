## Configuración inicial

La aplicación requiere la creación de un usuario administrador para poder acceder al resto de funcionalidades protegidas.

### Crear administrador inicial

Realizar una petición `POST` al siguiente endpoint:

```http
POST http://localhost:8080/api/setup/admin
```

### Body de ejemplo

```json
{
  "firstName": "admin",
  "lastName": "admin",
  "secondName": "admin",
  "email": "admin@admin.com",
  "password": "admin"
}
```

---

## Inicio de sesión

Una vez creado el administrador, iniciar sesión mediante:

```http
POST http://localhost:8080/api/auth/login
```

### Body de ejemplo

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

La respuesta devolverá un token JWT necesario para acceder a los endpoints protegidos.

---

## Seguridad

- La creación del administrador solo está disponible si no existe previamente un usuario con rol `ADMIN`.
- El resto de endpoints requieren autenticación JWT.
- Los endpoints administrativos están protegidos mediante roles.