# 📅 Calendar App - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.2-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.4-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue)]()

> Robust RESTful API backend for a calendar application with secure authentication and real-time event management.

## 📋 Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Patterns and Best Practices](#patterns-and-best-practices)
- [Sustainability and Scalability](#sustainability-and-scalability)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## 🎯 Project Description

This is a robust backend for a **MERN calendar application** (MongoDB, Express, React, Node.js). It provides a complete RESTful API that enables users to:

- ✅ Register and login securely
- ✅ Create, read, update, and delete events
- ✅ Manage their personal calendar
- ✅ JWT-based authentication
- ✅ Route protection and user authorization

The backend acts as the **central hub** of the application, providing authentication services, data persistence, and business logic.

---

## ✨ Features

### 🔐 Authentication & Security
- **JWT (JSON Web Tokens)** for stateless authentication
- **Bcrypt** for secure password encryption
- **Token refresh** for extended sessions
- Credential validation on every request

### 📅 Event Management
- Complete CRUD operations for events
- Input data validation
- Per-user authorization (only edit your own events)
- User-to-event relationships

### 🔄 Custom Middleware
- JWT validation
- Required field validation
- Centralized error handling

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|----------|
| **Node.js** | 18+ | JavaScript Runtime |
| **Express.js** | ^5.2 | Web Framework |
| **MongoDB** | Cloud | NoSQL Database |
| **Mongoose** | ^9.4 | MongoDB ODM |
| **JWT** | ^9.0 | Stateless Authentication |
| **Bcryptjs** | ^3.0 | Password Encryption |
| **CORS** | ^2.8 | Cross-Origin Access Control |
| **Dotenv** | ^17.4 | Environment Variables |
| **Express-validator** | ^7.3 | Data Validation |
| **Moment.js** | ^2.30 | Date Manipulation |
| **Nodemon** | ^3.1 | Development Auto-Reload |

---

## 🏗 Architecture

### Adapted MVC Pattern

```
backend/
├── controllers/       # Business logic
├── routes/           # Endpoint definitions
├── middlewares/      # Validation & authentication
├── models/           # Mongoose schemas
├── helpers/          # Utility functions (JWT, validations)
├── db/               # Database configuration
└── index.js          # Entry point
```

### Request Flow

```
Client (Frontend)
    ↓
Express Router (routes/)
    ↓
Middleware (validations, JWT)
    ↓
Controller (business logic)
    ↓
Model (Mongoose)
    ↓
MongoDB
    ↓
JSON Response to Client
```

---

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** (free account)
- **Git**

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure environment variables** (see next section)

4. **Verify connection**
```bash
npm run dev
# You should see: "Server running on port 4000"
```

---

## ⚙️ Configuration

### Environment Variables (.env)

Create a `.env` file in the project root:

```env
# Server port
PORT=4000

# MongoDB Atlas connection
# Format: mongodb+srv://username:password@cluster.mongodb.net/database-name
DB_CNN=mongodb+srv://username:password@cluster.mongodb.net/calendar-db

# Secret key for JWT (generate a strong one in production)
SECRET_JWT_SEED=your-super-secret-key-here
```

**⚠️ Production Security:**
- Use a strong, random `SECRET_JWT_SEED`
- DO NOT commit `.env` (add it to `.gitignore`)
- Use environment variables in CI/CD pipelines

---

## 🚀 Usage

### Development
```bash
# Start server with auto-reload
npm run dev
```

### Production
```bash
# Start server without nodemon
npm start
```

### Expected Console Output
```
Server running on port 4000
Successfully connected to database
```

---

## 📂 Project Structure

```
backend/
│
├── controllers/
│   ├── auth.js           # Registration, login, token renewal
│   └── events.js         # Event CRUD operations
│
├── routes/
│   ├── auth.js           # Endpoints: /api/auth/*
│   └── events.js         # Endpoints: /api/events/*
│
├── middlewares/
│   ├── validar-jwt.js    # JWT verification & decoding
│   └── validar-campos.js # Input data validation
│
├── models/
│   ├── Usuario.js        # User schema
│   └── Evento.js         # Event schema
│
├── helpers/
│   ├── jwt.js            # JWT generation functions
│   └── isDate.js         # Date validation
│
├── db/
│   └── config.js         # MongoDB connection
│
├── .env                  # Environment variables (NOT committed)
├── index.js              # Main entry point
├── package.json          # Dependencies & scripts
└── README.md             # This file
```

### Key Files

**`index.js`** - Entry Point
- Express configuration
- Database connection
- CORS enabled
- Main route definitions

**`controllers/auth.js`** - Authentication
- `crearUsuario()` - User registration
- `loginUsuario()` - User login
- `revalidarToken()` - JWT token renewal

**`controllers/events.js`** - Event Management
- `getEventos()` - Fetch all events
- `crearEvento()` - Create new event
- `actualizarEvento()` - Update event
- `eliminarEvento()` - Delete event

---

## 🎓 Patterns and Best Practices

### 1. **Stateless JWT Authentication**
```javascript
// Generate token with user information
const token = await generarJWT(uid, name);

// Middleware verifies without querying database each time
const {uid, name} = jwt.verify(token, SECRET_JWT_SEED);
```

**Benefit:** Scalability - no server-side sessions required.

### 2. **Chained Middleware**
```javascript
router.get('/renew',
    validarJWT,        // 1. Validates token
    revalidarToken     // 2. Generates new token
);
```

**Benefit:** Separation of concerns, reusability.

### 3. **Layered Validation**
```javascript
router.post('/new',
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({min:6}),
        validarCampos  // Executes validations
    ],
    crearUsuario
);
```

**Benefit:** Expressive validation, clear error messages.

### 4. **Authorization Control**
```javascript
// Only owner can edit their event
if(evento.user.toString() !== uid) {
    return res.status(401).json({msg: 'Not authorized'});
}
```

**Benefit:** Data protection, privacy.

### 5. **Separation of Concerns**
- **Controllers:** Business logic
- **Routes:** Endpoint definitions
- **Middlewares:** Validation & authentication
- **Models:** Data schemas
- **Helpers:** Reusable functions

---

## 📈 Sustainability and Scalability

### Sustainability

✅ **Maintainable Code**
- Clear, modular structure
- Descriptive naming
- Separation of concerns

✅ **Documentation**
- Complete README
- Critical code comments
- Clear folder structure

✅ **Updated Dependencies**
- Stable versions
- Minimal dependencies
- Clear license (ISC)

### Scalability

📊 **Horizontal:**
- Stateless JWT (no server sessions)
- Multiple instances possible
- Load balancer compatible

📊 **Vertical:**
- MongoDB Atlas (auto-scaling)
- Mongoose with optimized indexes
- Efficient `populate` relationships

📊 **Future Improvements:**
```
- Rate limiting to prevent abuse
- Redis caching
- Event pagination
- Advanced search & filtering
- Webhooks for notifications
- Centralized logging (Winston, Bunyan)
- Testing (Jest, Supertest)
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **POST** | `/new` | Register new user | ❌ |
| **POST** | `/` | User login | ❌ |
| **GET** | `/renew` | Renew expired JWT | ✅ |

### Events (`/api/events`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **GET** | `/` | Fetch all events | ✅ |
| **POST** | `/` | Create new event | ✅ |
| **PUT** | `/:id` | Update event | ✅ |
| **DELETE** | `/:id` | Delete event | ✅ |

#### Example Request - Registration

```bash
POST /api/auth/new
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "ok": true,
  "uid": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Example Request - Create Event

```bash
POST /api/events
Headers:
  x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Team Meeting",
  "notes": "Discuss Q2 roadmap",
  "start": "2024-12-15T10:00:00Z",
  "end": "2024-12-15T11:00:00Z"
}
```

---

## 🌐 Frontend Integration

This backend is designed to work with a **React frontend**. The frontend:

1. **Performs login** → Receives JWT
2. **Stores token** in localStorage
3. **Sends token** in `x-token` header on every request
4. **Auto-renews token** when expired
5. **Manages calendar** with synchronized events

### Expected Headers

```javascript
// Every backend request must include:
{
  'x-token': 'your-jwt-token-here',
  'Content-Type': 'application/json'
}
```

---

## 🤝 Contributing

Contributions are welcome! For significant changes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📝 Additional Notes

### Security
- Passwords are encrypted with **bcrypt** (salt rounds: 10)
- JWT tokens expire in **2 hours**
- CORS enabled for development (adjust for production)

### Database
- MongoDB Atlas with authentication
- Mongoose-validated schemas
- Unique indexes on user emails

### Development
- Use `npm run dev` for auto-reload with nodemon
- All logs printed to console
- Environment variables required to start

---

## 📄 License

This project is licensed under the **ISC** License.

---

## 👤 Author

**Fredy Velasquez**


