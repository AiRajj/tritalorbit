# TRITAL Orbit™ — Deployment Guide

This document covers how to deploy TRITAL Orbit to production. The platform is a standard Next.js 15 (App Router) application that runs on any Node.js 18+ host.

## 1. Prerequisites

| Item               | Notes                                                               |
| ------------------ | ------------------------------------------------------------------- |
| Node.js            | 18.x or 20.x (we test with 22.x in development)                    |
| PostgreSQL         | 14+ (Neon, Supabase, RDS, Cloud SQL all work)                      |
| Domain             | Production URL is required for `NEXTAUTH_URL`                      |
| Email (optional)   | Resend account + verified sender                                   |
| Payments (optional)| Stripe account in test or live mode                                 |
| AI (optional)      | OpenAI-compatible key. Without one, mock responses ship.           |

## 2. Environment variables

Copy `.env.example` to `.env` (and `.env.production` for hosted environments). Required:

```env
DATABASE_URL=postgresql://user:pass@host:5432/orbit?schema=public
AUTH_SECRET=<openssl rand -base64 32>
NEXTAUTH_URL=https://orbit.your-domain.com
NEXT_PUBLIC_APP_URL=https://orbit.your-domain.com
```

Optional keys are picked up automatically. If `OPENAI_API_KEY` is missing the AI agents return deterministic mock copy.

## 3. Database setup

```bash
# 1. Generate Prisma client (postinstall does this too)
npx prisma generate

# 2. Apply schema (production: prefer migrations)
npx prisma db push

# 3. (Optional) Seed demo data
npm run db:seed
```

For long-lived environments use migrations:

```bash
npx prisma migrate deploy
```

## 4. Build & run

```bash
npm install
npm run build
npm start            # default port 3000
```

## 5. Vercel

1. Import the repo into Vercel.
2. Set the env vars above in **Project → Settings → Environment Variables**.
3. Vercel will auto-detect Next.js. The `postinstall` script runs `prisma generate`.
4. After the first deploy, run `npx prisma db push` (or `migrate deploy`) against your prod DB. You can run it locally with the prod URL.
5. Optional: configure a Vercel cron to ping `/api/health` if you add one.

## 6. Render / Fly / Bare-metal

```bash
NODE_ENV=production
DATABASE_URL=...
AUTH_SECRET=...
NEXTAUTH_URL=...
PORT=3000

npm install
npm run build
npm start
```

Bind to `$PORT` and ensure outbound HTTPS for `api.openai.com`, Stripe, and Resend if used.

## 7. Post-deploy checklist

- [ ] DNS resolves to your host
- [ ] HTTPS terminated at the edge or app
- [ ] `DATABASE_URL` reachable from app container
- [ ] `AUTH_SECRET` set and at least 32 bytes
- [ ] `npx prisma db push` (or `migrate deploy`) executed
- [ ] Demo seed loaded (only if appropriate)
- [ ] Stripe webhook → `/api/stripe/webhook` (when billing is wired)
- [ ] Resend domain verified, `EMAIL_FROM` matches
- [ ] First login works — verified RBAC redirects per role

## 8. Backups & observability

- Postgres point-in-time recovery via your DB host
- Application logs: `console.error` is preserved across the codebase
- Audit log: `AuditLog` table captures actions, IPs, and entities

## 9. Hardening

- Rotate `AUTH_SECRET` quarterly
- Rotate `OPENAI_API_KEY` per your security policy
- Use a secret manager (Vercel, Doppler, Vault, AWS SM)
- Restrict DB ingress to app network or VPN
- Enable HSTS at edge
- Configure SAML/SCIM for Enterprise customers via Auth.js providers

---

Questions? Email `info@tritalcare.com` or open an issue in your fork.
