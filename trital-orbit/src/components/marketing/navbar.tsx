"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Zap, Building2, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Platform",
    href: "/platform",
  },
  {
    label: "Solutions",
    children: [
      { label: "For Agencies", href: "/solutions/agencies", icon: Building2, desc: "Win more placements, reduce backouts" },
      { label: "For MSPs", href: "/solutions/msps", icon: Users, desc: "Improve supplier performance metrics" },
      { label: "For Clinicians", href: "/solutions/clinicians", icon: Zap, desc: "Better assignments, better lives" },
    ],
  },
  {
    label: "Features",
    children: [
      { label: "Offer Boost Builder", href: "/features/offer-boost-builder", icon: Zap, desc: "AI-powered offer enhancement" },
      { label: "Assignment Launch", href: "/features/assignment-launch-dashboard", icon: Building2, desc: "Track readiness from offer to day 1" },
      { label: "Retention Risk AI", href: "/features/retention-risk-ai", icon: Brain, desc: "Predict and prevent backouts" },
      { label: "Mobility Concierge", href: "/features/mobility-concierge", icon: Users, desc: "Housing, travel, and relocation support" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-orbit border-b border-slate-100"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-orbit-gradient flex items-center justify-center shadow-orbit">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <span className={cn(
                "font-bold text-lg tracking-tight transition-colors",
                isScrolled ? "text-orbit-dark" : "text-white"
              )}>
                TRITAL Orbit
              </span>
              <span className={cn(
                "text-xs font-medium ml-0.5 align-super",
                isScrolled ? "text-orbit-red" : "text-orbit-red"
              )}>™</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isScrolled
                        ? "text-slate-700 hover:text-orbit-blue hover:bg-slate-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openDropdown === item.label && "rotate-180"
                    )} />
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 min-w-[260px]">
                      <div className="bg-white rounded-xl shadow-orbit-xl border border-slate-100 p-2 overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-orbit-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orbit-blue group-hover:text-white transition-colors">
                              <child.icon className="h-4 w-4 text-orbit-blue group-hover:text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-orbit-dark">{child.label}</div>
                              <div className="text-xs text-slate-500">{child.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-orbit-blue bg-orbit-blue/5"
                      : isScrolled
                      ? "text-slate-700 hover:text-orbit-blue hover:bg-slate-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  isScrolled ? "text-slate-700" : "text-white hover:bg-white/10"
                )}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="sm" className="bg-orbit-red hover:bg-red-700 text-white shadow-sm">
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-lg",
              isScrolled ? "text-slate-700" : "text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-orbit-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-orbit-blue transition-colors"
                    >
                      <child.icon className="h-4 w-4" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-orbit-blue transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/demo" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-orbit-red hover:bg-red-700 text-white">Book a Demo</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
