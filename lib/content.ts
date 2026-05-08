import {
  Activity,
  BadgeCheck,
  BedDouble,
  Bot,
  BriefcaseBusiness,
  Building2,
  Car,
  ChartNoAxesCombined,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartPulse,
  Home,
  Plane,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";

import type { DashboardKpi } from "@/lib/types";

export const brand = {
  name: "TRITAL Orbit™",
  tagline: "Win more clinicians. Reduce backouts. Improve assignment readiness.",
  positioning:
    "Healthcare Workforce Mobility Infrastructure for staffing agencies, MSPs, employers, and clinicians.",
  promise:
    "We help healthcare staffing companies win and keep clinicians without increasing pay rates by turning every assignment into a better life decision, not just a better weekly number.",
  colors: {
    deepBlue: "#0B3C5D",
    sharpRed: "#E63946",
    cleanWhite: "#F8FAFC",
    darkSlate: "#1F2937"
  }
};

export const publicNav = [
  { label: "Platform", href: "/platform" },
  { label: "Agencies", href: "/solutions/agencies" },
  { label: "MSPs", href: "/solutions/msps" },
  { label: "Clinicians", href: "/solutions/clinicians" },
  { label: "Pricing", href: "/pricing" }
];

export const featureCards = [
  {
    icon: Sparkles,
    title: "Offer Boost Builder",
    href: "/features/offer-boost-builder",
    copy:
      "Turn pay packages into candidate-ready mobility offers with AI positioning, included perks, and recruiter scripts."
  },
  {
    icon: ClipboardCheck,
    title: "Assignment Launch Dashboard",
    href: "/features/assignment-launch-dashboard",
    copy:
      "Track housing, travel, documents, transportation, and first-week readiness from acceptance to day one."
  },
  {
    icon: Activity,
    title: "Retention Risk AI",
    href: "/features/retention-risk-ai",
    copy:
      "Detect offer hesitation, location friction, unanswered messages, and readiness gaps before they become backouts."
  },
  {
    icon: HeartPulse,
    title: "Mobility Concierge",
    href: "/features/mobility-concierge",
    copy:
      "Coordinate travel, housing, cars, and emergency support with a concierge task system built for clinical starts."
  }
];

export const workflow = [
  "Recruiter builds assignment offer",
  "Orbit layers housing, travel, car, and readiness support",
  "AI generates close strategy and candidate messaging",
  "Clinician opens a mobile assignment hub",
  "Concierge resolves mobility friction",
  "Agency and MSP track readiness, risk, and retention"
];

export const marketingPages: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    primaryCta: string;
    secondaryCta: string;
  }
> = {
  "platform": {
    eyebrow: "Platform",
    title: "The offer-to-start operating system for healthcare mobility.",
    description:
      "TRITAL Orbit embeds assignment logistics, retention intelligence, and concierge support into the workflows staffing teams already run.",
    bullets: [
      "One source of truth for offers, mobility perks, booking requests, and readiness",
      "AI agents for offer optimization, risk scoring, concierge work, and MSP reporting",
      "Enterprise controls for agencies, MSPs, vendors, landlords, and clinicians"
    ],
    primaryCta: "Book a platform demo",
    secondaryCta: "View dashboards"
  },
  "solutions/agencies": {
    eyebrow: "For staffing agencies",
    title: "Win more clinicians without racing every competitor on pay.",
    description:
      "Differentiate every assignment with a practical life plan: where they will stay, how they will get there, who will help, and why this start is safe.",
    bullets: [
      "Increase acceptance by packaging mobility value into every offer",
      "Reduce backouts with proactive alerts and readiness workflows",
      "Give recruiters stronger scripts, SMS pitches, and candidate-facing links"
    ],
    primaryCta: "Build stronger offers",
    secondaryCta: "See agency workflow"
  },
  "solutions/msps": {
    eyebrow: "For MSPs",
    title: "Visibility into supplier readiness, mobility friction, and start risk.",
    description:
      "Give client stakeholders a clearer view of assignment readiness and supplier performance without adding operational drag.",
    bullets: [
      "Track acceptance, backout, time-to-ready, and first-day show metrics",
      "Compare supplier performance by agency, market, and utilization",
      "Generate executive summaries from operational data with MSP Reporting AI"
    ],
    primaryCta: "Review MSP reports",
    secondaryCta: "Explore controls"
  },
  "solutions/clinicians": {
    eyebrow: "For clinicians",
    title: "A mobile assignment hub that makes the next move feel manageable.",
    description:
      "Clinicians get a premium, mobile-first view of pay, location, support, housing, travel, transportation, and who to contact.",
    bullets: [
      "Personalized assignment summary and mobility support cards",
      "Verified housing and transportation options tied to the assignment city",
      "Simple requests for concierge support, recruiter questions, and offer acceptance"
    ],
    primaryCta: "Preview candidate hub",
    secondaryCta: "See support options"
  },
  "features/offer-boost-builder": {
    eyebrow: "Feature",
    title: "Offer Boost Builder converts compensation into a high-confidence life decision.",
    description:
      "Recruiters assemble candidate details, assignment logistics, pay, and mobility perks, then generate AI-enhanced offer collateral in seconds.",
    bullets: [
      "Enhanced offer summary, value statement, SMS, email, and PDF-ready copy",
      "Toggle flight, housing, car, relocation, readiness, emergency, and loyalty perks",
      "Save offers, preview candidate-facing pages, and send tracked links"
    ],
    primaryCta: "Create an offer",
    secondaryCta: "View offer preview"
  },
  "features/assignment-launch-dashboard": {
    eyebrow: "Feature",
    title: "Assignment Launch keeps every accepted clinician on track to day one.",
    description:
      "Readiness columns make the operational gaps visible: housing, travel, documents, first-week preparation, and AI-recommended action.",
    bullets: [
      "Filter, search, and export launch readiness data",
      "Highlight candidates with missing housing near start date",
      "Give recruiters and concierge teams a shared action board"
    ],
    primaryCta: "Open launch dashboard",
    secondaryCta: "Export sample CSV"
  },
  "features/retention-risk-ai": {
    eyebrow: "Feature",
    title: "Retention Risk AI catches hidden backout signals early.",
    description:
      "Risk scoring blends engagement, offer status, housing behavior, travel requests, start-date proximity, pay, location difficulty, and unanswered messages.",
    bullets: [
      "0-100 score with Low, Medium, High, and Critical labels",
      "Reasoning, suggested SMS, call script, and recruiter action",
      "Visible in dashboards, offer detail, and candidate tracking workflows"
    ],
    primaryCta: "Run risk analysis",
    secondaryCta: "See risk engine"
  },
  "features/mobility-concierge": {
    eyebrow: "Feature",
    title: "Mobility Concierge turns operational friction into managed tasks.",
    description:
      "Booking requests create concierge tasks, status changes, candidate updates, and vendor recommendations for housing, flights, and cars.",
    bullets: [
      "Task board for New, In Progress, Waiting Candidate, Completed, and Cancelled",
      "Concierge AI summaries and next-best actions",
      "Professional updates for clinicians when tasks are resolved"
    ],
    primaryCta: "Review concierge requests",
    secondaryCta: "Create booking request"
  },
  "pricing": {
    eyebrow: "Pricing",
    title: "Enterprise-grade mobility infrastructure with Stripe-ready billing.",
    description:
      "Choose a plan that matches offer volume, concierge coverage, MSP reporting needs, and AI automation depth.",
    bullets: [
      "Starter infrastructure for growing agencies",
      "Scale plans for multi-team staffing organizations",
      "Enterprise controls for MSP visibility, audit logs, and dedicated support"
    ],
    primaryCta: "Request pricing",
    secondaryCta: "Book demo"
  },
  "demo": {
    eyebrow: "Demo",
    title: "See how Orbit turns an assignment into a stronger candidate decision.",
    description:
      "Book a focused walkthrough of offer creation, candidate hub, booking requests, readiness tracking, and MSP reporting.",
    bullets: [
      "Bring a real assignment scenario",
      "See mock AI responses if your OpenAI-compatible key is not configured",
      "Review role-based dashboards for your team"
    ],
    primaryCta: "Schedule demo",
    secondaryCta: "Contact sales"
  },
  "contact": {
    eyebrow: "Contact",
    title: "Talk with TRITAL Orbit about workforce mobility infrastructure.",
    description:
      "Tell us where offer acceptance, assignment readiness, or retention friction is showing up in your staffing operation.",
    bullets: [
      "Agency, MSP, employer, vendor, and landlord conversations welcome",
      "Responsive handoff to the right team",
      "No pay-rate race required"
    ],
    primaryCta: "Send message",
    secondaryCta: "View platform"
  },
  "privacy": {
    eyebrow: "Privacy",
    title: "Privacy commitments for healthcare workforce mobility data.",
    description:
      "TRITAL Orbit is designed to keep candidate, agency, vendor, and operational data controlled, auditable, and purpose-limited.",
    bullets: [
      "Role-based access, audit logs, and secure document architecture",
      "Data minimization for candidate mobility workflows",
      "Vendor and landlord information handled through verification workflows"
    ],
    primaryCta: "Contact privacy",
    secondaryCta: "Read terms"
  },
  "terms": {
    eyebrow: "Terms",
    title: "Production-ready service terms structure.",
    description:
      "This implementation includes a practical terms page structure for commercial review before launch.",
    bullets: [
      "Subscription, billing, acceptable use, data processing, and support sections",
      "Stripe-ready payment records and subscription models",
      "Audit-ready operational and AI usage logs"
    ],
    primaryCta: "Contact legal",
    secondaryCta: "View privacy"
  }
};

export const pricingPlans = [
  {
    name: "Orbit Launch",
    price: "$2,500",
    description: "For agencies operationalizing premium offer mobility.",
    features: ["Offer Boost Builder", "Candidate assignment hubs", "Booking requests", "Core risk scoring"]
  },
  {
    name: "Orbit Scale",
    price: "$6,500",
    description: "For high-volume teams with concierge workflows.",
    features: ["Everything in Launch", "Concierge task board", "Assignment Launch dashboard", "Vendor marketplace"]
  },
  {
    name: "Orbit Enterprise",
    price: "Custom",
    description: "For MSP visibility, security controls, and multi-agency reporting.",
    features: ["MSP reports", "Advanced RBAC", "Audit logs", "Dedicated implementation support"]
  }
];

export const agencyKpis: DashboardKpi[] = [
  { label: "Offers Sent", value: "184", trend: "+18% MoM", tone: "blue" },
  { label: "Accepted Offers", value: "126", trend: "68.5% acceptance", tone: "green" },
  { label: "Pending Offers", value: "31", trend: "12 need action", tone: "amber" },
  { label: "Backout Risk", value: "14", trend: "4 critical", tone: "red" },
  { label: "Booking Requests", value: "47", trend: "9 new today", tone: "blue" },
  { label: "Assignment Ready", value: "82%", trend: "+11 pts", tone: "green" }
];

export const activeOffers = [
  {
    id: "orbit-demo-offer",
    candidate: "Maya Johnson",
    role: "Travel RN",
    specialty: "ICU",
    facility: "Northlake Medical Center",
    location: "Phoenix, AZ",
    weeklyPay: 2680,
    status: "Sent",
    risk: 31
  },
  {
    id: "offer-lucas",
    candidate: "Lucas Bennett",
    role: "Respiratory Therapist",
    specialty: "NICU",
    facility: "Harborview Children's",
    location: "Seattle, WA",
    weeklyPay: 2410,
    status: "Viewed",
    risk: 62
  },
  {
    id: "offer-elena",
    candidate: "Elena Brooks",
    role: "Surgical Tech",
    specialty: "OR",
    facility: "Mercy Regional",
    location: "Denver, CO",
    weeklyPay: 2150,
    status: "Backout Risk",
    risk: 81
  }
];

export const candidatesInNegotiation = [
  "Maya needs housing confidence before signing",
  "Lucas asked about flight reimbursement timing",
  "Elena has two unanswered recruiter messages"
];

export const recentActivity = [
  "Maya viewed housing options for Phoenix",
  "Retention Risk AI flagged Elena as Critical",
  "Concierge created car rental task for Lucas",
  "Offer Boost AI generated a revised SMS for ICU assignment"
];

export const aiRecommendations = [
  "Lead with furnished housing availability for Phoenix ICU candidates.",
  "Call Elena before 3 PM and confirm first-week transportation.",
  "Send Lucas the travel reimbursement timeline and concierge intro."
];

export const dashboardConfigs = {
  admin: {
    title: "Admin Control Center",
    role: "Super Admin",
    kpis: [
      { label: "Agencies", value: "42", trend: "6 onboarding", tone: "blue" },
      { label: "Platform Health", value: "99.98%", trend: "All systems normal", tone: "green" },
      { label: "AI Usage", value: "18.4k", trend: "requests this month", tone: "slate" },
      { label: "Audit Events", value: "7,812", trend: "last 30 days", tone: "amber" }
    ],
    nav: ["Agencies", "Users", "Candidates", "Offers", "Vendors", "Housing", "Subscriptions", "Audit Logs", "AI Usage", "Settings"]
  },
  recruiter: {
    title: "Recruiter Workspace",
    role: "Recruiter",
    kpis: [
      { label: "Open Offers", value: "28", trend: "9 viewed", tone: "blue" },
      { label: "Follow-ups Due", value: "11", trend: "4 urgent", tone: "red" },
      { label: "Accepted This Week", value: "17", trend: "+21%", tone: "green" },
      { label: "Avg Confidence", value: "76", trend: "+8 pts", tone: "amber" }
    ],
    nav: ["My Offers", "Candidates", "Risk Queue", "Messages", "Launch Readiness"]
  },
  candidate: {
    title: "Candidate Assignment Hub",
    role: "Clinician",
    kpis: [
      { label: "Active Assignment", value: "1", trend: "Phoenix ICU", tone: "blue" },
      { label: "Readiness", value: "74%", trend: "2 items left", tone: "amber" },
      { label: "Support Requests", value: "3", trend: "1 in progress", tone: "slate" },
      { label: "Documents", value: "5/6", trend: "license pending", tone: "green" }
    ],
    nav: ["Offer", "Housing", "Travel", "Documents", "Support"]
  },
  concierge: {
    title: "Concierge Command Center",
    role: "Concierge Manager",
    kpis: [
      { label: "New Requests", value: "16", trend: "5 high priority", tone: "red" },
      { label: "In Progress", value: "39", trend: "12 waiting candidate", tone: "amber" },
      { label: "Completed", value: "142", trend: "this month", tone: "green" },
      { label: "Avg Response", value: "18m", trend: "-7m", tone: "blue" }
    ],
    nav: ["Requests", "Task Board", "Vendors", "Candidate Updates", "SLA"]
  },
  vendor: {
    title: "Vendor Dashboard",
    role: "Vendor / Landlord",
    kpis: [
      { label: "Listings", value: "24", trend: "21 verified", tone: "green" },
      { label: "Contact Requests", value: "13", trend: "4 today", tone: "blue" },
      { label: "Rating", value: "4.8", trend: "premium partner", tone: "amber" },
      { label: "Availability", value: "78%", trend: "next 30 days", tone: "slate" }
    ],
    nav: ["Listings", "Requests", "Verification", "Billing", "Profile"]
  },
  msp: {
    title: "MSP Reporting Dashboard",
    role: "MSP Viewer",
    kpis: [
      { label: "Acceptance Rate", value: "71.2%", trend: "+9.1 pts", tone: "green" },
      { label: "Backout Rate", value: "6.4%", trend: "-3.8 pts", tone: "blue" },
      { label: "Time-to-Ready", value: "4.6d", trend: "-1.2d", tone: "green" },
      { label: "Show-up Rate", value: "96.1%", trend: "top quartile", tone: "amber" }
    ],
    nav: ["Executive Summary", "Agencies", "Suppliers", "Readiness", "Utilization", "Exports"]
  }
} as const;

export const bookingRequests = [
  {
    id: "br-1001",
    candidate: "Maya Johnson",
    assignment: "Northlake Medical Center",
    status: "New",
    owner: "Unassigned",
    timeline: "Move date in 12 days",
    needs: "Housing + Flight"
  },
  {
    id: "br-1002",
    candidate: "Lucas Bennett",
    assignment: "Harborview Children's",
    status: "In Progress",
    owner: "Avery Stone",
    timeline: "Awaiting rental quote",
    needs: "Car"
  },
  {
    id: "br-1003",
    candidate: "Elena Brooks",
    assignment: "Mercy Regional",
    status: "Waiting Candidate",
    owner: "Noah Lee",
    timeline: "Budget confirmation needed",
    needs: "Housing"
  }
];

export const launchRows = [
  {
    candidate: "Maya Johnson",
    role: "Travel RN",
    facility: "Northlake Medical Center",
    startDate: "2026-06-03",
    housing: "Options sent",
    travel: "Booked",
    documents: "Pending license",
    readiness: "74%",
    risk: 31,
    action: "Confirm housing choice"
  },
  {
    candidate: "Lucas Bennett",
    role: "Respiratory Therapist",
    facility: "Harborview Children's",
    startDate: "2026-05-22",
    housing: "Secured",
    travel: "Needs flight",
    documents: "Complete",
    readiness: "81%",
    risk: 48,
    action: "Book flight"
  },
  {
    candidate: "Elena Brooks",
    role: "Surgical Tech",
    facility: "Mercy Regional",
    startDate: "2026-05-15",
    housing: "Missing",
    travel: "Not requested",
    documents: "Pending",
    readiness: "43%",
    risk: 81,
    action: "Urgent housing call"
  }
];

export const housingOptions = [
  {
    title: "Arcadia Furnished Clinical Suite",
    city: "Phoenix",
    state: "AZ",
    distance: "2.4 mi",
    cost: "$2,250/mo",
    availability: "Available Jun 1",
    verified: true,
    rating: "4.9"
  },
  {
    title: "Desert Ridge Extended Stay",
    city: "Phoenix",
    state: "AZ",
    distance: "5.1 mi",
    cost: "$1,980/mo",
    availability: "Available now",
    verified: true,
    rating: "4.7"
  },
  {
    title: "Biltmore Landing Apartment",
    city: "Phoenix",
    state: "AZ",
    distance: "7.0 mi",
    cost: "$2,600/mo",
    availability: "Available Jun 10",
    verified: true,
    rating: "4.8"
  }
];

export const marketplaceCards = [
  { icon: Home, title: "Verified housing", stat: "312 listings" },
  { icon: Plane, title: "Travel partners", stat: "28 providers" },
  { icon: Car, title: "Transportation", stat: "86 markets" },
  { icon: BadgeCheck, title: "Approved vendors", stat: "94%" }
];

export const adminModules = [
  { icon: Building2, label: "Manage agencies" },
  { icon: UsersRound, label: "Manage users" },
  { icon: BriefcaseBusiness, label: "Manage offers" },
  { icon: BedDouble, label: "Manage housing" },
  { icon: ShieldCheck, label: "View audit logs" },
  { icon: Bot, label: "View AI usage" },
  { icon: ChartNoAxesCombined, label: "Platform health" },
  { icon: FileText, label: "System settings" },
  { icon: CheckCircle2, label: "Subscriptions" }
];
