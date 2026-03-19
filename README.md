# Volunteer Bridge Backend API

## 📌 Project Description

Volunteer Bridge is a backend API built with **Node.js, Express, Sequelize, and PostgreSQL** for managing volunteer projects, tasks, reports, notifications, and users.

The system allows organizations to create projects, assign tasks to volunteers, track progress, submit reports, and send notifications.

This project is part of a collaborative backend development exercise.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- dotenv
- bcrypt
- Postman (for testing)

---

## 📂 Project Structure

```
backend
│
├─documentation
│ ├── api.md
│ ├── database.md
│ └── project_structure.md
│
├─node_modules
│
├─src
│ │
│ ├──── config
│ │ ├── database.js
│ │ ├── cors.js
│ │ └── env.js
│ │
│ ├── controllers
│ │ ├── auth.controller.js
│ │ ├── notification.controller.js
│ │ ├── report.controller.js
│ │ ├── user.controller.js
│ │ ├── volunteer.controller.js
│ │ ├── project.controller.js
│ │ └── task.controller.js
│ │
│ ├── models
│ │ ├── user.js
│ │ ├── Project.js
│ │ ├── report.js
│ │ ├── index.js
│ │ ├── volunteer.js
│ │ ├── Task.js
│ │ └── notification.model.js
│ │
│ ├── routes
│ │ ├── authRoutes.js
│ │ ├── notificationRoutes.js
│ │ ├── projectRoutes.js
│ │ ├── reportRoutes.js
│ │ ├── task Routes.js,
│ │ ├── userRoutes.js
│ │ └── volunteerRoutes.js
│ │
│ ├── middleware
│ │ ├── auth.js
│ │ ├── error.js
│ │ └── role.js
│ │
│ ├── services
│ │ ├── notification.service.js
│ │ └── report.js
│ │
│ ├── utils
│ └── generateTokens.js
│
├──db.js
├──.env
├──.gitignore
├──package-lock.json
├── packake.json
├── server.js
└── README.md

```

---

## ⚙️ Installation

Clone the repository

```
git clone <repo-url>
cd volunteer-bridge
```

Install dependencies

```
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root folder.

```
# Server Configuration
PORT = 5000
NODE_ENV = development

# Database Configuration
DATABASE_URL = postgresql://volunteer_user:QBclIxMZXXaVzZixSAG3WBJfFr4J6mkw@dpg-d6sk4r450q8c73fl26j0-a/volunteer_bridge
DB_HOST = localhost
DB_PORT = 5432
DB_DIALECT = postgres
DB_NAME = volunteer_bridge
DB_USER = volunteer_user
DB_PASSWORD = QBclIxMZXXaVzZixSAG3WBJfFr4J6mkw

# JWT Configuration
JWT_SECRET = your_super_secret_jwt_key_change_this
JWT_EXPIRY = 7d
```

---

## BackEnd Deployment Link

 https://volunteer-bridge-3.onrender.com
---

---

## 🔐 Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
```

---

## 📁 Projects

```
POST /api/projects
GET /api/projects
```

---

## 📌 Tasks

```
POST /api/tasks/projects/:projectId/tasks
GET /api/tasks/projects/:projectId/tasks
POST /api/tasks/:id/assign
```

---

## 📝 Reports

```
POST /api/reports
GET /api/reports/:id
GET /api/reports/user/:userId
GET /api/reports/project/:projectId
```

---

## 🔔 Notifications

```
GET /api/notifications
PUT /api/notifications/:id/read
```

---

## 👥 Volunteers

```
GET /api/volunteers
```

(Admin / authorized users only)

---

## 💰 Donations

```
POST /api/donations
GET /api/donations
```

---

## 🧪 Testing

Use Postman to test endpoints.

Steps:

1. Register user
2. Login
3. Copy token
4. Use Bearer Token in Authorization
5. Test endpoints

---

## 👨‍💻 Contributors

- Backend Dev. Team (Oladele Sunday, Leniency Yowika, Omonu Grant)
- TechCrush Group 4


---

## 📌 Notes

- All protected routes require JWT token
- Use Authorization → Bearer Token in Postman
- Server must be running before testing
- PostgreSQL must be running

---
