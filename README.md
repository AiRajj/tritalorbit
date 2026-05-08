# TRITAL Orbit™

**Healthcare Workforce Mobility Infrastructure.**
Win more clinicians, reduce backouts, and improve assignment readiness — without raising pay rates.

TRITAL Orbit is a B2B2C platform that helps healthcare staffing agencies, MSPs, healthcare employers, and clinicians increase offer acceptance, reduce backouts, improve assignment readiness, and increase contractor retention by embedding housing, travel, relocation, transportation, concierge support, and AI-powered offer optimization directly into the staffing offer-to-start workflow.

> _“We help healthcare staffing companies win and keep clinicians without increasing pay rates by turning every assignment into a better life decision, not just a better weekly number.”_

---

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** + Shadcn-style UI primitives + **Framer Motion**
- **PostgreSQL** + **Prisma ORM**
- **NextAuth / Auth.js** (JWT sessions, RBAC across 7 roles)
- **Zod** validation
- **Stripe-ready** billing tables (Subscription + Payments)
- **Resend-ready** transactional email structure
- **OpenAI-compatible** AI architecture with deterministic mock fallback
- **Role-based access control** (middleware + per-route enforcement)

## Roles

- Super Admin · Agency Owner · Recruiter · Concierge Manager · MSP Viewer · Candidate / Clinician · Vendor · Landlord

## Modules

1. **Marketing site** — `/`, `/platform`, `/solutions/*`, `/features/*`, `/pricing`, `/demo`, `/contact`, `/privacy`, `/terms`
2. **Auth** — `/login`, `/register`, `/forgot-password`, role-based redirect, middleware protection
3. **Agency Dashboard** — KPI strip, active offers, high-risk candidates, AI recommendations, recent activity
4. **Offer Boost Builder** — Multi-step wizard with AI offer generation
5. **Offer Preview** — Premium summary with AI close strategy + send/copy/PDF
6. **Candidate Hub** — Mobile-first portal at `/candidate/offer/[token]` (no auth required)
7. **Booking Request System** — Candidate form + agency queue + concierge task board
8. **Five AI Agents** — Offer Boost, Risk, Readiness, Concierge, MSP Reporting with mock fallback
9. **Retention Risk Engine** — Deterministic scoring + AI reasoning, surfaces in dashboards
10. **Assignment Launch Dashboard** — Readiness tracker between offer accepted and Day 1
11. **Vendor & Landlord Marketplace** — Approval workflow, verified housing matched to facility city
12. **MSP Reporting** — Live scorecard + AI executive summary, PDF/CSV export hooks
13. **Admin Control Center** — Agencies, users, vendors, subscriptions, AI usage, audit log

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit DATABASE_URL and AUTH_SECRET at minimum

# 3. Initialize database
npx prisma db push          # creates the schema
npm run db:seed             # loads demo dataset

# 4. Run dev server
npm run dev                 # http://localhost:3000
```

### Seeded demo logins

All seeded accounts use the password `orbit-demo-2026`.

| Role               | Email                  | Lands on    |
| ------------------ | ---------------------- | ----------- |
| Super Admin        | admin@orbit.demo       | `/admin`    |
| Agency Owner       | owner@orbit.demo       | `/agency`   |
| Recruiter          | recruiter@orbit.demo   | `/recruiter`|
| Concierge Manager  | concierge@orbit.demo   | `/concierge`|
| MSP Viewer         | msp@orbit.demo         | `/msp`      |
| Clinician          | clinician@orbit.demo   | `/candidate`|
| Vendor             | vendor@orbit.demo      | `/vendor`   |
| Landlord           | landlord@orbit.demo    | `/vendor`   |

## Scripts

```bash
npm run dev          # Dev server
npm run build        # Generates Prisma client and builds the app
npm start            # Start prod server
npm run lint         # ESLint
npm run typecheck    # TypeScript only
npm run db:push      # Push schema to DB
npm run db:migrate   # Create migrations (dev)
npm run db:seed      # Load demo data
npm run db:studio    # Prisma Studio
```

## Environment variables

See [`.env.example`](.env.example) for the full list. Minimum required for boot:

- `DATABASE_URL` (PostgreSQL)
- `AUTH_SECRET` (32+ random bytes)

Optional integrations (graceful fallback when missing):

- `OPENAI_API_KEY` — enables live AI agents (otherwise curated mocks)
- `STRIPE_SECRET_KEY` — enables billing webhooks
- `RESEND_API_KEY` — enables transactional email

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for hosting on Vercel, Render, Fly, or any Node host.

## Brand

- **Deep Blue** `#0B3C5D`
- **Sharp Red** `#E63946`
- **Clean White** `#F8FAFC`
- **Dark Slate** `#1F2937`

TRITAL Orbit™ is a sub-brand of TRITAL Care® (TOPTAL Care Inc.).

---

© TOPTAL Care Inc. — All rights reserved.
