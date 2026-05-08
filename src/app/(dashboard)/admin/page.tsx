"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, getStatusColor } from "@/lib/utils";
import {
  Users,
  Building2,
  Send,
  Briefcase,
  DollarSign,
  Brain,
  Shield,
  UserPlus,
  FileText,
  Activity,
  Server,
  Database,
  Cpu,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const platformKpis = [
  { label: "Total Users", value: "1,247", icon: <Users className="h-5 w-5 text-[#0B3C5D]" />, change: "+34 this month" },
  { label: "Active Agencies", value: 23, icon: <Building2 className="h-5 w-5 text-blue-500" />, change: "+2 this quarter" },
  { label: "Total Offers", value: "3,891", icon: <Send className="h-5 w-5 text-purple-500" />, change: "+147 this month" },
  { label: "Active Assignments", value: 412, icon: <Briefcase className="h-5 w-5 text-emerald-500" />, change: "+28 this month" },
  { label: "Revenue (MRR)", value: "$48.5K", icon: <DollarSign className="h-5 w-5 text-amber-500" />, change: "+12% MoM" },
  { label: "AI Usage", value: "12.4K", icon: <Brain className="h-5 w-5 text-[#E63946]" />, change: "Predictions this month" },
];

const recentRegistrations = [
  { name: "Apex Healthcare Group", type: "Agency", email: "admin@apexhealthcare.com", date: "2026-05-08", status: "Pending" },
  { name: "Dr. Patricia Hernandez", type: "Candidate", email: "p.hernandez@email.com", date: "2026-05-08", status: "Active" },
  { name: "MedTravel Housing Co.", type: "Vendor", email: "info@medtravelhousing.com", date: "2026-05-07", status: "Pending" },
  { name: "NurseFlex Partners", type: "Agency", email: "ops@nurseflex.com", date: "2026-05-07", status: "Active" },
  { name: "Kevin Patel, ST", type: "Candidate", email: "k.patel@email.com", date: "2026-05-06", status: "Active" },
];

const systemHealth = [
  { name: "API Server", status: "Healthy", uptime: "99.99%", icon: <Server className="h-5 w-5" />, color: "text-emerald-500" },
  { name: "Database", status: "Healthy", uptime: "99.98%", icon: <Database className="h-5 w-5" />, color: "text-emerald-500" },
  { name: "AI Engine", status: "Healthy", uptime: "99.95%", icon: <Cpu className="h-5 w-5" />, color: "text-emerald-500" },
  { name: "Email Service", status: "Degraded", uptime: "98.7%", icon: <Activity className="h-5 w-5" />, color: "text-amber-500" },
];

const auditEntries = [
  { time: "3:15 PM", user: "admin@trital.com", action: "User role updated", entity: "Users", details: "Changed Robert Taylor role from CANDIDATE to RECRUITER" },
  { time: "2:48 PM", user: "system", action: "Subscription renewed", entity: "Billing", details: "Apex Healthcare - Pro Plan auto-renewed" },
  { time: "1:22 PM", user: "admin@trital.com", action: "Agency approved", entity: "Agencies", details: "NurseFlex Partners registration approved" },
  { time: "12:05 PM", user: "system", action: "AI model updated", entity: "System", details: "Risk prediction model v3.2 deployed" },
  { time: "11:30 AM", user: "admin@trital.com", action: "Vendor verified", entity: "Vendors", details: "MedTravel Housing Co. verification completed" },
];

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1F2937]">Admin Control Center</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Platform-wide management and monitoring</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {platformKpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="mb-2">{kpi.icon}</div>
                <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                <p className="text-xs text-[#1F2937]/60">{kpi.label}</p>
                <p className="text-[10px] text-[#1F2937]/40 mt-0.5">{kpi.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/admin/users">
            <Button variant="outline" className="w-full h-12 border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-[#0B3C5D]/5 justify-start">
              <Users className="h-4 w-4 mr-2" /> Manage Users
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </Link>
          <Link href="/admin/agencies">
            <Button variant="outline" className="w-full h-12 border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-[#0B3C5D]/5 justify-start">
              <Building2 className="h-4 w-4 mr-2" /> Manage Agencies
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </Link>
          <Link href="/admin/audit-logs">
            <Button variant="outline" className="w-full h-12 border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-[#0B3C5D]/5 justify-start">
              <FileText className="h-4 w-4 mr-2" /> View Audit Logs
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[#0B3C5D]" />
                Recent Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1F2937]/10">
                      <th className="text-left py-2 px-3 font-medium text-[#1F2937]/60">Name</th>
                      <th className="text-left py-2 px-3 font-medium text-[#1F2937]/60">Type</th>
                      <th className="text-left py-2 px-3 font-medium text-[#1F2937]/60">Date</th>
                      <th className="text-left py-2 px-3 font-medium text-[#1F2937]/60">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRegistrations.map((reg) => (
                      <tr key={reg.email} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                        <td className="py-2 px-3">
                          <p className="font-medium text-[#1F2937]">{reg.name}</p>
                          <p className="text-[10px] text-[#1F2937]/40">{reg.email}</p>
                        </td>
                        <td className="py-2 px-3">
                          <Badge variant="secondary" className="text-xs">{reg.type}</Badge>
                        </td>
                        <td className="py-2 px-3 text-xs text-[#1F2937]/60">{formatDate(reg.date)}</td>
                        <td className="py-2 px-3">
                          <Badge className={cn("text-xs", getStatusColor(reg.status))} variant="outline">
                            {reg.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0B3C5D]" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemHealth.map((service) => (
                <div key={service.name} className="flex items-center justify-between rounded-lg border border-[#1F2937]/10 p-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("shrink-0", service.color)}>{service.icon}</div>
                    <div>
                      <p className="font-medium text-sm text-[#1F2937]">{service.name}</p>
                      <p className="text-xs text-[#1F2937]/40">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <Badge
                    variant={service.status === "Healthy" ? "success" : "warning"}
                    className="text-xs"
                  >
                    {service.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#0B3C5D]" />
                Recent Audit Log
              </CardTitle>
              <Link href="/admin/audit-logs">
                <Button variant="ghost" size="sm" className="text-xs text-[#0B3C5D]">
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditEntries.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border border-[#1F2937]/5 p-3">
                  <span className="text-xs font-mono text-[#1F2937]/40 w-16 shrink-0 pt-0.5">{entry.time}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-[#1F2937]">{entry.action}</span>
                      <Badge variant="secondary" className="text-[10px]">{entry.entity}</Badge>
                    </div>
                    <p className="text-xs text-[#1F2937]/60">{entry.details}</p>
                    <p className="text-[10px] text-[#1F2937]/30 mt-0.5">by {entry.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
