# 🚀 JEE Mentor v0.2 — The JEE Preparation Operating System

> **North Star**: JEE Mentor is an operating system for JEE Main & Advanced preparation, not an AI chatbot with extra features.

![JEE Mentor UI](https://img.shields.io/badge/UI%2FUX-Linear%20%7C%20Raycast%20%7C%20Apple%20Inspired-8B5CF6)
![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-Single_Sign_On-4285F4?logo=google)
![Supabase](https://img.shields.io/badge/Supabase-Connected_to_Live_PostgreSQL-3ECF8E?logo=supabase)
![OpenAI OAuth](https://img.shields.io/badge/OpenAI_OAuth-Sign_in_with_ChatGPT-10A37F)

---

## 🗄️ Full-Stack Live Supabase PostgreSQL DB Hookup
- **100% Cloud-Synced State**: All user profile parameters, daily study tasks, mistake notebook entries, and syllabus chapter completion states are **100% saved, fetched, and updated directly to your live Supabase PostgreSQL database**.
- **Unified Identity Widget**: Clean student profile identity display in the top header and left sidebar showing authenticated user email, avatar, target rank badge, and Level 12 XP status without duplicate or confusing sign-in buttons.
- **Overhauled Settings & Cloud Operations Hub (`SettingsPage.tsx`)**: High-production tabbed settings hub for editing student AIR rank goals, self-study time budgets, Supabase Postgres credentials, and ChatGPT session status.
- **Gamified Daily Study Quest Card**: 3-step gamified daily quest card ("1. Complete 2 Daily Tasks", "2. Master 1 Weak Chapter", "3. Review 1 Spaced Mistake") with an XP progress meter to make studying simple and rewarding!

---

## 🤖 Interactive AI Chatbot Hub & Live Answer Editor
- **Interactive Conversational AI Chatbot**: Real-time conversational chat thread with topic-aware Socratic responses across Physics, Chemistry, and Mathematics.
- **Live Answer & Notes Editor**: Edit, customize, and refine AI-generated explanations in real time before saving them directly to your **Mistake Notebook** or copying them.
- **Dedicated Full-Screen AI Tutor Page (`/ai-tutor`)**: Dedicated navigation link in the left sidebar alongside the global modal trigger.

---

## 🔐 Google OAuth & OpenAI Login Integration
- **Google OAuth Login**: Single Sign-On via Supabase Auth (`signInWithGoogle()`) with custom Google branding buttons in the top navbar and hero section.
- **OpenAI OAuth (Sign in with ChatGPT)**: Free ChatGPT AI access via `@openai-oauth/react` (`<SignInWithChatGPT />`) with automatic redirect to `/dashboard` upon successful login.
- **Authentication Modal (`AuthModal.tsx`)**: Unified auth modal accessible from the top navigation header bar AND the landing page.

---

## 🎥 Custom Video Player Card Interface
- Replaced unreliable third-party YouTube iframe embeds with a sleek **Custom Video Poster Card (`VideoPlayerModal.tsx`)**.
- Features an interactive glowing play button, lecture title badges, HD indicators, and 1-click **"Watch Video on YouTube ↗"** direct streaming launch!

---

## 📚 Exhaustive 1-Hour Master Textbook Notes

JEE Mentor features multi-paragraph, textbook-chapter length reference manuals across **Physics**, **Chemistry**, and **Mathematics** tailored for self-study aspirants:

1. **Foundational Principles & Vectors**: Multi-paragraph theoretical frameworks (e.g. *Newtonian Mechanics*, *Non-Inertial Vector Kinematics*, *VSEPR Geometries*, *Quadratic Location of Roots*).
2. **NCERT Direct Line-by-Line Highlights**: Exact text quotes and hidden edge cases extracted directly from NCERT Class 11 & 12 textbooks.
3. **Calculus-Based Step-by-Step Derivation**: Complete calculus and algebraic derivations showing exact physical origin of equations.
4. **Exhaustive Multi-Stage Case Studies**: Detailed multi-block friction protocols, accelerating wedge constraints, and Newton-Girard power sums.

---

## 📖 Complete 12-Section Chapter Study Template

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│  📚 1-Hour Textbook Notes      📖 Deep Concepts  🧠 Subtopics    📝 Formula Sheet  🎥 Videos     │
│  ❓ PYQ Bank                    ✅ Practice       🎯 Test         ⚠ Mistakes        ⚡ Hacks      │
│  📊 Progress                   ⏱ Spaced Revision                                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 Master Syllabus Scope (~135 Topics)

| Subject | Category Units | Topic Count |
| :--- | :--- | :---: |
| **Physics** | Mechanics, Thermodynamics, Electricity & Magnetism, Optics, Modern Physics | **~40 Topics** |
| **Chemistry** | Physical Chemistry, Inorganic Chemistry, Organic Chemistry | **~50 Topics** |
| **Mathematics** | Sets/Functions, Trigonometry, Algebra, Coordinate Geometry, Vectors & 3D, Calculus | **~45 Topics** |
| **Total** | **Full Syllabus Scope** | **≈135 Core Topics** |

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 + Glassmorphism tokens |
| **Database** | `@supabase/supabase-js` (Live PostgreSQL) |
| **Auth** | Supabase Google OAuth + `@openai-oauth/react` |
| **Routing** | React Router v7 |
| **Icons** | Lucide React |

---

## 🚀 Quick Start & Local Running

```bash
# 1. Install dependencies
npm install

# 2. Launch local development server
npm run dev

# 3. Production Build
npm run build
```

---

## 🛡️ License

Built with precision for JEE Main & Advanced Aspirants. Open source for educational and self-study purposes.
