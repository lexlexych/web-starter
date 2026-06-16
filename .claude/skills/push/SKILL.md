---
name: push
description: >-
  Save the project to GitHub: stage, commit, and push in one step. Сохраняет проект
  на GitHub (commit + push) одной командой. On first run, sets up the GitHub repo;
  afterwards just publishes the latest changes. Use when the user types /push or asks
  to "save / publish / upload to GitHub", "сохрани на гитхаб", "опубликуй", "залей".
argument-hint: ""
disable-model-invocation: true
allowed-tools:
  - Read
  - Glob
  - AskUserQuestion
  - Bash(git *)
  - Bash(gh *)
---

# /push — publish the project to GitHub

Goal: let a **non-technical, Russian-speaking** user save their work to GitHub without ever
touching git. Talk only in friendly Russian; never show raw git/gh output or jargon. Translate
everything into «сохраняю на GitHub… готово, вот ссылка». Confirm the repo on first setup; after
that, just publish.

## A. Detect state (run quietly, don't show commands)

- Git repo? `git rev-parse --is-inside-work-tree`. If not → `git init` and set the branch to
  `main` (`git branch -M main`).
- Safety: confirm `.env.local` is git-ignored (it already is in this starter's `.gitignore`).
  If a `.env*.local` or other secret file is somehow tracked, stop and warn in Russian — never
  publish secrets.
- Changes? `git status --porcelain`. If empty AND a remote already exists → tell the user
  «Изменений нет — на GitHub уже актуальная версия» and stop.
- Remote? `git remote get-url origin`. Present → this is a repeat run (go to C). Absent → first
  run (go to B).
- Auth (GitHub CLI preferred): `gh auth status`. If `gh` exists but not logged in → run
  `gh auth login` and tell the user a browser window will open to sign in. If `gh` is not
  installed, you can still push over HTTPS (Git Credential Manager, bundled with Git for
  Windows, opens a browser on first push); if even that fails, explain in Russian how to install
  GitHub CLI: `winget install --id GitHub.cli`, then retry `/push`.

## B. First run — connect a GitHub repo

Ask with AskUserQuestion (header «GitHub»): «Куда сохранить проект на GitHub?»
- **Создать новый репозиторий** (рекомендуется) — спросить короткое имя (latin, no spaces) and
  privacy with a second question «Сделать его приватным или публичным?» → *Приватный (рек.)* /
  *Публичный*. Then:
  `gh repo create <name> --private|--public --source=. --remote=origin --push`
  (this creates the repo, wires `origin`, and pushes the first commit — so make the initial
  commit first if there are changes, see C steps 1–2).
- **Подключить существующий** — ask the user to paste the repository link (the green «Code» →
  HTTPS URL from github.com) via the free-text option. Then:
  `git remote add origin <url>` and continue to C, pushing with `git push -u origin main`.

If `gh` is unavailable for "create new", guide the user (in Russian) to create an empty repo on
github.com (no README), copy its URL, and choose «Подключить существующий» instead.

## C. Commit & push (every run)

1. `git add -A`.
2. Write a short, clear commit message describing what changed (look at `git status` /
   `git diff --stat`). Keep it one concise line; you may add the standard trailer:
   ```
   <короткое описание изменений>

   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```
3. Tell the user in one Russian sentence what you're saving, then `git commit -m "…"`.
4. Push: first run `git push -u origin main` (or the current branch from
   `git branch --show-current`); repeat runs `git push`.
5. Confirm warmly in Russian with the repo link (from `git remote get-url origin`, shown as a
   normal https URL): «Готово! Проект сохранён на GitHub: <ссылка> 🎉».

## Errors → friendly Russian

- Auth failed / browser closed → «Не получилось войти в GitHub. Попробуем ещё раз: откроется
  окно браузера — войдите в свой аккаунт.» then retry `gh auth login`.
- Remote rejected (e.g. repo not empty / behind) → explain simply and offer to pull first or
  rename; never dump the raw error.
- No `gh` and no credentials → the install guidance above. Always leave the user with a clear
  next step.
