"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { UserRole } from "@prisma/client";
import { OrbitWordmark } from "@/components/brand/logo";
import { NAV_BY_ROLE } from "@/components/dashboard/nav-config";
import { ROLE_LABEL } from "@/lib/rbac";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function DashboardSidebar({ role, userName }: { role: UserRole; userName?: string | null }) {
  const pathname = usePathname();
  const groups = NAV_BY_ROLE[role] ?? [];

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-orbit-deep/10 bg-white md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-orbit-deep/10 px-5">
        <Link href="/">
          <OrbitWordmark size="md" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5 scrollbar-none">
        <div className="rounded-xl border border-orbit-deep/10 bg-orbit-deep/[0.03] p-3">
          <div className="text-[0.65rem] font-semibold uppercase tracking-widest text-slate-500">Workspace</div>
          <div className="mt-1 text-sm font-semibold text-orbit-deep">
            {userName || ROLE_LABEL[role]}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{ROLE_LABEL[role]}</div>
        </div>

        <nav className="mt-5 space-y-6">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <div className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-widest text-slate-400">
                  {group.label}
                </div>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href + "/")) ||
                    (item.href === pathname);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-orbit-deep text-white shadow-sm"
                            : "text-slate-600 hover:bg-orbit-deep/5 hover:text-orbit-deep",
                        )}
                      >
                        <Icon className={cn("h-4 w-4", active ? "text-white" : "text-orbit-deep")} />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-orbit-red/10 px-2 py-0.5 text-[0.65rem] font-semibold text-orbit-red">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-orbit-deep/10 p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-600 hover:text-orbit-red"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>
    </aside>
  );
}
