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
import { cn, getStatusColor } from "@/lib/utils";
import {
  Search,
  Building2,
  Eye,
  Edit,
  MoreHorizontal,
  Users,
  Send,
  Plus,
  Mail,
} from "lucide-react";

interface Agency {
  id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  users: number;
  activeOffers: number;
  subscription: string;
  status: string;
}

const agencies: Agency[] = [
  { id: "AG-001", name: "Apex Healthcare Staffing", contactName: "Amanda Pierce", contactEmail: "a.pierce@apexhc.com", contactPhone: "(612) 555-0142", users: 42, activeOffers: 45, subscription: "Enterprise", status: "Active" },
  { id: "AG-002", name: "MedPro Travel Nurses", contactName: "Richard Cole", contactEmail: "r.cole@medpro.com", contactPhone: "(214) 555-0198", users: 35, activeOffers: 38, subscription: "Pro", status: "Active" },
  { id: "AG-003", name: "NurseFlex Partners", contactName: "Diana Reeves", contactEmail: "d.reeves@nurseflex.com", contactPhone: "(415) 555-0167", users: 28, activeOffers: 32, subscription: "Pro", status: "Active" },
  { id: "AG-004", name: "TravelCare Solutions", contactName: "Mark Sullivan", contactEmail: "m.sullivan@travelcare.com", contactPhone: "(305) 555-0123", users: 19, activeOffers: 28, subscription: "Starter", status: "Active" },
  { id: "AG-005", name: "HealthBridge Staffing", contactName: "Jennifer Park", contactEmail: "j.park@healthbridge.com", contactPhone: "(312) 555-0189", users: 15, activeOffers: 21, subscription: "Starter", status: "Pending" },
];

export default function AdminAgenciesPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = agencies.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-[#1F2937]">Agency Management</h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">Oversee all registered staffing agencies</p>
        </motion.div>
        <Button className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white">
          <Plus className="h-4 w-4 mr-2" /> Add Agency
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Agencies", value: agencies.length, icon: <Building2 className="h-5 w-5 text-[#0B3C5D]" /> },
          { label: "Total Users", value: agencies.reduce((s, a) => s + a.users, 0), icon: <Users className="h-5 w-5 text-blue-500" /> },
          { label: "Total Active Offers", value: agencies.reduce((s, a) => s + a.activeOffers, 0), icon: <Send className="h-5 w-5 text-emerald-500" /> },
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

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
          <Input
            placeholder="Search agencies..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10 bg-[#1F2937]/[0.02]">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Agency Name</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Active Offers</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Subscription</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((agency) => (
                    <tr key={agency.id} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-[#0B3C5D]/10 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-[#0B3C5D]" />
                          </div>
                          <span className="font-medium text-[#1F2937]">{agency.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-[#1F2937] text-xs font-medium">{agency.contactName}</p>
                        <p className="text-[10px] text-[#1F2937]/40 flex items-center gap-1"><Mail className="h-2.5 w-2.5" />{agency.contactEmail}</p>
                      </td>
                      <td className="py-3 px-4 text-center text-[#1F2937]">{agency.users}</td>
                      <td className="py-3 px-4 text-center text-[#1F2937]">{agency.activeOffers}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={agency.subscription === "Enterprise" ? "default" : agency.subscription === "Pro" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {agency.subscription}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(agency.status))} variant="outline">
                          {agency.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
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
