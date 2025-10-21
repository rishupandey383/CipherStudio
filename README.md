# ⚡ CipherStudio

> **CipherStudio** is an advanced **browser-based React IDE** built for developers who want to **create, test, and visualize React projects instantly** — without any setup. It’s designed to be fast, intuitive, and beautiful, giving you a real development experience right in your browser.

---

## 🧠 What is CipherStudio?

CipherStudio is not just another code editor — it’s a **React development playground** that lets you:
- Write and run React code instantly
- Preview your app live as you type
- Experiment with UI ideas or test components quickly
- Save and manage your projects effortlessly

Built for developers, by developers — CipherStudio reimagines how you start building with React.

---

## ✨ Features

### 💻 Developer-Centric Editor
- Code React components in real-time with syntax highlighting and auto-formatting.
- TypeScript and JSX support for better developer experience.

### ⚡ Instant Live Preview
- Real-time rendering of your React code — no reloads, no waiting.
- Preview updates as you type for faster feedback.

### 🎨 Beautiful, Minimal Interface
- Clean, distraction-free workspace built with TailwindCSS.
- Framer Motion animations for a smooth and modern feel.

### ☁️ Project Management
- Create, rename, and delete projects seamlessly.
- Auto-save and local persistence to prevent code loss.

### 🔐 Secure Authentication (Planned)
- Email-based OTP login with JWT-based sessions.
- Protected routes for user dashboards and project pages.

### 🧩 Component Playground
- Import UI libraries or experiment with your custom components easily.
- Great for testing reusable components before production.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
|-------|-------------------|
| **Frontend** | React, TypeScript, TailwindCSS, Framer Motion |
| **Backend (Auth + API)** | Node.js / Express / Firebase (optional) |
| **Email Service** | Nodemailer / SendGrid / Gmail SMTP |
| **Storage** | LocalStorage / Firebase Firestore |
| **Deployment** | Vercel / Netlify |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/CipherStudio.git
cd CipherStudio
# Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
