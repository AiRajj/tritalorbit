"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, getStatusColor } from "@/lib/utils";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Shield,
  Edit,
  Ban,
  ChevronDown,
  Plus,
} from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  agency: string;
  status: string;
  created: string;
}

const users: UserRecord[] = [
  { id: "U-001", name: "Sarah Mitchell", email: "s.mitchell@apexhc.com", role: "Candidate", agency: "Apex Healthcare", status: "Active", created: "2026-01-15" },
  { id: "U-002", name: "Tom Henderson", email: "t.henderson@apexhc.com", role: "Recruiter", agency: "Apex Healthcare", status: "Active", created: "2025-11-03" },
  { id: "U-003", name: "Maria Rodriguez", email: "m.rodriguez@medpro.com", role: "Candidate", agency: "MedPro Travel", status: "Active", created: "2026-03-22" },
  { id: "U-004", name: "James Carter", email: "j.carter@nurseflex.com", role: "Candidate", agency: "NurseFlex Partners", status: "Active", created: "2026-02-10" },
  { id: "U-005", name: "Amanda Pierce", email: "a.pierce@apexhc.com", role: "Agency Admin", agency: "Apex Healthcare", status: "Active", created: "2025-09-18" },
  { id: "U-006", name: "Emily Watson", email: "e.watson@medpro.com", role: "Candidate", agency: "MedPro Travel", status: "Inactive", created: "2025-12-01" },
  { id: "U-007", name: "David Kim", email: "d.kim@travelcare.com", role: "Candidate", agency: "TravelCare Solutions", status: "Active", created: "2026-04-05" },
  { id: "U-008", name: "Lisa Chen", email: "l.chen@nurseflex.com", role: "Candidate", agency: "NurseFlex Partners", status: "Active", created: "2026-01-28" },
  { id: "U-009", name: "Robert Taylor", email: "r.taylor@healthbridge.com", role: "Candidate", agency: "HealthBridge Staffing", status: "Suspended", created: "2025-10-15" },
  { id: "U-010", name: "Karen Walsh", email: "k.walsh@trital.com", role: "MSP Admin", agency: "TRITAL", status: "Active", created: "2025-08-01" },
];

const roles = ["All", "Candidate", "Recruiter", "Agency Admin", "MSP Admin", "Vendor", "Concierge"];

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.agency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    inactive: users.filter((u) => u.status === "Inactive").length,
    suspended: users.filter((u) => u.status === "Suspended").length,
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-52" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-[500px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-[#1F2937]">User Management</h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">Manage all platform users and their roles</p>
        </motion.div>
        <Button className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white">
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: stats.total, icon: <Users className="h-5 w-5 text-[#0B3C5D]" /> },
          { label: "Active", value: stats.active, icon: <UserCheck className="h-5 w-5 text-emerald-500" /> },
          { label: "Inactive", value: stats.inactive, icon: <UserX className="h-5 w-5 text-[#1F2937]/40" /> },
          { label: "Suspended", value: stats.suspended, icon: <Ban className="h-5 w-5 text-[#E63946]" /> },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-lg bg-[#0B3C5D]/5 p-2.5">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
                  <p className="text-xs text-[#1F2937]/60">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
            <Input
              placeholder="Search by name, email, agency..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#1F2937]/20 rounded-lg px-4 py-2 pr-8 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r === "All" ? "All Roles" : r}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10 bg-[#1F2937]/[0.02]">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Agency</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Created</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{user.name}</td>
                      <td className="py-3 px-4 text-[#1F2937]/60 text-xs">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]/70">{user.agency}</td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(user.status))} variant="outline">
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]/50 text-xs">{formatDate(user.created)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#E63946] hover:text-[#E63946]" title="Deactivate">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
