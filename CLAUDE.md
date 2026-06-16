# Web Starter — project guide for Claude

This repo is a **starter kit that lets non-technical, Russian-speaking users build web apps
purely by chatting in Claude Code Desktop.** They never see code. Optimize every interaction
for that audience.

## Prime directives

- **Talk to the user in Russian**, warm and jargon-free. Short sentences. No code blocks,
  no terminal output, no stack traces in chat. Translate problems into «что случилось и что
  делаем дальше».
- **Always offer a recommended, safe default** and keep moving. The user should never be stuck.
- **Confirm before anything costly or irreversible** (e.g. creating a paid Supabase project) —
  show the cost in plain Russian and ask first.
- These instructions (and all skill/playbook files) are in **English** for reliability;
  user-facing strings are **Russian**.

## How the system works

User-invoked commands:

- **`/start`** — runs the app in the preview panel. Always start servers via the Claude
  Preview tool (`preview_start`, config name `web` in `.claude/launch.json`) — **never**
  `npm run dev` in Bash.
- **`/init-app <idea>`** — interviews the user (Round 1 framing + Round 2 idea-specific +
  a mandatory **design-direction** step), writes a Russian plan to `.claude/app-plan.md`
  (incl. `## Дизайн`), shows it via ExitPlanMode, and on approval builds the app, checking
  off `## Прогресс` steps.
- **`/build`** — resumes/finishes the build from `.claude/app-plan.md` (resumable via checkboxes).
- **`/push`** — commits and pushes to GitHub in one step. First run sets up the repo
  (via `gh` CLI, or an existing repo URL); after that it just publishes. No git jargon to the user.

Background knowledge skills (auto-invoked, hidden from the `/` menu):

- **`designer`** — design directions, tokens, accessibility; powers the `/init-app` design step
  (incl. «как на конкретном сайте» via `WebFetch`, recreating aesthetic only, never copying content).
- **`developer`** — Next.js/React/TS/Tailwind engineering practices for clean, robust features.

## Stack & commands

- **Next.js (App Router) + TypeScript + Tailwind CSS.** Dev: `npm run dev` (port 3000).
  Build: `npm run build`. Install deps: `npm install`.
- Structure: pages in `app/`, UI in `components/`, helpers in `lib/`, Supabase client in
  `lib/supabase/`, API in `app/api/<name>/route.ts`.
- The home page (`app/page.tsx`) is the cosmic landing page — keep it as the inviting default
  unless the user's app replaces it.

## Defaults

- **Database** for data-backed apps: **Supabase** (Postgres cloud). App runs locally; DB is
  cloud. See `.claude/skills/init-app/playbook-supabase.md` for the exact MCP sequence.
- **Integrations**: e-mail → Resend, notifications → Telegram Bot API, payments → Stripe.
  See `.claude/skills/init-app/playbook-integrations.md`.
- Keep dependencies minimal so `npm install` stays fast.

## Security (non-negotiable)

- Secrets only in `.env.local` (git-ignored). Never commit or print them.
- Browser-exposed values use `NEXT_PUBLIC_`; the Supabase service-role key and all provider
  secrets are server-only.
- Supabase: enable RLS on every table; after migrations run `get_advisors(type:"security")`
  and fix anything flagged. Never ship a public write-all table.

## Analytics

`@vercel/analytics` is already wired (`<Analytics />` in `app/layout.tsx`, import from
`@vercel/analytics/next`). It is a no-op locally and only collects data once the app is
deployed to Vercel and Analytics is enabled in the Vercel dashboard.

## Out of scope (for now)

One-command deploy/hosting to a live URL, and CI. Publishing source to GitHub (`/push`) and
Vercel Analytics are in scope; everything still runs locally. Architecture leaves room to add
a deploy skill later.
