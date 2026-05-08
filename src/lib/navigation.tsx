import {
  Building2,
  ClipboardCheck,
  FileBarChart2,
  HandHelping,
  Home,
  LayoutDashboard,
  Shield,
  UserRound,
  Users,
} from "lucide-react";

export const adminLinks = [
  { href: "/admin", label: "Control Center", icon: <Shield className="h-4 w-4" /> },
  { href: "/admin/vendors", label: "Vendor Approvals", icon: <Building2 className="h-4 w-4" /> },
  { href: "/msp", label: "MSP Reports", icon: <FileBarChart2 className="h-4 w-4" /> },
];

export const agencyLinks = [
  { href: "/agency", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/agency/offers/create", label: "Create Offer", icon: <ClipboardCheck className="h-4 w-4" /> },
  { href: "/agency/booking-requests", label: "Booking Requests", icon: <HandHelping className="h-4 w-4" /> },
  { href: "/agency/assignment-launch", label: "Assignment Launch", icon: <FileBarChart2 className="h-4 w-4" /> },
  { href: "/agency/vendors", label: "Vendors", icon: <Building2 className="h-4 w-4" /> },
];

export const recruiterLinks = [
  { href: "/recruiter", label: "Recruiter Home", icon: <Home className="h-4 w-4" /> },
  ...agencyLinks.slice(1),
];

export const candidateLinks = [
  { href: "/candidate", label: "Assignment Hub", icon: <UserRound className="h-4 w-4" /> },
  { href: "/candidate/housing", label: "Housing Marketplace", icon: <Building2 className="h-4 w-4" /> },
];

export const conciergeLinks = [
  { href: "/concierge", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: "/concierge/requests", label: "Task Board", icon: <HandHelping className="h-4 w-4" /> },
];

export const vendorLinks = [
  { href: "/vendor", label: "Vendor Home", icon: <Building2 className="h-4 w-4" /> },
  { href: "/vendor/dashboard", label: "Listings Dashboard", icon: <Users className="h-4 w-4" /> },
];

export const mspLinks = [
  { href: "/msp", label: "MSP Dashboard", icon: <FileBarChart2 className="h-4 w-4" /> },
];
