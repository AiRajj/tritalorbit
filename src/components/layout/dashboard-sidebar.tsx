"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  Building2,
  Truck,
  CreditCard,
  Shield,
  FileText,
  UserPlus,
  ClipboardList,
  Rocket,
  Store,
  Home,
  Eye,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Orbit,
  Inbox,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const roleNavMap: Record<string, NavItem[]> = {
  SUPER_ADMIN: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Agencies", href: "/admin/agencies", icon: Building2 },
    { label: "Vendors", href: "/admin/vendors", icon: Store },
    { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: Shield },
  ],
  AGENCY_OWNER: [
    { label: "Dashboard", href: "/agency", icon: LayoutDashboard },
    { label: "Offers", href: "/agency/offers/create", icon: FileText },
    { label: "Candidates", href: "/agency/candidates", icon: UserPlus },
    { label: "Booking Requests", href: "/agency/booking-requests", icon: ClipboardList },
    { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Rocket },
    { label: "Vendors", href: "/agency/vendors", icon: Store },
  ],
  RECRUITER: [
    { label: "Dashboard", href: "/recruiter", icon: LayoutDashboard },
    { label: "Create Offer", href: "/agency/offers/create", icon: FileText },
    { label: "Candidates", href: "/agency/candidates", icon: UserPlus },
    { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Rocket },
  ],
  CONCIERGE_MANAGER: [
    { label: "Dashboard", href: "/concierge", icon: LayoutDashboard },
    { label: "Requests", href: "/concierge/requests", icon: Inbox },
  ],
  MSP_VIEWER: [
    { label: "Dashboard", href: "/msp", icon: Eye },
  ],
  CANDIDATE: [
    { label: "Dashboard", href: "/candidate", icon: LayoutDashboard },
    { label: "Housing", href: "/candidate/housing", icon: Home },
  ],
  VENDOR: [
    { label: "Dashboard", href: "/vendor/dashboard", icon: Truck },
  ],
};

interface DashboardSidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = roleNavMap[role] || roleNavMap["CANDIDATE"];

  const isActive = (href: string) => {
    if (href === pathname) return true;
    if (href !== "/" && pathname.startsWith(href) && href.split("/").length > 2) return true;
    const rolePrefixes = ["/admin", "/agency", "/recruiter", "/concierge", "/msp", "/candidate", "/vendor"];
    if (rolePrefixes.includes(href) && pathname === href) return true;
    return false;
  };

  const bottomItems: NavItem[] = [
    { label: "Settings", href: "#settings", icon: Settings },
    { label: "Help", href: "#help", icon: HelpCircle },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative flex h-full flex-col border-r border-[#1F2937]/10 bg-[#1F2937] text-white transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-[260px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0B3C5D]">
            <Orbit className="h-5 w-5 text-[#F8FAFC]" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold tracking-tight text-[#F8FAFC]">
                TRITAL Orbit™
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">
                Platform
              </span>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-[72px] z-50 flex h-6 w-6 items-center justify-center rounded-full border border-[#1F2937]/20 bg-white text-[#1F2937] shadow-md transition-colors hover:bg-[#F8FAFC] focus:outline-none"
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="flex flex-col gap-1 px-3">
            {!collapsed && (
              <span className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                Navigation
              </span>
            )}
            {navItems.map((item) => {
              const active = isActive(item.href);
              const linkContent = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-[#0B3C5D] text-white shadow-lg shadow-[#0B3C5D]/25"
                      : "text-white/60 hover:bg-white/8 hover:text-white",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-colors",
                      active ? "text-white" : "text-white/50 group-hover:text-white"
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {active && !collapsed && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#E63946]" />
                  )}
                </Link>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>
        </ScrollArea>

        {/* Bottom section */}
        <div className="border-t border-white/10 p-3">
          <div className="flex flex-col gap-1">
            {bottomItems.map((item) => {
              const linkContent = (
                <button
                  key={item.label}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/50 transition-all duration-200 hover:bg-white/8 hover:text-white",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0 transition-colors group-hover:text-white" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}

            <Separator className="my-1 bg-white/10" />

            {(() => {
              const logoutContent = (
                <button
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#E63946]/80 transition-all duration-200 hover:bg-[#E63946]/10 hover:text-[#E63946]",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <LogOut className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span>Logout</span>}
                </button>
              );

              if (collapsed) {
                return (
                  <Tooltip>
                    <TooltipTrigger asChild>{logoutContent}</TooltipTrigger>
                    <TooltipContent side="right" className="font-medium">
                      Logout
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return logoutContent;
            })()}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
