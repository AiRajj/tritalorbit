"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Orbit,
  Building2,
  Network,
  Stethoscope,
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Headset,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const solutionsItems = [
  {
    label: "Agencies",
    href: "/solutions/agencies",
    description: "Win more clinicians and reduce backouts",
    icon: Building2,
  },
  {
    label: "MSPs",
    href: "/solutions/msps",
    description: "Streamline supplier management and compliance",
    icon: Network,
  },
  {
    label: "Clinicians",
    href: "/solutions/clinicians",
    description: "Better assignments, smoother relocations",
    icon: Stethoscope,
  },
];

const featuresItems = [
  {
    label: "Offer Boost Builder",
    href: "/features/offer-boost-builder",
    description: "Enhance offers with mobility packages",
    icon: Zap,
  },
  {
    label: "Assignment Launch Dashboard",
    href: "/features/assignment-launch-dashboard",
    description: "Track readiness from offer to first day",
    icon: LayoutDashboard,
  },
  {
    label: "Retention Risk AI",
    href: "/features/retention-risk-ai",
    description: "Predict and prevent clinician backouts",
    icon: BrainCircuit,
  },
  {
    label: "Mobility Concierge",
    href: "/features/mobility-concierge",
    description: "White-glove relocation support",
    icon: Headset,
  },
];

const navItems = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "#", children: solutionsItems },
  { label: "Features", href: "#", children: featuresItems },
  { label: "Pricing", href: "/pricing" },
];

function DropdownMenu({
  items,
  isOpen,
}: {
  items: typeof solutionsItems;
  isOpen: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
        >
          <div className="w-80 rounded-xl border border-gray-200/80 bg-white/95 backdrop-blur-xl shadow-xl shadow-gray-900/5 p-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-[#0B3C5D]/5 group"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B3C5D]/5 text-[#0B3C5D] group-hover:bg-[#0B3C5D]/10 transition-colors">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B3C5D] shadow-md shadow-[#0B3C5D]/20 group-hover:shadow-lg group-hover:shadow-[#0B3C5D]/30 transition-shadow">
                <Orbit className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#0B3C5D] leading-tight">
                  TRITAL Orbit
                </span>
                <span className="text-[9px] font-medium text-gray-400 tracking-widest uppercase -mt-0.5">
                  Workforce Mobility
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        openDropdown === item.label
                          ? "text-[#0B3C5D] bg-[#0B3C5D]/5"
                          : "text-[#1F2937]/70 hover:text-[#1F2937] hover:bg-gray-100/60"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        pathname === item.href
                          ? "text-[#0B3C5D] bg-[#0B3C5D]/5"
                          : "text-[#1F2937]/70 hover:text-[#1F2937] hover:bg-gray-100/60"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.children && (
                    <DropdownMenu
                      items={item.children}
                      isOpen={openDropdown === item.label}
                    />
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact">
                <Button variant="ghost" size="sm" className="text-[#1F2937]/70 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="sm" className="bg-[#E63946] hover:bg-[#E63946]/90 text-white shadow-md shadow-[#E63946]/20 hover:shadow-lg hover:shadow-[#E63946]/30 transition-all">
                  Request Demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100/60 transition-colors"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-[#1F2937]" />
              ) : (
                <Menu className="h-5 w-5 text-[#1F2937]" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
            >
              <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B3C5D]">
                    <Orbit className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-base font-bold text-[#0B3C5D]">
                    TRITAL Orbit
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-[#1F2937]" />
                </button>
              </div>
              <div className="overflow-y-auto h-[calc(100%-4rem)] pb-20">
                <nav className="p-4 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() =>
                              setMobileExpanded(
                                mobileExpanded === item.label
                                  ? null
                                  : item.label
                              )
                            }
                            className="flex w-full items-center justify-between px-3 py-3 text-sm font-semibold text-[#1F2937] rounded-lg hover:bg-gray-50"
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 text-gray-400 transition-transform",
                                mobileExpanded === item.label && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileExpanded === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pb-2 space-y-1">
                                  {item.children.map((child) => {
                                    const Icon = child.icon;
                                    return (
                                      <Link
                                        key={child.href}
                                        href={child.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 group"
                                      >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0B3C5D]/5 text-[#0B3C5D]">
                                          <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-[#1F2937]">
                                            {child.label}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {child.description}
                                          </p>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block px-3 py-3 text-sm font-semibold rounded-lg hover:bg-gray-50",
                            pathname === item.href
                              ? "text-[#0B3C5D] bg-[#0B3C5D]/5"
                              : "text-[#1F2937]"
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="p-4 space-y-3 border-t border-gray-100 mt-2">
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/demo" className="block">
                    <Button className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white">
                      Request Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
