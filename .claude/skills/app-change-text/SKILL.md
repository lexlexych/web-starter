---
name: app-change-text
description: >-
  Instantly replace the text of an element the user selected in the live preview
  with new text they typed. Быстро заменяет текст выделенного в окне справа
  элемента на тот, что ввёл пользователь. Use when the user types /app-change-text
  (usually after selecting a text element in the preview), or asks to "change /
  replace this text", "поменяй текст", "замени надпись", "исправь надпись".
argument-hint: <новый текст>
disable-model-invocation: true
allowed-tools:
  - Read
  - Edit
  - Grep
  - Glob
  - mcp__Claude_Preview__preview_list
  - mcp__Claude_Preview__preview_inspect
---

# /app-change-text — instant text swap from a preview selection

The user selected a **text element** in the live preview on the right and typed the replacement.
Your job: swap the old text for the new one in the source, **fast and cheap**. Talk to the user
in short, warm Russian — but this is a quick command, so keep chatter to one line.

`$ARGUMENTS` = the **new** text. The **old** text is the current content of the selected element.

## Do exactly this — no extra checks, no detours

1. **Get the old text** — the current text of the selected element.
   - Prefer the selection details already attached to the request (the selected element's text).
   - Only if the text isn't already known and you just have a CSS selector: `preview_list` →
     `serverId`, then one `preview_inspect` call on that selector to read `textContent`. Nothing more.

2. **Find it in source.** `Grep` for the exact old text (literal) across `app/`, `components/`,
   `lib/`, using `output_mode: "content"` to get the file and line. If several places match, pick
   the one that is visible UI text (a JSX/string literal in `app/` or `components/`) closest to the
   selected element. Don't over-investigate.

3. **Replace it.** Read that one file, then `Edit` old → new as a **single exact string
   replacement**. Change nothing else — no reformatting, no other occurrences, no other files.

4. **Done.** The preview hot-reloads on its own — no build, no restart, no screenshot. Confirm in
   one Russian sentence, e.g. «Готово! Поменял текст. Посмотрите справа 👉».

## Keep it lean (this is the whole point)

- **No** `npm run build`, **no** advisors, **no** playbooks, **no** screenshots — speed and low
  token cost come first. Skip every step that isn't find-and-replace.
- Never change the live DOM via eval — those edits vanish on reload. Always edit the source file.

## If the exact text isn't found (rare)

Try a distinctive substring of the old text **once**. If it's still not found, tell the user
briefly in Russian that you couldn't locate that text and ask them to re-select the exact phrase.
Don't keep digging.
