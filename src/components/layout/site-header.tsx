"use client";

import Link from "next/link";
import { Orbit, Menu } from "lucide-react";
import { useState } from "react";
import { marketingNav } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-orbit-aurora p-2 text-white shadow-glow">
            <Orbit className="h-4 w-4" />
          </span>
          <div>
            <span className="text-sm font-semibold text-slate-900">TRITAL Orbit™</span>
            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Mobility Cloud</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {marketingNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/demo/live-platform">Book Demo</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md border border-slate-200 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {marketingNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/demo/live-platform">Book Demo</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
