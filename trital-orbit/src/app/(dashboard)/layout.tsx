import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { UserRole } from "@prisma/client";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as { id: string; name?: string | null; email?: string | null; image?: string | null; role: UserRole };

  // Get unread notification count
  let notificationCount = 0;
  try {
    notificationCount = await prisma.notification.count({
      where: { userId: user.id, isRead: false },
    });
  } catch {
    // DB may not be set up yet
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        role={user.role}
        userName={user.name ?? undefined}
        userEmail={user.email ?? undefined}
        userAvatar={user.image ?? undefined}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          userName={user.name ?? undefined}
          userEmail={user.email ?? undefined}
          userAvatar={user.image ?? undefined}
          userRole={user.role}
          notificationCount={notificationCount}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
