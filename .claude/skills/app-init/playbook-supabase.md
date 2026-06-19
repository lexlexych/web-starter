# Playbook: data-backed app on Supabase

Read this when the user chose «Приложение с данными». Tools are `mcp__supabase__*`. The app
runs locally (localhost:3000); the database lives in Supabase cloud. Follow this order — it
is load-bearing.

## 0. Preconditions & graceful degradation

1. `mcp__supabase__list_organizations`.
   - **≥1 org** → continue. If several, ask with AskUserQuestion (header «Аккаунт»),
     recommend the first/personal one.
   - **0 orgs or error** → the user has no Supabase account / token. **Do NOT dead-end.**
     Build the static branch now with local mock data (see `playbook-static.md` + "Mock data"
     below) so they get a working app, mark the DB steps as deferred in `.claude/app-plan.md`,
     and give them this 3-step Russian note:
     > Чтобы включить базу данных позже: 1) заведите бесплатный аккаунт на supabase.com;
     > 2) создайте токен на supabase.com/dashboard/account/tokens; 3) вставьте его в `.env.local`
     > как `SUPABASE_ACCESS_TOKEN` и напишите `/app-build`.

## 1. Cost gate (mandatory — cannot be skipped)

`mcp__supabase__get_cost(type:"project", organization_id:<org>)` → show the figure to the
user in plain Russian and confirm with AskUserQuestion: «Создаю базу данных. Тариф: <X>.
Продолжаем?» → *Да, создать* (рек.) · *Нет, пока без базы*.
- *Да* → `mcp__supabase__confirm_cost(...)` and keep the returned `confirm_cost_id`.
- *Нет* → degrade to static + deferred DB (same as no-account path).

## 2. Create the project (async)

`mcp__supabase__create_project(name:<slug-from-idea>, organization_id:<org>,
confirm_cost_id:<id>, region:"eu-central-1")`. Default region **eu-central-1** (closest to
RU/EU users); pick another only if the user says so. Then **poll** `mcp__supabase__get_project`
until status is active (tell the user «Создаю базу, это пара минут…»). Meanwhile, scaffold all
code that doesn't need keys (pages, components, layout) so the wait is productive.

## 3. Schema → migration

Translate Step 0 entities + Round 2 answers into SQL DDL and apply with
`mcp__supabase__apply_migration(name:"init_schema", query:<DDL>)`. One migration per logical
change; snake_case names. Conventions for every table:
- `id uuid primary key default gen_random_uuid()`
- `created_at timestamptz not null default now()`
- For user-owned rows: `user_id uuid not null references auth.users(id) on delete cascade`
- Use enums or `text check (...)` for fixed statuses (e.g. booking status).

## 4. Row Level Security (ALWAYS) → migration

Enable RLS on every table and add policies based on Q4 «Кто видит данные»:
- **Каждый — только свои**: `using (auth.uid() = user_id)` for select/insert/update/delete.
- **Все видят всё**: public `select` (`using (true)`), but write only for authenticated
  (`with check (auth.uid() is not null)`).
- **Только администратор**: restrict to a known admin (e.g. an `is_admin` claim or a single
  allowed `user_id`); no public write.
Never ship a table with RLS disabled or a public write-all policy.

```sql
alter table public.<t> enable row level security;
create policy "<t>_select_own" on public.<t> for select using (auth.uid() = user_id);
create policy "<t>_insert_own" on public.<t> for insert with check (auth.uid() = user_id);
create policy "<t>_modify_own" on public.<t> for update using (auth.uid() = user_id);
create policy "<t>_delete_own" on public.<t> for delete using (auth.uid() = user_id);
```

## 5. Keys → `.env.local`

`mcp__supabase__get_project_url` and `mcp__supabase__get_publishable_keys`. Write to
`.env.local` (create if absent; it is git-ignored):
```
NEXT_PUBLIC_SUPABASE_URL=<project url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sb_publishable_... key>
```
Use the **publishable** key (`sb_publishable_...`), not the legacy anon JWT. The service-role
key is server-only and only added if a server action truly needs it — never `NEXT_PUBLIC_`.

## 6. Types & client

- `mcp__supabase__generate_typescript_types` → save to `lib/database.types.ts`.
- Add `@supabase/supabase-js` (and `@supabase/ssr` if auth) via `npm install`.
- Create `lib/supabase/client.ts` (browser) and, for auth, `lib/supabase/server.ts` +
  middleware for sessions.

## 7. Auth (only if Q2 = «Личные кабинеты»)

Use Supabase Auth. Email magic-link is simplest for non-technical users. Add login/signup
screens and protect data routes via session checks.

## 8. Verify

Run `mcp__supabase__get_advisors(type:"security")` after migrations. Fix every flagged issue
(exposed table, missing RLS) before declaring done. Then launch with `preview_start`.

## Mock-data fallback (when DB is deferred)

If DB is unavailable, build the same screens against a typed in-memory/JSON mock in
`lib/mock-data.ts` so the app fully runs locally. Keep the data shapes identical to the
planned schema so swapping in Supabase later (`/app-build`) is a small change.
