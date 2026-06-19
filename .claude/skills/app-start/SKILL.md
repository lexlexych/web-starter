---
name: app-start
description: >-
  Run the current web app and open it in the live preview panel on the right.
  Запускает приложение и открывает его в окне предпросмотра справа.
  Use when the user types /app-start or asks to "run", "launch", "open", "show",
  "preview", "запусти", "покажи демо", "открой приложение".
argument-hint: ""
disable-model-invocation: true
allowed-tools:
  - Read
  - Glob
  - Bash(npm install)
  - Bash(npm install *)
  - mcp__Claude_Preview__preview_start
  - mcp__Claude_Preview__preview_list
  - mcp__Claude_Preview__preview_screenshot
  - mcp__Claude_Preview__preview_stop
---

# /app-start — launch the app in the preview panel

Goal: get the running web app into the preview panel on the right with the least
friction, then confirm it to the user **in Russian**. The user is non-technical —
never show raw errors or commands; explain what is happening in one or two friendly
Russian sentences.

## Steps

1. **Ensure dependencies are installed.** Check whether `node_modules/` exists
   (use Glob for `node_modules/.package-lock.json` or `node_modules/next`). If it is
   missing, tell the user in Russian "Готовлю проект к запуску, это займёт минуту…"
   and run `npm install`. If it already exists, skip straight to step 2.

2. **Start the server via the preview tool — NEVER via `npm run dev` in Bash.**
   Call `mcp__Claude_Preview__preview_start` with `name: "web"` (defined in
   `.claude/launch.json`). This launches the dev server on port 3000 and opens the
   preview panel on the right. If a server is already running, the tool reuses it.

3. **Confirm it visually (optional but nice).** Use `mcp__Claude_Preview__preview_list`
   to get the `serverId`, then `mcp__Claude_Preview__preview_screenshot` to verify the
   page rendered. If it looks good, proceed; if it is blank, wait a moment (Next.js
   needs ~3–5s on first start) and screenshot again.

4. **Tell the user, in Russian**, something warm and short, e.g.:
   «Готово! Ваше приложение открылось справа 👉 Покрутите его, а когда захотите сделать
   своё — напишите `/app-init` и опишите идею.»

## Troubleshooting (translate to friendly Russian, don't dump errors)

- **`npm` / Node.js not found** → "Похоже, не установлен Node.js. Скачайте его с
  nodejs.org (кнопка LTS), установите и снова напишите `/app-start`."
- **Port 3000 busy** → the preview tool handles this; if it still fails, suggest closing
  other running apps and retrying `/app-start`.
- **Blank preview** → wait a few seconds and screenshot again; first build is slower.
