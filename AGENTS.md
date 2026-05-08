# AGENTS.md

## Cursor Cloud specific instructions

### Overview

TRITAL Orbit is a Next.js 16 healthcare workforce mobility SaaS platform using Prisma 7 ORM with PostgreSQL. Standard commands are in `package.json` scripts (`dev`, `build`, `lint`, `start`).

### Key Gotchas

- **Prisma 7 requires a driver adapter.** `PrismaClient` must be constructed with a `@prisma/adapter-pg` adapter and `connectionString`. Calling `new PrismaClient()` without an adapter will error. See `src/lib/db.ts` for the pattern.
- **Prisma schema has no `url` in datasource block.** The connection URL is provided via `prisma.config.ts` for CLI commands and via the adapter for runtime. This is the Prisma 7 way.
- **PostgreSQL must be running** before `npm run dev` or `npm run build`. Start it with `sudo pg_ctlcluster 16 main start`.
- **Database setup**: Run `npx prisma db push` to sync schema, then `npx tsx prisma/seed.ts` to seed demo data.
- **Demo credentials** (all use password `password123`): `admin@tritalorbit.com`, `owner@healthfirst.com`, `recruiter@healthfirst.com`, `concierge@tritalorbit.com`, `sarah.mitchell@email.com`.
- **Optional services** (OpenAI, Stripe, Resend) use mock responses when env vars are empty — no external API keys required for development.

### Running

```bash
sudo pg_ctlcluster 16 main start   # ensure PostgreSQL is running
npm run dev                         # http://localhost:3000
```
