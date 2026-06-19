---
name: app-build
description: >-
  Resume or finish building the app from the saved plan (.claude/app-plan.md).
  Продолжает сборку приложения по сохранённому плану. Use when the user types
  /app-build, or asks to "continue / finish building", "продолжи сборку", "доделай
  приложение", especially after an interrupted /app-init run.
argument-hint: ""
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebFetch
  - Bash(npm install)
  - Bash(npm install *)
  - Bash(npm run build)
  - mcp__Claude_Preview__preview_start
  - mcp__Claude_Preview__preview_list
  - mcp__Claude_Preview__preview_screenshot
  - mcp__supabase__list_organizations
  - mcp__supabase__get_cost
  - mcp__supabase__confirm_cost
  - mcp__supabase__create_project
  - mcp__supabase__get_project
  - mcp__supabase__list_projects
  - mcp__supabase__apply_migration
  - mcp__supabase__execute_sql
  - mcp__supabase__get_project_url
  - mcp__supabase__get_publishable_keys
  - mcp__supabase__generate_typescript_types
  - mcp__supabase__get_advisors
  - mcp__supabase__search_docs
---

# /app-build — execute the saved plan

Resumes the build defined in `.claude/app-plan.md`. Same audience and rules as `/app-init`:
**Russian to the user, no code/jargon/stack traces, always a recommended default.**

## Steps

1. **Read `.claude/app-plan.md`.** If it doesn't exist, don't error — tell the user in
   Russian: «Пока нет плана для сборки. Напишите `/app-init` и опишите вашу идею — я составлю
   план, а потом соберу приложение.» Then stop.

2. **Find the first unchecked step** in the `## Прогресс` section (`- [ ]`). Everything above
   it is already done — do not redo it.

3. **Read the relevant guidance**: `conventions.md` always; `playbook-supabase.md` for DB
   steps; `playbook-integrations.md` for integration steps; `playbook-static.md` for pages.
   If a DB step was deferred because Supabase wasn't connected, re-check now with
   `list_organizations` — if it's available, proceed; if still not, keep it deferred and tell
   the user the 3-step Russian note for connecting Supabase.

4. **Execute each remaining step in order.** After finishing a step, **check off its box** in
   `.claude/app-plan.md` (`- [x]`) before moving on, so the work stays resumable.

5. **When all steps are checked**, run a final check (`npm run build` or compile clean),
   launch with `preview_start` (name `web`), screenshot, and give the user a short Russian
   summary of what's ready and any keys they still need to add to `.env.local`.

## If something fails

Translate the problem into friendly Russian, leave the current step unchecked (so `/app-build`
can retry it), and suggest the simplest next action. Never surface raw errors.
