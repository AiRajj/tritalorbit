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
  Gavel,
  Compass
} from "lucide-react";

export const marketingNav = [
  { label: "Platform", href: "/platform" },
  { label: "Mobility Exchange", href: "/mobility-exchange" },
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
    { label: "Vendors", href: "/admin/vendors", icon: Building2 },
    { label: "Mobility Exchange", href: "/admin/mobility-exchange", icon: Gavel }
  ],
  agency: [
    { label: "Overview", href: "/agency", icon: LayoutDashboard },
    { label: "Create Offer", href: "/agency/offers/create", icon: BriefcaseMedical },
    { label: "Booking Requests", href: "/agency/booking-requests", icon: ClipboardList },
    { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Plane },
    { label: "Mobility Exchange", href: "/agency/mobility", icon: Gavel },
    { label: "Vendors", href: "/agency/vendors", icon: Building2 }
  ],
  recruiter: [
    { label: "Recruiter Hub", href: "/recruiter", icon: Users },
    { label: "Create Offer", href: "/agency/offers/create", icon: BriefcaseMedical },
    { label: "Mobility Exchange", href: "/agency/mobility", icon: Gavel }
  ],
  candidate: [
    { label: "Candidate Dashboard", href: "/candidate", icon: Home },
    { label: "Travel Marketplace", href: "/candidate/travel-marketplace", icon: Compass },
    { label: "Housing", href: "/candidate/housing", icon: Hotel }
  ],
  concierge: [
    { label: "Concierge Requests", href: "/concierge/requests", icon: LifeBuoy },
    { label: "Mobility Exchange", href: "/agency/mobility", icon: Gavel }
  ],
  vendor: [
    { label: "Vendor Dashboard", href: "/vendor/dashboard", icon: Building2 },
    { label: "Bid Center", href: "/vendor/bid-center", icon: Gavel }
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
  },
  {
    title: "Live Mobility Exchange™",
    href: "/mobility-exchange",
    icon: Gavel,
    description: "Verified travel, housing, car rental, and hotel partners competing for every assignment booking."
  }
];
