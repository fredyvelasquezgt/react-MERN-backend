# 📅 Calendar App - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.4-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue)]()

> Backend RESTful API para una aplicación de calendario con autenticación segura y gestión de eventos en tiempo real.

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Patrones y Buenas Prácticas](#patrones-y-buenas-prácticas)
- [Sostenibilidad y Escalabilidad](#sostenibilidad-y-escalabilidad)
- [Endpoints API](#endpoints-api)
- [Contribución](#contribución)

---

## 🎯 Descripción del Proyecto

Este es un backend robusto para una **aplicación de calendario MERN** (MongoDB, Express, React, Node.js). Proporciona una API RESTful completa que permite a los usuarios:

- ✅ Registrarse e iniciar sesión de forma segura
- ✅ Crear, leer, actualizar y eliminar eventos
- ✅ Gestionar su calendario personal
- ✅ Autenticación basada en JWT
- ✅ Protección de rutas y autorización por usuario

El backend actúa como el **hub central** de la aplicación, proporcionando servicios de autenticación, persistencia de datos y lógica de negocio.

---

## ✨ Características

### 🔐 Autenticación y Seguridad
- **JWT (JSON Web Tokens)** para autenticación sin estado
- **Bcrypt** para encriptación segura de contraseñas
- **Token refresh** automático para sesiones prolongadas
- Validación de credenciales en cada petición

### 📅 Gestión de Eventos
- CRUD completo de eventos
- Validación de datos de entrada
- Autorización por usuario (solo editar eventos propios)
- Relaciones entre usuarios y eventos

### 🔄 Middleware Personalizado
- Validación de JWT
- Validación de campos obligatorios
- Manejo centralizado de errores

---

## 🛠 Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **Express.js** | ^5.2 | Framework web |
| **MongoDB** | Cloud | Base de datos NoSQL |
| **Mongoose** | ^9.4 | ODM para MongoDB |
| **JWT** | ^9.0 | Autenticación sin estado |
| **Bcryptjs** | ^3.0 | Encriptación de contraseñas |
| **CORS** | ^2.8 | Control de acceso cross-origin |
| **Dotenv** | ^17.4 | Variables de entorno |
| **Express-validator** | ^7.3 | Validación de datos |
| **Moment.js** | ^2.30 | Manipulación de fechas |
| **Nodemon** | ^3.1 | Reloader en desarrollo |

---

## 🏗 Arquitectura

### Patrón MVC Adaptado

```
backend/
├── controllers/       # Lógica de negocio
├── routes/           # Definición de endpoints
├── middlewares/      # Validación y autenticación
├── models/           # Esquemas de Mongoose
├── helpers/          # Funciones utilitarias (JWT, validaciones)
├── db/               # Configuración de base de datos
└── index.js          # Punto de entrada
```

### Flujo de una Request

```
Cliente (Frontend)
    ↓
Express Router (routes/)
    ↓
Middleware (validaciones, JWT)
    ↓
Controller (lógica de negocio)
    ↓
Model (Mongoose)
    ↓
MongoDB
    ↓
Response JSON al Cliente
```

---

## 📦 Instalación

### Requisitos Previos
- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **MongoDB Atlas** (cuenta gratuita)
- **Git**

### Pasos

1. **Clonar el repositorio**
```bash
git clone <tu-repo-url>
cd backend
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno** (ver sección siguiente)

4. **Verificar conexión**
```bash
npm run dev
# Deberías ver: "Servidor corriendo en puerto 4000"
```

---

## ⚙️ Configuración

### Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=4000

# Conexión a MongoDB Atlas
# Formato: mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-bd
DB_CNN=mongodb+srv://username:password@cluster.mongodb.net/calendar-db

# Clave secreta para JWT (generar una fuerte en producción)
SECRET_JWT_SEED=tu-clave-secreta-super-segura
```

**⚠️ Seguridad en Producción:**
- Usa una `SECRET_JWT_SEED` robusta y aleatoria
- NO commits el `.env` (añadelo a `.gitignore`)
- Usa variables de entorno en CI/CD

---

## 🚀 Uso

### Desarrollo
```bash
# Inicia el servidor con auto-reload
npm run dev
```

### Producción
```bash
# Inicia el servidor sin nodemon
npm start
```

### Esperado en la consola
```
Servidor corriendo en puerto 4000
Conectado a la base de datos correctamente
```

---

## 📂 Estructura del Proyecto

```
backend/
│
├── controllers/
│   ├── auth.js           # Registro, login, renovación de token
│   └── events.js         # CRUD de eventos
│
├── routes/
│   ├── auth.js           # Endpoints: /api/auth/*
│   └── events.js         # Endpoints: /api/events/*
│
├── middlewares/
│   ├── validar-jwt.js    # Verifica y decodifica JWT
│   └── validar-campos.js # Valida datos de entrada
│
├── models/
│   ├── Usuario.js        # Schema para usuarios
│   └── Evento.js         # Schema para eventos
│
├── helpers/
│   ├── jwt.js            # Funciones de generación de JWT
│   └── isDate.js         # Validación de fechas
│
├── db/
│   └── config.js         # Conexión a MongoDB
│
├── .env                  # Variables de entorno (NO committed)
├── index.js              # Punto de entrada principal
├── package.json          # Dependencias y scripts
└── README.md             # Este archivo
```

### Archivos Clave

**`index.js`** - Punto de entrada
- Configuración de Express
- Conexión a BD
- CORS habilitado
- Definición de rutas principales

**`controllers/auth.js`** - Autenticación
- `crearUsuario()` - Registro de nuevo usuario
- `loginUsuario()` - Autenticación
- `revalidarToken()` - Renovar JWT expirado

**`controllers/events.js`** - Gestión de eventos
- `getEventos()` - Obtener todos los eventos
- `crearEvento()` - Crear nuevo evento
- `actualizarEvento()` - Editar evento
- `eliminarEvento()` - Eliminar evento

---

## 🎓 Patrones y Buenas Prácticas

### 1. **Autenticación JWT sin Estado**
```javascript
// Genera un token con información del usuario
const token = await generarJWT(uid, name);

// El middleware verifica sin consultar la BD cada vez
const {uid, name} = jwt.verify(token, SECRET_JWT_SEED);
```

**Beneficio:** Escalabilidad - no requiere sesiones en servidor.

### 2. **Middleware Encadenado**
```javascript
router.get('/renew',
    validarJWT,        // 1. Valida token
    revalidarToken     // 2. Genera nuevo token
);
```

**Beneficio:** Separación de responsabilidades, reutilización.

### 3. **Validación en Capas**
```javascript
router.post('/new',
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({min:6}),
        validarCampos  // Ejecuta validaciones
    ],
    crearUsuario
);
```

**Beneficio:** Validación expresiva, errores claros.

### 4. **Control de Autorización**
```javascript
// Solo el propietario puede editar su evento
if(evento.user.toString() !== uid) {
    return res.status(401).json({msg: 'No autorizado'});
}
```

**Beneficio:** Protección de datos, privacidad.

### 5. **Separación de Responsabilidades**
- **Controllers:** Lógica de negocio
- **Routes:** Definición de endpoints
- **Middlewares:** Validación y autenticación
- **Models:** Esquemas de datos
- **Helpers:** Funciones reutilizables

---

## 📈 Sostenibilidad y Escalabilidad

### Sostenibilidad

✅ **Código Mantenible**
- Estructura clara y modular
- Nombres descriptivos
- Separación de concerns

✅ **Documentación**
- README completo
- Comentarios en código crítico
- Estructura clara de carpetas

✅ **Dependencias Actualizadas**
- Versiones estables
- Dependencias mínimas
- Licencia clara (ISC)

### Escalabilidad

📊 **Horizontal:**
- JWT sin estado (sin sesiones en servidor)
- Stateless - múltiples instancias posibles
- Compatible con load balancers

📊 **Vertical:**
- MongoDB Atlas (escalable automáticamente)
- Mongoose con índices optimizados
- Relaciones `populate` eficientes

📊 **Mejoras Futuras:**
```
- Rate limiting para prevenir abuso
- Caché con Redis
- Paginación de eventos
- Búsqueda y filtrado avanzado
- Webhooks para notificaciones
- Logging centralizado (Winston, Bunyan)
- Testing (Jest, Supertest)
```

---

## 🔌 Endpoints API

### Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| **POST** | `/new` | Registrar nuevo usuario | ❌ |
| **POST** | `/` | Iniciar sesión | ❌ |
| **GET** | `/renew` | Renovar JWT expirado | ✅ |

### Eventos (`/api/events`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| **GET** | `/` | Obtener todos los eventos | ✅ |
| **POST** | `/` | Crear nuevo evento | ✅ |
| **PUT** | `/:id` | Actualizar evento | ✅ |
| **DELETE** | `/:id` | Eliminar evento | ✅ |

#### Ejemplo Request - Registro

```bash
POST /api/auth/new
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "ok": true,
  "uid": "507f1f77bcf86cd799439011",
  "name": "Juan Pérez",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Ejemplo Request - Crear Evento

```bash
GET /api/events
Headers:
  x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🌐 Integración Frontend

Este backend está diseñado para trabajar con un **frontend React**. El frontend:

1. **Realiza login** → Recibe JWT
2. **Almacena token** en localStorage
3. **Envía token** en header `x-token` en cada request
4. **Renueva token** automáticamente cuando expira
5. **Gestiona calendario** con eventos sincronizados

### Headers Esperados

```javascript
// Cada request al backend debe incluir:
{
  'x-token': 'jwt-token-aqui',
  'Content-Type': 'application/json'
}
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Para cambios significativos:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nombre`)
3. Commit cambios (`git commit -am 'Agrega feature'`)
4. Push a la rama (`git push origin feature/nombre`)
5. Abre un Pull Request

---

## 📝 Notas Adicionales

### Seguridad
- Las contraseñas se encriptan con **bcrypt** (salt rounds: 10)
- Tokens JWT expiran en **2 horas**
- CORS está habilitado para desarrollo (ajustar en producción)

### Base de Datos
- MongoDB Atlas con autenticación
- Esquemas validados con Mongoose
- Índices únicos en email de usuarios

### Desarrollo
- Usa `npm run dev` para auto-reload con nodemon
- Todos los logs se imprimen en consola
- Variables de entorno requeridas para iniciar

---

## 📄 Licencia

Este proyecto está bajo licencia **ISC**.

---

## 👤 Autor

Desarrollado como parte del curso **React Zero to Expert**

---

**⭐ Si encontraste útil este proyecto, dale una star! ⭐**
