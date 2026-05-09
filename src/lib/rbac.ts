import { Role } from "@prisma/client";

export const roleRedirectMap: Record<Role, string> = {
  SUPER_ADMIN: "/admin",
  AGENCY_OWNER: "/agency",
  RECRUITER: "/recruiter",
  CONCIERGE_MANAGER: "/concierge",
  MSP_VIEWER: "/msp",
  CANDIDATE: "/candidate",
  VENDOR_LANDLORD: "/vendor/dashboard",
  TRAVEL_AGENCY_VENDOR: "/vendor/travel-agency/dashboard",
  HOUSING_PROVIDER: "/vendor/housing/dashboard",
  HOTEL_PARTNER: "/vendor/dashboard",
  CAR_RENTAL_PARTNER: "/vendor/dashboard",
  RELOCATION_PARTNER: "/vendor/dashboard",
  FINANCE_BILLING_ADMIN: "/admin/wallet"
};

export const protectedRouteRoles: Array<{ path: string; roles: Role[] }> = [
  { path: "/admin", roles: [Role.SUPER_ADMIN, Role.FINANCE_BILLING_ADMIN] },
  { path: "/agency", roles: [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER] },
  { path: "/recruiter", roles: [Role.RECRUITER, Role.AGENCY_OWNER] },
  { path: "/candidate", roles: [Role.CANDIDATE] },
  { path: "/wallet", roles: [Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER, Role.CANDIDATE] },
  { path: "/concierge", roles: [Role.CONCIERGE_MANAGER, Role.AGENCY_OWNER] },
  {
    path: "/vendor",
    roles: [
      Role.VENDOR_LANDLORD,
      Role.TRAVEL_AGENCY_VENDOR,
      Role.HOUSING_PROVIDER,
      Role.HOTEL_PARTNER,
      Role.CAR_RENTAL_PARTNER,
      Role.RELOCATION_PARTNER,
      Role.SUPER_ADMIN
    ]
  },
  { path: "/msp", roles: [Role.MSP_VIEWER, Role.SUPER_ADMIN] }
];

export function canAccessPath(pathname: string, role?: Role) {
  if (!role) return false;
  const match = protectedRouteRoles.find((route) => pathname.startsWith(route.path));
  if (!match) return true;
  return match.roles.includes(role);
}
