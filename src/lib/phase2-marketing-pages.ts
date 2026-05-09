export type MarketingPhase2Page = {
  eyebrow: string;
  title: string;
  subtitle: string;
  bullets: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export const phase2MarketingPages: Record<string, MarketingPhase2Page> = {
  "mobility-exchange": {
    eyebrow: "Live Mobility Exchange™",
    title: "Assignment-verified bidding for travel, housing, and relocation",
    subtitle:
      "TRITAL Orbit connects staffing demand to verified vendors so clinicians compare trusted options instead of generic travel listings.",
    bullets: [
      "Clinician and agency requests are tied to live assignment context.",
      "Verified travel and housing vendors submit structured, auditable bids.",
      "Concierge and recruiter teams accelerate acceptance with confidence-based recommendations."
    ]
  },
  "healthcare-workforce-mobility-cloud": {
    eyebrow: "Healthcare Workforce Mobility Cloud",
    title: "Infrastructure layer for offer-to-start certainty",
    subtitle:
      "Unify staffing operations, mobility logistics, wallet credits, concierge orchestration, and AI readiness intelligence in one system.",
    bullets: [
      "Control travel readiness without relying only on pay-rate escalation.",
      "Eliminate fragmented tooling between recruiting, concierge, and vendor teams.",
      "Deliver board-ready operational visibility for agency and MSP leadership."
    ]
  },
  "solutions/travel-agencies": {
    eyebrow: "Solutions for Travel Agencies",
    title: "Verified demand, better conversion, lower fraud risk",
    subtitle:
      "Bid on assignment-verified healthcare travel requests and optimize win-rate with transparent quality signals.",
    bullets: [
      "Receive verified clinician travel demand tied to real assignment dates.",
      "Track bid performance, conversion, and payout status from one partner console.",
      "Reduce chargeback exposure using assignment-backed booking validation."
    ]
  },
  "solutions/housing-providers": {
    eyebrow: "Solutions for Housing Providers",
    title: "Assignment-matched housing demand for healthcare contractors",
    subtitle:
      "List furnished properties and win trusted placement demand from agencies and concierge teams.",
    bullets: [
      "Map inventory to assignment location, move date, and commute tolerance.",
      "Improve occupancy with verified demand instead of low-intent public leads.",
      "Earn trust with platform verification and quality scoring."
    ]
  },
  "solutions/relocation-vendors": {
    eyebrow: "Solutions for Relocation Vendors",
    title: "Deliver move support inside the staffing workflow",
    subtitle:
      "Serve relocation packages where staffing agencies already make assignment readiness decisions.",
    bullets: [
      "Receive assignment-stage relocation opportunities with context.",
      "Package services with transparent pricing and SLA visibility.",
      "Collaborate directly with concierge teams to reduce start-date risk."
    ]
  },
  "solutions/car-rental-partners": {
    eyebrow: "Solutions for Car Rental Partners",
    title: "Meet high-intent clinicians with assignment-tied mobility needs",
    subtitle:
      "Provide transparent weekly transportation options that convert through verified healthcare staffing demand.",
    bullets: [
      "Capture structured requests that include shift timing and commute preferences.",
      "Win bundled bids with flight and housing options.",
      "Track conversion and payout signals by market and assignment type."
    ]
  },
  "solutions/hotel-partners": {
    eyebrow: "Solutions for Hotel Partners",
    title: "Assignment-ready short-stay inventory in a healthcare channel",
    subtitle:
      "Offer hotel support for first-week launches, emergency housing, and relocation transitions.",
    bullets: [
      "Serve first-week and emergency use-cases with high urgency visibility.",
      "Integrate nightly-rate packages into full mobility bids.",
      "Participate in an enterprise channel with staffing demand continuity."
    ]
  },
  "solutions/health-systems": {
    eyebrow: "Solutions for Health Systems",
    title: "Improve fill reliability through supplier mobility readiness",
    subtitle:
      "Gain consistent assignment start performance by making mobility readiness measurable and operational.",
    bullets: [
      "Reduce first-day no-show risk with standardized readiness workflows.",
      "Monitor supplier performance with mobility and retention context.",
      "Drive measurable backout reduction across contingent labor programs."
    ]
  },
  partners: {
    eyebrow: "Partner Ecosystem",
    title: "Join the TRITAL Orbit mobility partner network",
    subtitle:
      "Travel agencies, housing providers, relocation vendors, hotels, and rental partners grow through verified assignment demand.",
    bullets: [
      "Onboard once and access role-specific partner portals.",
      "Bid with confidence on validated staffing requests.",
      "Scale through API-ready integration and analytics."
    ],
    primaryCta: { label: "Become a Partner", href: "/contact" }
  },
  "partners/travel-agencies": {
    eyebrow: "Travel Agency Partners",
    title: "High-intent travel demand with assignment verification",
    subtitle: "Compete on quality and value, not lead spam.",
    bullets: [
      "Bid on verified clinician itineraries.",
      "Track win-rate, conversion, and payout outcomes.",
      "Upgrade to API-led partner workflows as volume scales."
    ]
  },
  "partners/housing-providers": {
    eyebrow: "Housing Provider Partners",
    title: "Fill furnished inventory with assignment-matched demand",
    subtitle: "Connect your listing portfolio to healthcare assignment cycles.",
    bullets: [
      "Publish inventory with verification status.",
      "Receive assignment-context inquiries from agency and candidate views.",
      "Use analytics to optimize pricing and placement strategy."
    ]
  },
  "partners/relocation-vendors": {
    eyebrow: "Relocation Partners",
    title: "Support clinicians through high-friction assignment moves",
    subtitle: "Bundle relocation services into verified staffing workflows.",
    bullets: [
      "Offer end-to-end relocation packages with SLA transparency.",
      "Coordinate with concierge managers in-platform.",
      "Increase assignment readiness outcomes for agency clients."
    ]
  },
  trust: {
    eyebrow: "Trust Center",
    title: "Assignment verification, vendor verification, and booking transparency",
    subtitle:
      "TRITAL Orbit is built for enterprise trust with policy-aligned controls, audit trails, and responsibility disclosures.",
    bullets: [
      "Vendor verification and assignment verification workflows included.",
      "Booking protection and payment responsibility disclosures by default.",
      "Audit logs and dispute workflows available to platform admins."
    ]
  },
  security: {
    eyebrow: "Security",
    title: "Enterprise-grade controls for healthcare mobility operations",
    subtitle:
      "Role-based access, scoped APIs, and operational resilience patterns built into every module.",
    bullets: [
      "RBAC and protected route enforcement across all user roles.",
      "API fallback reliability when optional integrations are unavailable.",
      "Structured logging and governance workflows for critical actions."
    ]
  },
  "vendor-verification": {
    eyebrow: "Vendor Verification",
    title: "Verification-first partner onboarding",
    subtitle: "Promote trust through status-backed verification workflows.",
    bullets: [
      "Document and compliance review lifecycle.",
      "Verification status badges throughout marketplace experiences.",
      "Admin oversight for exceptions and risk signals."
    ]
  },
  "assignment-verification": {
    eyebrow: "Assignment Verification",
    title: "Verified assignment context for every mobility decision",
    subtitle: "Requests and bids are tied to real staffing timelines and assignment records.",
    bullets: [
      "Reduces fraud and low-intent booking behavior.",
      "Improves vendor quality and candidate confidence.",
      "Enables measurable readiness reporting for agency and MSP stakeholders."
    ]
  },
  "pricing/clinicians": {
    eyebrow: "Clinician Pricing",
    title: "Free core access with optional Orbit Plus™",
    subtitle: "Start free, then upgrade for priority support and premium mobility benefits.",
    bullets: [
      "Free: assignment hub, basic mobility requests, rewards account.",
      "Orbit Plus monthly and annual plans with concierge and priority vendor access.",
      "Upgrade flow supports Stripe-ready checkout and fallback handling."
    ]
  },
  "pricing/agencies": {
    eyebrow: "Agency Pricing",
    title: "Pricing tiers aligned to staffing scale",
    subtitle: "From startup recruiters to enterprise supplier networks.",
    bullets: [
      "Starter, Growth, and Enterprise architecture.",
      "AI workflows, concierge orchestration, and wallet infrastructure included by tier.",
      "Integration-ready pathways for MSP and health-system reporting."
    ]
  },
  "pricing/vendors": {
    eyebrow: "Vendor Pricing",
    title: "Partner plans for travel and housing ecosystems",
    subtitle: "Scale from manual bidding to API-enabled enterprise partner operations.",
    bullets: [
      "Free, Preferred, and Enterprise partner options.",
      "Bid visibility, analytics, and capacity controls by plan.",
      "Verification and payout tooling for trusted growth."
    ]
  },
  "pricing/msps": {
    eyebrow: "MSP Pricing",
    title: "Executive-grade reporting and supplier intelligence",
    subtitle: "Annual enterprise packages designed around measurable workforce outcomes.",
    bullets: [
      "Supplier benchmarking with readiness and mobility context.",
      "Executive summaries, exports, and board-ready dashboards.",
      "Designed to support enterprise compliance and program governance."
    ]
  },
  "demo/live-platform": {
    eyebrow: "Live Platform Demo",
    title: "Explore a realistic healthcare mobility operating environment",
    subtitle: "See recruiter, candidate, vendor, concierge, and MSP workflows in one connected system.",
    bullets: [
      "Seeded activity streams and role-specific dashboards.",
      "AI insights and readiness interventions across workflows.",
      "Demonstrates end-to-end offer-to-start lifecycle execution."
    ]
  },
  "demo/clinician-story": {
    eyebrow: "Demo Story",
    title: "Clinician journey: compare, choose, and start with confidence",
    subtitle: "From offer confusion to assignment-ready confidence through mobility support.",
    bullets: [
      "Offer comparison prioritizing life outcomes, not just headline pay.",
      "Travel and housing concierge support before day one.",
      "First-week preparation with AI relocation guidance."
    ]
  },
  "demo/recruiter-story": {
    eyebrow: "Demo Story",
    title: "Recruiter story: save high-risk offers with precision",
    subtitle: "Offer War Room surfaces risk signals and next-best-action playbooks.",
    bullets: [
      "Kanban pipeline with close probability and friction metrics.",
      "Wallet credit sponsorship to remove mobility blockers quickly.",
      "AI-generated scripts for outreach, SMS, and email follow-up."
    ]
  },
  "demo/vendor-story": {
    eyebrow: "Demo Story",
    title: "Vendor story: bid, win, deliver, and get paid",
    subtitle: "Showcase how verified partner portals turn demand into predictable conversion.",
    bullets: [
      "Verified request intake and structured bid workflows.",
      "Performance analytics with win/loss and response-time visibility.",
      "Payout pipeline with dispute and verification governance."
    ]
  },
  "demo/msp-story": {
    eyebrow: "Demo Story",
    title: "MSP story: executive visibility into readiness and ROI",
    subtitle: "Board-ready reporting across supplier performance, backout risk, and savings.",
    bullets: [
      "Executive summary cards with measurable impact metrics.",
      "Supplier and agency filtering with export-ready outputs.",
      "AI narrative summaries for stakeholder reporting cycles."
    ]
  }
};
