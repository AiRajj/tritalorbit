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
import {
  Search,
  Download,
  Calendar,
  Shield,
  User,
  Settings,
  FileText,
  Database,
  CreditCard,
  Building2,
  ChevronDown,
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
}

const auditLogs: AuditLog[] = [
  { id: "AL-001", timestamp: "2026-05-08 15:15:22", user: "admin@trital.com", userRole: "Admin", action: "User Role Updated", entity: "Users", entityId: "U-009", details: "Changed Robert Taylor role from CANDIDATE to RECRUITER", ipAddress: "192.168.1.45" },
  { id: "AL-002", timestamp: "2026-05-08 14:48:33", user: "system", userRole: "System", action: "Subscription Renewed", entity: "Billing", entityId: "SUB-012", details: "Apex Healthcare - Pro Plan auto-renewed ($799/mo)", ipAddress: "—" },
  { id: "AL-003", timestamp: "2026-05-08 13:22:11", user: "admin@trital.com", userRole: "Admin", action: "Agency Approved", entity: "Agencies", entityId: "AG-005", details: "NurseFlex Partners registration approved and activated", ipAddress: "192.168.1.45" },
  { id: "AL-004", timestamp: "2026-05-08 12:05:47", user: "system", userRole: "System", action: "AI Model Deployed", entity: "System", entityId: "ML-032", details: "Risk prediction model v3.2 deployed successfully", ipAddress: "—" },
  { id: "AL-005", timestamp: "2026-05-08 11:30:19", user: "admin@trital.com", userRole: "Admin", action: "Vendor Verified", entity: "Vendors", entityId: "V-001", details: "MedTravel Housing Co. verification completed and approved", ipAddress: "192.168.1.45" },
  { id: "AL-006", timestamp: "2026-05-08 10:15:03", user: "a.pierce@apexhc.com", userRole: "Agency Admin", action: "Offer Created", entity: "Offers", entityId: "OF-1008", details: "New offer created for Robert Taylor at Northwestern Memorial", ipAddress: "203.45.67.89" },
  { id: "AL-007", timestamp: "2026-05-08 09:42:55", user: "t.henderson@apexhc.com", userRole: "Recruiter", action: "Candidate Updated", entity: "Candidates", entityId: "C-003", details: "Updated Maria Rodriguez profile - added CA license", ipAddress: "203.45.67.91" },
  { id: "AL-008", timestamp: "2026-05-08 09:01:12", user: "system", userRole: "System", action: "Backup Completed", entity: "System", entityId: "BK-445", details: "Daily database backup completed successfully (2.3 GB)", ipAddress: "—" },
  { id: "AL-009", timestamp: "2026-05-07 17:30:44", user: "admin@trital.com", userRole: "Admin", action: "User Deactivated", entity: "Users", entityId: "U-006", details: "Emily Watson account deactivated due to inactivity", ipAddress: "192.168.1.45" },
  { id: "AL-010", timestamp: "2026-05-07 16:18:22", user: "r.cole@medpro.com", userRole: "Agency Admin", action: "Offer Cancelled", entity: "Offers", entityId: "OF-0982", details: "Cancelled offer for Kevin Patel at Cleveland Clinic", ipAddress: "174.56.78.12" },
  { id: "AL-011", timestamp: "2026-05-07 15:05:33", user: "system", userRole: "System", action: "Email Alert Sent", entity: "Notifications", entityId: "NTF-891", details: "Risk alert email sent to 3 recruiters about high-risk candidates", ipAddress: "—" },
  { id: "AL-012", timestamp: "2026-05-07 14:22:17", user: "k.walsh@trital.com", userRole: "MSP Admin", action: "Report Generated", entity: "Reports", entityId: "RPT-067", details: "Monthly supplier performance report generated and exported", ipAddress: "10.0.0.55" },
  { id: "AL-013", timestamp: "2026-05-07 13:45:09", user: "admin@trital.com", userRole: "Admin", action: "Settings Updated", entity: "System", entityId: "CFG-001", details: "Updated risk scoring thresholds: high=70, critical=85", ipAddress: "192.168.1.45" },
  { id: "AL-014", timestamp: "2026-05-07 12:10:55", user: "d.reeves@nurseflex.com", userRole: "Agency Admin", action: "User Invited", entity: "Users", entityId: "INV-234", details: "Invited new recruiter: mark.jones@nurseflex.com", ipAddress: "67.89.12.34" },
  { id: "AL-015", timestamp: "2026-05-07 11:00:41", user: "system", userRole: "System", action: "Certificate Renewed", entity: "System", entityId: "CRT-002", details: "SSL certificate auto-renewed for api.tritalorbit.com", ipAddress: "—" },
];

function getEntityIcon(entity: string) {
  switch (entity) {
    case "Users": return <User className="h-4 w-4 text-blue-500" />;
    case "Billing": return <CreditCard className="h-4 w-4 text-emerald-500" />;
    case "Agencies": return <Building2 className="h-4 w-4 text-purple-500" />;
    case "System": return <Settings className="h-4 w-4 text-[#1F2937]/50" />;
    case "Vendors": return <Shield className="h-4 w-4 text-amber-500" />;
    case "Offers": return <FileText className="h-4 w-4 text-[#0B3C5D]" />;
    case "Candidates": return <User className="h-4 w-4 text-[#0B3C5D]" />;
    case "Reports": return <Database className="h-4 w-4 text-blue-500" />;
    case "Notifications": return <FileText className="h-4 w-4 text-amber-500" />;
    default: return <FileText className="h-4 w-4 text-[#1F2937]/40" />;
  }
}

function getRoleBadgeVariant(role: string) {
  switch (role) {
    case "Admin": return "destructive" as const;
    case "System": return "secondary" as const;
    case "Agency Admin": return "default" as const;
    case "MSP Admin": return "warning" as const;
    default: return "outline" as const;
  }
}

export default function AdminAuditLogsPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [entityFilter, setEntityFilter] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const entities = ["All", ...Array.from(new Set(auditLogs.map((l) => l.entity)))];

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEntity = entityFilter === "All" || log.entity === entityFilter;
    return matchesSearch && matchesEntity;
  });

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-40" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[600px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-[#1F2937]">Audit Logs</h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">Complete activity trail across the platform</p>
        </motion.div>
        <Button variant="outline" className="text-xs">
          <Download className="h-3 w-3 mr-1.5" /> Export Logs
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
            <Input
              placeholder="Search actions, users, details..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-[#1F2937]/20 rounded-lg px-4 py-2 pr-8 text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#0B3C5D]"
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
            >
              {entities.map((e) => (
                <option key={e} value={e}>{e === "All" ? "All Entities" : e}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40 pointer-events-none" />
          </div>
          <div className="flex items-center gap-2 border border-[#1F2937]/20 rounded-lg px-3 py-2 text-sm">
            <Calendar className="h-4 w-4 text-[#1F2937]/40" />
            <span className="text-[#1F2937]/70">Last 7 days</span>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10 bg-[#1F2937]/[0.02]">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60 w-40">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">User</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Entity</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((log) => (
                    <tr key={log.id} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs text-[#1F2937]/50">{log.timestamp}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-xs text-[#1F2937]">{log.user}</p>
                          <Badge variant={getRoleBadgeVariant(log.userRole)} className="text-[10px] mt-0.5">
                            {log.userRole}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#1F2937]">{log.action}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1.5">
                          {getEntityIcon(log.entity)}
                          <span className="text-[#1F2937]/70">{log.entity}</span>
                          <span className="text-[10px] text-[#1F2937]/30 font-mono">{log.entityId}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-xs text-[#1F2937]/60 truncate">{log.details}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <p className="text-xs text-[#1F2937]/40 text-center">
          Showing {filtered.length} of {auditLogs.length} entries
        </p>
      </motion.div>
    </div>
  );
}
