# 🧠 Project Memory

## Story Spark AI — Context, Progress & Important Notes

This document keeps track of the current state of the project, important decisions, and things to remember. It helps maintain continuity across development sessions and for new contributors.

| | | |
|---|---|---|
| 📅 **Last Updated**<br>**Oct 1, 2026**<br>10:30 AM | 🧑‍💻 **Current Phase**<br>**Phase 5**<br>Dashboard, Payments & Trust | 🔄 **Session**<br>Docs + Postman<br>completed |

---

## 🎯 Current Status

- ✅ Project setup completed (React + Vite frontend, Express + TypeScript backend, npm workspaces)
- ✅ Git repository initialized and pushed to GitHub
- ✅ MongoDB + config module connected (env-driven)
- ✅ Authentication (OTP verification, signup, login, Google OAuth, protected routes) completed
- ✅ AI generation suite (premium, free, streaming, endings, branching, remix, translate) completed
- ✅ Publishing + community (posts, comments, reactions, bookmarks, follows, reviews) completed
- ✅ Full Postman API coverage (master + frontend + backend collections)
- 🔄 Working on Phase 5 remainder: collab writing rooms UI, writer application review UI, analytics polish

---

## ✅ Completed Tasks

| # | Task | Completed On |
|---|---|---|
| 1.1–1.6 | Project setup, tooling, env templates | Feb 2025 |
| 2.1–2.7 | Auth, OTP, OAuth, roles, protected routes | Mar 2025 |
| 3.1–3.8 | AI generation suite | Apr 2025 |
| 4.1–4.8 | Publishing & community features | May 2025 |
| 5.1–5.8 | Analytics, versions, notifications, payments, moderation | Sep 2025 |
| — | Root `postman/postman.json` — master collection (24 folders, 86 requests) | Oct 1, 2026 |
| — | `frontend/postman/postman.json` — frontend routes (65 requests) | Oct 1, 2026 |
| — | `backend/postman/postman.json` — server routes + negative tests (95 requests) | Oct 1, 2026 |
| — | `docs/` complete: PRD · ARCHITECTURE · RULES · DESIGN · TASKS · MEMORY | Oct 1, 2026 |

---

## 🔄 In Progress

| # | Task | Started | Owner |
|---|---|---|---|
| 5.9 | Collaborative writing rooms UI (Socket.IO collab layer exists) | Sep 2026 | — |
| 5.10 | Admin UI for writer application review | Sep 2026 | — |
| 5.11 | Analytics dashboard styling pass | Sep 2026 | — |

---

## 🗝️ Important Decisions & Why

| Date | Decision | Reason |
|---|---|---|
| Feb 2025 | Module-per-feature backend (`app/modules/<feature>/…`) | Parallel GSSoC contributions without merge conflicts |
| Feb 2025 | Raw JWT in `Authorization` (no `Bearer ` prefix) | Frontend axios instance contract — do not change silently |
| Mar 2025 | Refresh token in httpOnly cookie, access token in body | XSS-safe refresh, simple access handling |
| Mar 2025 | OTP: 15-min expiry, max 5 failed attempts, one-time verification token | Abuse resistance on public signup |
| Apr 2025 | Dual AI tiers: quota-limited premium vs IP-limited free | Let anonymous visitors try the product |
| May 2025 | Soft deletes for posts (`isDeleted`) | Recoverable moderation |
| Sep 2025 | `crypto.timingSafeEqual` for Razorpay signature check | Timing-attack resistance |
| Oct 2026 | Three Postman collections (master / frontend / backend) | Master for everything, frontend mirrors UI usage, backend adds negative tests |

---

## ⚠️ Things To Remember

- ⚠️ **Auth header format:** raw token, no `Bearer` prefix — verified in `axionInstance.ts`, `auth.middleware.ts`, `token.ts`.
- ⚠️ **Free AI endpoints are IP rate limited** — hammering them in tests will 429; wait between runs.
- ⚠️ **Global rate limit:** 100 requests / 15 min / IP on the whole API.
- ⚠️ **Comment like route** uses an unusual path: `/comment/toggle-like/commentId=<id>`.
- ⚠️ **Legacy stub:** `app.ts` mounts `story.routes` at `/review`, so `/review/create` is a stub returning 201 — the real review API is `/api/v1/review/*`.
- ⚠️ **Quota cron** is skipped when `VERCEL=1` (serverless has no long-lived timers).
- ⚠️ `RAZORPAY_KEY_SECRET` throws at startup if missing — payment routes need env configured even to boot the server.

---

## 🔮 Next Session Checklist

- [ ] Design the collab writing room UI (presence, live text, permissions).
- [ ] Build the admin writer-application review table.
- [ ] Analytics page final styling pass (`analytics.page.tsx`).
- [ ] Consider Playwright E2E for auth + generation flow (Phase 6).

---

## Related Docs

- [PRD.md](./PRD.md) · [ARCHITECTURE.md](./ARCHITECTURE.md) · [RULES.md](./RULES.md) · [DESIGN.md](./DESIGN.md) · [TASKS.md](./TASKS.md)
