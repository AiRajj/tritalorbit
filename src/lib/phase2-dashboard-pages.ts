type PhasePage = {
  label: string;
  title: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
  workflows: string[];
  actions?: Array<{ label: string; href: string }>;
};

export const candidatePhase2Pages: Record<string, PhasePage> = {
  "mobility-request/create": {
    label: "Live Mobility Exchange™",
    title: "Create an assignment-based mobility request",
    description:
      "Capture travel, housing, hotel, and relocation needs so verified vendors can bid against the assignment timeline.",
    stats: [
      { label: "Open request SLA", value: "<15 min" },
      { label: "Avg savings", value: "$312" }
    ],
    workflows: ["Submit request", "Receive shortlisted bids", "Accept best-value option"],
    actions: [{ label: "View my bids", href: "/candidate/mobility-bids" }]
  },
  "mobility-bids": {
    label: "Mobility Bids",
    title: "Compare vendor bids with confidence scoring",
    description: "Evaluate cheapest, fastest, best-value, and concierge-recommended options in one view.",
    stats: [
      { label: "Active bids", value: "14" },
      { label: "Best value confidence", value: "92%" }
    ],
    workflows: ["Compare price and risk", "Ask vendor questions", "Accept or request repricing"]
  },
  "mobility-bookings": {
    label: "Mobility Bookings",
    title: "Track bookings through day-one readiness",
    description: "Monitor payment responsibility, confirmation status, and booking support tasks.",
    stats: [
      { label: "Confirmed", value: "9" },
      { label: "Pending payment", value: "3" }
    ],
    workflows: ["Confirm booking details", "Resolve disputes if needed", "Share itinerary with recruiter"]
  },
  "first-week": {
    label: "First Week Survival Mode™",
    title: "Your day-one readiness command center",
    description: "Receive facility guidance, checklist reminders, and local essentials before assignment start.",
    stats: [
      { label: "Confidence score", value: "88/100" },
      { label: "Checklist completion", value: "76%" }
    ],
    workflows: ["Review route and parking", "Confirm housing check-in", "Complete arrival checklist"]
  },
  "relocation-assistant": {
    label: "AI Relocation Assistant™",
    title: "Personalized relocation planning",
    description:
      "Get timeline planning, packing guidance, weather prep, and mobility risk mitigation for your next start.",
    stats: [
      { label: "Plan quality", value: "Premium" },
      { label: "Risks mitigated", value: "5" }
    ],
    workflows: ["Input move context", "Generate relocation plan", "Track next-best-actions"]
  },
  "orbit-plus": {
    label: "Orbit Plus™",
    title: "Upgrade for priority mobility support",
    description: "Activate premium bidding visibility, concierge priority, and rewards multipliers.",
    stats: [
      { label: "Monthly", value: "$14.99" },
      { label: "Annual", value: "$149" }
    ],
    workflows: ["Choose plan", "Confirm subscription", "Receive Orbit Plus status badge"],
    actions: [{ label: "View clinician pricing", href: "/pricing/clinicians" }]
  },
  "wallet/transactions": {
    label: "TRITAL Wallet™",
    title: "Transaction history and credit activity",
    description: "View credits, redemptions, refunds, and mobility-linked transactions for each assignment.",
    stats: [
      { label: "Transactions", value: "42" },
      { label: "Credits remaining", value: "$640" }
    ],
    workflows: ["Inspect ledger history", "Track expiring credits", "Download reimbursement summary"]
  },
  "wallet/redeem": {
    label: "Wallet Redemption",
    title: "Redeem sponsored credits against accepted bids",
    description: "Apply partial or full agency-sponsored credits to reduce out-of-pocket booking costs.",
    stats: [
      { label: "Redeemable credits", value: "$420" },
      { label: "Expiring in 7 days", value: "$120" }
    ],
    workflows: ["Select booking", "Apply credit amount", "Confirm redemption"]
  },
  "rewards/history": {
    label: "Orbit Rewards™",
    title: "Reward transaction history",
    description: "Review points earned from assignment completion, readiness actions, and referrals.",
    stats: [
      { label: "Lifetime points", value: "12,540" },
      { label: "Current tier", value: "Gold" }
    ],
    workflows: ["Audit points events", "View tier progression", "Redeem available rewards"]
  },
  referrals: {
    label: "Clinician Referrals",
    title: "Refer peers and accelerate rewards",
    description: "Invite clinicians and earn Orbit rewards when referred peers accept assignments.",
    stats: [
      { label: "Referral code use", value: "18" },
      { label: "Referral points", value: "3,600" }
    ],
    workflows: ["Share referral link", "Track conversions", "Collect reward bonuses"]
  }
};

export const agencyPhase2Pages: Record<string, PhasePage> = {
  mobility: {
    label: "Agency Mobility Exchange",
    title: "Assignment-level mobility command center",
    description: "Manage candidate requests, approve bids, sponsor credits, and unblock readiness friction.",
    stats: [
      { label: "Open mobility risks", value: "18" },
      { label: "Agency-sponsored credits", value: "$8.2k" }
    ],
    workflows: ["Triage requests", "Approve vendor bids", "Track unresolved readiness blockers"]
  },
  "offer-war-room": {
    label: "Offer War Room™",
    title: "Rescue high-risk offers with AI-guided actions",
    description:
      "Monitor engagement, close probability, and mobility friction across the entire offer pipeline.",
    stats: [
      { label: "At-risk offers", value: "11" },
      { label: "Save strategy lift", value: "+17%" }
    ],
    workflows: ["Review risk heatmap", "Send guided outreach", "Mark actions complete"]
  },
  "first-week-readiness": {
    label: "First Week Readiness",
    title: "Reduce early assignment failures",
    description: "Track checklist completion and alert recruiters when first-week readiness drops.",
    stats: [
      { label: "Ready in next 7 days", value: "34" },
      { label: "High-risk starts", value: "6" }
    ],
    workflows: ["Monitor checklist status", "Escalate blockers", "Trigger concierge intervention"]
  },
  "relocation-insights": {
    label: "Relocation Insights",
    title: "Relocation readiness analytics for recruiter teams",
    description:
      "Understand move complexity, timeline confidence, and housing/travel blockers by assignment cohort.",
    stats: [
      { label: "Plans generated", value: "128" },
      { label: "On-time relocation", value: "91%" }
    ],
    workflows: ["Review risk patterns", "Sponsor targeted credits", "Action AI recommendations"]
  },
  "offer-intelligence/compare": {
    label: "Offer Intelligence",
    title: "Compare internal and external offers",
    description: "Recruiter view for multi-offer lifecycle value scoring and candidate save strategy generation.",
    stats: [
      { label: "Active comparisons", value: "22" },
      { label: "Recovered candidates", value: "9" }
    ],
    workflows: ["Capture external offers", "Generate AI comparison", "Launch targeted save plan"]
  },
  "wallet/fund": {
    label: "Agency Wallet",
    title: "Fund mobility credits for assignment readiness",
    description: "Add budget to agency wallet and allocate targeted credits to candidate assignments.",
    stats: [
      { label: "Available balance", value: "$24,600" },
      { label: "Credits allocated", value: "$8,200" }
    ],
    workflows: ["Add funding source", "Allocate credits", "Track usage and ROI"]
  },
  "wallet/credits": {
    label: "Wallet Credits",
    title: "Manage credit sponsorship by assignment",
    description: "Track active, partial, used, and expiring credits with recruiter-level accountability.",
    stats: [
      { label: "Active credits", value: "37" },
      { label: "Expiring soon", value: "5" }
    ],
    workflows: ["Review allocation", "Adjust credits", "Remind recruiters on unused funds"]
  },
  "wallet/usage": {
    label: "Wallet Usage",
    title: "Usage analytics and savings outcomes",
    description: "Measure how sponsored credits improve acceptance and reduce readiness friction.",
    stats: [
      { label: "Usage rate", value: "82%" },
      { label: "Savings generated", value: "$14.2k" }
    ],
    workflows: ["Analyze adoption", "Link to offer outcomes", "Optimize credit strategy"]
  }
};

export const vendorPhase2Pages: Record<string, PhasePage> = {
  "bid-center": {
    label: "Vendor Bid Center",
    title: "Bid on verified assignment demand",
    description: "Submit structured bids, track win-rate, and manage payout-ready bookings.",
    stats: [
      { label: "Open requests", value: "47" },
      { label: "Win rate", value: "28%" }
    ],
    workflows: ["Review request context", "Submit bid package", "Track shortlist and acceptance"]
  },
  "travel-agency/dashboard": {
    label: "Travel Agency Portal",
    title: "Partner dashboard for assignment-verified travel demand",
    description: "Manage bids, analytics, payout records, and API settings.",
    stats: [
      { label: "Monthly bids used", value: "42/100" },
      { label: "Chargeback risk", value: "Low" }
    ],
    workflows: ["Optimize bid response time", "Track conversion", "Monitor payout cycles"]
  },
  "housing/dashboard": {
    label: "Housing Partner Portal",
    title: "Assignment-ready listing operations",
    description: "Publish furnished inventory, receive assignment-matched inquiries, and manage lead quality.",
    stats: [
      { label: "Active listings", value: "19" },
      { label: "Inquiry response", value: "96%" }
    ],
    workflows: ["Publish listing", "Respond to inquiries", "Maintain verification quality score"]
  }
};

export const adminPhase2Pages: Record<string, PhasePage> = {
  "mobility-exchange": {
    label: "Admin Mobility Exchange",
    title: "Platform-level exchange operations",
    description: "Monitor request volume, bid quality, suspicious behavior, and dispute frequency.",
    stats: [
      { label: "Daily GMV", value: "$126k" },
      { label: "Suspicious events", value: "2" }
    ],
    workflows: ["Review bid anomalies", "Approve vendor accounts", "Resolve escalated disputes"]
  },
  "bid-monitoring": {
    label: "Bid Monitoring",
    title: "Detect pricing anomalies and risk patterns",
    description: "Track outlier bids, expiration rates, and integrity signals across vendor cohorts.",
    stats: [
      { label: "Outlier bids", value: "7" },
      { label: "Median response time", value: "12m" }
    ],
    workflows: ["Flag anomalies", "Notify compliance ops", "Apply enforcement actions"]
  },
  "mobility-bookings": {
    label: "Mobility Bookings",
    title: "Payment and booking governance",
    description: "Track booking lifecycle states, payment responsibility, and refund/dispute exposure.",
    stats: [
      { label: "In progress", value: "84" },
      { label: "Disputed", value: "5" }
    ],
    workflows: ["Review booking health", "Approve refunds", "Coordinate vendor payout holds"]
  },
  "dispute-center": {
    label: "Dispute Center",
    title: "Investigate and resolve marketplace disputes",
    description: "Centralized workflow for triage, evidence review, and final resolution outcomes.",
    stats: [
      { label: "Open disputes", value: "12" },
      { label: "Median resolution", value: "2.1 days" }
    ],
    workflows: ["Receive dispute", "Assign reviewer", "Publish resolution and audit trail"]
  },
  "vendor-verification": {
    label: "Vendor Verification",
    title: "Verification operations and compliance",
    description: "Review partner documentation and verification statuses across vendor categories.",
    stats: [
      { label: "Pending review", value: "23" },
      { label: "Approval rate", value: "88%" }
    ],
    workflows: ["Review documents", "Approve/reject status", "Trigger re-verification checks"]
  },
  disputes: {
    label: "Disputes",
    title: "Dispute queue and resolution tracking",
    description: "Analyze dispute root causes and lifecycle outcomes across marketplace operations.",
    stats: [
      { label: "Resolved this month", value: "44" },
      { label: "Escalation rate", value: "4%" }
    ],
    workflows: ["View dispute backlog", "Segment by type", "Track SLA adherence"]
  },
  wallet: {
    label: "Wallet Admin",
    title: "Financial oversight for sponsored credits",
    description: "Track wallet balances, credit issuance, and transaction integrity across users.",
    stats: [
      { label: "Wallet volume", value: "$1.4M" },
      { label: "Active credits", value: "326" }
    ],
    workflows: ["Review funding events", "Inspect ledger health", "Monitor unused-credit alerts"]
  },
  payments: {
    label: "Payments",
    title: "Payment processing operations",
    description: "Visibility into funding attempts, settlement status, and payout reconciliation.",
    stats: [
      { label: "Settled today", value: "$218k" },
      { label: "Failures", value: "1.1%" }
    ],
    workflows: ["Track payment events", "Retry failures", "Export finance reports"]
  },
  "vendor-payouts": {
    label: "Vendor Payouts",
    title: "Payout readiness and disbursement monitoring",
    description: "Manage payout queues for completed and verified bookings.",
    stats: [
      { label: "Ready to disburse", value: "$72k" },
      { label: "Held for review", value: "$4.8k" }
    ],
    workflows: ["Review payout eligibility", "Resolve holds", "Mark disbursement status"]
  },
  rewards: {
    label: "Rewards Admin",
    title: "Orbit Rewards rule and health monitoring",
    description: "Manage reward rules, tier progression behavior, and redemption review operations.",
    stats: [
      { label: "Points issued", value: "2.1M" },
      { label: "Pending redemptions", value: "27" }
    ],
    workflows: ["Adjust reward rules", "Review redemption queue", "Audit rewards integrity"]
  }
};

export const mspPhase2Pages: Record<string, PhasePage> = {
  roi: {
    label: "MSP Executive ROI Dashboard",
    title: "Board-level visibility into readiness and savings",
    description: "Track supplier outcomes and mobility effectiveness across workforce programs.",
    stats: [
      { label: "Offer acceptance", value: "73%" },
      { label: "Prevented backouts", value: "64" },
      { label: "Time-to-ready", value: "6.2d" }
    ],
    workflows: ["Filter by supplier", "Generate AI summary", "Export executive report"]
  },
  "supplier-performance": {
    label: "Supplier Performance",
    title: "Rank suppliers by readiness and outcomes",
    description: "Evaluate acceptance lift, booking completion, and quality trends across agencies.",
    stats: [
      { label: "Top supplier score", value: "94" },
      { label: "Low-performer alerts", value: "3" }
    ],
    workflows: ["Compare suppliers", "Investigate outliers", "Share remediation actions"]
  },
  "mobility-utilization": {
    label: "Mobility Utilization",
    title: "Adoption and usage of mobility infrastructure",
    description: "Understand wallet usage, request volume, and booking behavior by market.",
    stats: [
      { label: "Utilization rate", value: "81%" },
      { label: "Avg credits used", value: "$282" }
    ],
    workflows: ["Review utilization trend", "Drill into agencies", "Spot untapped capacity"]
  },
  "executive-report": {
    label: "Executive Report",
    title: "Generate board-ready operational reports",
    description: "Produce concise performance narratives with key metrics and AI analysis.",
    stats: [
      { label: "Report cadence", value: "Weekly" },
      { label: "Export formats", value: "PDF / CSV" }
    ],
    workflows: ["Choose date range", "Generate summary", "Download report artifacts"]
  }
};
