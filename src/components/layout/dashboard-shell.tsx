import { Sidebar, type SidebarLink } from "@/components/layout/sidebar";
import { UserMenu } from "@/components/layout/user-menu";

export function DashboardShell({
  title,
  links,
  user,
  children,
}: {
  title: string;
  links: SidebarLink[];
  user: {
    name: string;
    email: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-[1700px]">
        <Sidebar links={links} title={title} />
        <div className="min-h-screen flex-1">
          <UserMenu name={user.name} email={user.email} />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
