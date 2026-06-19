# Playbook: integrations

Read this for each integration chosen in Q3. Rules for all of them:
1. Add an env placeholder to `.env.local` (git-ignored) — never hardcode keys.
2. Put the secret-using call in a **server** route handler / server action (never client).
3. **Graceful fallback when the key is missing**: the feature must not crash the app — log
   the intended action server-side and show the user a calm message; the rest of the app runs.
4. List the key in the plan with a one-line Russian note on where to get it.
5. Never ask the user to paste a secret into chat — tell them which line of `.env.local` to fill.

---

## E-mail (default provider: Resend)

- Env: `RESEND_API_KEY`, `EMAIL_FROM`. Key: https://resend.com/api-keys
- Install `resend`. Route `app/api/email/route.ts` sends via the Resend SDK.
- Where to get it (RU note): «Зарегистрируйтесь на resend.com, создайте API-ключ и вставьте
  его в `.env.local` как `RESEND_API_KEY`. До этого письма не отправляются — действие просто
  записывается в журнал.»
- Fallback without key: skip the send, `console.log` the payload, return success to the UI with
  a flag so the user sees «письмо появится после добавления ключа».

## Telegram notifications

- Env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- No SDK needed — POST to `https://api.telegram.org/bot<token>/sendMessage` with
  `{ chat_id, text }` from a server route `app/api/telegram/route.ts`.
- Where to get it (RU note): «Создайте бота у @BotFather (получите токен), узнайте свой
  chat_id у @userinfobot, и впишите оба значения в `.env.local`.»
- Fallback without key: log the message server-side, don't throw.

## Payments (default provider: Stripe)

- Env: `STRIPE_SECRET_KEY` (server), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (client).
- Install `stripe`. Use Stripe Checkout (hosted page) — simplest and safest: a server route
  `app/api/checkout/route.ts` creates a Checkout Session and redirects.
- Where to get it (RU note): «Заведите аккаунт на stripe.com, в разделе Developers → API keys
  скопируйте оба ключа в `.env.local`. В тестовом режиме оплата ненастоящая.»
- Fallback without key: show a disabled «Оплата скоро» button instead of crashing.
- Keep amounts/currency server-side; never trust client-sent prices.

---

## After wiring any integration

Mention in the final Russian summary exactly which `.env.local` keys (if any) the user must
fill to switch the feature from «заглушка» to live, and that they can just edit `.env.local`
and restart with `/app-start`.
