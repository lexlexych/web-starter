---
name: developer
description: >-
  Front-end engineering expertise for building features cleanly in this Next.js +
  TypeScript + Tailwind starter. Auto-invoke whenever writing or editing app code:
  pages, components, routes, data fetching, forms, state, or fixing build/runtime issues.
user-invocable: false
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(npm install)
  - Bash(npm install *)
  - Bash(npm run build)
---

# Developer — build it cleanly and correctly

Background engineering expertise the agent pulls in when implementing or editing app code.
Pairs with `designer/SKILL.md` (how it looks) and `init-app/conventions.md` (project rules).

## Next.js App Router essentials

- **Server Components by default.** Add `"use client"` only when a file needs state, effects,
  event handlers, or browser APIs (like the existing `CosmicBackground.tsx`). Keep client
  components small and at the leaves.
- **Routing**: a folder under `app/` with `page.tsx` is a route; `layout.tsx` wraps children;
  add `loading.tsx` and `error.tsx` for good UX on data-driven routes.
- **Data mutations**: prefer Server Actions or route handlers (`app/api/<name>/route.ts`).
  Validate input on the server. Never trust client-sent values for prices, ownership, etc.
- **Data fetching**: fetch in Server Components where possible; pass typed data down as props.

## Code quality

- **TypeScript**: meaningful types for data and props; avoid `any`. Define shared types in
  `lib/` (e.g. `lib/types.ts`) or alongside the feature.
- **Components**: small, focused, reusable. Reuse `cn()` from `lib/utils.ts` for class merging.
  Keep presentational components free of data-fetching side effects.
- **Files**: pages in `app/`, UI in `components/`, helpers in `lib/`, Supabase client in
  `lib/supabase/`. Match the surrounding code's style and naming.
- **State**: keep it local; lift only when shared. Don't add a state library for simple needs.
- **No dead code / no console spam.** Remove debugging leftovers before finishing.

## Robustness

- Handle **loading, empty, and error** states for anything async — never a blank screen.
- Guard against missing env/keys: degrade gracefully (see `init-app/playbook-integrations.md`),
  never crash the app because a key isn't set yet.
- Keep dependencies minimal; prefer the platform (React + Tailwind) over new packages. Run
  `npm install` only when a dependency clearly earns its place.

## Always verify before declaring done

1. `npm run build` compiles with no type errors, **or** the dev server compiles clean.
2. Launch via the preview (`/app-start` / `preview_start` name `web`) and check the changed screens
   (desktop + narrow viewport); fix console/network errors.
3. Summarize for the user in plain Russian — what changed and how to see it — no code dumps.
