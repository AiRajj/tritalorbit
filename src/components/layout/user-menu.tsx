"use client";

import { signOut } from "next-auth/react";
import { Bell, LogOut, Search, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UserMenu({ name, email }: { name: string; email: string }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search candidates, offers, tasks..." className="pl-9" />
        </div>
        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>
        <div className="ml-auto hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 sm:flex">
          <UserRound className="h-4 w-4 text-[#0B3C5D]" />
          <div className="text-sm">
            <p className="font-medium text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOut className="mr-1 h-4 w-4" /> Logout
        </Button>
      </div>
    </header>
  );
}
