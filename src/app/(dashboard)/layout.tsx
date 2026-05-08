import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isPublicCandidateOffer = pathname.startsWith("/candidate/offer/");

  if (isPublicCandidateOffer) {
    return <>{children}</>;
  }

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardShell role={session.user.role} userName={session.user.name}>
      {children}
    </DashboardShell>
  );
}
