import { DashboardShell } from "@/components/dashboard/shell";

export default function CandidateDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell allow={["CANDIDATE", "SUPER_ADMIN", "AGENCY_OWNER", "RECRUITER"]}>
      {children}
    </DashboardShell>
  );
}
