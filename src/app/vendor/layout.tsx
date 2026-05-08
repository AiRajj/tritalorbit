import { DashboardShell } from "@/components/dashboard/shell";
export default function L({ children }: { children: React.ReactNode }) {
  return <DashboardShell allow={["VENDOR", "LANDLORD", "SUPER_ADMIN"]}>{children}</DashboardShell>;
}
