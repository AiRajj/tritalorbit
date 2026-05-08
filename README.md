# TRITAL Orbit™

Healthcare Workforce Mobility Infrastructure for staffing agencies, MSPs, employers, clinicians, and vendor partners.

**Tagline:** Win more clinicians. Reduce backouts. Improve assignment readiness.

---

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + Shadcn-style component architecture
- Framer Motion
- PostgreSQL + Prisma ORM
- NextAuth/Auth.js (credentials flow)
- Zod validation
- Stripe-ready billing scaffolding
- Resend-ready email scaffolding
- OpenAI-compatible AI agent architecture
- Role-based access control + middleware

---

## Core Platform Areas

### Public Site
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

### Auth & Access
- `/login`
- `/register`
- `/forgot-password`
- NextAuth credentials provider
- Role-based middleware protection

### Dashboards
- `/admin`
- `/agency`
- `/recruiter`
- `/candidate`
- `/concierge`
- `/vendor`
- `/msp`

### Core Product Modules
- Offer Boost Builder: `/agency/offers/create`
- Offer Preview: `/agency/offers/[offerId]/preview`
- Candidate Assignment Hub: `/candidate/offer/[token]`
- Booking Requests:
  - `/candidate/booking-request/[offerId]`
  - `/agency/booking-requests`
  - `/concierge/requests`
- Assignment Launch Dashboard: `/agency/assignment-launch`
- Vendor Marketplace:
  - `/agency/vendors`
  - `/vendor/dashboard`
  - `/admin/vendors`
  - `/candidate/housing`
- MSP Reporting Dashboard: `/msp`
- Admin Control Center: `/admin`

---

## Database Models

Implemented in `prisma/schema.prisma`:

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
- plus Auth support models (`Account`, `Session`, `VerificationToken`, `PasswordResetToken`)

---

## AI Agent APIs

- `POST /api/ai/offer-boost`
- `POST /api/ai/risk-score`
- `POST /api/ai/readiness`
- `POST /api/ai/concierge`
- `POST /api/ai/msp-report`

If `OPENAI_API_KEY` is missing, APIs return professional fallback mock responses.

---

## Automations

Automation services are in `src/lib/automation.ts` and automation sweep endpoint:

- Candidate views offer -> activity log
- Offer not viewed in 2 hours -> recruiter alert
- Candidate views housing but doesn’t accept -> AI follow-up insight
- Booking request -> concierge task creation
- Start date within 7 days + housing missing -> high-risk alert
- Offer accepted -> readiness checklist update
- Risk score > 75 -> urgent recruiter notification
- Concierge task completed -> candidate update insight

Manual sweep endpoint:
- `POST /api/automations/sweep`

---

## Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Required minimum for local dev:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

Optional integrations:
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

---

## Local Development

```bash
npm install
npm run prisma:generate
npm run db:push
npm run prisma:seed
npm run dev
```

Open `http://localhost:3000`.

### Seed Demo Users
Password for all seeded users: `Password123!`

- admin@tritalorbit.com (Super Admin)
- owner@tritalorbit.com (Agency Owner)
- recruiter@tritalorbit.com (Recruiter)
- concierge@tritalorbit.com (Concierge Manager)
- msp@tritalorbit.com (MSP Viewer)
- candidate@tritalorbit.com (Candidate)
- vendor@tritalorbit.com (Vendor/Landlord)

---

## Build Validation

```bash
npm run lint
npm run build
```

---

## Deployment

See `DEPLOYMENT.md` for production deployment checklist and configuration guidance.
