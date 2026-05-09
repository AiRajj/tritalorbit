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
  WalletCards
} from "lucide-react";

export const marketingNav = [
  { label: "Platform", href: "/platform" },
  { label: "Agencies", href: "/solutions/agencies" },
  { label: "MSPs", href: "/solutions/msps" },
  { label: "Clinicians", href: "/solutions/clinicians" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Contact", href: "/contact" }
];

export const roleSidebar = {
  admin: [
    { label: "Control Center", href: "/admin", icon: Shield },
    { label: "Vendors", href: "/admin/vendors", icon: Building2 }
  ],
  agency: [
    { label: "Overview", href: "/agency", icon: LayoutDashboard },
    { label: "Create Offer", href: "/agency/offers/create", icon: BriefcaseMedical },
    { label: "Booking Requests", href: "/agency/booking-requests", icon: ClipboardList },
    { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Plane },
    { label: "Travel Support", href: "/agency/travel-support", icon: PlaneTakeoff },
    { label: "Agency Wallet", href: "/agency/wallet", icon: WalletCards },
    { label: "Vendors", href: "/agency/vendors", icon: Building2 }
  ],
  recruiter: [
    { label: "Recruiter Hub", href: "/recruiter", icon: Users },
    { label: "Create Offer", href: "/agency/offers/create", icon: BriefcaseMedical }
  ],
  candidate: [
    { label: "Candidate Dashboard", href: "/candidate", icon: Home },
    { label: "Travel Marketplace", href: "/candidate/travel-marketplace", icon: PlaneTakeoff },
    { label: "Wallet", href: "/candidate/wallet", icon: WalletCards },
    { label: "Housing", href: "/candidate/housing", icon: Hotel }
  ],
  concierge: [{ label: "Concierge Requests", href: "/concierge/requests", icon: LifeBuoy }],
  vendor: [
    { label: "Vendor Dashboard", href: "/vendor/dashboard", icon: Building2 },
    { label: "Travel Agency", href: "/vendor/travel-agency", icon: PlaneTakeoff }
  ],
  msp: [{ label: "MSP Reporting", href: "/msp", icon: FileText }]
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
