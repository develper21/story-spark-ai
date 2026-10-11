# ✅ Project Tasks

## Story Spark AI — Task Breakdown & Development Plan

This document contains the complete list of tasks for building the Story Spark AI application. Tasks are divided into phases with clear deliverables, priorities and status tracking.

| | | |
|---|---|---|
| 📊 **Total Tasks**<br>**28** | ✅ **Completed**<br>**25** (89%) | 🔄 **In Progress**<br>**3** (11%) |

---

## ✅ Phase 1: Project Setup

Set up the development environment, repository and core configuration.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 1.1 | Initialize monorepo (frontend + backend workspaces) | High | ✅ Completed | npm workspaces in root `package.json` |
| 1.2 | Configure Vite + React + TypeScript (frontend) | High | ✅ Completed | `frontend/vite.config.ts` |
| 1.3 | Configure Express + TypeScript (backend) | High | ✅ Completed | `backend/src/app.ts` |
| 1.4 | Set up Git repository and branch protection | High | ✅ Completed | GitHub: story-spark-ai |
| 1.5 | ESLint + Prettier + editorconfig | Medium | ✅ Completed | Lint via `npm run lint` |
| 1.6 | Environment templates (`.env.example`) | Medium | ✅ Completed | Both workspaces |

## ✅ Phase 2: Authentication

Implement user authentication, email verification and protected routes.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 2.1 | MongoDB connection + config module | High | ✅ Completed | `backend/src/config` |
| 2.2 | OTP email verification flow | High | ✅ Completed | 5 attempts, 15-min expiry |
| 2.3 | Register + login with JWT (access + refresh) | High | ✅ Completed | httpOnly refresh cookie |
| 2.4 | Google OAuth login | High | ✅ Completed | `POST /auth/google-login` |
| 2.5 | Auth middleware + role guard (4 roles) | High | ✅ Completed | tokenVersion invalidation |
| 2.6 | Forgot / reset password, change password | Medium | ✅ Completed | Rate limited |
| 2.7 | Protected frontend routes + auth context | High | ✅ Completed | localStorage JWT |

## ✅ Phase 3: AI Story Generation

Build the core AI generation experience.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 3.1 | OpenAI + Gemini generation service | High | ✅ Completed | `ai_model` module |
| 3.2 | Premium + free tier endpoints | High | ✅ Completed | Quota vs IP rate limiter |
| 3.3 | SSE streaming generation | High | ✅ Completed | `generate-model-stream` |
| 3.4 | Alternate endings generator | Medium | ✅ Completed | 6 tones supported |
| 3.5 | Story branching from choices | Medium | ✅ Completed | `POST /stories/branching` |
| 3.6 | Remix (5 axes) + translation | Medium | ✅ Completed | Premium + free variants |
| 3.7 | Prompt enhancement (Gemini) | Medium | ✅ Completed | `enhance-prompt` |
| 3.8 | Story inspiration sparks | Low | ✅ Completed | Public endpoint |

## ✅ Phase 4: Publishing & Community

Story posts, feeds and reader engagement.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 4.1 | Post CRUD + Zod validation | High | ✅ Completed | Topics, tags, covers |
| 4.2 | Paginated feed with search + filters | High | ✅ Completed | meta envelope |
| 4.3 | Latest + featured feeds, tag pages | Medium | ✅ Completed | |
| 4.4 | Comments with threading + likes | High | ✅ Completed | |
| 4.5 | Reactions (likes count) | Medium | ✅ Completed | |
| 4.6 | Bookmarks module + status check | High | ✅ Completed | |
| 4.7 | Follow/unfollow writers | Medium | ✅ Completed | |
| 4.8 | Reviews / testimonials + moderation | Medium | ✅ Completed | Admin approval flow |

## 🔄 Phase 5: Dashboard, Payments & Trust (In Progress)

Writer dashboard, monetization and community safety.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 5.1 | Analytics suite (heatmap, genres, word cloud, mood) | High | ✅ Completed | 7 endpoints |
| 5.2 | Story version history + restore | High | ✅ Completed | Snapshots |
| 5.3 | Notifications (REST + Socket.IO) | High | ✅ Completed | Room `user:<id>` |
| 5.4 | Personalized recommendations | Medium | ✅ Completed | |
| 5.5 | Razorpay create-order + verify | High | ✅ Completed | timingSafeEqual |
| 5.6 | Monthly quota cron reset | Medium | ✅ Completed | node-cron |
| 5.7 | Reports + bug reports + contact | Medium | ✅ Completed | GitHub issue hookup |
| 5.8 | Writer application pipeline | Medium | ✅ Completed | User + admin routes |
| 5.9 | Collaborative writing rooms (collab socket) | High | 🔄 In Progress | Socket layer exists; UI pending |
| 5.10 | Writer application review UI | Medium | 🔄 In Progress | API ready, admin UI pending |
| 5.11 | Analytics dashboard page polish | Medium | 🔄 In Progress | Charts wired, styling pass pending |

## 🔜 Phase 6: Hardening & Launch (Planned)

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 6.1 | E2E test suite (Playwright) | High | ⬜ Not Started | |
| 6.2 | Load testing on AI endpoints | Medium | ⬜ Not Started | |
| 6.3 | i18n for UI chrome | Low | ⬜ Not Started | Generation already multilingual |
| 6.4 | Mobile app (React Native) | Low | ⬜ Not Started | Out of MVP scope |

---

## Definition of Done

- ✅ Code merged behind a reviewed PR with lint + typecheck green.
- ✅ Zod validation + role guard on every new route.
- ✅ Route added to all three Postman collections with example bodies.
- ✅ Docs updated (`TASKS.md` status, `MEMORY.md` decisions).

---

## Related Docs

- [PRD.md](./PRD.md) — scope behind these tasks.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — where each task's code lives.
- [RULES.md](./RULES.md) — quality bar for marking a task done.
- [MEMORY.md](./MEMORY.md) — current phase and carry-over context.
