# Design direction catalog (archetypes)

A palette of aesthetic archetypes to draw on when generating the 3 tailored options in the
`/app-init` design step. **Don't just list these blindly** — pick and rename the 3 that fit the
specific app's purpose and audience, with warm Russian labels. Each archetype below has a mood,
palette cue, typography cue, and Tailwind/CSS hint.

## Archetypes

- **Премиум-dark (космос)** — deep near-black surfaces, one luminous accent + soft gradient
  glow, glassmorphism. Mood: премиально, технологично. Type: clean sans, large display.
  Hint: this is the starter's default look (`--ink`, `.glass`, `.gradient-text`).
- **Современный минимал** — light, lots of whitespace, one bold accent, crisp type, thin
  borders. Mood: спокойно, дорого, «как Apple/Linear». Type: large headings, restrained body.
- **Тёплый заботливый** — warm off-white/cream, soft rounded cards, gentle accent (terracotta /
  peach / sage). Mood: дружелюбно, по-человечески. Type: friendly humanist sans, big radius.
- **Корпоративный доверие** — calm blues/teal + neutral grays, structured grid, subtle shadows.
  Mood: надёжно, профессионально (финансы, юр., медицина). Type: neutral sans, clear tables.
- **Тёмный неон** — dark base with vivid neon accents (magenta/cyan/lime), glow on hover.
  Mood: энергично, ночная жизнь, гейминг. Use sparingly; keep contrast readable.
- **Натуральный / эко** — earthy greens/browns, paper textures, organic shapes. Mood: природа,
  крафт, локальный бизнес. Type: warm serif headings + sans body.
- **Редакционный / журнал** — strong serif headlines, column layouts, big imagery, classic
  black-on-white with one accent. Mood: контент, блог, медиа.
- **Игривый яркий** — vivid gradients, fun shapes, bouncy motion. Mood: дети, развлечения,
  креатив. Keep it tasteful; don't sacrifice readability.

## How to map a chosen direction into the build

1. Set CSS variables in `app/globals.css` (surface, text scale, primary/secondary accent) and
   matching Tailwind theme tokens — replace/extend the cosmic defaults if the direction differs.
2. Choose ONE type scale and apply consistently; pick radius + shadow that match the mood.
3. Restyle shared components (Header, Hero, Card, Button, Footer) from the tokens — never
   hardcode one-off colors.
4. Keep `prefers-reduced-motion` support and WCAG AA contrast in every direction.

## Examples of tailored option sets

- **Клиника**: «Спокойный медицинский» (корпоративный доверие) · «Тёплый заботливый» · «Современный минимал».
- **Кофейня**: «Тёплый уют» (натуральный) · «Современный минимал» · «Редакционный».
- **Ночной бар**: «Тёмный неон» · «Премиум-dark» · «Игривый яркий».
- **Финтех/учёт**: «Корпоративный доверие» · «Современный минимал» · «Премиум-dark».
