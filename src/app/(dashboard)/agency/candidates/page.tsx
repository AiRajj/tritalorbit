"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getStatusColor } from "@/lib/utils";
import {
  Search,
  User,
  MapPin,
  Clock,
  Eye,
  MoreHorizontal,
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
} from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  specialty: string;
  licenseState: string;
  experience: string;
  status: string;
  riskScore: number;
  lastActivity: string;
}

const candidates: Candidate[] = [
  { id: "C-001", name: "Sarah Mitchell", specialty: "ICU - Registered Nurse", licenseState: "MN, WI, IA", experience: "8 years", status: "Active", riskScore: 22, lastActivity: "2 hours ago" },
  { id: "C-002", name: "James Carter", specialty: "LPN - Long Term Care", licenseState: "OH, PA", experience: "5 years", status: "Active", riskScore: 15, lastActivity: "1 day ago" },
  { id: "C-003", name: "Maria Rodriguez", specialty: "ER - Registered Nurse", licenseState: "CA, NV, AZ", experience: "3 years", status: "Pending", riskScore: 68, lastActivity: "3 hours ago" },
  { id: "C-004", name: "David Kim", specialty: "CNA - Skilled Nursing", licenseState: "MD, VA, DC", experience: "4 years", status: "Active", riskScore: 10, lastActivity: "5 hours ago" },
  { id: "C-005", name: "Emily Watson", specialty: "ICU - Registered Nurse", licenseState: "MA, NY, CT", experience: "12 years", status: "Inactive", riskScore: 85, lastActivity: "5 days ago" },
  { id: "C-006", name: "Michael Brown", specialty: "Respiratory Therapist", licenseState: "CA, OR", experience: "6 years", status: "Active", riskScore: 45, lastActivity: "1 hour ago" },
  { id: "C-007", name: "Lisa Chen", specialty: "Nurse Practitioner", licenseState: "NY, NJ, PA", experience: "10 years", status: "Active", riskScore: 8, lastActivity: "30 min ago" },
  { id: "C-008", name: "Robert Taylor", specialty: "Med-Surg - Registered Nurse", licenseState: "IL, IN, WI", experience: "7 years", status: "Pending", riskScore: 72, lastActivity: "4 hours ago" },
  { id: "C-009", name: "Angela Foster", specialty: "Telemetry - Registered Nurse", licenseState: "TX, OK, LA", experience: "9 years", status: "Active", riskScore: 18, lastActivity: "2 days ago" },
  { id: "C-010", name: "Kevin Patel", specialty: "OR - Surgical Tech", licenseState: "FL, GA", experience: "5 years", status: "Active", riskScore: 30, lastActivity: "6 hours ago" },
];

const statuses = ["All", "Active", "Pending", "Inactive"];

function getRiskColor(score: number): string {
  if (score >= 70) return "text-[#E63946] bg-red-50";
  if (score >= 40) return "text-amber-600 bg-amber-50";
  return "text-emerald-600 bg-emerald-50";
}

export default function CandidatesPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.licenseState.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: candidates.length,
    active: candidates.filter((c) => c.status === "Active").length,
    pending: candidates.filter((c) => c.status === "Pending").length,
    highRisk: candidates.filter((c) => c.riskScore >= 60).length,
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-[500px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">Candidates</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Manage and track all your healthcare professionals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Candidates", value: stats.total, icon: <Users className="h-5 w-5 text-[#0B3C5D]" /> },
          { label: "Active", value: stats.active, icon: <UserCheck className="h-5 w-5 text-emerald-500" /> },
          { label: "Pending Review", value: stats.pending, icon: <Clock className="h-5 w-5 text-amber-500" /> },
          { label: "High Risk", value: stats.highRisk, icon: <AlertTriangle className="h-5 w-5 text-[#E63946]" /> },
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
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
            <Input
              placeholder="Search by name, specialty, location..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {statuses.map((s) => (
              <Button
                key={s}
                variant={statusFilter === s ? "default" : "outline"}
                size="sm"
                className={cn(
                  "text-xs",
                  statusFilter === s && "bg-[#0B3C5D] hover:bg-[#0B3C5D]/90"
                )}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <UserX className="h-12 w-12 text-[#1F2937]/20 mb-4" />
                <h3 className="text-lg font-semibold text-[#1F2937]/60">No candidates found</h3>
                <p className="text-sm text-[#1F2937]/40 mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1F2937]/10 bg-[#1F2937]/[0.02]">
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Specialty</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">License States</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Experience</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Risk Score</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Last Activity</th>
                      <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-[#0B3C5D]" />
                            </div>
                            <span className="font-medium text-[#1F2937]">{candidate.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#1F2937]/70">{candidate.specialty}</td>
                        <td className="py-3 px-4">
                          <span className="flex items-center gap-1 text-[#1F2937]/70">
                            <MapPin className="h-3 w-3" />
                            {candidate.licenseState}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#1F2937]/70">{candidate.experience}</td>
                        <td className="py-3 px-4">
                          <Badge className={cn("text-xs", getStatusColor(candidate.status))} variant="outline">
                            {candidate.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn("inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold", getRiskColor(candidate.riskScore))}>
                            {candidate.riskScore}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#1F2937]/50 text-xs">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {candidate.lastActivity}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
