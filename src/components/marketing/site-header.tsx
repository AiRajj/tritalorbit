"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { OrbitWordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV: Array<{
  label: string;
  href: string;
  children?: Array<{ label: string; href: string; description?: string }>;
}> = [
  {
    label: "Platform",
    href: "/platform",
  },
  {
    label: "Solutions",
    href: "/solutions/agencies",
    children: [
      { label: "For Agencies", href: "/solutions/agencies", description: "Win more offers, reduce backouts." },
      { label: "For MSPs", href: "/solutions/msps", description: "Supplier performance + readiness reporting." },
      { label: "For Clinicians", href: "/solutions/clinicians", description: "Move with confidence. Day-1 ready." },
    ],
  },
  {
    label: "Features",
    href: "/features/offer-boost-builder",
    children: [
      { label: "Offer Boost Builder", href: "/features/offer-boost-builder", description: "AI-enhanced offer pages." },
      { label: "Assignment Launch", href: "/features/assignment-launch-dashboard", description: "Readiness command center." },
      { label: "Retention Risk AI", href: "/features/retention-risk-ai", description: "Predict & prevent backouts." },
      { label: "Mobility Concierge", href: "/features/mobility-concierge", description: "Housing, travel, relocation." },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        scrolled
          ? "border-orbit-deep/10 bg-white/85 backdrop-blur-xl"
          : "border-transparent bg-white/60 backdrop-blur",
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-6">
        <Link href="/" className="-ml-1">
          <OrbitWordmark size="md" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link href="/demo">Book demo</Link>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-orbit-deep/10 bg-white md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-orbit-deep/10 bg-white md:hidden">
          <div className="container-wide flex flex-col gap-1 py-4">
            {NAV.flatMap((item) =>
              item.children
                ? item.children.map((c) => ({ label: c.label, href: c.href }))
                : [{ label: item.label, href: item.href }],
            ).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-orbit-slate hover:bg-orbit-deep/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-3 py-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/demo">Book demo</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  item,
  pathname,
}: {
  item: (typeof NAV)[number];
  pathname: string;
}) {
  const isActive = pathname.startsWith(item.href.split("?")[0]);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "text-orbit-deep" : "text-slate-600 hover:text-orbit-deep",
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <button
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive ? "text-orbit-deep" : "text-slate-600 hover:text-orbit-deep",
        )}
      >
        {item.label}
      </button>
      <div className="invisible absolute left-1/2 top-full z-30 w-[28rem] -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="rounded-2xl border border-orbit-deep/10 bg-white p-2 shadow-elevate">
          {item.children.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-orbit-deep/5"
            >
              <div className="mt-1 h-2 w-2 rounded-full bg-orbit-red" />
              <div>
                <div className="text-sm font-semibold text-orbit-deep">{c.label}</div>
                {c.description && <div className="text-xs text-slate-500">{c.description}</div>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
