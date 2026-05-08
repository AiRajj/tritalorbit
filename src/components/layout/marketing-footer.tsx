"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Orbit,
  Globe,
  Mail,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  Product: [
    { label: "Platform Overview", href: "/platform" },
    { label: "Offer Boost Builder", href: "/features/offer-boost-builder" },
    { label: "Assignment Launch Dashboard", href: "/features/assignment-launch-dashboard" },
    { label: "Retention Risk AI", href: "/features/retention-risk-ai" },
    { label: "Mobility Concierge", href: "/features/mobility-concierge" },
    { label: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { label: "For Agencies", href: "/solutions/agencies" },
    { label: "For MSPs", href: "/solutions/msps" },
    { label: "For Clinicians", href: "/solutions/clinicians" },
  ],
  Company: [
    { label: "About Us", href: "/contact" },
    { label: "Contact", href: "/contact" },
    { label: "Request Demo", href: "/demo" },
    { label: "Careers", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/platform" },
    { label: "API Reference", href: "/platform" },
    { label: "Status", href: "/platform" },
    { label: "Support", href: "/contact" },
  ],
};

const socialLinks = [
  { icon: ExternalLink, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export function MarketingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-[#0B3C5D] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E63946]/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-white/10 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Stay ahead in healthcare staffing
              </h3>
              <p className="mt-2 text-white/60 text-sm leading-relaxed max-w-lg">
                Get weekly insights on workforce mobility, clinician retention, and the future of healthcare staffing delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md lg:ml-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#E63946] h-11"
              />
              <Button
                type="submit"
                className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shrink-0 h-11 px-6"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <ArrowRight className="h-4 w-4 ml-1" />}
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors">
                  <Orbit className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-white leading-tight">
                    TRITAL Orbit
                  </span>
                  <span className="text-[8px] font-medium text-white/40 tracking-widest uppercase -mt-0.5">
                    Workforce Mobility
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
                Healthcare workforce mobility infrastructure. Win more clinicians. Reduce backouts. Improve assignment readiness.
              </p>
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
                  {category}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} TRITAL Orbit™. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-xs text-white/30">
                SOC 2 Aligned
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
