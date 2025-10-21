# ⚡ CipherStudio

> **CipherStudio** is a next-generation **browser-based React IDE** that lets you **code, run, and preview React applications instantly** — all from your browser.  
It’s designed to give developers the power of a full-fledged coding environment, without setup or installations.

---

## 🧠 What is CipherStudio?

CipherStudio redefines how you build with React.  
It offers a **real-time coding environment**, **live preview**, and **secure login system** — everything you need to turn your ideas into running code instantly.

Built for developers, learners, and UI creators who value **speed**, **simplicity**, and **aesthetics**.

---

## ✨ Key Features

### 💻 Real-Time React Editor
- Write JSX or TypeScript instantly.
- Syntax highlighting and live error detection.
- Auto-formatting and code beautification.

### ⚡ Live Preview Engine
- See instant output as you type.
- Real-time rendering without refreshing.
- Perfect for testing UI components and prototypes.

### ☁️ Secure Email Authentication (with OTP)
- Users can log in using their email.
- A unique 6-digit OTP is sent to their registered email.
- OTP expires after 5 minutes for better security.
- Verified users are redirected to their **Projects Dashboard**.

### 🧩 Project Management
- Create, save, and delete projects.
- Auto-save and local storage for reliability.
- Future-ready: Cloud sync support (planned).

### 🎨 Elegant UI & Animations
- Minimal, distraction-free UI with TailwindCSS.
- Smooth animations powered by Framer Motion.
- Responsive design for all screen sizes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (with TypeScript + Vite) |
| **Styling** | TailwindCSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Authentication** | Nodemailer (Email OTP) / Firebase Auth |
| **Database (optional)** | MongoDB / Firebase Firestore |
| **Session Management** | JWT (JSON Web Token) |
| **Deployment** | Vercel / Netlify (Frontend), Render / Railway (Backend) |

---

## 📦 Dependencies

### Frontend

npm install react react-dom typescript vite
npm install tailwindcss framer-motion axios react-router-dom

### Backend
```bash
npm install express nodemailer dotenv cors body-parser
npm install jsonwebtoken bcryptjs
npm install mongodb mongoose   # (Optional if using MongoDB)

# Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
