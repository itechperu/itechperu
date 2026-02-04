# Sistema de Autenticación - iTech Peru

## 🔐 Configuración Completada

Se ha implementado un sistema completo de autenticación con NextAuth para el panel de administración.

## 📋 Características

- ✅ Registro de usuarios
- ✅ Inicio de sesión con email y contraseña
- ✅ Sistema de roles (Admin/Usuario)
- ✅ Protección de rutas del panel admin
- ✅ Sesiones seguras con JWT
- ✅ Contraseñas encriptadas con bcrypt

## 🚀 Cómo Usar

### 1. Crear el Primer Usuario Administrador

Ejecuta este comando para crear un usuario admin por defecto:

```bash
node scripts/create-admin.js
```

**Credenciales por defecto:**
- Email: `admin@itech.pe`
- Contraseña: `admin123`

⚠️ **IMPORTANTE:** Cambia estas credenciales después del primer login.

### 2. Acceder al Sistema

#### Registro de Nuevos Usuarios
1. Ve a: `http://localhost:3002/auth/register`
2. Completa el formulario
3. Los nuevos usuarios NO son admin por defecto

#### Iniciar Sesión
1. Ve a: `http://localhost:3002/auth/login`
2. Ingresa email y contraseña
3. Si eres admin, verás el botón "Admin Panel" en el navbar

### 3. Convertir Usuario en Admin

Para dar permisos de admin a un usuario existente, ejecuta en la consola de Prisma:

```bash
npx prisma studio
```

Luego:
1. Abre la tabla `User`
2. Encuentra el usuario
3. Cambia `isAdmin` a `true`

## 🔒 Rutas Protegidas

- `/admin/*` - Solo accesible para usuarios con `isAdmin: true`
- `/auth/login` - Página de inicio de sesión
- `/auth/register` - Página de registro

## 🎨 Diseño

Las páginas de autenticación usan el mismo diseño premium con:
- Glassmorphism
- Gradientes verdes (tema refurbished)
- Animaciones suaves
- Responsive design

## 📝 Variables de Entorno

Asegúrate de tener en tu `.env`:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="tu-secreto-super-seguro-cambialo-en-produccion"
NEXTAUTH_URL="http://localhost:3002"
```

## 🛠️ Tecnologías Usadas

- **NextAuth.js** - Autenticación
- **Prisma** - ORM y base de datos
- **bcryptjs** - Encriptación de contraseñas
- **SQLite** - Base de datos
- **Gravity UI** - Componentes UI

## 📱 Flujo de Usuario

1. Usuario se registra → Cuenta creada (no admin)
2. Usuario inicia sesión → Sesión activa
3. Si es admin → Puede acceder a `/admin`
4. Si no es admin → Ve mensaje de "Acceso Denegado"
5. Usuario cierra sesión → Botón "Salir" en navbar

## 🔄 Próximos Pasos Recomendados

- [ ] Implementar recuperación de contraseña
- [ ] Agregar verificación de email
- [ ] Panel de gestión de usuarios en admin
- [ ] Logs de actividad
- [ ] Autenticación de dos factores (2FA)
