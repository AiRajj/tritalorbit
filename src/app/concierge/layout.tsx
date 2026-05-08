import { DashboardShell } from "@/components/dashboard/shell";
export default function L({ children }: { children: React.ReactNode }) {
  return <DashboardShell allow={["CONCIERGE_MANAGER", "AGENCY_OWNER", "SUPER_ADMIN"]}>{children}</DashboardShell>;
}
