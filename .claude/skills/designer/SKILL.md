---
name: designer
description: >-
  Design expertise for building beautiful, on-brand, accessible UI. Auto-invoke
  whenever choosing a visual direction, styling pages/components, picking colors,
  fonts, spacing, or polishing the look of any app built in this starter — and when
  /init-app proposes design directions for the user to choose from.
user-invocable: false
allowed-tools:
  - Read
  - WebFetch
---

# Designer — make it genuinely beautiful

Background expertise the agent pulls in whenever it designs or styles UI in this starter.
The audience is non-technical, so design quality is what makes the result feel "wow". Aim for
the polish of Linear / Vercel / Stripe, adapted to each app's purpose.

## Define a design direction first (don't style ad hoc)

Before building screens, settle a small token system and reuse it everywhere:

- **Palette**: one base/surface family + one primary accent + (optional) one secondary accent +
  neutral text scale. Define success/warning/danger only if the app needs them. Ensure text on
  every background meets **WCAG AA contrast (≥4.5:1 body, ≥3:1 large)**.
- **Typography**: one font family (system stack by default — fast, no network), a clear type
  scale (e.g. display / h1 / h2 / body / caption), generous line-height for body (~1.6).
- **Spacing & radius**: a consistent scale (4/8px rhythm), one or two corner radii. Don't mix
  many radii.
- **Elevation & effects**: subtle shadows/glows tied to the direction; restrained, not gaudy.
- **Motion**: small, purposeful (fade/slide in, hover lift). Always honor
  `prefers-reduced-motion` (the starter's `globals.css` already does).

Store tokens as CSS variables in `app/globals.css` and Tailwind theme extensions in
`tailwind.config.ts` — the same pattern the landing page already uses (`.glass`,
`.gradient-text`, `--ink`, `aurora.*`). Reuse those utilities; extend, don't fight them.

## Generating design options for the user (used by /init-app)

When `/init-app` reaches the design step, propose **3 directions that genuinely fit the app's
purpose and mood** (a clinic ≠ a nightclub), each with a short, warm Russian label + one-line
feel. Pull archetypes and their palette/type/mood cues from `design-directions.md`. Always add a
4th option: «Как на конкретном сайте (укажу ссылку)» — handled via `design-from-url.md`.

## Quality bar (apply on every build/edit)

- Strong visual hierarchy: one clear focal point per screen; size/weight/contrast guide the eye.
- Real, believable Russian content — never lorem ipsum, never placeholder rectangles where real
  content belongs.
- Responsive and mobile-first; check a narrow viewport. Comfortable tap targets (≥40px).
- Accessible: semantic HTML, labelled controls, visible focus states, alt text.
- Consistency over novelty: reuse components and tokens; avoid one-off styles.
- Empty/loading/error states are designed, not afterthoughts.

See also `developer/SKILL.md` for how to implement these cleanly, and
`init-app/conventions.md` for project-specific structure and styling rules.
