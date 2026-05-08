import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  CalendarCheck2,
  Compass,
  CreditCard,
  FileText,
  Gauge,
  Home,
  KanbanSquare,
  LayoutDashboard,
  Megaphone,
  Plane,
  Radar,
  Settings,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  UserCog,
  Wallet,
  Wand2,
} from "lucide-react";
import type { UserRole } from "@prisma/client";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const NAV_BY_ROLE: Record<UserRole, NavGroup[]> = {
  AGENCY_OWNER: [
    {
      items: [
        { label: "Overview", href: "/agency", icon: LayoutDashboard },
        { label: "Offers", href: "/agency/offers", icon: Sparkles },
        { label: "Create Offer", href: "/agency/offers/create", icon: Wand2 },
      ],
    },
    {
      label: "Operations",
      items: [
        { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Gauge },
        { label: "Booking Requests", href: "/agency/booking-requests", icon: KanbanSquare },
        { label: "Vendors & Housing", href: "/agency/vendors", icon: Building2 },
      ],
    },
    {
      label: "Insights",
      items: [
        { label: "MSP Reporting", href: "/msp", icon: BarChart3 },
        { label: "Activity", href: "/agency/activity", icon: Bell },
      ],
    },
    {
      label: "Account",
      items: [
        { label: "Billing", href: "/agency/billing", icon: CreditCard },
        { label: "Settings", href: "/agency/settings", icon: Settings },
      ],
    },
  ],
  RECRUITER: [
    {
      items: [
        { label: "Overview", href: "/recruiter", icon: LayoutDashboard },
        { label: "Offers", href: "/agency/offers", icon: Sparkles },
        { label: "Create Offer", href: "/agency/offers/create", icon: Wand2 },
        { label: "Risk Pipeline", href: "/recruiter/risk", icon: Radar },
      ],
    },
    {
      label: "Tools",
      items: [
        { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Gauge },
        { label: "Booking Requests", href: "/agency/booking-requests", icon: KanbanSquare },
      ],
    },
  ],
  CONCIERGE_MANAGER: [
    {
      items: [
        { label: "Task Board", href: "/concierge", icon: KanbanSquare },
        { label: "Booking Requests", href: "/concierge/requests", icon: Compass },
        { label: "Vendors & Housing", href: "/agency/vendors", icon: Building2 },
      ],
    },
  ],
  CANDIDATE: [
    {
      items: [
        { label: "My Hub", href: "/candidate", icon: LayoutDashboard },
        { label: "Assignments", href: "/candidate/assignments", icon: Briefcase },
        { label: "Housing", href: "/candidate/housing", icon: Home },
        { label: "Travel", href: "/candidate/travel", icon: Plane },
        { label: "Documents", href: "/candidate/documents", icon: FileText },
      ],
    },
  ],
  VENDOR: [
    {
      items: [
        { label: "Vendor Hub", href: "/vendor", icon: LayoutDashboard },
        { label: "Listings", href: "/vendor/listings", icon: Home },
        { label: "Requests", href: "/vendor/requests", icon: Bell },
      ],
    },
  ],
  LANDLORD: [
    {
      items: [
        { label: "Landlord Hub", href: "/vendor", icon: LayoutDashboard },
        { label: "Properties", href: "/vendor/listings", icon: Home },
        { label: "Requests", href: "/vendor/requests", icon: Bell },
      ],
    },
  ],
  MSP_VIEWER: [
    {
      items: [
        { label: "MSP Reports", href: "/msp", icon: BarChart3 },
        { label: "Suppliers", href: "/msp/suppliers", icon: Briefcase },
      ],
    },
  ],
  SUPER_ADMIN: [
    {
      items: [
        { label: "Control Center", href: "/admin", icon: LayoutDashboard },
        { label: "Agencies", href: "/admin/agencies", icon: Building2 },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Vendors", href: "/admin/vendors", icon: Briefcase },
      ],
    },
    {
      label: "Platform",
      items: [
        { label: "Subscriptions", href: "/admin/subscriptions", icon: Wallet },
        { label: "AI Usage", href: "/admin/ai-usage", icon: Sparkles },
        { label: "Audit Log", href: "/admin/audit", icon: ShieldCheck },
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ],
};

export const ROLE_HOMES: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR: "/vendor",
  LANDLORD: "/vendor",
};
