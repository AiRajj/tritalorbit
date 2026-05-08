import {
  LayoutDashboard,
  Users,
  Send,
  ClipboardCheck,
  BarChart3,
  Settings,
  Building2,
  UserPlus,
  CalendarDays,
  ShieldCheck,
  Bot,
  Bell,
  TrendingUp,
  Heart,
  Briefcase,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
  roles?: string[]
  children?: NavItem[]
}

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Candidates",
    href: "/dashboard/candidates",
    icon: Users,
    roles: ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Offers",
    href: "/dashboard/offers",
    icon: Send,
    roles: ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Assignments",
    href: "/dashboard/assignments",
    icon: ClipboardCheck,
    roles: ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Booking Requests",
    href: "/dashboard/bookings",
    icon: CalendarDays,
    roles: ["ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Leads",
    href: "/dashboard/leads",
    icon: UserPlus,
    roles: ["ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: Building2,
    roles: ["ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    roles: ["MSP_ADMIN", "ADMIN"],
  },
  {
    title: "AI Agents",
    href: "/dashboard/ai-agents",
    icon: Bot,
    roles: ["RECRUITER", "ACCOUNT_MANAGER", "MSP_ADMIN", "ADMIN"],
  },
]

export const adminNavItems: NavItem[] = [
  {
    title: "User Management",
    href: "/admin/users",
    icon: ShieldCheck,
    roles: ["ADMIN"],
  },
  {
    title: "Organizations",
    href: "/admin/organizations",
    icon: Building2,
    roles: ["ADMIN"],
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["ADMIN"],
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    roles: ["ADMIN", "MSP_ADMIN"],
  },
]

export const roleConfigs: Record<string, { label: string; description: string; color: string }> = {
  RECRUITER: {
    label: "Recruiter",
    description: "Manage candidates, send offers, track assignments",
    color: "text-blue-600 bg-blue-50",
  },
  ACCOUNT_MANAGER: {
    label: "Account Manager",
    description: "Manage clients, leads, booking requests, and oversee recruiters",
    color: "text-purple-600 bg-purple-50",
  },
  MSP_ADMIN: {
    label: "MSP Admin",
    description: "Full MSP management with reporting and analytics",
    color: "text-amber-600 bg-amber-50",
  },
  ADMIN: {
    label: "System Admin",
    description: "Full platform access including system configuration",
    color: "text-red-600 bg-red-50",
  },
}

export const features = [
  {
    title: "Offer Boost AI",
    description: "AI-powered offer optimization that increases acceptance rates by up to 35%",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Retention Radar",
    description: "Predictive analytics to identify at-risk placements before they fall through",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Readiness Engine",
    description: "Automated compliance and onboarding readiness tracking for every assignment",
    icon: ClipboardCheck,
    color: "text-emerald-600",
  },
  {
    title: "Concierge Agent",
    description: "24/7 AI assistant handling candidate questions, housing, and travel logistics",
    icon: Bot,
    color: "text-purple-600",
  },
  {
    title: "Smart Booking",
    description: "Intelligent booking request management with auto-matching and conflict detection",
    icon: CalendarDays,
    color: "text-amber-600",
  },
  {
    title: "MSP Command Center",
    description: "Executive dashboards and automated reporting for managed service providers",
    icon: Briefcase,
    color: "text-indigo-600",
  },
]

export const pricingPlans = [
  {
    name: "Starter",
    price: 299,
    period: "per month",
    description: "Perfect for small agencies getting started with travel healthcare staffing",
    features: [
      "Up to 50 active candidates",
      "Offer management & tracking",
      "Basic compliance checklists",
      "Email notifications",
      "Standard support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: 799,
    period: "per month",
    description: "For growing agencies that need AI-powered tools and automation",
    features: [
      "Up to 500 active candidates",
      "All Starter features",
      "Offer Boost AI",
      "Retention Radar",
      "Readiness Engine",
      "Concierge Agent",
      "Priority support",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: null,
    period: null,
    description: "For large agencies and MSPs requiring full platform capabilities",
    features: [
      "Unlimited candidates",
      "All Professional features",
      "MSP Command Center",
      "Custom integrations",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom reporting",
      "SLA guarantee",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

export const SPECIALTIES = [
  { value: "RN", label: "Registered Nurse (RN)" },
  { value: "LPN", label: "Licensed Practical Nurse (LPN)" },
  { value: "CNA", label: "Certified Nursing Assistant (CNA)" },
  { value: "NP", label: "Nurse Practitioner (NP)" },
  { value: "CRNA", label: "Certified Registered Nurse Anesthetist (CRNA)" },
  { value: "PA", label: "Physician Assistant (PA)" },
  { value: "RT", label: "Respiratory Therapist (RT)" },
  { value: "PT", label: "Physical Therapist (PT)" },
  { value: "OT", label: "Occupational Therapist (OT)" },
  { value: "SLP", label: "Speech-Language Pathologist (SLP)" },
  { value: "MLT", label: "Medical Lab Technician (MLT)" },
  { value: "RAD_TECH", label: "Radiologic Technologist" },
  { value: "PHARM", label: "Pharmacist" },
  { value: "OR_TECH", label: "OR Technician" },
  { value: "CVOR", label: "CVOR Technician" },
  { value: "ER_RN", label: "Emergency Room RN" },
  { value: "ICU_RN", label: "ICU RN" },
  { value: "L_AND_D_RN", label: "Labor & Delivery RN" },
  { value: "PACU_RN", label: "PACU RN" },
  { value: "TELE_RN", label: "Telemetry RN" },
  { value: "MED_SURG_RN", label: "Med/Surg RN" },
  { value: "NICU_RN", label: "NICU RN" },
  { value: "PEDS_RN", label: "Pediatric RN" },
  { value: "PSYCH_RN", label: "Psychiatric RN" },
  { value: "HOME_HEALTH_RN", label: "Home Health RN" },
]

export const SHIFT_TYPES = [
  { value: "DAY", label: "Day Shift (7a-7p)" },
  { value: "NIGHT", label: "Night Shift (7p-7a)" },
  { value: "EVENING", label: "Evening Shift (3p-11p)" },
  { value: "ROTATING", label: "Rotating" },
  { value: "FLEXIBLE", label: "Flexible" },
  { value: "WEEKENDS", label: "Weekends Only" },
  { value: "PRN", label: "PRN / Per Diem" },
]

export const LEAD_SOURCES = [
  { value: "WEBSITE", label: "Website" },
  { value: "REFERRAL", label: "Referral" },
  { value: "COLD_CALL", label: "Cold Call" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "CONFERENCE", label: "Conference" },
  { value: "OTHER", label: "Other" },
]

export const OFFER_STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "SENT", label: "Sent" },
  { value: "VIEWED", label: "Viewed" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "DECLINED", label: "Declined" },
  { value: "EXPIRED", label: "Expired" },
  { value: "BACKOUT", label: "Back Out" },
]

export const ASSIGNMENT_STATUSES = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "WAITING_CANDIDATE", label: "Waiting on Candidate" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
]

export const COMPANY_SIZES = [
  { value: "1-50", label: "1-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
]

export const AI_AGENTS = [
  {
    id: "offer-boost",
    name: "Offer Boost",
    description: "Generates enhanced offer copy that increases acceptance rates",
    icon: TrendingUp,
    color: "bg-blue-500",
    status: "active" as const,
  },
  {
    id: "retention-radar",
    name: "Retention Radar",
    description: "Analyzes candidate data to predict retention risk scores",
    icon: Heart,
    color: "bg-red-500",
    status: "active" as const,
  },
  {
    id: "readiness-engine",
    name: "Readiness Engine",
    description: "Assesses assignment readiness and compliance status",
    icon: ClipboardCheck,
    color: "bg-emerald-500",
    status: "active" as const,
  },
  {
    id: "concierge",
    name: "Concierge Agent",
    description: "Handles candidate questions about housing, travel, and logistics",
    icon: Bot,
    color: "bg-purple-500",
    status: "active" as const,
  },
  {
    id: "msp-reporter",
    name: "MSP Reporter",
    description: "Generates executive summaries and MSP performance reports",
    icon: BarChart3,
    color: "bg-amber-500",
    status: "active" as const,
  },
]
