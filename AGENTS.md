# AGENTS.md

## Cursor Cloud specific instructions

### Overview

TRITAL Orbit is a single Next.js 15 (App Router) application backed by PostgreSQL via Prisma ORM. There is no monorepo, no Docker Compose, and no separate microservices.

### Starting services

1. **PostgreSQL** must be running before the app starts:
   ```
   sudo pg_ctlcluster 16 main start
   ```
2. **Next.js dev server**:
   ```
   npm run dev
   ```
   The app is available at `http://localhost:3000`.

### Database

- Connection: `postgresql://postgres:postgres@localhost:5432/trital_orbit`
- After schema changes: `npm run prisma:generate` then `npx prisma migrate deploy`
- To re-seed: `npm run prisma:seed`

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Dev server | `npm run dev` |
| Prisma generate | `npm run prisma:generate` |
| Migrations | `npx prisma migrate deploy` |
| Seed | `npm run prisma:seed` |

### Gotchas

- The `.env` file ships pre-configured with development defaults. External services (OpenAI, Stripe, Resend) gracefully degrade to mock responses when API keys are absent.
- The Prisma `seed` script is idempotent (uses `upsert`); safe to re-run.
- `npm run lint` uses `next lint` which is deprecated in Next.js 16+ but works with the current pinned version (15.x).
- There are no automated test suites (no Jest, Vitest, or Playwright). Validation is via `lint` + `build`.
- Seed credentials are documented in `README.md` under "Seed Credentials".

### Auth test accounts

All use password `Orbit123!`:
- `admin@tritalorbit.com` (SUPER_ADMIN)
- `owner@northstarstaffing.com` (AGENCY_OWNER)
- `recruiter@northstarstaffing.com` (RECRUITER)
- `candidate@nursemail.com` (CANDIDATE)
- `concierge@northstarstaffing.com` (CONCIERGE_MANAGER)
- `msp@caregroup.com` (MSP_VIEWER)
- `vendor@mobilitystay.com` (VENDOR_LANDLORD)
