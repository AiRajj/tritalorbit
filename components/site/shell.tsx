import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { brand, publicNav } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-[#F8FAFC]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0B3C5D] text-lg font-black text-white shadow-lg">
            TO
          </div>
          <div>
            <p className="font-black tracking-tight text-[#0B3C5D]">{brand.name}</p>
            <p className="hidden text-xs font-medium text-slate-500 sm:block">Healthcare Workforce Mobility</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-600 hover:text-[#0B3C5D]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/demo">
              Book demo <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const links = [
    ...publicNav,
    { label: "Demo", href: "/demo" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" }
  ];

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0B3C5D] font-black text-white">TO</div>
            <p className="font-black text-[#0B3C5D]">{brand.name}</p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">{brand.promise}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-[#0B3C5D]" />
            RBAC, audit logs, encrypted-ready data flows, and production fallbacks
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-slate-600 hover:text-[#E63946]">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
