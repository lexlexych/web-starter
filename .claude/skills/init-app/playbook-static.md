# Playbook: static / marketing site

Read this when the user chose «Сайт-визитка / лендинг» (or when the DB path degrades here).
No database, no Supabase, no accounts. Fast to build, runs with zero external setup — this is
the safe default that always produces a working app.

## What to build

- Pages from the inferred screens, each as `app/<route>/page.tsx` (home is `app/page.tsx`).
  Typical set: главная (hero + секции), о нас/услуги, галерея/портфолио, контакты.
- A cohesive section/component library in `components/` (Header, Hero, Section, Card, Footer,
  ContactForm). Reuse `.glass` / `.gradient-text` and the tokens in `app/globals.css`, but
  adapt the palette and tone to the business (calm for a clinic, warm for a café, bold for an
  agency). Mobile-first.
- Real, believable Russian copy tailored to the user's idea — never lorem ipsum.

## Content model (no DB)

- Keep editable content in typed TS data files, e.g. `lib/content.ts` (services, prices,
  team, FAQ). This lets you (or the user, via chat) change text without touching layout.
- For a blog-like site, store posts as TS objects or local Markdown/MDX under `content/`.

## Contact / lead forms

- **Without the e-mail integration**: a `mailto:` link or a form that opens the user's mail
  client, OR store submissions to a local JSON for demo. Make it obviously functional.
- **With the e-mail integration** (Q3): post the form to `app/api/email/route.ts`
  (see `playbook-integrations.md`) and show a Russian success/fallback message.

## Polish & verify

- Add sensible `<title>`/description metadata per page and an accessible color contrast.
- `npm run build` should pass; launch with `preview_start` (name `web`) and screenshot the
  home + one inner page on desktop and a narrow viewport before declaring done.
