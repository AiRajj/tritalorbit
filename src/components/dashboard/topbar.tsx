"use client";

import Link from "next/link";
import { Bell, Search, UserCircle2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DashboardTopbar({ userName }: { userName?: string }) {
  return (
    <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <Input placeholder="Search offers, candidates, assignments..." className="pl-9" />
      </div>

      <div className="ml-4 flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 sm:flex">
          <UserCircle2 className="h-4 w-4" />
          {userName ?? "Orbit User"}
        </div>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </Button>
        <Button variant="ghost" asChild className="hidden sm:inline-flex">
          <Link href="/profile">Profile</Link>
        </Button>
      </div>
    </div>
  );
}
