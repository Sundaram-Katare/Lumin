# 🧠 Lumin - Quiz App

**Lumin** is a full-featured **Quiz Application** that allows users to play, create, and share quizzes in real-time.  
It’s built for learners and developers who love competition — test your skills, challenge friends, and climb the leaderboard!

---

### Preview
<img width="1894" height="899" alt="image" src="https://github.com/user-attachments/assets/c063a309-0c0c-4606-b35b-2ef6a3dd13d1" />

<img width="1892" height="907" alt="image" src="https://github.com/user-attachments/assets/89b72989-82a6-4d3d-9783-ac5657438284" />


## ✨ Features

### 🎯 Trivia Quizzes
Browse and play curated quizzes across multiple subjects. Answer questions, earn points, and climb the leaderboard.

### 🏠 Room Quizzes (Create & Share)
Create custom quizzes with multiple-choice questions and share them via a unique **6-digit room code**. Anyone with the code can join and play your quiz in real time.

### 🤖 Generate with AI
Enter your **Gemini API key** and a topic name — Lumin uses the **Google Gemini API** to instantly generate 5 subjective (long-answer) questions. Copy individual questions or all of them with a single click. *(Logged-in users only)*

> **Privacy:** Your API key is used only in your browser and is **never stored or sent to any server**.

### 🏆 Leaderboard
Global rankings based on points earned. Compete with the community and see where you stand.

### 👤 User Profiles
Track your stats — points, quizzes participated, and achievements — all in one place.

### 📱 Fully Responsive
Works beautifully on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS 3, Framer Motion |
| **State Management** | Redux Toolkit |
| **Backend** | Express 5, Node.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **Auth** | JWT (JSON Web Tokens) + bcrypt |
| **AI Integration** | Google Generative AI SDK (`@google/generative-ai`) |

---

## 📁 Project Structure

```
Quiz/
├── client/                    # React frontend (Vite)
│   ├── public/                # Static assets (images, GIFs)
│   ├── src/
│   │   ├── app/               # Redux store
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── Hero.jsx       # Landing page hero
│   │   │   ├── QuizCard.jsx   # Quiz display card
│   │   │   └── ...
│   │   ├── feature/           # Redux slices
│   │   │   ├── auth/          # Authentication state
│   │   │   └── quiz/          # Quiz state
│   │   ├── pages/             # Route pages
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── Trivia.jsx     # Browse quizzes
│   │   │   ├── AddQuiz.jsx    # Create room quiz
│   │   │   ├── GenerateAI.jsx # AI question generator
│   │   │   ├── QuizStart.jsx  # Quiz player
│   │   │   ├── LiveQuiz.jsx   # Join quiz by code
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Auth.jsx       # Login / Register
│   │   └── App.jsx            # Routes
│   ├── .env                   # Client environment variables
│   └── package.json
│
└── server/                    # Express backend
    ├── config/                # Database connection
    ├── controllers/           # Route handlers
    ├── middleware/             # Auth middleware (JWT)
    ├── models/                # Mongoose schemas
    │   ├── userModel.js
    │   ├── quizModel.js
    │   └── questionModel.js
    ├── routes/                # API routes
    ├── server.js              # Entry point
    ├── .env                   # Server environment variables
    └── package.json
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sundaram-Katare/Quiz.git
cd Quiz
```

### 2. Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
node server.js
```

### 3. Set Up the Client

```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:

```env
VITE_BACKEND_API_URL=http://localhost:3000/
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Run with Docker

Docker Compose runs the frontend, backend, and a local MongoDB instance together.

```bash
cp .env.example .env
# Set a strong JWT_SECRET in .env
docker compose up --build
```

Open `http://localhost:5173`. The frontend proxies `/api` requests to the backend,
so no client-side API URL configuration is needed for the Docker setup. Stop the
stack with `docker compose down`; add `-v` only if you also want to remove the
MongoDB data volume.

---

## 🔑 API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `PUT` | `/api/auth/points` | Increment user points |
| `GET` | `/api/auth/points` | Get user points |
| `PUT` | `/api/auth/quizParticipated` | Increment quizzes participated |
| `POST` | `/api/quiz/add` | Create a new quiz |
| `GET` | `/api/quiz/` | Get all quizzes |
| `GET` | `/api/quiz/code?code=XXXXXX` | Get quiz by room code |

---

## 🤖 AI Question Generation

The **Generate with AI** feature uses the [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) to call the **Gemini 2.5 Flash** model directly from the browser.

### How it works:
1. Navigate to **Generate AI** in the navbar (requires login).
2. Paste your **Gemini API key** (get one free at [Google AI Studio](https://aistudio.google.com/apikey)).
3. Enter any **topic name** (e.g., "Photosynthesis", "World War II", "Machine Learning").
4. Click **Generate Questions** — 5 subjective questions are generated instantly.
5. **Copy** individual questions or all of them at once.

> The API key is processed entirely in your browser. It is **not** sent to the Lumin backend or stored anywhere.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React](https://react.dev) — UI framework
- [Vite](https://vitejs.dev) — Build tool
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Google Generative AI](https://ai.google.dev/) — AI question generation
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Cloud database
- [Lucide Icons](https://lucide.dev) & [React Icons](https://react-icons.github.io/react-icons/) — Icon libraries

---

<div align="center">
  <strong>⭐ Star this repo if you found it useful!</strong>
</div>
