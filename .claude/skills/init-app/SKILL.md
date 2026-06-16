---
name: init-app
description: >-
  Design and build a new web app from a plain-language idea through a short
  multiple-choice interview (in Russian). Проектирует и собирает приложение по
  вашему описанию: задаёт простые вопросы, составляет план и создаёт приложение.
  Use when the user types /init-app or asks to "create / build / make an app or
  site", "создай приложение", "сделай сайт", "хочу приложение для…".
argument-hint: <опишите ваше приложение, напр. сайт бронирования столиков>
disable-model-invocation: true
allowed-tools:
  - AskUserQuestion
  - ExitPlanMode
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

# /init-app — interview, plan, and build a web app

You are guiding a **non-technical, Russian-speaking** user. Golden rules:

- **Every word the user sees is in Russian**, warm and jargon-free. This file (your
  instructions) is English; user-facing strings are Russian.
- **Never show code, stack traces, or terminal output.** Translate any problem into
  «что случилось и что делаем дальше».
- **Always offer a recommended, safe default** and keep moving. Forward progress beats
  interrogation. The user should never feel stuck.
- Read `conventions.md` once before building. Read a playbook only when its branch applies.

## Step 0 — Analyze the idea (silent, no questions)

Read `$ARGUMENTS`. Infer and note (you will surface these later in the plan):
- **type guess**: marketing/static site vs data-backed app. Heuristics → DB: «учёт»,
  «записи», «заявки», «личный кабинет», «пользователи», «база», «каталог с заказами».
  → static: «лендинг», «визитка», «портфолио», «промо», «одностраничник».
- **entities** (nouns → future tables/content), **screens** (implied pages),
  **integration hints** («почта», «телеграм», «оплата»).

If `$ARGUMENTS` is **empty**, don't error. Ask one warm opener with AskUserQuestion:
«О чём ваше приложение?» options: *Сайт-визитка / лендинг*, *Каталог или магазин*,
*Учёт записей или заявок*, *Своя идея* (free text). Then continue.

## Step 1 — Framing questions (ONE AskUserQuestion call)

Use the canonical Russian wording in `questions-ru.md`. Pre-mark the recommended option
based on Step 0. Ask Q1–Q3 always; add Q4 only if the type guess is data-backed:

- **Q1 «Что мы создаём?»** → Сайт-визитка/лендинг · Приложение с данными · Пока не знаю
- **Q2 «Нужен ли вход по логину?»** → Без входа · Личные кабинеты · Один администратор
- **Q3 «Что приложение должно уметь дополнительно?»** (multiSelect) → Отправка писем на
  e-mail · Уведомления в Telegram · Приём оплаты · Ничего из этого *(рекомендуется)*
- **Q4 (DB path) «Кто видит данные?»** → Каждый — только свои *(рек.)* · Все видят всё ·
  Только администратор

If Q1 = «Пока не знаю», resolve it inline (counts toward this round, not a new one) with a
2-question mini-clarifier: «Нужно ли сохранять данные между визитами?» and «Будут ли люди
входить под своим аккаунтом?». Any "yes" → data-backed; otherwise → static.

## Step 2 — Idea-specific follow-ups (ONE AskUserQuestion call, 2–4 questions)

Generate questions from Step 0 + Step 1. Ask a question **only if** its answer changes a
table, a screen, or a workflow AND you cannot safely guess it (>80% confidence). Each must
be 3–4 plain-Russian options with one recommended. Examples of good follow-ups live in
`questions-ru.md` (blog, booking, CRM). After this round, **stop asking** — anything still
unknown becomes a stated assumption in the plan.

If the user answers vaguely / «не знаю» twice, stop questioning and take the recommended
defaults, recording them under «Мои предположения». The only remaining question after this is
the mandatory design step below.

## Step 2.5 — Design direction (MANDATORY, ONE AskUserQuestion call)

Always offer a design choice — this is what makes the result feel "wow". Load the `designer`
skill and use `designer/design-directions.md` to propose **3 directions that genuinely fit this
app's purpose and mood** (a clinic ≠ a bar), each with a short warm Russian label + one-line
feel; mark the first as recommended. Header «Дизайн», question «Какой стиль вам нравится?».

Always add a **4th option: «Как на конкретном сайте (укажу ссылку)»**. If chosen, ask a quick
follow-up for the link (free-text/Other), then follow `designer/design-from-url.md`: `WebFetch`
the site, extract its design language, summarize it back in 1–2 Russian sentences to confirm,
and recreate the **aesthetic** (never copy their content/images/logos).

Record the chosen direction (and inspiration URL, if any) — it goes into the plan's `## Дизайн`
section and is applied during the build via tokens in `app/globals.css` + `tailwind.config.ts`.

## Step 3 — Route to a branch

- **Static site** → read `playbook-static.md`. No database, no Supabase.
- **Data-backed app** → read `playbook-supabase.md`. This is also where you check the
  Supabase account state (`list_organizations`) and quote cost (`get_cost`) BEFORE
  promising a database. If there is no account or the user declines the cost, **degrade
  gracefully** to the static branch with local mock data, and keep DB steps as deferred.
- **Integrations** chosen in Q3 → read `playbook-integrations.md` (additive to either branch).

## Step 4 — Write the plan and get approval

Write the plan to `.claude/app-plan.md` **in Russian** with these sections:
`## Что мы строим` · `## Тип` · `## Дизайн` (chosen direction, + inspiration URL if any) ·
`## Экраны` · `## Данные` (if DB) · `## Интеграции` · `## Мои предположения` ·
`## Стоимость` (if DB) · and a checkbox `## Прогресс` section listing the ordered build
steps, e.g.:

```
## Прогресс
- [ ] 1. Каркас Next.js + Tailwind + дизайн-токены выбранного стиля
- [ ] 2. Страницы: главная, …
- [ ] 3. База данных Supabase (проект + таблицы + защита доступа)
- [ ] 4. Интеграции: …
- [ ] 5. Проверка и запуск (/start)
```

Then call **ExitPlanMode** so the user sees the native approve/reject UI. The plan text
they read is the Russian content you just wrote.

## Step 5 — Build (after approval)

On approval, build the app step by step, following `conventions.md`, the `designer` and
`developer` skills, and the relevant playbook. **First apply the chosen design direction** as
tokens in `app/globals.css` + `tailwind.config.ts`, then build screens from those tokens.
**After completing each step, check off its box in `.claude/app-plan.md`** so the work is
resumable. Keep the user informed in short Russian updates («Подбираю стиль…», «Делаю
страницы…», «Создаю базу данных, это пара минут…»).

When done, run `/start` (or call `preview_start` with `name: "web"`) so the user sees the
result, and tell them in Russian what was built and what (if anything) they still need to
provide (e.g. an API key). If the build is interrupted, the user can type `/build` to resume.

## Never-stuck guarantees (summary)

Empty idea → opener question. «Не знаю» → defaults + record assumptions. No Supabase
account / cost declined → static build now + deferred DB steps + a 3-step Russian guide to
create a free Supabase account. Missing integration key → working placeholder + fallback,
listed in the plan. Any error → friendly Russian explanation, never a stack trace.
