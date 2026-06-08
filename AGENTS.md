# AGENTS.md

## Cursor Cloud specific instructions

### Overview

TRITAL Orbit is a monolithic Next.js 15 (App Router) TypeScript application for healthcare workforce mobility. It uses PostgreSQL via Prisma ORM, NextAuth v5 for authentication, and has optional integrations (OpenAI, Resend, Stripe) that gracefully fall back to mock responses when keys are absent.

### Services

| Service | Port | How to start |
|---------|------|--------------|
| PostgreSQL 16 | 5432 | `sudo pg_ctlcluster 16 main start` |
| Next.js dev server | 3000 | `npm run dev` |

### Quick reference

- **Install deps:** `npm install`
- **Lint:** `npm run lint`
- **Build:** `npm run build`
- **Dev server:** `npm run dev`
- **Prisma generate:** `npx prisma generate`
- **Migrations:** `npx prisma migrate deploy`
- **Seed:** `npm run prisma:seed`

### Non-obvious caveats

- PostgreSQL 16 is installed but starts in `down` state on fresh VMs. You must start it before running the app: `sudo pg_ctlcluster 16 main start`.
- The database `trital_orbit` and postgres password `postgres` are pre-configured. The connection string in `.env` is `postgresql://postgres:postgres@localhost:5432/trital_orbit?schema=public`.
- If `.env` does not exist, copy from `.env.example` and set `NEXTAUTH_SECRET` to any random string.
- AI/email/billing endpoints work without external API keys — they return mock responses when `OPENAI_API_KEY`, `RESEND_API_KEY`, or `STRIPE_SECRET_KEY` are empty.
- Prisma client must be regenerated (`npx prisma generate`) after any schema change or fresh `npm install`.
- Seed credentials are in `README.md`; primary test account is `owner@northstarstaffing.com` / `Orbit123!`.
- The `next lint` command works but shows a deprecation warning about Next.js 16 — this is informational only.
