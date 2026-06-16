# Design inspired by a specific website

Used when the user picks «Как на конкретном сайте (укажу ссылку)» in the `/init-app` design
step and provides a URL. Goal: capture the **design language** of that site and apply it to the
user's own app.

## Ethical & legal boundary (non-negotiable)

- **Take inspiration from the AESTHETIC, do not copy the site.** Reproduce the *style* —
  palette, typographic feel, spacing rhythm, component shapes, density, overall mood.
- **Never copy** their text/content, photographs, illustrations, icons, logos, brand name, or
  proprietary assets. No scraping images to reuse. Build original content for the user's app.
- If the reference is a well-known brand, match the *vibe*, not their trademarked identity.
- If the URL can't be fetched, say so kindly in Russian and fall back to a generated direction
  from `design-directions.md`.

## Extraction process

1. **Fetch** the page with `WebFetch`, asking it to describe the visual design: dominant colors
   (hex if visible), background vs surface tones, accent color(s), font style (serif/sans,
   weight, size feel), spacing/density, corner radius, use of shadows/gradients/imagery, and
   the overall mood (minimal / playful / corporate / luxe / etc.).
2. **Summarize** the extracted design language back to the user in 2–3 plain Russian sentences
   so they can confirm: «Беру такой стиль: …. Подходит?» (quick confirm; don't over-ask).
3. **Translate into tokens**: derive a palette (surface, text scale, primary/secondary accent),
   a type scale, radius, and shadow/effect set. Write them as CSS variables in
   `app/globals.css` + Tailwind theme tokens — the same token approach as every direction.
4. **Build** the user's screens with those tokens and original content. Keep WCAG AA contrast
   and `prefers-reduced-motion` regardless of the reference.
5. **Record** the chosen direction (and the inspiration URL) in `.claude/app-plan.md` under
   `## Дизайн`.

## Notes

- `WebFetch` returns processed text/markdown, not pixel-perfect CSS — treat the result as a
  description to recreate from, not a stylesheet to copy. When unsure about exact colors, choose
  tasteful values in the same family and confirm with the user.
