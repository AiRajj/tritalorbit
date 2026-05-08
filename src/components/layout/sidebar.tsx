"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, CircleHelp, Gauge, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

export type SidebarLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export function Sidebar({ links, title }: { links: SidebarLink[]; title: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 p-6">
        <div className="inline-flex items-center gap-2 rounded-xl bg-[#0B3C5D]/10 px-3 py-1 text-xs font-semibold text-[#0B3C5D]">
          <Sparkles className="h-3.5 w-3.5" /> TRITAL Orbit™
        </div>
        <h2 className="mt-3 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">Healthcare Workforce Mobility Infrastructure</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-[#0B3C5D] text-white shadow-lg shadow-[#0B3C5D]/25"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" /> Enterprise Ready
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Gauge className="h-3.5 w-3.5" /> Live KPI pipeline
        </div>
        <div className="mt-1 flex items-center gap-2">
          <CircleHelp className="h-3.5 w-3.5" /> 24/7 concierge workflow
        </div>
      </div>
    </aside>
  );
}
