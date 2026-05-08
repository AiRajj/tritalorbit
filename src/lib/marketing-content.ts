export const kpis = [
  { label: "Offer Acceptance Lift", value: "+22%" },
  { label: "Backout Reduction", value: "-31%" },
  { label: "Faster Assignment Readiness", value: "2.4x" },
  { label: "Clinician Retention Lift", value: "+18%" }
];

export const pains = [
  "Clinicians compare offers only on weekly pay and ignore lifecycle support.",
  "Backouts happen when housing and travel uncertainty appear after verbal acceptance.",
  "Recruiters lose cycle time chasing logistics instead of closing and retaining talent."
];

export const solutions = [
  "Embed mobility support directly into the offer-to-start experience.",
  "Apply AI recommendation agents for risk scoring, messaging, and readiness workflows.",
  "Create concierge-backed confidence that improves first-day show-up rates."
];

export const pricingTiers = [
  {
    name: "Growth",
    price: "$2,500/mo",
    description: "For emerging staffing teams launching embedded mobility workflows.",
    features: ["Up to 15 recruiter seats", "Offer Boost AI", "Booking request workflows", "Standard support"]
  },
  {
    name: "Scale",
    price: "$5,500/mo",
    description: "For high-volume agencies optimizing acceptance, readiness, and retention.",
    features: [
      "Up to 50 seats",
      "Retention Risk AI + Assignment Readiness AI",
      "Concierge board",
      "MSP reporting exports",
      "Priority support"
    ]
  },
  {
    name: "Orbit Enterprise",
    price: "Custom",
    description: "For MSP networks and enterprise suppliers with multi-region operations.",
    features: [
      "Unlimited seats",
      "Custom integrations",
      "Dedicated success architect",
      "SLA-backed support",
      "White-labeled executive reporting"
    ]
  }
];

export const pageContent: Record<string, { title: string; subtitle: string; bullets: string[] }> = {
  platform: {
    title: "TRITAL Orbit Platform",
    subtitle: "One mobility operating layer from offer creation to first day on assignment.",
    bullets: [
      "Offer intelligence + concierge support + readiness tracking in one workflow.",
      "Role-specific dashboards for agency leaders, recruiters, concierge teams, vendors, and MSP stakeholders.",
      "Production-grade APIs and automation events for enterprise operations."
    ]
  },
  agencies: {
    title: "Solutions for Staffing Agencies",
    subtitle: "Win clinicians and protect margin without increasing bill rates.",
    bullets: [
      "Differentiate offers through lifestyle certainty and mobility support.",
      "Detect and reduce backout risk before assignment start.",
      "Give recruiters AI-ready messaging and close strategies."
    ]
  },
  msps: {
    title: "Solutions for MSPs",
    subtitle: "Improve supplier performance with measurable readiness and retention outcomes.",
    bullets: [
      "Standardized metrics across acceptance, readiness, backout rate, and first-day show-up.",
      "AI-generated executive summaries for faster stakeholder alignment.",
      "Transparent supplier benchmarking with mobility utilization context."
    ]
  },
  clinicians: {
    title: "Solutions for Clinicians",
    subtitle: "Every assignment becomes a better life decision, not just a better weekly number.",
    bullets: [
      "Access travel, housing, and transportation support directly from your offer.",
      "Get concierge guidance from acceptance to first-day readiness.",
      "Improve confidence with transparent assignment logistics."
    ]
  },
  offerBoost: {
    title: "Offer Boost Builder",
    subtitle: "Generate compelling, high-confidence offers with mobility value embedded.",
    bullets: [
      "AI-enhanced positioning and messaging outputs for recruiters.",
      "Candidate-facing value statement, SMS pitch, and email pitch.",
      "Shareable candidate offer links with tracked engagement events."
    ]
  },
  assignmentLaunch: {
    title: "Assignment Launch Dashboard",
    subtitle: "Operational command center for offer-accepted to day-one readiness.",
    bullets: [
      "Track housing, travel, documents, and readiness score in one view.",
      "Flag blockers with AI suggested actions.",
      "Export readiness reports for leadership and clients."
    ]
  },
  retentionRisk: {
    title: "Retention Risk AI",
    subtitle: "Predict backout risk and intervene early with precision guidance.",
    bullets: [
      "0-100 risk scoring with confidence labels and reasoning.",
      "Suggested recruiter SMS and call scripts generated automatically.",
      "Real-time triggers from engagement, logistics, and timeline signals."
    ]
  },
  concierge: {
    title: "Mobility Concierge",
    subtitle: "A task-driven concierge operation designed for assignment success.",
    bullets: [
      "Unified queue for housing, travel, and transportation requests.",
      "Status-based service board with ownership and due dates.",
      "AI summaries and candidate update recommendations."
    ]
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "TRITAL Orbit privacy posture and data handling commitments.",
    bullets: [
      "Data minimization and role-based access control by design.",
      "Enterprise-friendly audit logs and access governance.",
      "Security controls aligned with healthcare staffing workflows."
    ]
  },
  terms: {
    title: "Terms of Service",
    subtitle: "Commercial and usage terms for TRITAL Orbit platform services.",
    bullets: [
      "Service obligations for platform uptime, support, and usage rights.",
      "Customer responsibilities for lawful and compliant usage.",
      "Billing and subscription governance structure."
    ]
  }
};
