# 🛠️ Mini Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse and manage jobs.

---

# ✨ Core Features

-  Create service requests
-  View all job requests
-  Filter jobs by category
-  View full job details
-  Update job status
-  Delete jobs
-  Responsive modern UI

---

# 🚀 Tech Stack

## 🎨 Frontend

-  Next.js (App Router)
-  Tailwind CSS
-  Axios

## 🖥️ Backend

-  Node.js
-  Express.js
-  MongoDB Atlas
-  Mongoose
-  JWT Authentication

---

# 📁 Project Structure

```txt
project-root/
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── tests/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Setup Instructions

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Ishini-0313/Mini-Service-Request-Board.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

## 🔑 Required Environment Variables

---

## 🖥️ Backend Environment Variables

Create file:

```txt
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key
```

---

## 🌐 Frontend Environment Variables

Create file:

```txt
frontend/.env
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🍃 MongoDB Atlas Setup

1.  Create MongoDB Atlas account
2.  Create free cluster
3.  Create database user
4.  Add IP address
5.  Copy MongoDB connection string

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/service_board?retryWrites=true&w=majority
```

---

# ▶️ Run Instructions

---

## 🖥️ Run Backend

Open terminal:

```bash
cd backend
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 🌐 Run Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# 📡 API Endpoints

---

## 🔐 Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

---

## 📋 Job Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create job |
| PUT | `/api/jobs/:id` | Update job status |
| DELETE | `/api/jobs/:id` | Delete job |

---

# 🔒 Authentication

Protected routes require JWT token.

Example request header:

```txt
Authorization: Bearer your_token
```

---

# 🧪 Unit Testing

Testing uses:

-  Jest
-  Supertest
-  MongoDB Memory Server

Run tests:

```bash
cd backend
npm test
```

Expected output:

```txt
PASS tests/auth.test.js
PASS tests/jobs.test.js
```

---

# 🌱 Seed Database

Run seed script:

```bash
cd backend
node seed.js
```

This inserts sample jobs into MongoDB.

---

# 📌 Important Notes

-  Do not upload `.env` files to GitHub
-  Add `.env` to `.gitignore`
-  Restart server after changing environment variables

---
