import type { UserRole } from "@prisma/client";

export const ROLE_HOME: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR: "/vendor",
  LANDLORD: "/vendor",
};

export const ROLE_LABEL: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  AGENCY_OWNER: "Agency Owner",
  RECRUITER: "Recruiter",
  CONCIERGE_MANAGER: "Concierge Manager",
  MSP_VIEWER: "MSP Viewer",
  CANDIDATE: "Clinician",
  VENDOR: "Vendor",
  LANDLORD: "Landlord",
};

export const ROLE_DESCRIPTION: Record<UserRole, string> = {
  SUPER_ADMIN: "Platform-wide oversight, audit trails, and system health.",
  AGENCY_OWNER: "Full agency control: offers, candidates, billing, vendors.",
  RECRUITER: "Pipeline ownership: build offers, close candidates, track risk.",
  CONCIERGE_MANAGER: "Operates the booking and mobility task board.",
  MSP_VIEWER: "Read-only insight into supplier performance and readiness.",
  CANDIDATE: "Clinician-side offer review, support, and assignment hub.",
  VENDOR: "Vendor portal for inventory, requests, and verifications.",
  LANDLORD: "Property listings and candidate housing approvals.",
};

export const PROTECTED_PREFIXES: Array<{ prefix: string; roles: UserRole[] }> = [
  { prefix: "/admin", roles: ["SUPER_ADMIN"] },
  {
    prefix: "/agency",
    roles: ["SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"],
  },
  {
    prefix: "/recruiter",
    roles: ["SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"],
  },
  {
    prefix: "/concierge",
    roles: ["SUPER_ADMIN", "AGENCY_OWNER", "CONCIERGE_MANAGER"],
  },
  { prefix: "/msp", roles: ["SUPER_ADMIN", "MSP_VIEWER", "AGENCY_OWNER"] },
  {
    prefix: "/candidate",
    roles: ["SUPER_ADMIN", "CANDIDATE", "AGENCY_OWNER", "RECRUITER"],
  },
  { prefix: "/vendor", roles: ["SUPER_ADMIN", "VENDOR", "LANDLORD"] },
];

export function canAccess(role: UserRole | undefined, pathname: string): boolean {
  if (!role) return false;
  const match = PROTECTED_PREFIXES.find((p) => pathname.startsWith(p.prefix));
  if (!match) return true;
  return match.roles.includes(role);
}

export function homeForRole(role: UserRole | undefined | null): string {
  if (!role) return "/login";
  return ROLE_HOME[role] ?? "/";
}
