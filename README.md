# 🎟️ MERN Ticket Management System

A full-stack **Ticket Management System** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
This system allows Admins, Clients, and Developers to manage projects and tickets efficiently.

---

## 🚀 Features

### 👨‍💼 Admin

* Manage Developers & Clients
* Create and assign Projects
* Monitor all Tickets
* Activate/Deactivate users

### 👨‍💻 Developer

* View assigned tickets
* Update ticket status (Open → In Progress → Resolved)
* Dashboard with ticket insights

### 👤 Client

* Create support tickets
* Track ticket progress
* View project-related issues

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* Tailwind CSS
* Redux Toolkit

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Mongoose)

---

## 📂 Project Structure

```
root/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/mern-ticket-management-system.git
cd mern-ticket-management-system
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

## 📌 Future Improvements

* JWT Authentication
* Role-based authorization
* Notifications system
* Deployment (Render / Vercel)

---

## 🙋‍♀️ Author

**Purva Tapare**

* GitHub: https://github.com/87purvatapare

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
