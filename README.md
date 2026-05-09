# TRITAL Orbit™

Healthcare Workforce Mobility Cloud.

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
- `/mobility-exchange`
- `/healthcare-workforce-mobility-cloud`
- `/solutions/agencies`
- `/solutions/msps`
- `/solutions/clinicians`
- `/solutions/travel-agencies`
- `/solutions/housing-providers`
- `/solutions/relocation-vendors`
- `/solutions/car-rental-partners`
- `/solutions/hotel-partners`
- `/solutions/health-systems`
- `/partners`
- `/partners/travel-agencies`
- `/partners/housing-providers`
- `/partners/relocation-vendors`
- `/trust`
- `/security`
- `/vendor-verification`
- `/assignment-verification`
- `/features/offer-boost-builder`
- `/features/assignment-launch-dashboard`
- `/features/retention-risk-ai`
- `/features/mobility-concierge`
- `/pricing`
- `/pricing/clinicians`
- `/pricing/agencies`
- `/pricing/vendors`
- `/pricing/msps`
- `/demo`
- `/demo/live-platform`
- `/demo/clinician-story`
- `/demo/recruiter-story`
- `/demo/vendor-story`
- `/demo/msp-story`
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

Expanded Phase-2 dashboard surfaces:
- Candidate: `/candidate/first-week`, `/candidate/relocation-assistant`, `/candidate/orbit-plus`
- Agency: `/agency/mobility`, `/agency/offer-war-room`, `/agency/first-week-readiness`, `/agency/relocation-insights`
- Vendor: `/vendor/bid-center`, `/vendor/travel-agency/*`, `/vendor/housing/*`
- MSP: `/msp/roi`, `/msp/supplier-performance`, `/msp/mobility-utilization`, `/msp/executive-report`
- Admin: `/admin/mobility-exchange`, `/admin/disputes`, `/admin/vendor-verification`, `/admin/wallet`

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
- `/api/ai/mobility-bid-ranker`
- `/api/ai/offer-comparison`
- `/api/ai/relocation-assistant`
- `/api/ai/vendor-risk`
- `/api/ai/wallet-optimizer`
- `/api/ai/msp-roi`

If `OPENAI_API_KEY` is missing, endpoints return professional fallback mock responses.

### Automation + Integration Workflows
Automation modules under `src/lib/automation`:
- `mobility.ts`, `wallet.ts`, `risk.ts`, `rewards.ts`, `mspReports.ts`, `vendor.ts`, `firstWeek.ts`

Integration abstraction modules under `src/lib/integrations`:
- Flights: Amadeus, Duffel, Skyscanner + mock fallback
- Hotels: Booking, Expedia + mock fallback
- Maps and weather + mock fallback
- Stripe/Stripe Connect + mock fallback
- Resend/Twilio + mock fallback
- OpenAI-compatible AI integration + mock fallback

All integrations are env-gated and safely fall back to typed mock responses when provider keys are absent.

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

Phase-2 additions include:
- Mobility Exchange v2 (`MobilityRequest`, `MobilityBid`, `MobilityBooking`, `VendorBidProfile`)
- Wallet v2 (`Wallet`, `WalletCredit`, `WalletTransaction`)
- Offer comparison v2 (`OfferComparisonV2`, `ExternalOffer`, `OfferComparisonResult`)
- First-week + relocation (`FirstWeekGuide`, `FirstWeekChecklistItem`, `RelocationPlan`)
- Offer intelligence (`OfferIntelligence`, `OfferOutreachLog`)
- Trust/compliance (`VendorVerification`, `Dispute`)
- Partner supply (`PartnerHousingListing`, `HousingInquiry`)
- Orbit Plus subscriptions (`ClinicianSubscription`)

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

