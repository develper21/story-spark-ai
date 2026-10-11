# 📄 Development Rules

## Story Spark AI — Project Guidelines for AI & Human Collaborators

This document defines the development rules, coding standards, and best practices for the Story Spark AI application. These rules ensure consistency, maintainability, security, and quality across the codebase. Both AI assistants and human contributors must follow these guidelines.

---

## 1️⃣ General Principles

These rules apply to the entire project.

- ✅ Follow the project documentation (PRD, ARCHITECTURE, DESIGN) before making changes.
- ✅ Keep the code clean, readable and well-structured.
- ✅ Prioritize simplicity and maintainability.
- ✅ Do not duplicate logic. Reuse existing components, utilities or services.
- ✅ Make small, focused changes instead of large, risky edits.
- ✅ Do not modify unrelated files.
- ✅ Write self-explanatory code with meaningful variable and function names.

---

## 2️⃣ Technology & Coding Standards

Rules related to the tech stack and coding style.

| | Category | Rule |
|---|---|---|
| 🟦 | **Language** | Use TypeScript. Avoid `any` unless absolutely necessary. |
| ⚛️ | **Frontend Framework** | Follow React 19 + Vite best practices; function components and hooks only. |
| 🎨 | **Styling** | Use Tailwind CSS and follow the design system in `DESIGN.md`. |
| 🧹 | **Linting** | Follow ESLint rules; zero warnings before committing. |
| 📐 | **Formatting** | Use Prettier defaults (2-space indent, single quotes in TS). |
| 📦 | **Dependencies** | Use stable, well-maintained packages; get approval before adding new ones. |
| 📁 | **File Naming** | Use clear, consistent names: `*.component.tsx`, `*.service.ts`, `*.router.ts`, `*.controller.ts`, `*.validation.ts`. |

### Backend-Specific Rules

- ✅ Every route must pass through `validateRequest(<Zod schema>)` before its controller.
- ✅ Controllers use `catchAsync`; never leave an unhandled promise in a route.
- ✅ Respond with the standard envelope via `sendResponse` (`success`, `statusCode`, `message`, `data`).
- ✅ Auth middleware order is fixed: `auth(roles) → validateRequest → controller`.
- ✅ JWT is read **raw** from the `Authorization` header (no `Bearer` prefix) — do not change this contract without updating the frontend axios instance and the Postman collections.
- ✅ New secrets go in `.env.example` with a comment; never commit real values.

---

## 3️⃣ Project Structure

Follow the defined folder structure in `ARCHITECTURE.md`.

- ✅ Place reusable UI components in `/frontend/src/components`.
- ✅ Feature-specific frontend code stays in its page/component folder under `components/<feature>`.
- ✅ API calls belong in `services/` or `helpers/axios` — never call `fetch`/`axios` inside a component directly.
- ✅ Backend logic lives in the module pattern: `app/modules/<feature>/{router,controller,service,model,validation}.ts`.
- ✅ Common utilities go in `backend/src/utils` or `frontend/src/utils`.
- ✅ Types and interfaces are placed in the module's `interface.ts` or `frontend/src/types`.
- ✅ Do not create new folders without a clear structural reason.

---

## 4️⃣ Git & Collaboration

- ✅ Branch naming: `feature/<short-name>`, `fix/<short-name>`, `docs/<short-name>`.
- ✅ Commit messages: imperative mood, e.g. `Add branching story endpoint validation`.
- ✅ One logical change per commit; do not mix refactors with features.
- ✅ Never commit `.env*`, `node_modules`, or `dist/` (already gitignored).
- ✅ Run `npm run lint` and the backend typecheck before opening a PR.
- ✅ GSSoC contributors: link the issue number in the PR description.

---

## 5️⃣ Security Rules (Non-Negotiable)

- 🔐 Never log passwords, tokens, or OTPs — even in development.
- 🔐 Rate limit every public write endpoint (see `ip.rate-limiter.ts`).
- 🔐 Validate and sanitize **all** incoming data with Zod; never trust `req.body`.
- 🔐 Password hashing uses bcrypt (salt rounds from env) — never store plaintext.
- 🔐 Payment verification must use `crypto.timingSafeEqual` for signature comparison.
- 🔐 CORS origins are whitelisted in `app.ts`; do not use `origin: "*"`.
- 🔐 OTPs expire (15 min) and allow max 5 failed attempts.

---

## 6️⃣ Testing & API Changes

- ✅ Any new/changed route **must** be added to all three Postman collections (`postman/`, `frontend/postman/`, `backend/postman/`).
- ✅ Negative tests (400/401/403) belong in the backend collection.
- ✅ Keep request examples in the collections in sync with the Zod validators — they are the source of truth.
- ✅ Run existing tests (`backend/src/__tests__`) before pushing; add coverage for new services.

---

## 7️⃣ AI Assistant Rules

When an AI agent (Cursor, Codebuff, Copilot, etc.) works on this repo:

- 🤖 Read `MEMORY.md` first to understand the current phase and state.
- 🤖 Update `TASKS.md` status columns after completing a task.
- 🤖 Record important decisions in `MEMORY.md` (date + decision + reason).
- 🤖 Follow `RULES.md` strictly; when two approaches exist, pick the simpler one.
- 🤖 Never rename public API routes or change the auth header format silently.

---

## Related Docs

- [PRD.md](./PRD.md) — what we are building and why.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — how the system is structured.
- [DESIGN.md](./DESIGN.md) — how it should look.
- [TASKS.md](./TASKS.md) — what is done and what is next.
- [MEMORY.md](./MEMORY.md) — where we left off.
