import { DashboardShell } from "@/components/dashboard/shell";
export default function L({ children }: { children: React.ReactNode }) {
  return <DashboardShell allow={["SUPER_ADMIN"]}>{children}</DashboardShell>;
}
