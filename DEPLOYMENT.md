# TRITAL Orbit™ Deployment Guide

## 1) Environment Variables
Copy `.env.example` to `.env` and configure all required values.

At minimum for full functionality:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_APP_URL`

Optional integrations:
- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## 2) Install Dependencies
```bash
npm install
```

## 3) Generate Prisma Client
```bash
npm run prisma:generate
```

## 4) Run Migrations
```bash
npx prisma migrate deploy
```

## 5) Seed Demo Data
```bash
npm run prisma:seed
```

## 6) Build and Run
```bash
npm run build
npm run start
```

## 7) Production Checklist
- [ ] HTTPS configured at edge / load balancer
- [ ] Secret manager for env vars
- [ ] Postgres backups + monitoring enabled
- [ ] Stripe webhook endpoint configured (if billing enabled)
- [ ] Resend sender domain verified (if email enabled)
- [ ] OpenAI key usage limits and observability configured
- [ ] Log aggregation and alerting configured

## 8) Health Validation
- Ensure public routes render:
  - `/`, `/platform`, `/pricing`, `/demo`, `/contact`
- Validate auth and role routing:
  - `/login`, `/register`, `/forgot-password`
- Validate dashboard routes by role:
  - `/admin`, `/agency`, `/recruiter`, `/candidate`, `/concierge`, `/vendor/dashboard`, `/msp`
- Validate core workflows:
  - Create offer → preview → send
  - Candidate portal engagement events
  - Booking request creation and concierge task updates
