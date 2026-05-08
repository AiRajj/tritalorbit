# TRITAL Orbit™

Healthcare Workforce Mobility Infrastructure.

**Tagline:** Win more clinicians. Reduce backouts. Improve assignment readiness.

TRITAL Orbit™ is a production-ready B2B2C SaaS platform for healthcare staffing agencies, MSPs, healthcare employers, concierge teams, vendors, landlords, and clinicians.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + Shadcn-style UI primitives
- Framer Motion
- PostgreSQL + Prisma ORM
- Auth.js / NextAuth
- Zod validation
- Stripe-ready billing architecture
- Resend-ready email architecture
- OpenAI-compatible AI architecture
- Role-based access control

## Core Capabilities Implemented

### Marketing Site (Functional)
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

All lead/demo/contact forms are wired to database-backed API handlers.

### Authentication + RBAC
- Login
- Register
- Forgot password structure
- Role-based middleware and redirect control
- Protected role routes
- Profile page + logout action

### Dashboards
- `/admin`
- `/agency`
- `/recruiter`
- `/candidate`
- `/concierge` + `/concierge/requests`
- `/vendor/dashboard`
- `/msp`

Includes sidebar navigation, topbar search, notifications pattern, profile, loading/error handling patterns, and responsive layouts.

### Core Product Modules
- **Agency Dashboard** with KPIs, active offers, risk view, recent activity, AI recommendations
- **Offer Boost Builder** (`/agency/offers/create`)
- **Offer Preview + Send flow** (`/agency/offers/[offerId]/preview`)
- **Candidate Assignment Hub** (`/candidate/offer/[token]`)
- **Booking Request system** (`/candidate/booking-request/[offerId]`, `/agency/booking-requests`, `/concierge/requests`)
- **Assignment Launch dashboard** (`/agency/assignment-launch`)
- **Vendor marketplace** (`/agency/vendors`, `/candidate/housing`, `/admin/vendors`, `/vendor/dashboard`)
- **MSP reporting dashboard** (`/msp`)
- **Admin control center** (`/admin`)

### AI Agent APIs
- `/api/ai/offer-boost`
- `/api/ai/risk-score`
- `/api/ai/readiness`
- `/api/ai/concierge`
- `/api/ai/msp-report`

If `OPENAI_API_KEY` is missing, endpoints return professional fallback mock responses.

### Automation Workflows
Implemented service and API workflows for:
1. Offer viewed activity logging
2. 2-hour non-view alert detection (`/api/automation/run`)
3. Housing viewed without acceptance AI follow-up signal
4. Booking request triggers concierge task
5. Start date proximity + missing housing escalation
6. Offer accepted triggers readiness checklist bootstrap
7. Risk score > 75 urgent recruiter notification
8. Concierge task completion candidate update generation

## Data Model
Comprehensive Prisma schema includes:
- User
- Agency
- AgencyMember
- Candidate
- Assignment
- Offer
- OfferPerk
- BookingRequest
- HousingOption
- TravelOption
- CarRentalOption
- Vendor
- Landlord
- ConciergeTask
- ActivityLog
- RetentionRiskScore
- AIInsight
- Notification
- SubscriptionPlan
- PaymentRecord
- DocumentVault
- MSPReport
- AuditLog
- Lead
- DemoRequest

Includes UUIDs, status enums, timestamps, ownership patterns, and audit relationships.

## Quick Start

```bash
npm install
cp .env.example .env
npm run prisma:generate
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

Open: `http://localhost:3000`

## Seed Credentials
(From `prisma/seed.ts`)

- `admin@tritalorbit.com` / `Orbit123!`
- `owner@northstarstaffing.com` / `Orbit123!`
- `recruiter@northstarstaffing.com` / `Orbit123!`
- `concierge@northstarstaffing.com` / `Orbit123!`
- `msp@caregroup.com` / `Orbit123!`
- `candidate@nursemail.com` / `Orbit123!`
- `vendor@mobilitystay.com` / `Orbit123!`

## Build Validation

```bash
npm run lint
npm run build
```

## Notes
- PDF export endpoint returns a professional placeholder payload scaffold for immediate integration with a real PDF renderer.
- Stripe and Resend integrations are fully structured and env-gated.
- This repository includes generated Prisma migration SQL under `prisma/migrations`.

