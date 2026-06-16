# Build conventions (read once before building)

These keep every generated app consistent, runnable, and safe. The starter already ships
with a working Next.js + Tailwind base — **extend it, don't recreate it.**

## Stack & structure

- **Next.js (App Router) + TypeScript + Tailwind CSS.** Already configured.
- Pages live in `app/<route>/page.tsx`. The home page is `app/page.tsx`.
- Reusable UI in `components/`. Helpers in `lib/`. Supabase client in `lib/supabase/`.
- API/server logic in route handlers `app/api/<name>/route.ts` or server actions.
- Keep the dependency footprint small. Prefer built-in React + Tailwind + CSS over new
  libraries. Only add a dependency when it clearly pays for itself, and run `npm install`.

## Styling

- Match the existing cosmic, premium aesthetic by default, but adapt palette/tone to the
  app's purpose (a clinic booking site should feel calm and trustworthy, not neon).
- Reuse the `.glass` and `.gradient-text` utilities and the design tokens in
  `app/globals.css`. Mobile-first; everything must look good on a narrow viewport.
- Real, sensible Russian content — never lorem ipsum. Use believable example data.

## The launch config (do not break /start)

`.claude/launch.json` defines the preview server named `web` → `npm run dev` on port 3000.
Keep the dev command and port stable so `/start` keeps working. If you add a second server
later, add a new named configuration rather than editing `web`.

## Environment & secrets (critical)

- Secrets go ONLY in `.env.local` (git-ignored). Never commit them; never print them in chat.
- Browser-exposed values must be prefixed `NEXT_PUBLIC_` (e.g. Supabase URL + publishable key).
- The Supabase **service-role** key (and any provider secret like Stripe secret / Resend key)
  is server-only — never `NEXT_PUBLIC_`, never sent to the client.
- When an integration needs a key the user hasn't provided, write a labeled placeholder in
  `.env.local`, make the feature degrade gracefully, and list the key in the plan with a
  one-line Russian note on where to get it.

## Verification before declaring "done"

1. `npm run build` succeeds (or the dev server compiles with no errors).
2. Launch via `preview_start` (name `web`) and screenshot the key screens.
3. For DB apps: run `get_advisors(type:"security")` and fix anything flagged.
4. Tell the user in plain Russian what was built and what they still need to provide.

## Tone with the user (always Russian)

Short, warm, concrete. No code, no jargon, no stack traces. Frame every problem as «вот что
случилось и что я делаю дальше». Always end a build with the next step they can take.
