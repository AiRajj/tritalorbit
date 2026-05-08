# TRITAL Orbit™

Healthcare Workforce Mobility Infrastructure for healthcare staffing agencies, MSPs, employers, clinicians, vendors, and landlords.

> Win more clinicians. Reduce backouts. Improve assignment readiness.

TRITAL Orbit turns every healthcare assignment into a better life decision, not just a better weekly number. The platform embeds housing, travel, relocation, transportation, concierge support, and AI-powered offer optimization directly into the offer-to-start workflow.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Shadcn-style component primitives
- Framer Motion
- PostgreSQL + Prisma ORM
- NextAuth/Auth.js credentials flow
- Zod validation
- Stripe-ready billing models
- Resend-ready email environment
- OpenAI-compatible AI agent architecture
- Role-based access control middleware

## Routes

Public site:

- `/`
- `/platform`
- `/solutions/agencies`
- `/solutions/msps`
- `/solutions/clinicians`
- `/features/offer-boost-builder`
- `/features/assignment-launch-dashboard`
- `/features/retention-risk-ai`
- `/features/mobility-concierge`
- `/pricing`
- `/demo`
- `/contact`
- `/privacy`
- `/terms`

Application:

- `/login`, `/register`, `/forgot-password`
- `/admin`
- `/agency`
- `/agency/offers/create`
- `/agency/offers/[offerId]/preview`
- `/agency/booking-requests`
- `/agency/assignment-launch`
- `/agency/vendors`
- `/candidate`
- `/candidate/offer/[token]`
- `/candidate/booking-request/[offerId]`
- `/candidate/housing`
- `/concierge`
- `/concierge/requests`
- `/vendor/dashboard`
- `/admin/vendors`
- `/msp`

## Demo login

Use password `OrbitDemo!2026` with any of:

- `admin@tritalorbit.com`
- `owner@tritalorbit.com`
- `recruiter@tritalorbit.com`
- `concierge@tritalorbit.com`
- `msp@tritalorbit.com`
- `candidate@tritalorbit.com`
- `vendor@tritalorbit.com`

## Local setup

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run dev
```

With PostgreSQL configured:

```bash
npm run prisma:migrate
npm run prisma:seed
```

## AI behavior

The AI routes use `OPENAI_API_KEY` when present:

- `/api/ai/offer-boost`
- `/api/ai/risk-score`
- `/api/ai/readiness`
- `/api/ai/concierge`
- `/api/ai/msp-report`

If the key is missing, every agent returns a professional production fallback response. API keys are never exposed to the client.

## Production readiness

The app includes Prisma models for the core domain, Zod validation, protected middleware, role redirects, seed data, loading/empty/error fallback messaging, public lead/demo capture forms, dashboard tables, candidate tracking events, booking request creation, concierge automation services, and Stripe/Resend-ready environment structure.
