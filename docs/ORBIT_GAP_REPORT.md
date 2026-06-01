# TRITAL Orbit™ — Gap Report vs. Founding Brief

**Branch:** `claude/elegant-lovelace-wZz1x`
**Date:** 2026-06-01
**Scope:** Read-only audit of the entire repository (113 TS files) against the TRITAL Orbit™ founding brief. No code changes were made.
**Method:** Three parallel deep-dive audits — (1) marketing & design system, (2) authenticated product surface + AI copilots, (3) backend, data model, automation, security. Findings consolidated below with file:line citations.

This document is the prioritized punch list for converting the current build into the platform described in the brief: *Healthcare Workforce Mobility Infrastructure™* with a Palantir/Stripe/ServiceNow/Salesforce/Apple feel, AI-first workflows, an audit-grade trust layer, and enterprise-ready multi-tenant architecture.

---

## 1. Executive Summary

The repo is a credible v1 skeleton: real Next.js App Router, real Prisma schema with the right entities, real AI plumbing, real role-aware middleware, a working offer → preview → send → view chain. It is **not yet** what the brief describes. The five highest-impact gaps:

1. **Security regression risks block any production demo.** Public registration accepts `SUPER_ADMIN`. Zero API-level RBAC. Pervasive IDOR. `/api/automation/run` and `/api/exports/csv` operate platform-wide for any logged-in user. These are non-negotiable P0s before any enterprise conversation.
2. **The candidate booking submission breaks the headline workflow.** A token-only candidate cannot submit a booking request — the form lives under `/candidate/*` (RBAC-gated) and the API requires `auth()`. The brief's "offer → housing/travel request → concierge task" chain dies at step 5.
3. **AI is not actually AI-first.** Five of six mandatory agents exist in some form, but **Orbit Intelligence AI is missing entirely**, none of the agents are branded, none enforce the required `{reasoning, confidence, next-action}` output contract, and the most visible "AI Recommendations" cards on `/agency` and `/agency/assignment-launch` are **hard-coded strings**.
4. **The marketing surface reads as templated.** Nine of fourteen marketing routes render through `MarketingTemplatePage` (title + 3 cards + lead form). Privacy and Terms are 3-bullet placeholders. No premium font is loaded. Premium Silver (`#D9DCE1`) from the brief is not even in the Tailwind palette. No customer logos, testimonials, or proof anywhere. KPI numbers are unsourced.
5. **The data moat thesis is not yet structurally possible.** There is no generic `Event`/`Signal` table, no `AutomationRule` table, no `AIRunLog` table, no `Tenant` model above `Agency`, and several marketplace tables (`Vendor`, `Landlord`, `HousingOption`, `TravelOption`, `CarRentalOption`) have no `agencyId` — blocking white-label and per-tenant catalogs. The brief's "trigger / condition / action" automation engine is asserted but not modeled.

If we resolve P0s in the next session, the build crosses the line from "demo-grade" to "credible enterprise pilot." P1s convert it into the brief.

---

## 2. Scorecard

| Brief pillar | Current state | Gap |
|---|---|---|
| Aesthetic (Palantir/Stripe/Apple) | Functional Tailwind/shadcn baseline; one Framer Motion entrance; default browser font | Premium typeface not loaded; Premium Silver token absent; 1 of 5 named brand colors missing; no scroll motion / count-ups / micro-interactions; templated marketing pages |
| AI-first (6 mandatory agents) | 5 of 6 agents have API routes; outputs are summary+bullets only | Orbit Intelligence AI missing; no agent is branded; no reasoning/confidence/next-action contract; static "AI Recommendations" cards |
| Trust layer (audit, identity, verification) | `AuditLog` model exists; one write site (vendor approve); `verificationStatus` enum exists | No identity verification; verification not enforced at write; 8+ actions should audit but don't; no soft-delete, no actor IP/UA |
| Automation-first (trigger/condition/action) | 8 README workflows; ~5 real, 3 partial; all inline imperative | No `AutomationRule` model; no `Event` table; no dedupe / scheduling; cron requires external trigger |
| Enterprise (multi-tenant, white-label) | `Agency` is de-facto tenant; most ops tables scoped | No `Tenant` model; marketplace tables un-scoped; `WhiteLabelConfig` only a few hex columns on `Agency` |
| Data moat | `ActivityLog`, `RetentionRiskScore`, offer timestamps | No generic time-series `Event`/`Signal`; only latest risk snapshot queryable; no `AIRunLog`; no extension/backout signals |
| Reporting (what/why/now what) | MSP page renders stored exec summary | No "generate now" CTA; no benchmarking tables; no predictive recs; no admin observability dashboard |
| Marketplace orchestration | Vendor/Landlord/Housing/Travel/CarRental + verification enum | No contract/insurance lifecycle; no `MarketplaceTransaction`; no assignment-linked payment; no Stripe Connect |
| Mobile (Uber/Airbnb/Wallet) | Pages render on mobile; no overflow | No sticky CTA; no swipe; no wallet-style offer card; touch targets < 44px; default `h-9` buttons; small checkboxes |
| Build hygiene | TS strict on; ESLint baseline | Zero tests; zero structured logging; no health endpoint; no CI; API responses untyped; body params cast `as` instead of Zod-parsed |
| Billing | Stripe checkout endpoint | No webhook handler; `SubscriptionPlan`/`PaymentRecord` never written; no plan gating; no `Agency.stripeCustomerId` |
| Email | `sendPasswordResetEmail` only | Zero transactional sends for offer-sent / booking-created / risk-alert / vendor-approved; no template directory; no per-agency `from` |

---

## 3. Detailed Findings

### 3.1 Security & RBAC (highest urgency)

| # | Finding | Location | Risk |
|---|---|---|---|
| S1 | `registerSchema` accepts `SUPER_ADMIN`, `AGENCY_OWNER`, `MSP_VIEWER`. Public, unauth POST to `/api/auth/register` creates a super-admin. | `src/lib/validators/forms.ts:32-40`, `src/app/api/auth/register/route.ts:27` | Critical |
| S2 | API routes only check `auth()` presence; never role. A CANDIDATE session can hit `PATCH /api/admin/vendors/[id]/approve`. | `src/app/api/admin/vendors/[vendorId]/approve/route.ts:7` | Critical |
| S3 | IDOR on `[id]` routes — no ownership/tenant check on offer send, booking-requests, concierge task status, offer create (caller passes arbitrary `agencyId`). | `src/app/api/offers/[offerId]/send/route.ts:14`, `src/app/api/booking-requests/route.ts:21`, `src/app/api/concierge/tasks/[taskId]/status/route.ts:15`, `src/app/api/offers/route.ts:14-21` | Critical |
| S4 | `/api/exports/csv` returns MSPReports across **all** agencies. | `src/app/api/exports/csv/route.ts:13` | Critical |
| S5 | `/api/automation/run` runs platform-wide for any logged-in session; re-fires alerts on every call (no dedupe). | `src/app/api/automation/run/route.ts:7-100` | High |
| S6 | Vendor dashboard leaks all vendors instead of `ownerId = session.user.id`. | `src/app/(dashboard)/vendor/dashboard/page.tsx`, `src/lib/services/dashboard-data.ts:273` | High |
| S7 | Public `/api/candidate/offers/[token]/events` has no rate limit / replay protection. Token leak enables status spoofing (e.g., spam `accepted_offer`). | `src/app/api/candidate/offers/[token]/events/route.ts:5` | High |
| S8 | Forgot-password token written to `AuditLog.metadata` (readable), not hashed, no expiry, no `PasswordResetToken` table. | `src/app/api/auth/forgot-password/route.ts:22-35` | High |
| S9 | bcrypt cost factor 10. Should be ≥12 in 2026. | `src/app/api/auth/register/route.ts:20` | Medium |
| S10 | All AI endpoints cast request body via `as` instead of Zod-parsing; strict mode bypassed. | `src/app/api/ai/{offer-boost,risk-score,readiness,concierge,msp-report}/route.ts` | Medium |

### 3.2 The Six Mandatory AI Agents

| Brief-named agent | API route | UI surface | Reasoning/confidence/next-action? | Verdict |
|---|---|---|---|---|
| Orbit Offer AI | `/api/ai/offer-boost` | `OfferBuilderForm` "Generate" button | Summary+bullets only | Partial — not branded; output never persisted to `Offer.closeStrategy/smsPitch/emailPitch` columns that already exist |
| Orbit Retain AI | `/api/ai/risk-score` | No interactive UI; only fired by cron | Reasoning+suggested action stored, only `suggestedAction` rendered | Partial — SMS/call scripts stored but never shown |
| Orbit Concierge AI | `/api/ai/concierge` | Fires only on task COMPLETED → notification | None | Partial — no triage assist, no vendor-match copilot |
| Orbit Assignment AI | `/api/ai/readiness` | **No UI anywhere.** Faked by a templated string on `/agency/assignment-launch` line 64 | None | Orphaned endpoint |
| Orbit Intelligence AI | **MISSING** | — | — | **Build new** |
| Orbit MSP AI | `/api/ai/msp-report` | Read-only display of stored summary | None; no Regenerate CTA | Partial |

Cross-cutting AI gaps:
- `runAiAgent` system prompt asks for `{summary, bullets[]}` only (`src/lib/services/ai.ts:36-39`). Brief mandates `{reasoning, confidence, nextAction}` on every output.
- No `AIRunLog` table — model, tokens, latency, cost are not persisted. `AIInsight` saves output only.
- "AI Recommendations" card on `/agency/page.tsx:94-96` is three static strings.
- "AI recommendation" line on `/agency/assignment-launch/page.tsx:64` is templated copy.

### 3.3 Critical Workflow Chain (offer → accept → launch)

| Step | State | Notes |
|---|---|---|
| 1. Create offer (`POST /api/offers`) | OK | Creates Candidate, Assignment, Offer, OfferPerks, ActivityLog `offer.created` |
| 2. Preview offer (`/agency/offers/[id]/preview`) | OK | But AI builder output never persisted; close strategy / pitches re-renderable only via re-run |
| 3. Send offer (`POST /api/offers/[id]/send`) | OK + missing | Writes status SENT and in-app Notification; **no email/SMS sent** |
| 4. Candidate views (`/candidate/offer/[token]`) | OK | `viewed_offer` event flips status |
| 5. Booking request | **BROKEN** | Form route `/candidate/booking-request/[offerId]` is RBAC-gated to `Role.CANDIDATE`; `/api/booking-requests` requires `auth()`. Token-only candidates cannot submit. |
| 6. Concierge task auto-create | OK | Conditional on step 5 succeeding |
| 7. Accept (`accepted_offer` event) | Partial | Flips status, seeds 2 `pending://...` DocumentVault rows; no AI agent fired; `Assignment.housingStatus/documentsStatus/travelStatus/firstWeekReadiness` never updated |
| 8. Assignment launch readiness | Dead end | Reads `Assignment` columns nothing mutates; Orbit Assignment AI never invoked |

### 3.4 Data Model

Missing models vs the brief's vision (proposed names):
1. `Tenant` — true multi-tenant root above `Agency`
2. `Event` / `Signal` — generic time-series `(type, actorId, entityType, entityId, payload, occurredAt)`
3. `AutomationRule` — persisted trigger/condition/action
4. `WorkflowRun` — audit of automation executions
5. `MarketplaceTransaction` — assignment-linked booking payment
6. `IdentityVerification` — candidate KYC
7. `VendorContract` + `VendorInsurance`
8. `WebhookEndpoint` + `WebhookDelivery` — API-first claim is unbacked
9. `ApiKey` / `OAuthClient` — no programmatic access
10. `FeatureFlag` / `PlanLimit` — "no hard-coded limits" requires this
11. `WhiteLabelConfig` / `Domain` — white-label requires real model, not hex columns on `Agency`
12. `AIRunLog` — prompt, model, tokens, latency, cost

Audit/tenancy gaps inside the existing schema:
- No `createdById` / `updatedById` columns anywhere
- No `deletedAt` (soft delete)
- `AuditLog.agencyId` nullable (`prisma/schema.prisma:544`) — cross-tenant leakage risk
- `Vendor`, `Landlord`, `HousingOption`, `TravelOption`, `CarRentalOption` lack `agencyId` (`schema.prisma:298-389`)
- `DocumentVault`, `RetentionRiskScore`, `Notification`, `Lead`, `DemoRequest`, `AIInsight` lack `agencyId` (or it is nullable)
- `Offer` has rich AI-output columns (`closeStrategy`, `smsPitch`, `emailPitch`, `enhancedOfferSummary`, `candidateValueStatement`, `recruiterTalkingPoints`, `pdfReadyOffer` — `schema.prisma:237-243`) but **none are ever written** by the offer creation or boost endpoints

### 3.5 Automation Engine

The 8 README workflows map to inline imperative code in `src/app/api/automation/run/route.ts` and `src/lib/services/automation.ts`. No `AutomationRule` model. No dedupe keys on notifications (re-alerts on every run). No external scheduler — the route only runs when invoked. The brief's trigger/condition/action engine is not yet structurally present.

| # | Workflow | Status | File |
|---|---|---|---|
| 1 | Offer viewed → activity log | Real | `src/lib/services/automation.ts:8-21` |
| 2 | 2-hour non-view alert | Partial (no cron, no dedupe) | `automation/run/route.ts:13-29` |
| 3 | Housing viewed w/o acceptance follow-up | Partial (creates AIInsight every run; no dedupe; last-50-logs heuristic) | `automation/run/route.ts:59-93` |
| 4 | Booking → concierge task | Real | `booking-requests/route.ts:42-46`, `automation.ts:34-43` |
| 5 | Start-date proximity escalation | Partial (hard-coded `travelRequested:true`, `locationDifficulty:7`) | `automation/run/route.ts:31-57` |
| 6 | Offer accepted → readiness bootstrap | Stub (inserts 2 `pending://` rows; `Assignment.*Status` not flipped) | `events/route.ts:50-66` |
| 7 | Risk > 75 urgent notification | Real (no acknowledgement state) | `automation.ts:45-56` |
| 8 | Concierge task completion → candidate update | Real | `concierge/tasks/[taskId]/status/route.ts:21-48` |

### 3.6 Marketing & Design System

| Issue | Detail | Location |
|---|---|---|
| Templated 9 of 14 routes | `MarketingTemplatePage` (title + 3 cards + lead form) renders `/platform`, all `/solutions/*`, all `/features/*`, `/privacy`, `/terms` | `src/components/marketing/page-template.tsx`, `src/app/(marketing)/{platform,solutions/*,features/*,privacy,terms}/page.tsx` |
| Privacy + Terms are not real legal docs | 3 marketing bullets each | `src/app/(marketing)/privacy/page.tsx`, `terms/page.tsx` |
| No premium typeface loaded | No `next/font` import; default sans-serif renders | `src/app/layout.tsx:11-19`, `src/app/globals.css:1-23` |
| Premium Silver `#D9DCE1` token missing | Brief lists 5 brand colors; only 4 are wired | `tailwind.config.ts:12-23` |
| Unsourced KPI claims | "+22%", "-31%", "2.4x", "+18%" rendered with no footnote | `src/lib/marketing-content.ts:1-6`, `src/app/(marketing)/page.tsx:17-24` |
| No customer logos / testimonials / case studies | Anywhere on marketing surface | — |
| Single Framer Motion entrance in entire marketing surface | Hero card fade-in only | `src/components/marketing/section-hero.tsx:43-47` |
| Pricing block duplicated between `/` and `/pricing` | Same `pricingTiers` array; home pricing lead form uses `source="WEBSITE"` instead of `"PRICING"` | `src/app/(marketing)/page.tsx:97-117, 123`, `src/app/(marketing)/pricing/page.tsx:14-34` |
| Logo is a `lucide-react` icon, not a brand mark | Header gradient box | `src/components/layout/site-header.tsx:16-19` |
| Hard-coded sample data in shipped surface | `recruiter@northstarstaffing.com` rendered on candidate hub | `src/components/candidate/candidate-offer-hub.tsx:56` |

### 3.7 Dashboards & UX

- `/candidate` is **entirely hard-coded fiction** ("Housing: In progress", "Risk 68 Medium") — does not read the candidate's record. `src/app/(dashboard)/candidate/page.tsx:13-38`
- `/candidate/housing` hard-codes `"Dallas","TX"` instead of reading the candidate's assignment city. `src/app/(dashboard)/candidate/housing/page.tsx:6`
- `/admin/vendors` lists vendors but **has no approve/reject UI**, although the PATCH endpoint exists. The single audit-write surface in the codebase is unreachable from the app.
- `/recruiter` shows no KPIs, no pipeline scoping, no AI assistant; reads org-wide data.
- `/concierge/requests` board has no AI triage / vendor-match copilot.
- `/msp` filter selects are dead; supplier-performance JSON exists in schema but is not rendered.
- `loading.tsx` / `error.tsx` exist at app root only — no per-segment loading or error UI. `EmptyState` component (`src/components/shared/empty-state.tsx`) exists but is imported nowhere.

### 3.8 Mobile

The candidate portal renders on mobile but is not optimized. No sticky bottom CTA on the Accept Offer flow. Touch targets default to shadcn `h-9` (≈36px) — below the 44px iOS recommendation. Form checkboxes are native default size. No wallet-style offer card, no swipe affordances, no progress indicator. `max-w-3xl px-4 py-6` on `CandidateOfferHub` is cramped on mobile and lacks the Uber/Airbnb/Apple Wallet feel called out in the brief.

### 3.9 Build Hygiene & Observability

- **Zero tests.** No `jest`/`vitest`/`playwright`/`__tests__`/`*.spec.ts`/`*.test.ts`.
- **Zero structured logging.** No Pino/Winston/OTel. Every API route uses `try { ... } catch { return 500 }` — destroys stack traces silently.
- No `/api/health`. No request ID injection. No Sentry / error reporting.
- No CI (`.github/` absent). No Prettier. No husky / lint-staged.
- API response types undeclared.

### 3.10 Billing & Email

- **Billing: ~10% production-ready.** One checkout endpoint; no webhook handler; `STRIPE_WEBHOOK_SECRET` listed in `.env.example:20` but never consumed; `SubscriptionPlan`/`PaymentRecord` are never written; no `Agency.stripeCustomerId`; no Stripe Connect for marketplace payouts.
- **Email: ~5% production-ready.** One inline HTML template (`sendPasswordResetEmail`). No transactional sends for offer.sent, booking.created, concierge.task.completed, risk.alert.high, vendor.approved. No template directory. No per-agency `from` (blocks white-label).

---

## 4. Consolidated Prioritized Fix List

### P0 — Blockers for any enterprise demo

| # | Fix | File:line |
|---|---|---|
| P0-1 | Lock public registration to `CANDIDATE` (or invite-only). Remove other roles from `registerSchema`. | `src/lib/validators/forms.ts:32-40`, `src/app/api/auth/register/route.ts:27` |
| P0-2 | Add an `assertRole(...)` + `assertAgencyMembership(...)` helper and apply it to every `/api/*` non-public route. Tenant-scope every list query. | `src/lib/rbac.ts` (extend), all `src/app/api/**/route.ts` |
| P0-3 | Scope `/api/exports/csv` and `/api/automation/run` to caller's `agencyId`. | `src/app/api/exports/csv/route.ts:13`, `src/app/api/automation/run/route.ts:13-100` |
| P0-4 | Fix the booking-request workflow break. Either accept the offer `token` on `/api/booking-requests` (preferred — embed the form inside `/candidate/offer/[token]`) or relax the RBAC gate. | `src/app/api/booking-requests/route.ts:8`, `src/components/candidate/candidate-offer-hub.tsx:124`, `src/app/(dashboard)/candidate/booking-request/[offerId]/page.tsx` |
| P0-5 | Wire `/candidate` to the candidate's real assignment / risk / readiness rows. No more hard-coded fiction. | `src/app/(dashboard)/candidate/page.tsx:13-38` |
| P0-6 | Build **Orbit Intelligence AI** endpoint and surface (`/api/ai/intelligence`). Add to `/admin` and `/agency` as an executive summary card answering "what happened / why / what now." | new file under `src/app/api/ai/`, `src/app/(dashboard)/admin/page.tsx`, `src/app/(dashboard)/agency/page.tsx` |
| P0-7 | Replace `runAiAgent`'s prompt + parser with a typed contract: `{ reasoning, confidence (0-1), nextAction, summary, bullets }`. Zod-validate. Render `confidence` and `nextAction` on every AI surface. | `src/lib/services/ai.ts:4-57`, all `src/app/api/ai/*/route.ts`, `src/components/offers/offer-builder-form.tsx`, agency dashboard cards, MSP page |
| P0-8 | Rewrite `/privacy` and `/terms` as real legal documents. | `src/app/(marketing)/privacy/page.tsx`, `src/app/(marketing)/terms/page.tsx` |

### P1 — Brief fidelity

| # | Fix | File:line |
|---|---|---|
| P1-1 | Load Inter Tight / Geist / Söhne via `next/font` + extend `fontFamily.sans` in Tailwind. Add Premium Silver `#D9DCE1` as `orbit.silver`. | `src/app/layout.tsx`, `tailwind.config.ts:12-23` |
| P1-2 | Replace the `MarketingTemplatePage` boilerplate with unique per-route layouts on all 9 routes. Each should carry product visuals, proof, and a unique narrative. | `src/components/marketing/page-template.tsx` and its 9 consumers |
| P1-3 | Add a customer-proof strip on the home page (logo row, 1-2 testimonials, SOC2/HIPAA trust band). Either source real proof or remove the unsourced KPI numbers (`marketing-content.ts:1-6`). | `src/app/(marketing)/page.tsx`, `src/lib/marketing-content.ts:1-6` |
| P1-4 | Persist AI outputs into the existing `Offer` columns (`closeStrategy`, `smsPitch`, `emailPitch`, `enhancedOfferSummary`, `candidateValueStatement`, `recruiterTalkingPoints`). Today these are schema-only. | `src/app/api/ai/offer-boost/route.ts`, `src/app/api/offers/route.ts` |
| P1-5 | Wire admin vendor approve/reject UI on `/admin/vendors`. Without it, the only `AuditLog` write site is unreachable. | `src/app/(dashboard)/admin/vendors/page.tsx` |
| P1-6 | On offer ACCEPTED, mutate `Assignment.housingStatus/documentsStatus/travelStatus/firstWeekReadiness` and invoke Orbit Assignment AI. Connect the assignment-launch dashboard to real state. | `src/app/api/candidate/offers/[token]/events/route.ts:34-66`, `src/app/(dashboard)/agency/assignment-launch/page.tsx:64` |
| P1-7 | Scope marketplace tables by tenant: add `agencyId` (or a true `Tenant` model) to `Vendor`, `Landlord`, `HousingOption`, `TravelOption`, `CarRentalOption`, `DocumentVault`, `RetentionRiskScore`, `Notification`, `AIInsight`. Make `AuditLog.agencyId` non-null. | `prisma/schema.prisma:298-389, 431, 449, 466, 509, 542` |
| P1-8 | Add Stripe webhook handler at `/api/billing/webhook`; persist `SubscriptionPlan` + `PaymentRecord`; add `Agency.stripeCustomerId`. | new file; `prisma/schema.prisma` |
| P1-9 | Introduce `Event`/`Signal` table and `AutomationRule(trigger, condition, action)` model; refactor inline workflows into rule-driven runs. Add dedupe keys on `Notification`. | `prisma/schema.prisma`, `src/app/api/automation/run/route.ts` |
| P1-10 | Add structured logging (Pino) with request-ID middleware. Replace silent `catch {}` everywhere. Add `/api/health`. | all `src/app/api/**/route.ts`, `middleware.ts` |
| P1-11 | Vendor dashboard: scope by `ownerId = session.user.id`. | `src/app/(dashboard)/vendor/dashboard/page.tsx`, `src/lib/services/dashboard-data.ts:273` |
| P1-12 | Candidate experience: sticky bottom Accept CTA, wallet-style offer card, larger tap targets (≥44px), snap-scroll option cards. Remove hardcoded `recruiter@northstarstaffing.com`. | `src/components/candidate/candidate-offer-hub.tsx:45,56,121-124` |
| P1-13 | Add scroll-triggered motion + KPI count-ups on home + product modules. | `src/app/(marketing)/page.tsx:16-25`, `src/components/marketing/section-hero.tsx` |
| P1-14 | Wire transactional Resend templates for offer.sent, booking_request.created, concierge.task.completed, risk.alert.high, vendor.approved. Template directory + per-agency `from`. | `src/lib/services/email.ts`, new `src/lib/email/templates/*` |

### P2 — Polish, depth, defense

| # | Fix | File:line |
|---|---|---|
| P2-1 | Replace `lucide-react` `Orbit` icon logo with a real brand SVG mark. | `src/components/layout/site-header.tsx:16-19` |
| P2-2 | Forms: floating labels, elegant success/error panels (currently only `sonner` toasts). Fix attribution: pass `source="PRICING"` on the home pricing-block lead form. | `src/components/forms/*`, `src/app/(marketing)/page.tsx:123` |
| P2-3 | Use `EmptyState` (dead component today) on every dashboard list — agency offers, booking requests, assignment-launch, concierge board, vendor lists. Add `loading.tsx` per dashboard segment. | `src/components/shared/empty-state.tsx`, `src/app/(dashboard)/*/loading.tsx` (new files) |
| P2-4 | Write `AuditLog` for offer.created, offer.sent, offer.accepted, booking.created, concierge.task.status_changed, export.csv, export.pdf. Build `/admin/audit` viewer. | `src/app/api/offers/route.ts:73`, `src/app/api/offers/[offerId]/send/route.ts:23`, `src/app/api/candidate/offers/[token]/events/route.ts:40`, etc. |
| P2-5 | Add `AIRunLog` table; capture prompt, model, tokens, latency, cost on every agent call. | `prisma/schema.prisma`, `src/lib/services/ai.ts` |
| P2-6 | Hash + expire forgot-password tokens; introduce `PasswordResetToken` model. Stop writing the token to `AuditLog.metadata`. | `src/app/api/auth/forgot-password/route.ts:22-35`, `prisma/schema.prisma` |
| P2-7 | Raise bcrypt cost factor to 12. | `src/app/api/auth/register/route.ts:20` |
| P2-8 | Replace all `as` body casts with `schema.parse(...)` on AI routes and concierge task status. | `src/app/api/ai/**/route.ts`, `src/app/api/concierge/tasks/[taskId]/status/route.ts:12` |
| P2-9 | Add Vitest + Playwright; baseline smoke tests on the core workflow chain (offer create → send → view → booking → accept). | `package.json`, new `tests/*` |
| P2-10 | Add a `WhiteLabelConfig` model (logo URL, primary/accent colors, domain, sender email) replacing the ad-hoc hex columns on `Agency`. | `prisma/schema.prisma` |

---

## 5. Suggested Session Sequencing

This is the recommended order if we commit to a multi-session execution plan:

1. **Session 2 — Security lockdown.** Land P0-1 through P0-3 + P2-7. Cuts off the demo-blocker risks. ~1 day.
2. **Session 3 — Workflow integrity.** P0-4 (booking break), P0-5 (`/candidate` real data), P1-6 (acceptance → readiness state). Re-walk the chain end-to-end. ~1 day.
3. **Session 4 — AI contract + missing agent.** P0-6 (Orbit Intelligence AI), P0-7 (reasoning/confidence/next-action contract). Persist `Offer` AI columns (P1-4). ~1-1.5 days.
4. **Session 5 — Design-system overhaul.** P1-1 (typography + Premium Silver), P1-2 (replace `MarketingTemplatePage`), P0-8 (real legal docs), P1-3 (proof strip), P1-13 (motion). ~2 days.
5. **Session 6 — Trust + tenancy.** P1-7 (tenant-scope marketplace), P1-5 (admin vendor approve UI), P2-4 (audit writes), P2-10 (`WhiteLabelConfig`). ~1.5 days.
6. **Session 7 — Automation engine.** P1-9 (`Event` + `AutomationRule`), refactor 8 workflows, dedupe. ~1.5 days.
7. **Session 8 — Billing + email + observability.** P1-8 (Stripe webhook), P1-14 (Resend templates), P1-10 (Pino + health). ~1.5 days.
8. **Session 9 — Mobile + polish.** P1-12 (candidate mobile), P2-2 (forms), P2-3 (empty/loading states), P2-1 (logo). ~1 day.
9. **Session 10 — Tests + hardening.** P2-9, P2-5, P2-6, P2-8. ~1 day.

Total: ~12 working days to convert the current build into something defensible against the founding brief.

---

## 6. What's Already Strong (worth preserving)

The audit is intentionally critical, but the following are real assets worth protecting in any refactor:

- The Prisma schema covers the right domain entities (Offer, Assignment, Candidate, Vendor, ConciergeTask, ActivityLog, RetentionRiskScore, AIInsight, AuditLog, etc.).
- The middleware-level RBAC pattern for page routes is sound (`middleware.ts:36-44`, `src/lib/rbac.ts:14-25`).
- The offer creation → preview → send → view chain is wired with real Prisma reads/writes and ActivityLog telemetry.
- The AI fallback pattern (mock responses when `OPENAI_API_KEY` is missing) keeps the demo deterministic.
- TypeScript `strict: true` is on (`tsconfig.json:7`).
- The 8 README workflows have actual code behind 5 of them.
- The seeded role accounts cover every persona, which makes manual QA tractable.

These give us a credible starting point. The work above converts that starting point into the brief.
