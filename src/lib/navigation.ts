import {
  Home,
  LayoutDashboard,
  Brain,
  BriefcaseMedical,
  Building2,
  Users,
  FileText,
  LifeBuoy,
  Shield,
  Hotel,
  Car,
  Plane,
  ClipboardList,
  PlaneTakeoff,
  WalletCards,
  GitCompareArrows,
  Medal,
  Sparkles,
  Radar,
  BarChart3
} from "lucide-react";

export const marketingNav = [
  { label: "Mobility Cloud", href: "/healthcare-workforce-mobility-cloud" },
  { label: "Exchange", href: "/mobility-exchange" },
  { label: "Solutions", href: "/solutions/health-systems" },
  { label: "Partners", href: "/partners" },
  { label: "Trust", href: "/trust" },
  { label: "Pricing", href: "/pricing/agencies" },
  { label: "Demo", href: "/demo/live-platform" }
];

export const roleSidebar = {
  admin: [
    { label: "Control Center", href: "/admin", icon: Shield },
    { label: "Mobility Exchange", href: "/admin/mobility-exchange", icon: PlaneTakeoff },
    { label: "Dispute Center", href: "/admin/disputes", icon: LifeBuoy },
    { label: "Vendor Verification", href: "/admin/vendor-verification", icon: Shield },
    { label: "Wallet Ops", href: "/admin/wallet", icon: WalletCards },
    { label: "Vendors", href: "/admin/vendors", icon: Building2 }
  ],
  agency: [
    { label: "Overview", href: "/agency", icon: LayoutDashboard },
    { label: "Create Offer", href: "/agency/offers/create", icon: BriefcaseMedical },
    { label: "Booking Requests", href: "/agency/booking-requests", icon: ClipboardList },
    { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Plane },
    { label: "Travel Support", href: "/agency/travel-support", icon: PlaneTakeoff },
    { label: "Mobility Exchange", href: "/agency/mobility", icon: PlaneTakeoff },
    { label: "Offer War Room", href: "/agency/offer-war-room", icon: Radar },
    { label: "First Week Readiness", href: "/agency/first-week-readiness", icon: ClipboardList },
    { label: "Relocation Insights", href: "/agency/relocation-insights", icon: Sparkles },
    { label: "Agency Wallet", href: "/agency/wallet", icon: WalletCards },
    { label: "Rewards Ops", href: "/agency/rewards", icon: Medal },
    { label: "Vendors", href: "/agency/vendors", icon: Building2 }
  ],
  recruiter: [
    { label: "Recruiter Hub", href: "/recruiter", icon: Users },
    { label: "Create Offer", href: "/agency/offers/create", icon: BriefcaseMedical }
  ],
  candidate: [
    { label: "Candidate Dashboard", href: "/candidate", icon: Home },
    { label: "Compare Offers", href: "/candidate/compare-offers", icon: GitCompareArrows },
    { label: "Orbit Rewards", href: "/candidate/rewards", icon: Medal },
    { label: "Travel Marketplace", href: "/candidate/travel-marketplace", icon: PlaneTakeoff },
    { label: "First Week", href: "/candidate/first-week", icon: ClipboardList },
    { label: "Relocation AI", href: "/candidate/relocation-assistant", icon: Sparkles },
    { label: "Orbit Plus", href: "/candidate/orbit-plus", icon: Medal },
    { label: "Wallet", href: "/candidate/wallet", icon: WalletCards },
    { label: "Housing", href: "/candidate/housing", icon: Hotel }
  ],
  concierge: [{ label: "Concierge Requests", href: "/concierge/requests", icon: LifeBuoy }],
  vendor: [
    { label: "Vendor Dashboard", href: "/vendor/dashboard", icon: Building2 },
    { label: "Bid Center", href: "/vendor/bid-center", icon: PlaneTakeoff },
    { label: "Travel Agency", href: "/vendor/travel-agency/dashboard", icon: PlaneTakeoff },
    { label: "Housing Portal", href: "/vendor/housing/dashboard", icon: Hotel }
  ],
  msp: [
    { label: "MSP Reporting", href: "/msp", icon: FileText },
    { label: "Executive ROI", href: "/msp/roi", icon: BarChart3 }
  ]
};

export const featureHighlights = [
  {
    title: "Offer Boost Builder",
    href: "/features/offer-boost-builder",
    icon: Brain,
    description: "AI-crafted offer positioning that raises acceptance confidence without inflating rates."
  },
  {
    title: "Assignment Launch Dashboard",
    href: "/features/assignment-launch-dashboard",
    icon: Plane,
    description: "Readiness tracking for housing, travel, documents, and first-week execution."
  },
  {
    title: "Retention Risk AI",
    href: "/features/retention-risk-ai",
    icon: Brain,
    description: "Real-time backout risk scoring with recommended recruiter actions."
  },
  {
    title: "Mobility Concierge",
    href: "/features/mobility-concierge",
    icon: Car,
    description: "Embedded housing, travel, and transportation support inside every assignment workflow."
  }
];
