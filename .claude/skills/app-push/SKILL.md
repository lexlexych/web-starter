---
name: app-push
description: >-
  Save the project to GitHub from the command line: stage, commit, and push in one step.
  Сохраняет проект на GitHub (commit + push) одной командой через командную строку. On first
  run, asks the user for their GitHub repository URL and has them sign in via the browser;
  afterwards it just publishes the latest changes. Every push also records what changed into the
  changelog (CHANGELOG.md). Use when the user types /app-push or asks
  to "save / publish / upload to GitHub", "сохрани на гитхаб", "опубликуй", "залей".
argument-hint: ""
disable-model-invocation: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Bash(git *)
  - Bash(date *)
---

# /app-push — publish the project to GitHub (command line)

Goal: let a **non-technical, Russian-speaking** user save their work to GitHub. All GitHub
operations run through the **command line** with plain **git** commands (via the Bash tool) — the
only other local step is writing the change journal (`CHANGELOG.md`). Talk only in friendly Russian;
never show raw git output or jargon. Translate everything into «сохраняю на GitHub… готово, вот
ссылка».

## Two hard rules (do not break)

- **Publish only with git on the command line.** Do every GitHub operation (`init`, `remote add`,
  `add`, `commit`, `push`) with `git …` commands through the Bash tool. Do not use any other tool,
  CLI, or GUI to publish. (Editing the local `CHANGELOG.md` with the editor — see step C — is fine;
  that's a local file, not a publish step.)
- **Never install anything.** Do NOT attempt to install Git, GitHub CLI (`gh`), credential
  managers, or any other tool — no `winget`, `choco`, `npm i -g`, `gh …`, etc. Assume Git is
  already installed (it comes from the README setup). If a `git` command reports "command not
  found", **stop** and tell the user in Russian to install Git for Windows from git-scm.com, then
  retry `/app-push` — but do not install it yourself.

## A. Check the state (run quietly via git, don't show commands)

- Git repo? `git rev-parse --is-inside-work-tree`. If not → `git init` and `git branch -M main`.
- Secrets safety: confirm `.env.local` is git-ignored (it already is in this starter's
  `.gitignore`). If a `.env*.local` or other secret file is somehow tracked, **stop** and warn in
  Russian — never publish secrets.
- Anything to save? `git status --porcelain`. If empty AND a remote already exists → tell the user
  «Изменений нет — на GitHub уже актуальная версия» and stop.
- Remote set up? `git remote get-url origin`.
  - **Present** → this is a repeat run, go to **C**.
  - **Absent** → first run, go to **B**.

## B. First run — connect the GitHub repository

The user needs an empty repository already created on github.com (just the repo, no files). Ask
them in plain Russian for its link, and **show an example** so they know exactly what to paste:

> «Вставьте ссылку на ваш репозиторий на GitHub. Она выглядит примерно так:
> `https://github.com/ваш-логин/название-репозитория.git`»

Accept the link with or without the trailing `.git`. Then connect it from the command line:

- `git remote add origin <url>`

**Before the first push, warn the user what will happen** (this is the browser sign-in step):

> «Сейчас сохраню проект на GitHub. Откроется окно входа — выберите в нём пункт
> «Войти через браузер» (Sign in with your browser). После входа я смогу загрузить проект, и
> в следующий раз вход уже не понадобится.»

Then continue to **C** and push with `git push -u origin main`. On this first push Git opens the
sign-in window; once the user picks «Войти через браузер» and logs in, the push completes and they
stay logged in for next time.

## C. Record the changes, commit & push (every run, command line only)

1. **See what changed.** Look at `git status --porcelain` and `git diff --stat` (and `git diff`
   when you need detail) to understand what actually changed since the last save.

2. **Write a short Russian summary** of those changes: one short title + 2–5 plain-Russian bullet
   points («что поменялось»). No code, no file paths, no jargon — describe it the way the user
   would. You'll reuse this same summary for both the changelog and the commit message.

3. **Add an entry to the changelog.** Get today's date with `date +%F` (format `YYYY-MM-DD`).
   Open `CHANGELOG.md` and **prepend** a new entry directly under the intro block (newest on top),
   so the latest context is always visible:
   ```
   ## <YYYY-MM-DD> — <короткий заголовок>

   - <что поменялось, простыми словами>
   - …
   ```
   If `CHANGELOG.md` doesn't exist yet, create it first with the standard header
   («# 📓 Журнал изменений» + the one-line explanation), then add this entry.

4. `git add -A` — this stages your code changes **and** the changelog update together, so the
   entry travels in the same commit it describes.

5. **Commit.** Reuse the changelog title as a short, clear one-line commit message. You may add the
   standard trailer:
   ```
   <короткий заголовок>

   🤖 Generated with Claude Code
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```
   Tell the user in one Russian sentence what you're saving, then `git commit -m "…"`.

6. **Push from the command line:**
   - first run: `git push -u origin main` (or the current branch from `git branch --show-current`)
     — this is where the browser sign-in window appears;
   - repeat runs: `git push`.

7. Confirm warmly in Russian with the repo link (from `git remote get-url origin`, shown as a
   normal https URL): «Готово! Проект сохранён на GitHub: <ссылка> 🎉». You can mention that the
   change is also written into the журнал изменений (`CHANGELOG.md`).

## If something goes wrong → friendly Russian

- **Sign-in window closed / login failed** → «Не получилось войти в GitHub. Давайте ещё раз:
  снова появится окно — выберите «Войти через браузер» и войдите в свой аккаунт.» then retry the
  push.
- **Wrong or empty URL** → ask the user to copy the link again from the green «Code» button on
  their repository page on github.com; show the example link again.
- **Push rejected (repo not empty / behind)** → explain simply and offer to pull first; never dump
  the raw error.
- **`git` not found** → tell the user (in Russian) to install Git for Windows from git-scm.com and
  retry `/app-push`. Do not install it yourself.
