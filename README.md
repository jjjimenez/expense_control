# Expense Control - User Management System

Una aplicación web completa con sistema de autenticación y CRUD de usuarios, construida con Node.js, Express, React y MySQL.

## Características

- ✅ Sistema de autenticación con JWT
- ✅ Login y registro de usuarios
- ✅ CRUD completo de usuarios (solo para administradores)
- ✅ Roles de usuario (admin/user)
- ✅ Interfaz responsive con React
- ✅ Base de datos MySQL
- ✅ Validación de datos en frontend y backend
- ✅ Protección de rutas
- ✅ Hash de contraseñas con bcrypt

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (JSON Web Tokens)
- bcryptjs
- express-validator
- CORS

### Frontend
- React 18
- React Router DOM
- Axios
- Webpack
- Babel

## Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

### Configuración del Backend

1. Navegar al directorio del backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus configuraciones de base de datos:
```
PORT=12000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=expense_control
JWT_SECRET=tu_jwt_secret_key
NODE_ENV=development
```

5. Iniciar el servidor:
```bash
npm run dev
```

### Configuración del Frontend

1. Navegar al directorio del frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar la aplicación:
```bash
npm start
```

### Usando Docker (Opcional)

1. Ejecutar con Docker Compose:
```bash
docker-compose up -d
```

## Uso de la Aplicación

### Acceso
- Frontend: http://localhost:12001
- Backend API: http://localhost:12000

### Funcionalidades

#### Para todos los usuarios:
- Registro de cuenta nueva
- Login con username/email y contraseña
- Ver dashboard personal
- Logout

#### Para administradores:
- Todas las funcionalidades de usuario
- Ver lista de todos los usuarios
- Crear nuevos usuarios
- Editar usuarios existentes
- Eliminar usuarios
- Cambiar roles de usuario

### Primer Usuario Administrador

Para crear el primer usuario administrador, puedes:

1. Registrarte normalmente a través de la interfaz
2. Conectarte directamente a la base de datos y cambiar el rol:
```sql
UPDATE users SET role = 'admin' WHERE username = 'tu_username';
```

O usar la API directamente:
```bash
curl -X POST http://localhost:12000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin123",
    "first_name": "Admin",
    "last_name": "User",
    "role": "admin"
  }'
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil del usuario actual
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios (Solo Administradores)
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Health Check
- `GET /api/health` - Verificar estado del servidor

## Estructura del Proyecto

```
expense_control/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Users.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── webpack.config.js
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Seguridad

- Las contraseñas se hashean con bcrypt
- Autenticación basada en JWT
- Validación de datos en frontend y backend
- Protección CORS configurada
- Middleware de autenticación para rutas protegidas
- Separación de roles (admin/user)

## Desarrollo

### Scripts Disponibles

Backend:
- `npm start` - Iniciar servidor en producción
- `npm run dev` - Iniciar servidor en desarrollo con nodemon

Frontend:
- `npm start` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.
