"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

interface DashboardTopbarProps {
  user: {
    name: string;
    email: string;
    role: string;
    image?: string;
  };
  onMenuToggle?: () => void;
}

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  AGENCY_OWNER: "Agency Owner",
  RECRUITER: "Recruiter",
  CONCIERGE_MANAGER: "Concierge Manager",
  MSP_VIEWER: "MSP Viewer",
  CANDIDATE: "Candidate",
  VENDOR: "Vendor",
};

function generateBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    crumbs.push({
      label: segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      href: currentPath,
    });
  }

  return crumbs;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function DashboardTopbar({ user, onMenuToggle }: DashboardTopbarProps) {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const [notificationCount] = useState(3);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-[#1F2937]/10 bg-white/80 backdrop-blur-xl">
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu className="h-5 w-5 text-[#1F2937]" />
        </Button>

        {/* Breadcrumbs */}
        <nav className="hidden items-center gap-1 text-sm text-[#1F2937]/50 md:flex">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.href}>
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-[#1F2937]/30" />
              )}
              <span
                className={cn(
                  "transition-colors",
                  index === breadcrumbs.length - 1
                    ? "font-medium text-[#1F2937]"
                    : "hover:text-[#0B3C5D]"
                )}
              >
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="hidden w-full max-w-sm lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F2937]/40" />
            <Input
              placeholder="Search anything..."
              className="h-9 border-[#1F2937]/10 bg-[#F8FAFC] pl-9 text-sm focus-visible:ring-[#0B3C5D]/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5 text-[#1F2937]/70" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5 text-[#1F2937]/70" />
            {notificationCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E63946] px-1 text-[10px] font-bold text-white">
                {notificationCount}
              </span>
            )}
          </Button>

          <Separator orientation="vertical" className="mx-1 h-8 bg-[#1F2937]/10" />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3C5D]">
                <Avatar className="h-8 w-8 border-2 border-[#0B3C5D]/10">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="bg-[#0B3C5D] text-xs font-semibold text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden flex-col items-start md:flex">
                  <span className="text-sm font-semibold text-[#1F2937]">
                    {user.name}
                  </span>
                  <span className="text-[11px] text-[#1F2937]/50">
                    {roleLabels[user.role] || user.role}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-[#1F2937]/10 bg-white"
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-[#1F2937]">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#1F2937]/50">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1F2937]/10" />
              <DropdownMenuItem className="cursor-pointer gap-2 text-[#1F2937] focus:bg-[#0B3C5D]/5 focus:text-[#0B3C5D]">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2 text-[#1F2937] focus:bg-[#0B3C5D]/5 focus:text-[#0B3C5D]">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#1F2937]/10" />
              <DropdownMenuItem
                className="cursor-pointer gap-2 text-[#E63946] focus:bg-[#E63946]/5 focus:text-[#E63946]"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
