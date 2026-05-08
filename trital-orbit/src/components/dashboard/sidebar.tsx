"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Users, BarChart3, Settings, Building2,
  Bell, LogOut, ChevronRight, Briefcase, Home, Plane, Car,
  Brain, Shield, Activity, ClipboardList, Package, ChevronLeft,
  Zap, Target, BookOpen
} from "lucide-react";
import { signOut } from "next-auth/react";
import { UserRole } from "@prisma/client";

const navigationByRole: Record<UserRole, {
  items: { label: string; href: string; icon: React.ElementType; badge?: number }[];
  sections?: { title: string; items: { label: string; href: string; icon: React.ElementType }[] }[];
}> = {
  SUPER_ADMIN: {
    items: [
      { label: "Admin Center", href: "/admin", icon: Shield },
      { label: "Agencies", href: "/admin/agencies", icon: Building2 },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Offers", href: "/admin/offers", icon: FileText },
      { label: "Vendors", href: "/admin/vendors", icon: Package },
      { label: "Subscriptions", href: "/admin/subscriptions", icon: Briefcase },
      { label: "AI Usage", href: "/admin/ai-usage", icon: Brain },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: Activity },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  AGENCY_OWNER: {
    items: [
      { label: "Dashboard", href: "/agency", icon: LayoutDashboard },
      { label: "Offers", href: "/agency/offers", icon: FileText },
      { label: "Candidates", href: "/agency/candidates", icon: Users },
      { label: "Assignment Launch", href: "/agency/assignment-launch", icon: Zap },
      { label: "Booking Requests", href: "/agency/booking-requests", icon: ClipboardList },
      { label: "Vendors", href: "/agency/vendors", icon: Package },
      { label: "Reports", href: "/agency/reports", icon: BarChart3 },
      { label: "Settings", href: "/agency/settings", icon: Settings },
    ],
  },
  RECRUITER: {
    items: [
      { label: "Dashboard", href: "/recruiter", icon: LayoutDashboard },
      { label: "My Offers", href: "/recruiter/offers", icon: FileText },
      { label: "My Candidates", href: "/recruiter/candidates", icon: Users },
      { label: "Risk Alerts", href: "/recruiter/risk-alerts", icon: Target },
      { label: "Booking Requests", href: "/recruiter/booking-requests", icon: ClipboardList },
    ],
  },
  CONCIERGE_MANAGER: {
    items: [
      { label: "Dashboard", href: "/concierge", icon: LayoutDashboard },
      { label: "Task Board", href: "/concierge/tasks", icon: ClipboardList },
      { label: "Booking Requests", href: "/concierge/requests", icon: BookOpen },
      { label: "Housing Options", href: "/concierge/housing", icon: Home },
      { label: "Vendors", href: "/concierge/vendors", icon: Package },
    ],
  },
  MSP_VIEWER: {
    items: [
      { label: "MSP Dashboard", href: "/msp", icon: LayoutDashboard },
      { label: "Performance", href: "/msp/performance", icon: BarChart3 },
      { label: "Candidates", href: "/msp/candidates", icon: Users },
      { label: "Reports", href: "/msp/reports", icon: FileText },
    ],
  },
  CANDIDATE: {
    items: [
      { label: "My Offers", href: "/candidate", icon: FileText },
      { label: "My Assignment", href: "/candidate/assignment", icon: Building2 },
      { label: "Housing", href: "/candidate/housing", icon: Home },
      { label: "Travel", href: "/candidate/travel", icon: Plane },
      { label: "Car Rental", href: "/candidate/car", icon: Car },
      { label: "Documents", href: "/candidate/documents", icon: ClipboardList },
    ],
  },
  VENDOR: {
    items: [
      { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
      { label: "My Listings", href: "/vendor/listings", icon: Home },
      { label: "Requests", href: "/vendor/requests", icon: ClipboardList },
      { label: "Profile", href: "/vendor/profile", icon: Settings },
    ],
  },
};

interface SidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

export function Sidebar({ role, userName, userEmail }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const nav = navigationByRole[role] ?? navigationByRole[UserRole.CANDIDATE];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-orbit-dark text-white transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orbit-gradient flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <div>
              <span className="font-bold text-sm text-white">TRITAL Orbit</span>
              <span className="text-orbit-red text-xs align-super">™</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-orbit-gradient flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">T</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors",
            collapsed && "mx-auto mt-2"
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-1">
        {nav.items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-orbit-blue text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4.5 w-4.5 flex-shrink-0 h-[18px] w-[18px]" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-orbit-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-white/10">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-orbit-blue flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {userName?.charAt(0)?.toUpperCase() ?? "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{userName ?? "User"}</div>
              <div className="text-xs text-white/50 truncate">{userEmail}</div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex justify-center p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
