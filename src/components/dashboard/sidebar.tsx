"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export function DashboardSidebar({ title, items }: { title: string; items: Item[] }) {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                active ? "bg-orbit-blue text-white" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
