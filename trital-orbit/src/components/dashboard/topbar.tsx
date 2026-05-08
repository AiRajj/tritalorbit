"use client";

import React, { useState } from "react";
import { Bell, Search, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface TopbarProps {
  title?: string;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  userRole?: string;
  notificationCount?: number;
}

export function Topbar({
  title,
  userName,
  userEmail,
  userAvatar,
  userRole,
  notificationCount = 0,
}: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const initials = userName
    ?.split(" ")
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase() ?? "U";

  const roleLabel: Record<string, string> = {
    SUPER_ADMIN: "Super Admin",
    AGENCY_OWNER: "Agency Owner",
    RECRUITER: "Recruiter",
    CONCIERGE_MANAGER: "Concierge Manager",
    MSP_VIEWER: "MSP Viewer",
    CANDIDATE: "Clinician",
    VENDOR: "Vendor",
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4 flex-1">
        {title && (
          <h1 className="text-xl font-semibold text-orbit-dark">{title}</h1>
        )}
        <div className="relative max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search offers, candidates..."
            className="pl-9 h-9 bg-slate-50 border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5 text-slate-500" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-orbit-red text-white text-xs rounded-full flex items-center justify-center font-bold">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-orbit-dark">{userName ?? "User"}</div>
                <div className="text-xs text-slate-500">{roleLabel[userRole ?? ""] ?? userRole}</div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <div className="font-medium">{userName}</div>
                <div className="text-xs text-slate-500 font-normal">{userEmail}</div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
