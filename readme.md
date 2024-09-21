# API de Gestión de Usuarios, Eventos y Reservas

## Descripción

Esta API permite la gestión de usuarios, eventos y reservas. Implementa autenticación con JWT, control de roles (admin y user) y CRUD completo para los tres modelos principales: usuarios, eventos y reservas.

## Instalación
1.Dependencias a instalar: express, mongoose, mongodb, dotenv, bcrypt y jsonwebtoken
2.Instala las dependencias
npm install
3. Inicia la aplicación
npm run dev

### Endpoints

## Usuarios
POST /register
Descripción: Registra un nuevo usuario. El rol por defecto será user.

URL: /register
Método: POST
Body:
json

{
  "name": "string",
  "email": "string",
  "password": "string"
}

POST /login
Descripción: Inicia sesión para un usuario existente, devuelve un token JWT.

URL: /login
Método: POST
Body:
json

{
  "email": "string",
  "password": "string"
}

GET /users
Descripción: Obtiene todos los usuarios. Solo accesible para usuarios con rol admin.

URL: /users
Método: GET
Headers:
Authorization: Bearer <token>
PUT /users/
Descripción: Actualiza los datos de un usuario. Los usuarios user solo pueden modificar sus propios datos y no pueden cambiar su rol.

URL: /users/:id
Método: PUT
Body (opcional):
json

{
  "name": "string",
  "email": "string",
  "password": "string",
  "rol": "admin" or "user"
}

DELETE /users/
Descripción: Elimina un usuario. Los usuarios user solo pueden eliminar su propia cuenta.

URL: /users/:id
Método: DELETE
Headers:
Authorization: Bearer <token>


## Eventos
GET /eventos
Descripción: Obtiene todos los eventos.

URL: /eventos
Método: GET
POST /eventos
Descripción: Crea un nuevo evento. Solo usuarios con rol admin pueden crear eventos.

URL: /eventos
Método: POST
Headers:
Authorization: Bearer <token>
Body:
json
{
  "title": "string",
  "date": "string",
  "location": "string",
  "capacity": "number"
}

PUT /eventos/
Descripción: Actualiza un evento existente. Solo usuarios con rol admin pueden actualizar eventos.

URL: /eventos/:id
Método: PUT
Headers:
Authorization: Bearer <token>

DELETE /eventos/
Descripción: Elimina un evento existente. Solo usuarios con rol admin pueden eliminar eventos.

URL: /eventos/:id
Método: DELETE
Headers:
Authorization: Bearer <token>


## Reservas
GET /reservas
Descripción: Obtiene todas las reservas.

URL: /reservas
Método: GET
Headers:
Authorization: Bearer <token>
POST /reservas/newreserva
Descripción: Crea una nueva reserva. Los usuarios user solo pueden crear reservas para sí mismos, mientras que los admin pueden crear reservas para cualquier usuario.

URL: /reservas/newreserva
Método: POST
Headers:
Authorization: Bearer <token>
Body:
json
{
  "user": "user_id",
  "event": "event_id",
  "date": "string"
}

PUT /reservas/
Descripción: Actualiza una reserva. Solo los admin pueden actualizar reservas.

URL: /reservas/:id
Método: PUT
Headers:
Authorization: Bearer <token>


DELETE /reservas/
Descripción: Elimina una reserva. Los usuarios user solo pueden eliminar sus propias reservas, mientras que los admin pueden eliminar cualquier reserva.

URL: /reservas/:id
Método: DELETE
Headers:
Authorization: Bearer <token>
Autenticación




La API usa JWT (JSON Web Tokens) para la autenticación. Se debe incluir el token en los headers de las peticiones que requieren autenticación:

Authorization: Bearer <token>
Generación de token
El token se genera al iniciar sesión, y se incluye en la respuesta del endpoint /login.


Variables de entorno requeridas (visibles para el proyecto):
MONGO_URI: URI de conexión a la base de datos MongoDB.
JWT_SECRET: Clave secreta para la firma de tokens JWT.
