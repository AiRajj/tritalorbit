import Link from "next/link";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/platform", label: "Platform" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-[#0B3C5D]">TRITAL Orbit™</p>
          <p className="text-sm text-slate-600">
            Win more clinicians. Reduce backouts. Improve assignment readiness.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-600">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#0B3C5D]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
