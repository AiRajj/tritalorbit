import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";
import type { UserRole } from "@prisma/client";

export async function DashboardShell({
  children,
  allow,
}: {
  children: React.ReactNode;
  allow: UserRole[];
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const role = session.user.role;
  if (!allow.includes(role)) redirect("/unauthorized");

  let notificationCount = 0;
  try {
    notificationCount = await prisma.notification.count({
      where: { userId: session.user.id, isRead: false },
    });
  } catch {
    notificationCount = 0;
  }

  return (
    <div className="flex min-h-screen bg-orbit-mist">
      <DashboardSidebar role={role} userName={session.user.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          user={{ name: session.user.name, email: session.user.email, role }}
          notificationCount={notificationCount}
        />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
