"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, Filter, Download, CheckCircle2, AlertTriangle, Clock,
  Home, Plane, FileText, Activity, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { RiskBadge } from "@/components/dashboard/risk-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

interface ReadinessRecord {
  id: string;
  candidateName: string;
  role: string;
  facilityName: string;
  facilityCity: string;
  facilityState: string;
  startDate: string | null;
  housingStatus: string;
  travelStatus: string;
  documentStatus: string;
  overallStatus: string;
  riskScore: number | null;
  actionNeeded: string | null;
}

const mockData: ReadinessRecord[] = [
  {
    id: "1", candidateName: "Maria Santos", role: "RN - ICU",
    facilityName: "St. Mary's Medical", facilityCity: "Phoenix", facilityState: "AZ",
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    housingStatus: "NOT_REQUESTED", travelStatus: "CONFIRMED", documentStatus: "VERIFIED",
    overallStatus: "AT_RISK", riskScore: 82, actionNeeded: "Housing not confirmed — 5 days to start",
  },
  {
    id: "2", candidateName: "David Chen", role: "PT",
    facilityName: "Valley Health System", facilityCity: "Dallas", facilityState: "TX",
    startDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    housingStatus: "CONFIRMED", travelStatus: "BOOKED", documentStatus: "VERIFIED",
    overallStatus: "READY", riskScore: 18, actionNeeded: null,
  },
  {
    id: "3", candidateName: "Lisa Park", role: "CRNA",
    facilityName: "Northern Medical Center", facilityCity: "Chicago", facilityState: "IL",
    startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    housingStatus: "IN_PROGRESS", travelStatus: "NOT_REQUESTED", documentStatus: "PENDING",
    overallStatus: "IN_PROGRESS", riskScore: 45, actionNeeded: "Documents pending review",
  },
  {
    id: "4", candidateName: "James Okafor", role: "RN - ER",
    facilityName: "Mercy Hospital", facilityCity: "Seattle", facilityState: "WA",
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    housingStatus: "NOT_REQUESTED", travelStatus: "NOT_REQUESTED", documentStatus: "PENDING",
    overallStatus: "CRITICAL", riskScore: 94, actionNeeded: "URGENT: 3 days to start, nothing confirmed",
  },
];

export default function AssignmentLaunchPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data] = useState<ReadinessRecord[]>(mockData);

  const filtered = data.filter((r) => {
    const matchSearch = r.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      r.facilityName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.overallStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    critical: data.filter(r => r.overallStatus === "CRITICAL").length,
    atRisk: data.filter(r => r.overallStatus === "AT_RISK").length,
    ready: data.filter(r => r.overallStatus === "READY").length,
    inProgress: data.filter(r => r.overallStatus === "IN_PROGRESS").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Assignment Launch Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Track candidate readiness from offer acceptance to day one</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Status KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Critical", count: statusCounts.critical, color: "bg-red-50 border-red-200", textColor: "text-red-700", icon: AlertTriangle },
          { label: "At Risk", count: statusCounts.atRisk, color: "bg-orange-50 border-orange-200", textColor: "text-orange-700", icon: Clock },
          { label: "In Progress", count: statusCounts.inProgress, color: "bg-amber-50 border-amber-200", textColor: "text-amber-700", icon: Activity },
          { label: "Ready", count: statusCounts.ready, color: "bg-emerald-50 border-emerald-200", textColor: "text-emerald-700", icon: CheckCircle2 },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl border p-4 ${item.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`h-4 w-4 ${item.textColor}`} />
              <span className={`text-xs font-semibold uppercase tracking-wider ${item.textColor}`}>{item.label}</span>
            </div>
            <div className={`text-3xl font-bold ${item.textColor}`}>{item.count}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search candidates..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
            <SelectItem value="AT_RISK">At Risk</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="READY">Ready</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Candidate</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Facility</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Start Date</th>
                  <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Housing</th>
                  <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Travel</th>
                  <th className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Docs</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Risk</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-sm text-orbit-dark">{record.candidateName}</div>
                      <div className="text-xs text-slate-500">{record.role}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm text-orbit-dark">{record.facilityName}</div>
                      <div className="text-xs text-slate-500">{record.facilityCity}, {record.facilityState}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-sm text-orbit-dark">{record.startDate ? formatDate(record.startDate) : "TBD"}</div>
                      {record.startDate && (
                        <div className="text-xs text-slate-400">
                          {Math.ceil((new Date(record.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusIcon status={record.housingStatus} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusIcon status={record.travelStatus} />
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <StatusIcon status={record.documentStatus} />
                    </td>
                    <td className="px-4 py-3.5">
                      {record.riskScore !== null && (
                        <RiskBadge score={record.riskScore} showScore />
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      {record.actionNeeded ? (
                        <div className="flex items-start gap-2">
                          <AlertTriangle className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${
                            record.overallStatus === "CRITICAL" ? "text-red-500" : "text-orange-500"
                          }`} />
                          <span className="text-xs text-slate-600 max-w-[200px]">{record.actionNeeded}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-emerald-500 font-medium">On track</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <Zap className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No candidates match your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "CONFIRMED" || status === "VERIFIED" || status === "BOOKED") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />;
  }
  if (status === "IN_PROGRESS" || status === "REQUESTED") {
    return <Clock className="h-4 w-4 text-amber-500 mx-auto" />;
  }
  return <div className="h-4 w-4 rounded-full border-2 border-slate-300 mx-auto" />;
}
