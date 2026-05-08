import { Role } from "@prisma/client";

export const roleRedirectMap: Record<Role, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR_LANDLORD: "/vendor/dashboard"
};

export const protectedRouteRoles: Array<{ path: string; roles: Role[] }> = [
  { path: "/admin", roles: [Role.SUPER_ADMIN] },
  { path: "/agency", roles: [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER] },
  { path: "/recruiter", roles: [Role.RECRUITER, Role.AGENCY_OWNER] },
  { path: "/candidate", roles: [Role.CANDIDATE] },
  { path: "/concierge", roles: [Role.CONCIERGE_MANAGER, Role.AGENCY_OWNER] },
  { path: "/vendor", roles: [Role.VENDOR_LANDLORD, Role.SUPER_ADMIN] },
  { path: "/msp", roles: [Role.MSP_VIEWER, Role.SUPER_ADMIN] }
];

export function canAccessPath(pathname: string, role?: Role) {
  if (!role) return false;
  const match = protectedRouteRoles.find((route) => pathname.startsWith(route.path));
  if (!match) return true;
  return match.roles.includes(role);
}
