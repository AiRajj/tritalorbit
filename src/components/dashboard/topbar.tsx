"use client";
import * as React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Bell, LogOut, Search, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { initialsOf } from "@/lib/utils";
import { ROLE_LABEL } from "@/lib/rbac";
import type { UserRole } from "@prisma/client";

export function DashboardTopbar({
  user,
  notificationCount = 0,
}: {
  user: { name?: string | null; email?: string | null; role: UserRole };
  notificationCount?: number;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-orbit-deep/10 bg-white/80 px-4 backdrop-blur-xl md:px-8">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search candidates, offers, vendors…"
          className="pl-9"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-orbit-deep/10 bg-white text-orbit-deep hover:bg-orbit-deep/5">
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-orbit-red px-1 text-[0.6rem] font-semibold text-white">
                  {notificationCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notificationCount === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-slate-500">
                <Bell className="mx-auto h-5 w-5 text-slate-300" />
                <div className="mt-2">You're all caught up.</div>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem asChild>
                  <Link href="/agency/activity" className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-orbit-red" />
                    <div>
                      <div className="text-sm font-medium">Risk score above 75</div>
                      <div className="text-xs text-slate-500">Candidate Maya R. needs attention</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg border border-orbit-deep/10 bg-white p-1 pr-3 hover:bg-orbit-deep/5">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{initialsOf(user.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden text-left text-xs md:block">
                <div className="font-semibold text-orbit-deep">{user.name || user.email}</div>
                <div className="text-slate-500">{ROLE_LABEL[user.role]}</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="text-sm font-medium text-orbit-deep">{user.name || user.email}</div>
              <div className="text-xs text-slate-500">{user.email}</div>
              <Badge variant="muted" className="mt-2">{ROLE_LABEL[user.role]}</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/account/profile">
                <User className="mr-2 h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/account/settings">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
