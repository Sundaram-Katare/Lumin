# 🧠 Lumin - Quiz App

**Lumin** is a full-featured **Quiz Application** that allows users to play, create, and share quizzes in real-time.  
It’s built for learners and developers who love competition — test your skills, challenge friends, and climb the leaderboard!

---

### Preview
<img width="1894" height="899" alt="image" src="https://github.com/user-attachments/assets/c063a309-0c0c-4606-b35b-2ef6a3dd13d1" />

<img width="1892" height="907" alt="image" src="https://github.com/user-attachments/assets/89b72989-82a6-4d3d-9783-ac5657438284" />


### 🎯 Core Features
- **Authentication System**
  - Secure signup/login using JWT.
  - Passwords hashed with bcrypt.
- **Pre-built Quizzes**
  - Includes quizzes for Java, JavaScript, Python, DBMS, Aptitude, and more.
- **Create Your Own Quiz**
  - Users can create custom quizzes with unique join codes.
- **Join with Code (Private Quiz Room)**
  - Only users with the code can join that quiz session.
- **Leaderboard**
  - Displays rankings based on accuracy percentage.
- **Responsive UI**
  - Built with React + Tailwind CSS for modern and mobile-friendly design.

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js, Redux Toolkit, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT, bcrypt |
| State Management | Redux Toolkit |
| Others | Axios, dotenv, cors |

---

## 📂 Folder Structure

```bash
lumin-quiz-app/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── feature/auth/
│   │   ├── assets/images/
│   │   └── App.js
│   └── package.json
│
├── server/                # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── .env
├── README.md
```

## 🧮 Leaderboard Ranking Logic

| Accuracy (%) | Title     |
|---------------|-----------|
| 91%+          | Legend    |
| 81–90%        | Champion  |
| 67–80%        | Master    |
| 40–66%        | Learner   |
| < 40%         | Beginner  |


---

# 🚀 Project Setup & Contribution Guide

Welcome! 👋
This project is open for contributions, and you're just a few steps away from running it locally and making an impact.

---

## ⚙️ Local Setup

Get the project up and running locally in just a few steps:

### 1. Fork the Repository

Click on the **Fork** button at the top right of this repo.

---

### 2. Clone Your Fork

```bash
git clone <your_forked_repo_url>
```

---

### 3. Setup Backend Environment (`.env`)

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
MONGO_URI="mongodb_uri_here"
JWT_SECRET="your_jwt_secret_here"
```

---

### 4. Setup Frontend Environment (`.env`)

Create a `.env` file inside the `client` folder and add:

```env
VITE_BACKEND_API_URL="http://localhost:5000/api/"
```

---

### 5. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

---

### 6. Install Frontend Dependencies

```bash
cd client
npm install
```

---

### 7. Start Backend Server

```bash
node server.js
```

---

### 8. Start Frontend

```bash
npm run dev
```

---

## 🤝 Want to Contribute?

We actively welcome contributions and would love to have you onboard 🚀

### 🔥 How to Start

- Set up the project locally using the steps above
- Head over to the **Issues** section

### 💡 Ways to Contribute

- 👉 **Work on existing issues** — Comment on any issue you want to work on and I'll assign it to you
- 👉 **Create new issues** — Found a bug or have a feature idea? Raise an issue and start working on it

---

## 🛠️ Contribution Workflow

1. **Create a new branch**

```bash
git checkout -b <branch_name>
```

2. **Make your changes** ✨

3. **Push your branch**

```bash
git push origin <branch_name>
```

4. **Open a Pull Request** 🚀

---

## 🌟 Why Contribute?

- Improve your real-world development skills
- Collaborate with other developers
- Build something meaningful together

---

## ⚡ Final Note

Don't overthink — pick an issue, start coding, and ship it! 🚀
