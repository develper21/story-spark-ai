# 🏛️ System Architecture

## Story Spark AI — AI-Powered Storytelling Platform

This document describes the overall system architecture, technology stack, folder structure, data flow, and key design decisions for the **Story Spark AI** application.

---

## 1. High-Level Architecture

Story Spark AI follows a **client–server architecture** using a React (Vite) SPA and a Node.js/Express API with MongoDB, plus an AI services layer.

```
┌────────────┐      HTTPS       ┌──────────────────┐      HTTPS       ┌──────────────┐
│    User    │ ◄──────────────► │  React Frontend  │ ◄──────────────► │   Node.js    │
│ (Web Brows)│                  │   (Vite :4001)   │                  │   Backend    │
└────────────┘                  └──────────────────┘                  │  (:5000)     │
                                                                      └──────┬───────┘
                                    WebSocket (Socket.IO)                    │
                                  ◄──────────────────────────────────────────┤
                                                                     ┌───────▼────────┐
                                                                     │    MongoDB     │
                                                                     │   (Mongoose)   │
                                                                     └────────────────┘
                                              ┌──────────────────────┬───────┴────────┐
                                              ▼                      ▼                ▼
                                        ┌──────────┐         ┌────────────┐   ┌───────────┐
                                        │ OpenAI / │         │  Unsplash  │   │ Razorpay  │
                                        │  Gemini  │         │  (covers)  │   │ (payments)│
                                        └──────────┘         └────────────┘   └───────────┘
```

- **Frontend → Backend:** REST over HTTP (`/api/v1/*`) with JWT in the `Authorization` header (raw token, no `Bearer` prefix).
- **Backend → Frontend (realtime):** Socket.IO pushes notifications and collab events to room `user:<id>`.
- **Backend → Services:** OpenAI/Gemini for generation, Unsplash for cover images, Razorpay for checkout, SMTP for OTP emails.

---

## 2. Technology Stack

Technologies used in the project and their purpose.

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19 + Vite 6 (TypeScript) | UI framework and dev server (port 4001) |
| Styling | Tailwind CSS | Modern, responsive UI (see `DESIGN.md`) |
| State | Redux Toolkit | Client state management |
| Backend | Node.js 20 + Express 4 (TypeScript) | REST API and business logic (port 5000) |
| Database | MongoDB + Mongoose | Data persistence |
| Realtime | Socket.IO | Notifications + collaborative sessions |
| Authentication | JWT (access + refresh) & Google OAuth | Session management, protected routes |
| AI | OpenAI + Google Gemini | Story generation, remix, translate |
| Images | Unsplash API | Story cover images |
| Payments | Razorpay | Pro-plan checkout + signature verification |
| Email | SMTP (nodemailer) | OTP and newsletter emails |
| Validation | Zod | Request body validation on all routes |
| Deployment | Netlify (FE) · Vercel/Render (BE) | Hosting and deployment |
| Version Control | Git + GitHub | Source code management |

---

## 3. Folder Structure

The project follows a **module-based folder structure** (backend) and a **component-based structure** (frontend) to keep the code organized and scalable.

```
story-spark-ai/
├── frontend/                       # React SPA (Vite + TypeScript)
│   └── src/
│       ├── components/             # UI components (pages, layout, dashboard…)
│       ├── services/               # API service helpers (auth, continuation)
│       ├── helpers/axios/          # Axios instance + JWT header injection
│       ├── redux/                  # Store, slices, thunks
│       ├── hooks/                  # Custom hooks (useNotifications…)
│       ├── socket/                 # Socket.IO client wiring
│       ├── models/ · types/        # TS interfaces & models
│       ├── utils/ · constants/     # Utilities and constants
│       └── App.tsx · main.tsx      # Entry points
│
├── backend/                        # Express API (TypeScript)
│   └── src/
│       ├── server.ts               # HTTP + Socket.IO bootstrap, DB connect
│       ├── app.ts                  # Express app: CORS, helmet, rate limit, routes
│       ├── config/                 # Env config, Razorpay config
│       ├── router/                 # Mounts every module router at /api/v1
│       ├── routes/                 # Standalone routes (stories, continuation)
│       ├── app/
│       │   ├── middleware/         # auth, validate (Zod), rate limiters, error handler
│       │   └── modules/            # ⭐ One folder per feature module
│       │       ├── auth/           # router · controller · service · validation
│       │       ├── user/ · post/ · comment/ · review/ · reaction/
│       │       ├── ai_model/ · story_version/ · bookmark/ · notification/
│       │       ├── analytics/ · analysis/ · recommendation/
│       │       ├── newsletter/ · contact/ · report/ · bug_report/
│       │       ├── verify_email/ · writer_application/ · story_inspiration/
│       │       └── payment (src/controllers + src/router)
│       ├── enums/ · interfaces/    # Shared enums and TS types
│       ├── errors/ · shared/       # ApiError, catchAsync, sendResponse
│       └── socket/                 # notification + collab socket handlers
│
├── postman/                        # ⭐ Master Postman collection (all routes)
├── frontend/postman/               # Frontend-facing collection (65 requests)
├── backend/postman/                # Server-side collection (95 requests, negative tests)
└── docs/                           # PRD · ARCHITECTURE · RULES · DESIGN · TASKS · MEMORY
```

**Backend module anatomy** — every feature module follows the same shape, which keeps the codebase predictable:

```
app/modules/<feature>/
├── <feature>.router.ts        # Route definitions + middleware chain
├── <feature>.controller.ts    # Request/response handling (catchAsync)
├── <feature>.service.ts       # Business logic
├── <feature>.model.ts         # Mongoose schema
├── <feature>.validation.ts    # Zod schemas (validated in middleware)
└── <feature>.interface.ts     # TS types
```

---

## 4. Request Flow

1. Client sends `POST /api/v1/auth/login` with JSON body.
2. `app.ts` applies **helmet → rate limit (100/15min) → CORS → JSON parsing → cookie parser**.
3. `router/index.ts` matches `/auth` → `auth.router.ts`.
4. `loginRateLimiter` → `validateRequest(UserValidator.login)` (Zod) → `AuthController.login`.
5. Controller calls `AuthService.login` → verifies password (bcrypt) → signs JWT access + refresh tokens.
6. Refresh token is set as an **httpOnly cookie**; access token returns in the response body.
7. Subsequent requests carry `Authorization: <accessToken>` (raw), verified by `auth.middleware.ts` (also checks `tokenVersion` to invalidate old sessions).
8. Global error handler converts thrown `ApiError`s into the standard envelope:
   `{ success, statusCode, message, data }`.
9. Unknown routes fall through to the global 404 handler.

---

## 5. Key Design Decisions

- **Module-per-feature** — each domain (auth, post, ai_model…) is fully self-contained, making GSSoC-style multi-contributor work safe and parallel.
- **Raw JWT header (no Bearer prefix)** — the axios instance sends the token as-is; Postman collections mirror this exactly.
- **Dual AI tiers** — quota-monitored premium endpoints (`checkRequestLimit`) and IP-rate-limited free endpoints (`freeAiRateLimiter`) so anonymous visitors can try the product.
- **Quota + cron reset** — monthly request counters reset via a scheduled cron job (skipped on serverless).
- **Defense-in-depth authorization** — role checks in middleware *and* controller (e.g. writer approval).
- **Soft deletes** — posts use `isDeleted` flags to keep feeds recoverable.
- **Streaming first-class** — `text/event-stream` generation endpoint for progressive UI.

---

## 6. Related Docs

- [PRD.md](./PRD.md) — product requirements and scope.
- [DESIGN.md](./DESIGN.md) — visual design system, colors, typography.
- [RULES.md](./RULES.md) — development rules and coding standards.
- [TASKS.md](./TASKS.md) — task breakdown by phase.
- [MEMORY.md](./MEMORY.md) — project state and continuity notes.
- [../postman/postman.json](../postman/postman.json) — complete API collection.
