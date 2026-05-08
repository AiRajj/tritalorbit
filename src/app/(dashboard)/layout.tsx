import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = {
    name: session.user.name || "User",
    email: session.user.email || "",
    role: session.user.role || "CANDIDATE",
    image: session.user.image || undefined,
  };

  return (
    <DashboardLayout role={user.role} user={user}>
      {children}
    </DashboardLayout>
  );
}
