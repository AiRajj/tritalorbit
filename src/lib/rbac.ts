export type AppRole =
  | "SUPER_ADMIN"
  | "AGENCY_OWNER"
  | "RECRUITER"
  | "CONCIERGE_MANAGER"
  | "MSP_VIEWER"
  | "CANDIDATE"
  | "VENDOR_LANDLORD";

export const ROLE_HOME: Record<AppRole, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR_LANDLORD: "/vendor",
};

export const PROTECTED_PREFIXES: Record<string, AppRole[]> = {
  "/admin": ["SUPER_ADMIN"],
  "/agency": ["AGENCY_OWNER", "RECRUITER"],
  "/recruiter": ["RECRUITER", "AGENCY_OWNER"],
  "/candidate": ["CANDIDATE", "RECRUITER", "AGENCY_OWNER"],
  "/concierge": ["CONCIERGE_MANAGER", "AGENCY_OWNER"],
  "/vendor": ["VENDOR_LANDLORD", "SUPER_ADMIN"],
  "/msp": ["MSP_VIEWER", "SUPER_ADMIN"],
};

export function canAccessPath(role: string, pathname: string) {
  const entry = Object.entries(PROTECTED_PREFIXES).find(([prefix]) =>
    pathname.startsWith(prefix),
  );
  if (!entry) {
    return true;
  }

  return entry[1].includes(role as AppRole);
}
