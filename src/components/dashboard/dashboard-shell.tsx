"use client";

import { usePathname } from "next/navigation";
import { Role } from "@prisma/client";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import { roleSidebar } from "@/lib/navigation";

const roleLabelMap: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  AGENCY_OWNER: "Agency Owner",
  RECRUITER: "Recruiter",
  CONCIERGE_MANAGER: "Concierge",
  MSP_VIEWER: "MSP Viewer",
  CANDIDATE: "Candidate",
  VENDOR_LANDLORD: "Vendor / Landlord",
  TRAVEL_AGENCY_VENDOR: "Travel Agency Vendor",
  HOUSING_PROVIDER: "Housing Provider",
  HOTEL_PARTNER: "Hotel Partner",
  CAR_RENTAL_PARTNER: "Car Rental Partner",
  RELOCATION_PARTNER: "Relocation Partner",
  FINANCE_BILLING_ADMIN: "Finance / Billing Admin"
};

export function DashboardShell({
  role,
  userName,
  children
}: {
  role: Role;
  userName?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarItems =
    pathname.startsWith("/admin")
      ? roleSidebar.admin
      : pathname.startsWith("/agency")
        ? roleSidebar.agency
        : pathname.startsWith("/recruiter")
          ? roleSidebar.recruiter
          : pathname.startsWith("/candidate")
            ? roleSidebar.candidate
            : pathname.startsWith("/concierge")
              ? roleSidebar.concierge
              : pathname.startsWith("/vendor")
                ? roleSidebar.vendor
                : pathname.startsWith("/wallet")
                  ? role === Role.CANDIDATE
                    ? roleSidebar.candidate
                    : roleSidebar.agency
                : roleSidebar.msp;

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <DashboardSidebar title={roleLabelMap[role]} items={sidebarItems} />
      <div className="flex min-h-screen flex-1 flex-col">
        <DashboardTopbar userName={userName} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
