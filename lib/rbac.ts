import type { RoleKey } from "@/lib/types";

export const roleHome: Record<RoleKey, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR: "/vendor/dashboard",
  LANDLORD: "/vendor/dashboard"
};

export const protectedRouteRoles: Array<{ prefix: string; roles: RoleKey[] }> = [
  { prefix: "/admin", roles: ["SUPER_ADMIN"] },
  { prefix: "/agency", roles: ["SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"] },
  { prefix: "/recruiter", roles: ["SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"] },
  { prefix: "/concierge", roles: ["SUPER_ADMIN", "CONCIERGE_MANAGER"] },
  { prefix: "/msp", roles: ["SUPER_ADMIN", "MSP_VIEWER"] },
  { prefix: "/vendor", roles: ["SUPER_ADMIN", "VENDOR", "LANDLORD"] },
  { prefix: "/candidate", roles: ["SUPER_ADMIN", "CANDIDATE", "AGENCY_OWNER", "RECRUITER"] }
];

export function getRoleHome(role?: string | null) {
  if (!role || !(role in roleHome)) return "/agency";
  return roleHome[role as RoleKey];
}

export function canAccessPath(pathname: string, role?: string | null) {
  const rule = protectedRouteRoles.find((item) => pathname.startsWith(item.prefix));
  if (!rule) return true;
  if (!role) return false;
  return rule.roles.includes(role as RoleKey);
}
