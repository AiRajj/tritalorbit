# TRITAL Orbit™ Deployment Guide

## 1) Infrastructure

- Provision PostgreSQL (production-grade managed service recommended)
- Provision Node.js hosting for Next.js 15 App Router
- Configure secure environment variable management
- Set up DNS + TLS for production domain

## 2) Required Environment Variables

Set these in your deployment platform:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `APP_URL`

Optional but recommended:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## 3) Build & Runtime Commands

Build command:
```bash
npm run build
```

Start command:
```bash
npm run start
```

## 4) Database Rollout

Before first deploy:

```bash
npm run prisma:generate
npm run db:push
npm run prisma:seed
```

For managed production migration workflow, use `prisma migrate deploy` with tracked migration files.

## 5) Security Checklist

- Use strong `NEXTAUTH_SECRET`
- Use HTTPS-only cookies in production
- Restrict webhook routes to signed requests
- Enable DB backups and point-in-time restore
- Monitor auth and API logs
- Rotate integration keys periodically

## 6) Production Readiness Checklist

- [ ] Marketing forms persist data successfully
- [ ] Auth login/register/logout flows verified
- [ ] Role-based route access verified
- [ ] Offer creation and preview workflow verified
- [ ] Candidate token route tested on mobile
- [ ] Booking request -> concierge task automation verified
- [ ] AI routes tested with and without `OPENAI_API_KEY`
- [ ] Stripe and Resend integrations validated (if enabled)
- [ ] `npm run lint` and `npm run build` passing

## 7) Observability Recommendations

- Add error tracking (e.g. Sentry)
- Add API latency and failure monitoring
- Add DB performance dashboards
- Add audit log export to SIEM if required by enterprise customers
