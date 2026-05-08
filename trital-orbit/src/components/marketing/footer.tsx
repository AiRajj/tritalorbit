import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Platform: [
    { label: "Platform Overview", href: "/platform" },
    { label: "Offer Boost Builder", href: "/features/offer-boost-builder" },
    { label: "Assignment Launch", href: "/features/assignment-launch-dashboard" },
    { label: "Retention Risk AI", href: "/features/retention-risk-ai" },
    { label: "Mobility Concierge", href: "/features/mobility-concierge" },
  ],
  Solutions: [
    { label: "For Agencies", href: "/solutions/agencies" },
    { label: "For MSPs", href: "/solutions/msps" },
    { label: "For Clinicians", href: "/solutions/clinicians" },
  ],
  Company: [
    { label: "Pricing", href: "/pricing" },
    { label: "Book a Demo", href: "/demo" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-orbit-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orbit-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl tracking-tight">
                TRITAL Orbit<span className="text-orbit-red align-super text-sm">™</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Healthcare Workforce Mobility Infrastructure. We help healthcare staffing companies win and keep clinicians without increasing pay rates.
            </p>
            <div className="mt-6">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Trusted by leading healthcare staffing agencies</p>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="h-4 w-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-slate-400 text-xs ml-1">4.9/5 from 200+ agencies</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-slate-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} TRITAL Care Inc. All rights reserved. TRITAL Orbit™ is a trademark of TRITAL Care Inc.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">Terms</Link>
            <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
