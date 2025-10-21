# ⚡ CipherStudio

> **CipherStudio** is a next-generation **browser-based React IDE** that lets you **code, run, and preview React applications instantly** — all from your browser.  
It’s designed to give developers the power of a full-fledged coding environment, without setup or installations.
![CipherStudio Preview](<img width="1901" height="979" alt="Screenshot 2025-10-21 155054" src="https://github.com/user-attachments/assets/13e501a6-46cf-4ec1-9aeb-4f49a9a93366" />
> <img width="1901" height="906" alt="Screenshot 2025-10-21 155133" src="https://github.com/user-attachments/assets/1e79fd1a-242c-4007-9666-ff8dd5366a19" />
<img width="1901" height="883" alt="Screenshot 2025-10-21 155155" src="https://github.com/user-attachments/assets/7ad002b6-e71a-46d7-a2d9-593109bc4bb1" />

)

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











CipherStudio/
├── client/                     # React Frontend
│   ├── public/
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/
│   │   ├── assets/            # Images, logos, icons
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Editor.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Preview.tsx
│   │   ├── pages/             # Main pages
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── OTP.tsx
│   │   │   └── Projects.tsx
│   │   ├── context/           # State management
│   │   ├── utils/             # Helper functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── server/                     # Node.js Backend
│   ├── config/
│   │   └── db.js              # MongoDB or Firebase config
│   ├── routes/
│   │   └── authRoutes.js      # Login, OTP, Verify
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── utils/
│   │   ├── generateOTP.js
│   │   └── sendEmail.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── README.md
