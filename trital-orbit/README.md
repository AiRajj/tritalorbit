# TRITAL Orbit™ — Healthcare Workforce Mobility Infrastructure

> Win more clinicians. Reduce backouts. Improve assignment readiness.

TRITAL Orbit™ is a production-ready, enterprise-grade SaaS platform that helps healthcare staffing agencies, MSPs, healthcare employers, and clinicians increase offer acceptance, reduce backouts, improve assignment readiness, and increase contractor retention by embedding housing, travel, relocation, transportation, concierge support, and AI-powered offer optimization directly into the staffing offer-to-start workflow.

## 🚀 Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI components
- **Animation**: Framer Motion
- **Database**: PostgreSQL + Prisma ORM (v7)
- **Auth**: NextAuth/Auth.js v5 (credentials-based + JWT sessions)
- **Validation**: Zod v4
- **AI**: OpenAI API (GPT-4o) with professional mock fallbacks
- **Email**: Resend (structure ready)
- **Billing**: Stripe (structure ready)

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd trital-orbit

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local
```

### Environment Variables

```env
DATABASE_URL="postgresql://username:password@localhost:5432/trital_orbit"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-min-32-chars"
OPENAI_API_KEY="sk-..."        # Optional - uses mock responses if not set
RESEND_API_KEY="re_..."         # Optional - for email notifications
STRIPE_SECRET_KEY="sk_..."      # Optional - for billing
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

```bash
# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed demo data
npm run db:seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## 👤 Demo Credentials

After seeding, use these credentials to explore each role:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@tritalorbit.com | demo1234 |
| Agency Owner | owner@primestaff.com | demo1234 |
| Recruiter | recruiter@primestaff.com | demo1234 |
| Concierge Manager | concierge@primestaff.com | demo1234 |
| Candidate (Clinician) | maria.santos@email.com | demo1234 |
| Vendor | vendor@phoenixhousing.com | demo1234 |

## 🗺️ Platform Routes

### Public Marketing Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, stats, features, testimonials |
| `/platform` | Full platform overview |
| `/solutions/agencies` | Agency value proposition |
| `/solutions/msps` | MSP value proposition |
| `/solutions/clinicians` | Clinician value proposition |
| `/features/offer-boost-builder` | Feature detail page |
| `/features/retention-risk-ai` | Feature detail page |
| `/features/assignment-launch-dashboard` | Feature detail page |
| `/features/mobility-concierge` | Feature detail page |
| `/pricing` | Pricing plans with feature comparison |
| `/demo` | Demo booking form (saves to DB) |
| `/contact` | Contact form (saves to DB) |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### Authentication
| Route | Description |
|-------|-------------|
| `/login` | Credential-based login |
| `/register` | New user registration with role selection |
| `/forgot-password` | Password reset flow |

### Dashboards
| Route | Role | Description |
|-------|------|-------------|
| `/admin` | Super Admin | Platform control center |
| `/agency` | Agency Owner | Agency KPIs, offers, AI recommendations |
| `/agency/offers/create` | Agency Owner/Recruiter | Offer Boost Builder (5-step wizard) |
| `/agency/offers/[id]/preview` | Agency Owner/Recruiter | Offer preview & send |
| `/agency/assignment-launch` | Agency Owner/Recruiter | Assignment readiness tracking |
| `/agency/booking-requests` | Agency Owner/Recruiter | Candidate booking requests |
| `/recruiter` | Recruiter | Personal offer pipeline + risk alerts |
| `/concierge` | Concierge Manager | Kanban task board |
| `/msp` | MSP Viewer | Supplier performance dashboard |
| `/candidate` | Candidate | Assignment hub |
| `/vendor` | Vendor | Listing management |

### Candidate-Facing (Public)
| Route | Description |
|-------|-------------|
| `/candidate/offer/[token]` | Mobile-first personalized offer hub |

## 🤖 AI Agents

Five built-in AI agents (falls back to mock data if `OPENAI_API_KEY` is not set):

1. **Offer Boost AI** — `/api/ai/offer-boost` — Enhanced offer copy, SMS pitches, email scripts
2. **Retention Risk AI** — `/api/ai/risk-score` — Backout prediction scoring (0–100)
3. **Assignment Readiness AI** — `/api/ai/readiness` — Housing/travel/doc gap analysis
4. **Concierge AI** — `/api/ai/concierge` — Task summaries and vendor recommendations
5. **MSP Reporting AI** — `/api/ai/msp-report` — Executive performance summaries

## 🗄️ Database Models

24 Prisma models covering:
- Users & authentication (User, Account, Session, VerificationToken)
- Agency management (Agency, AgencyMember)
- Candidate lifecycle (Candidate, Assignment)
- Offer workflow (Offer, OfferPerk)
- Mobility support (BookingRequest, HousingOption, TravelOption, CarRentalOption)
- Vendor network (Vendor, Landlord, AgencyVendor)
- Concierge (ConciergeTask)
- AI insights (RetentionRiskScore, AssignmentReadiness, AIInsight)
- Notifications & audit (Notification, ActivityLog, AuditLog)
- Billing (SubscriptionPlan, AgencySubscription, PaymentRecord)
- Documents (DocumentVault)
- Reporting (MSPReport)
- Marketing (Lead, DemoRequest)

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set environment variables in the Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Requirements

- PostgreSQL 14+ database (Supabase, Neon, Railway, or self-hosted)
- Node.js 18+
- At minimum: `DATABASE_URL` and `NEXTAUTH_SECRET`

## 📧 Email Setup (Optional)

Set `RESEND_API_KEY` and `EMAIL_FROM` in your environment to enable:
- Welcome emails on registration
- Offer sent notifications
- Risk alert emails
- Booking request confirmations

## 💳 Billing Setup (Optional)

Set Stripe environment variables to enable:
- Subscription checkout
- Webhook handling
- Invoice management

## 🔐 Security Features

- JWT-based session management (no database sessions for scale)
- Role-based access control across all routes
- Middleware-protected routes
- Password hashing with bcrypt (12 rounds)
- Zod input validation on all API routes
- SQL injection prevention via Prisma ORM
- Environment variable protection (no client-side secrets)

## 📊 Brand Colors

```
Deep Blue:    #0B3C5D
Sharp Red:    #E63946
Clean White:  #F8FAFC
Dark Slate:   #1F2937
```

---

Built by TRITAL Care Inc. | [tritalcare.com](https://tritalcare.com)
