"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Solutions",
    dropdown: [
      {
        label: "For Agencies",
        href: "/solutions/agencies",
        description: "Win more clinicians and reduce backouts",
      },
      {
        label: "For MSPs",
        href: "/solutions/msps",
        description: "Full visibility into supplier workforce readiness",
      },
      {
        label: "For Clinicians",
        href: "/solutions/clinicians",
        description: "Housing, travel, and support — handled for you",
      },
    ],
  },
  {
    label: "Features",
    dropdown: [
      {
        label: "Offer Boost Builder",
        href: "/features/offer-boost",
        description: "Add housing, travel, and relocation to every offer",
      },
      {
        label: "Assignment Launch Dashboard",
        href: "/features/assignment-launch",
        description: "Track readiness from acceptance to first day",
      },
      {
        label: "Retention Risk AI",
        href: "/features/retention-risk",
        description: "Predict and prevent clinician backouts",
      },
      {
        label: "Mobility Concierge",
        href: "/features/mobility-concierge",
        description: "White-glove housing, flights, and transport",
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
];

function DesktopDropdown({
  items,
  isOpen,
  onClose,
}: {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
          onMouseLeave={onClose}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-2 min-w-[280px]">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg px-4 py-3 hover:bg-[#0B3C5D]/5 transition-colors group"
                onClick={onClose}
              >
                <div className="text-sm font-semibold text-[#1F2937] group-hover:text-[#0B3C5D] transition-colors">
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0B3C5D]">
                TRITAL Orbit<span className="text-[#E63946]">™</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && handleMouseEnter(item.label)
                  }
                  onMouseLeave={() => item.dropdown && handleMouseLeave()}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        scrolled
                          ? "text-[#1F2937] hover:text-[#0B3C5D] hover:bg-[#0B3C5D]/5"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        scrolled
                          ? "text-[#1F2937] hover:text-[#0B3C5D] hover:bg-[#0B3C5D]/5"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                  {item.dropdown && (
                    <DesktopDropdown
                      items={item.dropdown}
                      isOpen={openDropdown === item.label}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                asChild
                className={cn(
                  "rounded-full",
                  !scrolled &&
                    "border-white/30 text-white hover:bg-white/10 hover:text-white"
                )}
              >
                <Link href="/demo">Book Demo</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="rounded-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white shadow-lg shadow-[#0B3C5D]/25"
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X
                  className={cn(
                    "w-5 h-5",
                    scrolled ? "text-[#1F2937]" : "text-white"
                  )}
                />
              ) : (
                <Menu
                  className={cn(
                    "w-5 h-5",
                    scrolled ? "text-[#1F2937]" : "text-white"
                  )}
                />
              )}
            </button>
          </div>
        </div>
      </nav>

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
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="text-lg font-bold text-[#0B3C5D]">
                  TRITAL Orbit<span className="text-[#E63946]">™</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#1F2937]" />
                </button>
              </div>
              <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-sm font-medium text-[#1F2937] rounded-lg hover:bg-[#0B3C5D]/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-[#1F2937] rounded-lg hover:bg-[#0B3C5D]/5"
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.label
                                ? null
                                : item.label
                            )
                          }
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              mobileExpanded === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === item.label && item.dropdown && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-0.5 pb-1">
                                {item.dropdown.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="block px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-[#0B3C5D]/5 hover:text-[#0B3C5D]"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white space-y-2">
                <Button
                  variant="outline"
                  asChild
                  className="w-full rounded-full"
                >
                  <Link href="/demo">Book Demo</Link>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-full bg-[#0B3C5D] hover:bg-[#0B3C5D]/90"
                >
                  <Link href="/login">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
