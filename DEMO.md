# 🎯 Demostración de la Aplicación Expense Control

## 🚀 Inicio Rápido

### 1. Iniciar la Aplicación
```bash
./start.sh
```

### 2. Acceder a la Aplicación
- **Frontend**: https://work-2-mzytnvcdszswlgqa.prod-runtime.all-hands.dev
- **Backend API**: https://work-1-mzytnvcdszswlgqa.prod-runtime.all-hands.dev

### 3. Cuentas de Prueba
- **Administrador**: 
  - Usuario: `admin`
  - Contraseña: `admin123`
- **Usuario Regular**: 
  - Usuario: `user1`
  - Contraseña: `user123`

## 🎮 Funcionalidades Demostradas

### 🔐 Sistema de Autenticación

#### Registro de Usuario
1. Ir a la página de registro
2. Completar el formulario con:
   - Username
   - Email
   - Nombre y Apellido
   - Contraseña
3. El sistema automáticamente:
   - Valida los datos
   - Hashea la contraseña con bcrypt
   - Crea el usuario en MySQL
   - Genera un JWT token
   - Redirige al dashboard

#### Login
1. Usar las credenciales de prueba
2. El sistema valida contra la base de datos
3. Genera un nuevo JWT token
4. Almacena la sesión en localStorage
5. Redirige al dashboard personalizado

### 🏠 Dashboard
- Muestra información del usuario logueado
- Diferentes vistas según el rol (admin/user)
- Navegación contextual
- Información de perfil completa

### 👥 Gestión de Usuarios (Solo Administradores)

#### Ver Lista de Usuarios
- Tabla completa con todos los usuarios
- Información detallada: username, email, nombre, rol, fecha de creación
- Badges visuales para roles
- Acciones disponibles por usuario

#### Crear Usuario
1. Click en "Add New User"
2. Formulario modal con validación
3. Campos: username, email, nombre, apellido, contraseña, rol
4. Validación en tiempo real
5. Creación automática en base de datos

#### Editar Usuario
1. Click en "Edit" en cualquier usuario
2. Formulario pre-poblado con datos actuales
3. Opción de cambiar contraseña (opcional)
4. Actualización en tiempo real
5. Validación de datos

#### Eliminar Usuario
1. Click en "Delete"
2. Confirmación de seguridad
3. Eliminación de base de datos
4. Actualización automática de la lista

### 🔒 Seguridad Implementada

#### Autenticación JWT
- Tokens con expiración de 24 horas
- Validación en cada request
- Renovación automática de sesión
- Logout seguro

#### Protección de Rutas
- Rutas protegidas requieren autenticación
- Rutas de admin requieren rol específico
- Redirección automática si no autorizado
- Validación tanto en frontend como backend

#### Validación de Datos
- Validación en frontend (tiempo real)
- Validación en backend (express-validator)
- Sanitización de inputs
- Prevención de inyección SQL

#### Hash de Contraseñas
- bcrypt con salt rounds configurables
- Nunca se almacenan contraseñas en texto plano
- Verificación segura en login

## 🧪 Pruebas de API

### Endpoints de Autenticación

#### Registro
```bash
curl -X POST http://localhost:12000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

#### Login
```bash
curl -X POST http://localhost:12000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

#### Perfil
```bash
curl -X GET http://localhost:12000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Endpoints de Usuarios (Admin)

#### Listar Usuarios
```bash
curl -X GET http://localhost:12000/api/users \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

#### Crear Usuario
```bash
curl -X POST http://localhost:12000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "username": "newuser",
    "email": "new@example.com",
    "password": "newpass123",
    "first_name": "New",
    "last_name": "User",
    "role": "user"
  }'
```

#### Actualizar Usuario
```bash
curl -X PUT http://localhost:12000/api/users/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN" \
  -d '{
    "first_name": "Updated",
    "last_name": "Name"
  }'
```

#### Eliminar Usuario
```bash
curl -X DELETE http://localhost:12000/api/users/2 \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## 🎨 Características de UI/UX

### Diseño Responsive
- Funciona en desktop, tablet y móvil
- Componentes adaptativos
- Navegación intuitiva

### Feedback Visual
- Mensajes de error claros
- Estados de carga
- Confirmaciones de acciones
- Badges y estados visuales

### Experiencia de Usuario
- Formularios con validación en tiempo real
- Navegación contextual según rol
- Logout seguro
- Manejo de errores elegante

## 🔧 Arquitectura Técnica

### Backend (Node.js/Express)
- API RESTful
- Middleware de autenticación
- Validación de datos
- Conexión MySQL
- Manejo de errores centralizado

### Frontend (React)
- Componentes funcionales con hooks
- Context API para estado global
- React Router para navegación
- Axios para llamadas API
- Webpack para bundling

### Base de Datos (MySQL)
- Tabla de usuarios normalizada
- Índices para performance
- Constraints de integridad
- Timestamps automáticos

## 🛠️ Comandos Útiles

### Desarrollo
```bash
# Backend
cd backend && npm run dev

# Frontend  
cd frontend && npm start

# Base de datos
mysql -u root -p expense_control
```

### Producción
```bash
# Usar Docker Compose
docker-compose up -d

# O scripts de inicio
./start.sh
./stop.sh
```

### Logs
```bash
# Ver logs del backend
tail -f logs/backend.log

# Ver logs del frontend
tail -f logs/frontend.log
```

## 🎯 Casos de Uso Demostrados

1. **Registro de nuevo usuario** → Validación → Creación en BD → Login automático
2. **Login de usuario existente** → Validación → JWT → Dashboard
3. **Navegación protegida** → Verificación de token → Acceso/Denegación
4. **Gestión de usuarios (Admin)** → CRUD completo → Validaciones → Actualizaciones
5. **Cambio de roles** → Actualización → Nuevos permisos
6. **Logout seguro** → Limpieza de sesión → Redirección

## 🚀 Próximos Pasos

Esta aplicación base puede extenderse con:
- Gestión de gastos/ingresos
- Categorías y etiquetas
- Reportes y gráficos
- Exportación de datos
- Notificaciones
- API de terceros
- Aplicación móvil