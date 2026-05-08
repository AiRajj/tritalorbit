# TRITAL Orbit™

**Healthcare Workforce Mobility Infrastructure**

> Win more clinicians. Reduce backouts. Improve assignment readiness.

TRITAL Orbit is a B2B2C enterprise SaaS platform that helps healthcare staffing agencies, MSPs, healthcare employers, and clinicians increase offer acceptance, reduce backouts, improve assignment readiness, and increase contractor retention by embedding housing, travel, relocation, transportation, concierge support, and AI-powered offer optimization directly into the staffing offer-to-start workflow.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn UI |
| Animation | Framer Motion |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth.js (Auth.js v5) |
| Validation | Zod |
| AI | OpenAI-compatible architecture |
| Charts | Recharts |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+ (optional — app runs with demo data without DB)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd trital-orbit

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`.

### Database Setup (Optional)

The platform runs without a database connection using built-in demo data and mock responses. To use a real database:

```bash
# Update DATABASE_URL in .env with your PostgreSQL connection string

# Push schema to database
npm run db:push

# Seed demo data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Environment Variables

See `.env.example` for all available configuration options:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | For DB features | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | JWT signing secret |
| `NEXTAUTH_URL` | Yes | Application URL |
| `OPENAI_API_KEY` | No | Enables live AI features (falls back to mock) |
| `RESEND_API_KEY` | No | For transactional emails |
| `STRIPE_SECRET_KEY` | No | For payment processing |

## Demo Accounts

All demo accounts use password: `password123`

| Email | Role | Dashboard |
|-------|------|-----------|
| admin@tritalorbit.com | Super Admin | `/admin` |
| agency@tritalorbit.com | Agency Owner | `/agency` |
| recruiter@tritalorbit.com | Recruiter | `/recruiter` |
| candidate@tritalorbit.com | Candidate | `/candidate` |
| concierge@tritalorbit.com | Concierge Manager | `/concierge` |
| vendor@tritalorbit.com | Vendor | `/vendor/dashboard` |
| msp@tritalorbit.com | MSP Viewer | `/msp` |

## Application Architecture

### Public Marketing Site
- `/` — Homepage with hero, product overview, KPIs
- `/platform` — Platform architecture and capabilities
- `/solutions/agencies` — Agency value proposition
- `/solutions/msps` — MSP value proposition
- `/solutions/clinicians` — Clinician value proposition
- `/features/*` — Feature detail pages
- `/pricing` — Subscription plans
- `/demo` — Demo booking form
- `/contact` — Contact form

### Authentication
- `/login` — Sign in with role-based redirect
- `/register` — Multi-step registration
- `/forgot-password` — Password reset flow

### Dashboards (Role-Based)
- `/admin` — Platform administration
- `/agency` — Agency operations center
- `/recruiter` — Recruiter workspace
- `/candidate` — Clinician portal
- `/concierge` — Concierge task management
- `/vendor/dashboard` — Vendor/landlord portal
- `/msp` — MSP reporting & analytics

### Core Product Modules
- **Offer Boost Builder** (`/agency/offers/create`) — Create AI-enhanced offers
- **Offer Preview** (`/agency/offers/[id]/preview`) — Preview and send offers
- **Candidate Hub** (`/candidate/offer/[token]`) — Mobile-first offer acceptance
- **Booking Requests** — Housing, travel, car rental coordination
- **Assignment Launch** (`/agency/assignment-launch`) — Readiness tracking
- **Vendor Marketplace** — Housing and vendor directory
- **Retention Risk Engine** — AI-powered backout prediction
- **MSP Reporting** — Executive dashboards and analytics

### AI Agents
- **Offer Boost AI** — Enhanced offer copy and positioning
- **Retention Risk AI** — Candidate risk scoring
- **Assignment Readiness AI** — Readiness gap analysis
- **Concierge AI** — Task prioritization and recommendations
- **MSP Reporting AI** — Executive summary generation

### API Routes
- `/api/auth/*` — Authentication endpoints
- `/api/offers` — Offer CRUD
- `/api/candidates` — Candidate management
- `/api/booking-requests` — Booking request management
- `/api/ai/*` — AI agent endpoints
- `/api/leads` — Lead capture
- `/api/demo-requests` — Demo booking
- `/api/vendors` — Vendor management
- `/api/assignments` — Assignment management
- `/api/notifications` — Notification system
- `/api/activity-log` — Activity tracking
- `/api/admin` — Admin operations

## Database Schema

25 models covering the complete healthcare workforce mobility domain:

- **User & Auth**: User, Account, Session, VerificationToken
- **Organization**: Agency, AgencyMember
- **Clinical**: Candidate, Assignment, Offer, OfferPerk
- **Mobility**: BookingRequest, HousingOption, TravelOption, CarRentalOption
- **Vendor**: Vendor, Landlord
- **Operations**: ConciergeTask, ActivityLog, RetentionRiskScore
- **AI**: AIInsight
- **Platform**: Notification, SubscriptionPlan, PaymentRecord, DocumentVault, MSPReport, AuditLog
- **Marketing**: Lead, DemoRequest

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
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual

```bash
npm ci
npm run db:generate
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Auth pages (login, register, forgot-password)
│   ├── (dashboard)/     # Role-based dashboards
│   ├── (marketing)/     # Public marketing pages
│   └── api/             # API routes
├── components/
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout components (headers, sidebars, footers)
│   └── ui/              # Shadcn UI components
├── lib/                 # Utilities, auth, AI, automation
└── types/               # TypeScript type definitions
```

## Brand Identity

- **Deep Blue**: `#0B3C5D` — Primary brand color
- **Sharp Red**: `#E63946` — Accent and CTA color
- **Clean White**: `#F8FAFC` — Background
- **Dark Slate**: `#1F2937` — Text and dark elements

---

Built by [TRITAL Care®](https://www.tritalcare.com) — Healthcare workforce, orchestrated on one system.
