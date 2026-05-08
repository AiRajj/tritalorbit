# TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure

> Win more clinicians. Reduce backouts. Improve assignment readiness.

TRITAL Orbit™ is a B2B2C platform that helps healthcare staffing agencies, MSPs, healthcare employers, and clinicians increase offer acceptance, reduce backouts, improve assignment readiness, and increase contractor retention by embedding housing, travel, relocation, transportation, concierge support, and AI-powered offer optimization directly into the staffing offer-to-start workflow.

**A product of [TRITAL Care®](https://www.tritalcare.com)**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Shadcn UI + Radix UI |
| Animations | Framer Motion |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Authentication | NextAuth / Auth.js v5 |
| Validation | Zod |
| AI | OpenAI-compatible (GPT-4o) |
| Billing | Stripe-ready |
| Email | Resend-ready |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- (Optional) OpenAI API key for AI features

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd trital-orbit

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your database URL and secrets
# DATABASE_URL="postgresql://user:password@localhost:5432/trital_orbit"
# AUTH_SECRET="generate-with: openssl rand -base64 32"

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed demo data
npx prisma db seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Demo Accounts

After seeding, use these accounts to explore different dashboards:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@tritalorbit.com | password123 |
| Agency Owner | owner@healthfirst.com | password123 |
| Recruiter | recruiter@healthfirst.com | password123 |
| Concierge | concierge@tritalorbit.com | password123 |
| MSP Viewer | msp@medstaff.com | password123 |
| Candidate | sarah.mitchell@email.com | password123 |
| Vendor | vendor@travelerlodge.com | password123 |

## Architecture

### User Roles

1. **Super Admin** — Platform-wide management and configuration
2. **Agency Owner** — Agency dashboard, offers, candidates, booking requests
3. **Recruiter** — Create and manage offers, track candidates
4. **Concierge Manager** — Fulfill booking requests, manage tasks
5. **MSP Viewer** — Read-only reporting and analytics
6. **Candidate / Clinician** — View offers, request support, manage assignments
7. **Vendor / Landlord** — List properties, respond to inquiries

### Core Modules

#### 1. Offer Boost Builder (`/agency/offers/create`)
Multi-step wizard to create enhanced offers with mobility perks (housing, travel, car rental, relocation) and AI-generated enhancements.

#### 2. Offer Preview (`/agency/offers/[id]/preview`)
Premium offer presentation with compensation breakdown, mobility perks, housing options, AI close strategy, and candidate confidence scoring.

#### 3. Candidate Assignment Hub (`/candidate/offer/[token]`)
Mobile-first candidate portal showing assignment details, compensation, housing options, travel support, and interactive move checklist.

#### 4. Booking Request System
End-to-end mobility support workflow from candidate request through concierge fulfillment.

#### 5. AI Agent System
Five specialized AI agents:
- **Offer Boost AI** — Enhanced offer copy, pitches, and close strategies
- **Retention Risk AI** — Predictive risk scoring and intervention recommendations
- **Assignment Readiness AI** — Readiness gap analysis and recommendations
- **Concierge AI** — Task summarization and vendor recommendations
- **MSP Reporting AI** — Executive summaries and performance insights

#### 6. Retention Risk Engine
Multi-factor risk scoring (0-100) analyzing candidate engagement, housing status, start-date proximity, pay competitiveness, and communication patterns.

#### 7. Assignment Launch Dashboard (`/agency/assignment-launch`)
Track candidate readiness from offer acceptance to first day with housing, travel, documents, and AI action recommendations.

#### 8. Vendor & Landlord Marketplace
Verified housing, travel, and transportation vendors searchable by assignment location.

#### 9. MSP Reporting Dashboard (`/msp`)
Supplier performance, acceptance rates, backout reduction, and AI-generated executive summaries.

#### 10. Admin Control Center (`/admin`)
Platform management for users, agencies, vendors, subscriptions, and audit logs.

### Public Marketing Pages

- `/` — Home page with hero, product workflow, KPI cards, solutions sections
- `/platform` — Platform overview
- `/solutions/agencies` — Agency value proposition
- `/solutions/msps` — MSP value proposition
- `/solutions/clinicians` — Clinician value proposition
- `/features/offer-boost-builder` — Feature deep-dive
- `/features/assignment-launch-dashboard` — Feature deep-dive
- `/features/retention-risk-ai` — Feature deep-dive
- `/features/mobility-concierge` — Feature deep-dive
- `/pricing` — Three-tier pricing with feature comparison
- `/demo` — Demo booking form
- `/contact` — Contact form
- `/privacy` — Privacy policy
- `/terms` — Terms of service

### API Routes

| Endpoint | Description |
|----------|-------------|
| `/api/auth/[...nextauth]` | Authentication handlers |
| `/api/auth/register` | User registration |
| `/api/offers` | CRUD for offers |
| `/api/booking-requests` | Booking request management |
| `/api/candidates` | Candidate profiles |
| `/api/vendors` | Vendor management |
| `/api/assignments` | Assignment tracking |
| `/api/notifications` | User notifications |
| `/api/leads` | Marketing lead capture |
| `/api/demo-requests` | Demo request capture |
| `/api/contacts` | Contact form submissions |
| `/api/admin` | Admin platform stats |
| `/api/ai/offer-boost` | AI offer enhancement |
| `/api/ai/risk-score` | AI risk scoring |
| `/api/ai/readiness` | AI readiness analysis |
| `/api/ai/concierge` | AI concierge assistance |
| `/api/ai/msp-report` | AI MSP report generation |

## Environment Variables

See `.env.example` for all available configuration options.

### Required
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — NextAuth secret (generate with `openssl rand -base64 32`)

### Optional
- `OPENAI_API_KEY` — Enables AI features (mock responses used when not set)
- `STRIPE_SECRET_KEY` — Enables billing
- `RESEND_API_KEY` — Enables transactional email

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Docker

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]
```

### Production Checklist

- [ ] Set all required environment variables
- [ ] Configure PostgreSQL database
- [ ] Run `npx prisma migrate deploy`
- [ ] Seed initial data with `npx prisma db seed`
- [ ] Configure OpenAI API key for AI features
- [ ] Set up Stripe for billing
- [ ] Set up Resend for transactional email
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging

## Brand Identity

| Element | Value |
|---------|-------|
| Deep Blue | `#0B3C5D` |
| Sharp Red | `#E63946` |
| Clean White | `#F8FAFC` |
| Dark Slate | `#1F2937` |

---

© 2026 TRITAL Care Inc. All rights reserved. TRITAL Orbit™ is a product of TRITAL Care®.
