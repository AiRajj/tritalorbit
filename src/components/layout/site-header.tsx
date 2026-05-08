import Link from "next/link";

import { Button } from "@/components/ui/button";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions/agencies", label: "Agencies" },
  { href: "/solutions/msps", label: "MSPs" },
  { href: "/solutions/clinicians", label: "Clinicians" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Book Demo" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B3C5D]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          TRITAL Orbit™
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-blue-100 md:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
              Login
            </Button>
          </Link>
          <Link href="/demo">
            <Button className="bg-[#E63946] hover:bg-[#d11f2d]">Request Demo</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
