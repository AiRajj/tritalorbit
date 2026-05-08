import { DashboardShell } from "@/components/dashboard/shell";

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell allow={["AGENCY_OWNER", "RECRUITER", "SUPER_ADMIN"]}>{children}</DashboardShell>;
}
