# Test Bank

A full-stack web application for creating, managing, and organizing educational test questions. Teachers and educators can build rich question banks with support for mathematical expressions, rich-text editing, image uploads, and department-based organization.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User authentication** — registration, login, and session management with JWT
- **Question management** — create, view, and organize multiple-choice questions (A/B/C/D)
- **Rich-text editing** — CKEditor 5 and Froala Editor with full formatting support
- **Math expressions** — MathType, MathJax, KaTeX, and MathQuill integration
- **Image uploads** — attach images to questions via drag-and-drop or file picker
- **Department organization** — group users and questions by department
- **PDF export** — export questions to PDF using jsPDF and html2canvas
- **Keyboard shortcuts** — Ctrl+K to open the search window
- **Protected routes** — authentication-gated pages via React Router
- **Responsive UI** — Material-UI components with animate.css transitions

---

## Tech Stack

### Backend

| Package | Version | Purpose |
|---|---|---|
| Node.js | v18+ | Runtime |
| Express | ^4.22 | HTTP framework |
| Sequelize | ^6.37 | ORM |
| MySQL2 | ^3.x | Database driver |
| Passport + passport-jwt | ^0.7 / ^4.0 | Authentication strategy |
| bcrypt | ^5.1 | Password hashing |
| express-session | ^1.19 | Session management |
| connect-session-sequelize | ^8.0 | DB-backed sessions |
| jsonwebtoken | ^9.0 | JWT signing/verification |
| helmet | ^8.x | HTTP security headers |
| multer | ^1.4 | File/image uploads |
| morgan | ^1.11 | Request logging |
| cors | ^2.8 | Cross-origin resource sharing |
| dotenv | ^16.x | Environment variables |

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | ^18.3 | UI framework |
| Redux Toolkit | ^1.9 | State management |
| React Router v6 | ^6.30 | Client-side routing |
| Material-UI (MUI) | ^5.18 | Component library |
| CKEditor 5 | ^41.x | Rich-text editor |
| Froala Editor | ^4.x | Alternative rich-text editor |
| MathType (Wiris) | ^8.x | Math expression editor |
| KaTeX | ^0.17 | Math rendering |
| Axios | ^1.x | HTTP client |
| TypeScript | ^5.x | Type checking |
| jsPDF + html2canvas | ^2.x / ^1.4 | PDF generation |

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MySQL** 8.x running locally (default port `3306`, or `8889` for MAMP/XAMPP)
- Ports `3000` (frontend) and `5000` (backend) available

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nortadzhiev-rustam/test-bank.git
cd test-bank
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## Configuration

### Backend — `backend/.env`

Create `backend/.env` with the following variables:

```env
NODE_ENV=development
DB_NAME=test_generator
DB_USER=root
DB_PASS=your_mysql_password
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
```

### Backend — `backend/config/config.json`

Update the database connection settings for your environment:

```json
{
  "development": {
    "username": "root",
    "password": "your_mysql_password",
    "database": "test_generator",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

> **Note:** The default config targets port `8889` (MAMP default). Change to `3306` for standard MySQL installations.

### Frontend — `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000
```

### Create the database

```bash
mysql -u root -p -e "CREATE DATABASE test_generator;"
```

Then run Sequelize migrations to create tables:

```bash
cd backend
npx sequelize-cli db:migrate
```

Or let the application auto-sync the schema on first start (Sequelize `sync` is configured in `models/index.js`).

---

## Running the Application

### Development mode

Open two terminals:

**Terminal 1 — Backend:**

```bash
cd backend
npm start
# Server starts on http://localhost:5000
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

### Production build

```bash
cd frontend
npm run build
# Outputs optimized static files to frontend/build/
```

Serve the `build/` directory with any static file server, or configure Express to serve it.

---

## Project Structure

```
test-bank/
├── backend/
│   ├── index.js              # Entry point — starts server on port 5000
│   ├── app.js                # Express app, middleware registration
│   ├── middlewares.js        # Auth middleware, error handlers
│   ├── auth/
│   │   └── passport.js       # Passport JWT strategy
│   ├── config/
│   │   └── config.json       # Sequelize DB config (dev/test/prod)
│   ├── models/
│   │   ├── index.js          # Sequelize model loader
│   │   ├── User.js           # User model
│   │   ├── Test.js           # Question/Test model
│   │   └── Department.js     # Department model
│   └── api/
│       ├── index.js          # API router
│       ├── register.js       # POST /register
│       ├── login.js          # POST /login
│       ├── logout.js         # POST /logout
│       ├── auth.js           # GET /isAuth
│       ├── test.js           # GET|POST /questions
│       ├── department.js     # GET|POST /departments
│       ├── imageUpload.js    # POST /upload
│       └── payment.js        # GET /payment (protected stub)
│
└── frontend/
    ├── public/
    │   └── uploads/          # Uploaded images (served statically)
    └── src/
        ├── App.js            # Root component, routing setup
        ├── store/
        │   ├── store.js      # Redux store
        │   ├── userSlice.js  # Auth state
        │   ├── departmentSlice.js
        │   └── TestSlice.js
        ├── routes/
        │   └── ProtectedRoute.js
        ├── components/
        │   ├── Login.js
        │   ├── Register.js
        │   ├── QuestionCard.js
        │   ├── AnswersCard.js
        │   ├── Editor.js / EditorV2.js
        │   ├── MathDialog.js
        │   ├── searchWindow.js
        │   └── ...
        └── container/
            ├── Home.js
            ├── NavBar.js
            ├── Profile.js
            ├── TestInsertWindow.js
            ├── TestGenerateWindow.js
            └── my.js
```

---

## API Reference

Base URL: `http://localhost:5000/api/v1`

### Authentication

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|:---:|
| POST | `/register` | Create a new user account | No |
| POST | `/login` | Login and start a session | No |
| GET | `/isAuth` | Check if the current session is valid | No |
| POST | `/logout` | Destroy the current session | Yes |

**Register request body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "password": "secret",
  "departmentId": 1
}
```

**Login request body:**
```json
{
  "email": "jane@example.com",
  "password": "secret"
}
```

### Questions

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|:---:|
| GET | `/questions` | Fetch all questions (includes user & department) | Yes |
| POST | `/questions` | Create a new question with optional image | Yes |

**Create question request body (multipart/form-data):**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Question title |
| `question` | string (HTML) | Question body (rich text) |
| `answerA` | string | Choice A |
| `answerB` | string | Choice B |
| `answerC` | string | Choice C |
| `answerD` | string | Choice D |
| `correctAnswer` | string | `"A"`, `"B"`, `"C"`, or `"D"` |
| `difficulty` | string | `"easy"`, `"medium"`, or `"hard"` |
| `grade` | string | Grade level |
| `mark` | string | Point value |
| `departmentId` | number | Department FK |
| `userId` | number | Author FK |
| `image` | file | Optional image attachment |

### Departments

| Method | Endpoint | Description | Auth required |
|--------|----------|-------------|:---:|
| GET | `/departments` | List all departments with users | Yes |
| POST | `/departments` | Create a new department | Yes |

### Files

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload` | Upload an image (returns file URL) |

---

## Database Schema

### Users

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK | Auto-increment |
| `firstName` | STRING | |
| `lastName` | STRING | |
| `email` | STRING UNIQUE | |
| `password` | STRING | bcrypt hash |
| `role` | STRING | Default: `"default"` |
| `isActive` | BOOLEAN | Default: `true` |
| `departmentId` | INTEGER FK | → Departments |

### Tests (Questions)

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK | Auto-increment |
| `title` | STRING | |
| `question` | TEXT | HTML from rich-text editor |
| `answerA–D` | STRING | Four answer choices |
| `correctAnswer` | STRING | `"A"`, `"B"`, `"C"`, or `"D"` |
| `difficulty` | STRING | |
| `grade` | STRING | |
| `mark` | STRING | |
| `image` | STRING | Path to uploaded image |
| `userId` | INTEGER FK | → Users |
| `departmentId` | INTEGER FK | → Departments |

### Departments

| Column | Type | Notes |
|--------|------|-------|
| `id` | INTEGER PK | Auto-increment |
| `name` | STRING | |

---

## Authentication

The application uses **two complementary auth mechanisms**:

1. **Session-based auth** — `express-session` backed by MySQL via `connect-session-sequelize`. The session cookie is `httpOnly`, expires after 24 hours.
2. **JWT** — signed tokens used to protect specific API routes via `passport-jwt`.

**Flow:**
1. User submits credentials to `POST /api/v1/login`
2. Backend verifies password with `bcrypt`, creates a session, and returns the user object
3. Frontend stores the user in Redux; session cookie is persisted by the browser
4. On app reload, `GET /api/v1/isAuth` checks the session and restores Redux state
5. Protected routes check Redux auth state via `ProtectedRoute`
6. All axios requests include `{ withCredentials: true }` to transmit the session cookie

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

Please keep commits small and focused, and test your changes against a local MySQL instance before opening a PR.

---

## License

ISC © Rustam Nortadzhiev
