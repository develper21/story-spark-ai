# 🎨 Design System

## Story Spark AI — Imaginative. Immersive. Creator-First.

This document defines the visual design system, UI components, and user experience guidelines for Story Spark AI. The goal is to create a modern, immersive, and writer-friendly interface with a consistent identity across the platform. *(Source of truth: [`design-system.css`](../design-system.css) and [`frontend/tailwind.config.ts`](../frontend/tailwind.config.ts).)*

---

## 1. Design Principles

| | | |
|:---:|:---:|:---:|
| ✨ **Imaginative**<br>Sparks creativity with playful AI interactions. | 🌙 **Immersive**<br>Dark, aurora-toned canvas that lets stories shine. | 🧩 **Consistent**<br>Follow a unified, token-driven design system. |
| ♿ **Accessible**<br>Readable contrast, keyboard-friendly, focus-visible. | ⚡ **Responsive**<br>Mobile-first layouts on a 4px spacing grid. | 🚀 **Fast**<br>Perceived speed: skeletons, streaming text, optimistic UI. |

---

## 2. Color Palette

Primary colors used across the application — **locked** in `design-system.css` as CSS custom properties.

### Brand Colors

| Swatch | Token | Hex | Usage |
|---|---|---|---|
| 🟣 | `--spark-purple` | `#b76dff` | Primary brand color — buttons, links, active states |
| 🟣 | `--spark-purple-deep` | `#842bd2` | Hover/pressed states, gradients, accents |
| 🟣 | `--spark-purple-dim` | `#ddb7ff` | Soft highlights, disabled primary |
| 🟠 | `--spark-coral` | `#d97722` | Secondary accent — badges, highlights, warm emphasis |

### Background & Surfaces (Dark Theme)

| Swatch | Token | Hex | Usage |
|---|---|---|---|
| ⬛ | `--spark-bg` | `#0f131d` | App background |
| ⬛ | `--spark-bg-lighter` | `#141925` | Section backgrounds |
| ◾ | `--spark-surface` | `#1c1f2a` | Cards, modals, dropdowns |
| ◾ | `--spark-surface-low` | `#171b26` | Inset surfaces, code blocks |

### Text & Borders

| Swatch | Token | Hex | Usage |
|---|---|---|---|
| ⚪ | `--spark-text` | `#dfe2f1` | Primary text |
| 🔘 | `--spark-text-muted` | `#9ea2b8` | Secondary text, captions |
| 🔘 | `--spark-text-dim` | `#6b7084` | Placeholder, disabled text |
| ▫️ | `--spark-border` | `#4d4354` | Card and input borders |
| ▫️ | `--spark-outline` | `#988d9f` | Focus rings, outlines |

### Semantic Colors (Tailwind tokens)

| Swatch | Token | Hex | Usage |
|---|---|---|---|
| 🟢 | `success` | use `#22c55e` | Success messages, completed tasks |
| 🟡 | `warning` | use `#f59e0b` | Warnings, caution states |
| 🔴 | `error` | `#ffb4ab` (on `#93000a` container) | Error messages, destructive actions |

### Aurora Background

The signature gradient backdrop, applied via `.aurora-bg`:

```
radial-gradient(ellipse 60% 50% at 25% 35%, rgba(183,109,255,0.10), transparent 60%),
radial-gradient(ellipse 50% 60% at 75% 65%, rgba(217,119,34,0.06), transparent 60%)
```

---

## 3. Typography

We use **Inter** as the primary font for a clean, highly readable interface.

| | |
|---|---|
| **Aa** | **Inter** — Primary Font<br>Clean, modern and highly readable.<br>`font-family: 'Inter', system-ui, -apple-system, sans-serif` |

### Type Scale (professional, capped sizes)

| Token | Size / Line Height | Usage |
|---|---|---|
| `h1` | 2.25rem / 1.2 · weight 700 | Hero headlines (max 36px) |
| `h2` | 1.5rem / 1.3 · weight 600 | Section titles |
| `h3` | 1.25rem / 1.4 · weight 600 | Card titles |
| `body` | 1rem / 1.5 · weight 400 | Default body copy (16px) |
| `small` | 0.875rem / 1.5 | Captions, meta info |
| `mono` | 0.875rem · `'JetBrains Mono', monospace` | Prompts, code, tokens |

---

## 4. Spacing & Radius (4px Grid)

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--sp-1` | 4px | | `--sp-6` | 24px |
| `--sp-2` | 8px | | `--sp-8` | 32px |
| `--sp-3` | 12px | | `--sp-12` | 48px |
| `--sp-4` | 16px | | `--sp-16` | 64px |

| Component | Token | Value |
|---|---|---|
| Inputs & Buttons (height) | `--input-height` / `--button-height` | 48px |
| Cards (radius) | `--card-radius` | 16px |
| Inputs & Buttons (radius) | `--input-radius` / `--button-radius` | 10px |
| Card max width | `--card-max-width` | 420px |

---

## 5. UI Components

Standard components to be used throughout the application.

### Buttons

| Variant | Style | Usage |
|---|---|---|
| **Primary** | `--spark-purple` bg, white text, 10px radius | Generate, Publish, CTA |
| **Secondary** | transparent bg, `--spark-border` border, `--spark-text` text | Cancel, tertiary actions |
| **Destructive** | semantic red bg | Delete post, remove account |
| **Ghost** | no bg, muted text, purple on hover | Nav links, icon buttons |

**States:** default → hover (`--spark-purple-deep`) → active (scale 0.98) → disabled (`--spark-purple-dim`, 50% opacity) → loading (spinner, no pointer events).

### Inputs

- Height 48px, radius 10px, `--spark-surface` background, `--spark-border` border.
- Focus: `--spark-outline` ring (2px) + border brightens to `--spark-purple`.
- Error: red border + helper text in semantic red, `aria-describedby` wired.
- Placeholder uses `--spark-text-dim`.

### Cards

- `--spark-surface` background, 16px radius, 1px `--spark-border` border.
- Padding `--sp-6` (24px); hover lifts 2px with a soft purple shadow.
- Story cards add cover image (16:9, `object-fit: cover`) + tag chips.

### Tag Chips

- Pill shape, 12px vertical padding, topic `color` from the post data.
- Selected chip: filled with topic color at 20% opacity + colored text.

### Modals & Drawers

- Overlay: `rgba(15, 19, 29, 0.7)` + backdrop blur 4px.
- Content: `--spark-surface`, radius 16px, max-width 420px (`--card-max-width`), ESC to close, focus trapped.

### Toasts & Notifications

- Bottom-right stack, `--spark-surface-low` background, left accent bar (green/red/purple by type).
- Auto-dismiss 4s; notification bell uses unread dot in `--spark-coral`.

### Loading States

- Skeletons match final layout (shimmer at 8% white), never generic spinners for content areas.
- AI generation streams text token-by-token with a blinking caret in `--spark-purple`.

---

## 6. Iconography & Motion

- **Icons:** [Lucide](https://lucide.dev) (already a dependency) — 1.5px stroke, 20px default.
- **Motion:** 150–200ms ease-out for hovers/fades; 250ms for modals. Respect `prefers-reduced-motion`.
- **Micro-interactions:** heart-burst on like, caret pulse during streaming, subtle parallax on aurora (≤2px).

---

## 7. Accessibility Checklist

- ✅ Text contrast ≥ 4.5:1 against its surface (all text tokens pass on their backgrounds).
- ✅ Every interactive element has a visible `:focus-visible` ring (`--spark-outline`).
- ✅ Form fields have labels; errors are announced via `role="alert"`.
- ✅ Hit targets ≥ 44×44px on touch devices.
- ✅ Color is never the only status signal (icons + text accompany color).

---

## Related Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md) — where components live in the codebase.
- [RULES.md](./RULES.md) — rules for following this design system.
- [PRD.md](./PRD.md) — product context behind the UX decisions.
