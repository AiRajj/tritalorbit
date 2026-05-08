"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Home,
  Plane,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Users,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Activity,
} from "lucide-react";

type ChecklistItem = { item: string; status: string };

interface Assignment {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  role: string;
  facility: string;
  startDate: string;
  housingStatus: string;
  travelStatus: string;
  documentsStatus: string;
  readiness: number;
  riskScore: number;
  riskLevel: string;
  actionNeeded: string;
  checklist: ChecklistItem[];
}

const assignments: Assignment[] = [
  {
    id: "AL-001",
    candidateName: "Sarah Mitchell",
    candidateAvatar: "SM",
    role: "ICU Nurse (RN)",
    facility: "Mayo Clinic - Rochester",
    startDate: "2026-06-02",
    housingStatus: "Confirmed",
    travelStatus: "Booked",
    documentsStatus: "Complete",
    readiness: 95,
    riskScore: 2,
    riskLevel: "Low",
    actionNeeded: "Final walkthrough scheduled",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Complete" },
      { item: "Orientation materials sent", status: "Pending" },
    ],
  },
  {
    id: "AL-002",
    candidateName: "Marcus Johnson",
    candidateAvatar: "MJ",
    role: "OR Tech",
    facility: "Cleveland Clinic",
    startDate: "2026-06-09",
    housingStatus: "Pending",
    travelStatus: "Booked",
    documentsStatus: "Complete",
    readiness: 72,
    riskScore: 5,
    riskLevel: "Medium",
    actionNeeded: "Housing confirmation needed",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Pending" },
      { item: "Travel booked", status: "Complete" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-003",
    candidateName: "Emily Chen",
    candidateAvatar: "EC",
    role: "Physical Therapist",
    facility: "Johns Hopkins",
    startDate: "2026-05-26",
    housingStatus: "Confirmed",
    travelStatus: "Pending",
    documentsStatus: "Incomplete",
    readiness: 58,
    riskScore: 7,
    riskLevel: "High",
    actionNeeded: "Missing certifications & travel",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Pending" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Not Started" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-004",
    candidateName: "Robert Taylor",
    candidateAvatar: "RT",
    role: "ER Nurse (RN)",
    facility: "Cedars-Sinai",
    startDate: "2026-06-16",
    housingStatus: "Confirmed",
    travelStatus: "Booked",
    documentsStatus: "Complete",
    readiness: 88,
    riskScore: 3,
    riskLevel: "Low",
    actionNeeded: "Awaiting facility badge",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Complete" },
      { item: "Orientation materials sent", status: "Pending" },
    ],
  },
  {
    id: "AL-005",
    candidateName: "Lisa Rodriguez",
    candidateAvatar: "LR",
    role: "Med-Surg RN",
    facility: "Mass General",
    startDate: "2026-05-19",
    housingStatus: "Not Started",
    travelStatus: "Not Started",
    documentsStatus: "Missing",
    readiness: 22,
    riskScore: 9,
    riskLevel: "Critical",
    actionNeeded: "Urgent: All logistics pending",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Pending" },
      { item: "License verification", status: "Pending" },
      { item: "Housing confirmed", status: "Not Started" },
      { item: "Travel booked", status: "Not Started" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-006",
    candidateName: "David Park",
    candidateAvatar: "DP",
    role: "Respiratory Therapist",
    facility: "Stanford Health",
    startDate: "2026-06-23",
    housingStatus: "Pending",
    travelStatus: "Pending",
    documentsStatus: "Incomplete",
    readiness: 45,
    riskScore: 6,
    riskLevel: "Medium",
    actionNeeded: "Documents & housing follow-up",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Pending" },
      { item: "Housing confirmed", status: "Pending" },
      { item: "Travel booked", status: "Pending" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-007",
    candidateName: "Amanda Foster",
    candidateAvatar: "AF",
    role: "L&D Nurse (RN)",
    facility: "NYU Langone",
    startDate: "2026-06-02",
    housingStatus: "Confirmed",
    travelStatus: "Booked",
    documentsStatus: "Complete",
    readiness: 100,
    riskScore: 1,
    riskLevel: "Low",
    actionNeeded: "Ready — no action needed",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Complete" },
      { item: "Orientation materials sent", status: "Complete" },
    ],
  },
  {
    id: "AL-008",
    candidateName: "James Wilson",
    candidateAvatar: "JW",
    role: "Cath Lab Tech",
    facility: "Texas Medical Center",
    startDate: "2026-06-30",
    housingStatus: "Pending",
    travelStatus: "Pending",
    documentsStatus: "Complete",
    readiness: 65,
    riskScore: 4,
    riskLevel: "Medium",
    actionNeeded: "Housing options under review",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Pending" },
      { item: "Travel booked", status: "Pending" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-009",
    candidateName: "Nicole Adams",
    candidateAvatar: "NA",
    role: "NICU Nurse (RN)",
    facility: "Children's Hospital Philadelphia",
    startDate: "2026-05-22",
    housingStatus: "Not Started",
    travelStatus: "Pending",
    documentsStatus: "Missing",
    readiness: 18,
    riskScore: 10,
    riskLevel: "Critical",
    actionNeeded: "Escalate: Start date in 14 days",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Pending" },
      { item: "License verification", status: "Not Started" },
      { item: "Housing confirmed", status: "Not Started" },
      { item: "Travel booked", status: "Not Started" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-010",
    candidateName: "Kevin O'Brien",
    candidateAvatar: "KO",
    role: "Radiology Tech",
    facility: "Emory Healthcare",
    startDate: "2026-06-09",
    housingStatus: "Confirmed",
    travelStatus: "Booked",
    documentsStatus: "Complete",
    readiness: 92,
    riskScore: 2,
    riskLevel: "Low",
    actionNeeded: "Confirm parking pass",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Complete" },
      { item: "Orientation materials sent", status: "Pending" },
    ],
  },
  {
    id: "AL-011",
    candidateName: "Priya Sharma",
    candidateAvatar: "PS",
    role: "Telemetry RN",
    facility: "Northwestern Memorial",
    startDate: "2026-06-16",
    housingStatus: "Confirmed",
    travelStatus: "Pending",
    documentsStatus: "Incomplete",
    readiness: 70,
    riskScore: 5,
    riskLevel: "Medium",
    actionNeeded: "BLS certification expiring",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Pending" },
      { item: "Orientation materials sent", status: "Not Started" },
    ],
  },
  {
    id: "AL-012",
    candidateName: "Carlos Mendez",
    candidateAvatar: "CM",
    role: "Surgical Tech",
    facility: "UCSF Medical Center",
    startDate: "2026-06-23",
    housingStatus: "Confirmed",
    travelStatus: "Booked",
    documentsStatus: "Complete",
    readiness: 85,
    riskScore: 3,
    riskLevel: "Low",
    actionNeeded: "Send welcome packet",
    checklist: [
      { item: "Background check", status: "Complete" },
      { item: "Drug screening", status: "Complete" },
      { item: "License verification", status: "Complete" },
      { item: "Housing confirmed", status: "Complete" },
      { item: "Travel booked", status: "Complete" },
      { item: "Orientation materials sent", status: "Pending" },
    ],
  },
];

const aiRecommendations = [
  {
    id: 1,
    priority: "Critical",
    title: "Escalate Nicole Adams immediately",
    description:
      "Start date is May 22 (14 days away). Housing, documents, and license verification are unresolved. Auto-assign concierge and notify candidate.",
    type: "escalation",
  },
  {
    id: 2,
    priority: "Critical",
    title: "Emergency logistics for Lisa Rodriguez",
    description:
      "Start date May 19 — only 11 days out. No housing or travel booked. Recommend activating emergency housing network and booking refundable flight.",
    type: "escalation",
  },
  {
    id: 3,
    priority: "High",
    title: "Renew Priya Sharma's BLS certification",
    description:
      "BLS expires May 30, before her June 16 start date. Send automated reminder with nearest testing center locations in Chicago.",
    type: "compliance",
  },
  {
    id: 4,
    priority: "Medium",
    title: "Batch-confirm housing for 3 pending candidates",
    description:
      "Marcus Johnson, David Park, and James Wilson all need housing confirmation. Haven Suites has availability matching their needs.",
    type: "optimization",
  },
  {
    id: 5,
    priority: "Low",
    title: "Send welcome packets to 4 on-track candidates",
    description:
      "Sarah Mitchell, Robert Taylor, Kevin O'Brien, and Carlos Mendez are 85%+ ready. Auto-send digital welcome packets to finalize onboarding.",
    type: "engagement",
  },
];

function getItemStatusBadge(status: string, icon: React.ReactNode) {
  const styles: Record<string, string> = {
    Confirmed: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    Complete: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    Booked: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-500/10 text-amber-700 border-amber-200",
    Incomplete: "bg-amber-500/10 text-amber-700 border-amber-200",
    "Not Started": "bg-red-500/10 text-red-700 border-red-200",
    Missing: "bg-red-500/10 text-red-700 border-red-200",
  };
  return (
    <Badge variant="outline" className={cn("text-[11px] gap-1", styles[status])}>
      {icon}
      {status}
    </Badge>
  );
}

function getRiskBadge(score: number, level: string) {
  if (level === "Critical") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-sm font-bold text-red-600">{score}</span>
        <span className="text-[10px] text-red-500 font-medium">{level}</span>
      </span>
    );
  }
  const colors: Record<string, { text: string; dot: string }> = {
    Low: { text: "text-emerald-600", dot: "bg-emerald-500" },
    Medium: { text: "text-amber-600", dot: "bg-amber-500" },
    High: { text: "text-orange-600", dot: "bg-orange-500" },
  };
  const c = colors[level] || colors.Medium;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2 w-2 rounded-full", c.dot)} />
      <span className={cn("text-sm font-bold", c.text)}>{score}</span>
      <span className={cn("text-[10px] font-medium", c.text)}>{level}</span>
    </span>
  );
}

function getChecklistIcon(status: string) {
  if (status === "Complete") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "Pending") return <Clock className="h-4 w-4 text-amber-500" />;
  return <XCircle className="h-4 w-4 text-red-400" />;
}

function getPriorityColor(priority: string) {
  if (priority === "Critical") return "bg-red-500/10 text-red-700 border-red-200";
  if (priority === "High") return "bg-orange-500/10 text-orange-700 border-orange-200";
  if (priority === "Medium") return "bg-amber-500/10 text-amber-700 border-amber-200";
  return "bg-blue-500/10 text-blue-700 border-blue-200";
}

function getReadinessColor(value: number) {
  if (value >= 80) return "[&>div]:bg-emerald-500";
  if (value >= 50) return "[&>div]:bg-amber-500";
  return "[&>div]:bg-red-500";
}

export default function AssignmentLaunchPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = assignments.filter((a) => {
    const matchesSearch =
      !search ||
      a.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()) ||
      a.facility.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "on-track" && a.riskLevel === "Low") ||
      (statusFilter === "at-risk" && (a.riskLevel === "Medium" || a.riskLevel === "High")) ||
      (statusFilter === "critical" && a.riskLevel === "Critical");

    const matchesRisk =
      riskFilter === "all" ||
      a.riskLevel.toLowerCase() === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const stats = [
    { label: "Total Active", value: 24, icon: <Users className="h-5 w-5" />, color: "text-[#0B3C5D]", bg: "bg-[#0B3C5D]/5" },
    { label: "On Track", value: 18, icon: <ShieldCheck className="h-5 w-5" />, color: "text-emerald-600", bg: "bg-emerald-500/5" },
    { label: "At Risk", value: 4, icon: <ShieldAlert className="h-5 w-5" />, color: "text-amber-600", bg: "bg-amber-500/5" },
    { label: "Critical", value: 2, icon: <ShieldX className="h-5 w-5" />, color: "text-red-600", bg: "bg-red-500/5" },
  ];

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your CSV file is being generated and will download shortly.",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-72" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 rounded-xl" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937] flex items-center gap-2">
            <Activity className="h-6 w-6 text-[#0B3C5D]" />
            Assignment Launch Dashboard
          </h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">
            Track candidate readiness from offer acceptance to first day
          </p>
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          className="gap-2 border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-[#0B3C5D]/5"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </motion.div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("rounded-lg p-2.5", stat.bg)}>
                  <span className={stat.color}>{stat.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
                  <p className="text-xs text-[#1F2937]/60">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
                <Input
                  placeholder="Search candidates, roles, facilities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <Filter className="h-4 w-4 mr-2 text-[#1F2937]/40" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="on-track">On Track</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <AlertTriangle className="h-4 w-4 mr-2 text-[#1F2937]/40" />
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Desktop Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:block"
      >
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10 bg-[#0B3C5D]/[0.02]">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Candidate</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Facility</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Start Date</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Housing</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Travel</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Documents</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Readiness</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Risk</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Action Needed</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <AnimatePresence key={a.id}>
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                          "border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] cursor-pointer transition-colors",
                          a.riskLevel === "Critical" && "bg-red-50/50"
                        )}
                        onClick={() =>
                          setExpandedRow(expandedRow === a.id ? null : a.id)
                        }
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-medium">
                                {a.candidateAvatar}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-[#1F2937]">{a.candidateName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#1F2937]/70">{a.role}</td>
                        <td className="py-3 px-4 text-[#1F2937]/70 max-w-[180px] truncate">{a.facility}</td>
                        <td className="py-3 px-4 text-[#1F2937]/80 whitespace-nowrap">{formatDate(a.startDate)}</td>
                        <td className="py-3 px-4">
                          {getItemStatusBadge(a.housingStatus, <Home className="h-3 w-3" />)}
                        </td>
                        <td className="py-3 px-4">
                          {getItemStatusBadge(a.travelStatus, <Plane className="h-3 w-3" />)}
                        </td>
                        <td className="py-3 px-4">
                          {getItemStatusBadge(a.documentsStatus, <FileCheck className="h-3 w-3" />)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 min-w-[100px]">
                            <Progress
                              value={a.readiness}
                              className={cn("h-2 flex-1", getReadinessColor(a.readiness))}
                            />
                            <span className="text-xs font-medium text-[#1F2937]/70 w-8 text-right">
                              {a.readiness}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{getRiskBadge(a.riskScore, a.riskLevel)}</td>
                        <td className="py-3 px-4 text-xs text-[#1F2937]/60 max-w-[160px]">
                          {a.actionNeeded}
                        </td>
                        <td className="py-3 px-2">
                          {expandedRow === a.id ? (
                            <ChevronUp className="h-4 w-4 text-[#1F2937]/40" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#1F2937]/40" />
                          )}
                        </td>
                      </motion.tr>
                      {expandedRow === a.id && (
                        <motion.tr
                          key={`${a.id}-detail`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <td colSpan={11} className="p-0">
                            <div className="bg-[#0B3C5D]/[0.02] border-t border-[#0B3C5D]/10 p-5">
                              <h4 className="text-sm font-semibold text-[#1F2937] mb-3">
                                Readiness Checklist — {a.candidateName}
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {a.checklist.map((c) => (
                                  <div
                                    key={c.item}
                                    className="flex items-center gap-2 rounded-lg border border-[#1F2937]/10 bg-white p-2.5"
                                  >
                                    {getChecklistIcon(c.status)}
                                    <div>
                                      <p className="text-xs font-medium text-[#1F2937]">{c.item}</p>
                                      <p className="text-[10px] text-[#1F2937]/50">{c.status}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-16 text-center text-[#1F2937]/40">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No assignments match your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filtered.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card
              className={cn(
                "cursor-pointer hover:shadow-md transition-shadow",
                a.riskLevel === "Critical" && "border-red-200 bg-red-50/30"
              )}
              onClick={() => setExpandedRow(expandedRow === a.id ? null : a.id)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-medium">
                        {a.candidateAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-[#1F2937]">{a.candidateName}</p>
                      <p className="text-xs text-[#1F2937]/60">{a.role}</p>
                    </div>
                  </div>
                  {getRiskBadge(a.riskScore, a.riskLevel)}
                </div>

                <div className="flex items-center justify-between text-xs text-[#1F2937]/60">
                  <span>{a.facility}</span>
                  <span>{formatDate(a.startDate)}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {getItemStatusBadge(a.housingStatus, <Home className="h-3 w-3" />)}
                  {getItemStatusBadge(a.travelStatus, <Plane className="h-3 w-3" />)}
                  {getItemStatusBadge(a.documentsStatus, <FileCheck className="h-3 w-3" />)}
                </div>

                <div className="flex items-center gap-2">
                  <Progress
                    value={a.readiness}
                    className={cn("h-2 flex-1", getReadinessColor(a.readiness))}
                  />
                  <span className="text-xs font-bold text-[#1F2937]/70">{a.readiness}%</span>
                </div>

                <p className="text-xs text-[#1F2937]/50">{a.actionNeeded}</p>

                <AnimatePresence>
                  {expandedRow === a.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Separator className="my-2" />
                      <h4 className="text-xs font-semibold text-[#1F2937] mb-2">Readiness Checklist</h4>
                      <div className="space-y-1.5">
                        {a.checklist.map((c) => (
                          <div key={c.item} className="flex items-center gap-2">
                            {getChecklistIcon(c.status)}
                            <span className="text-xs text-[#1F2937]/70">{c.item}</span>
                            <span className="text-[10px] text-[#1F2937]/40 ml-auto">{c.status}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Action Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-[#0B3C5D]/15 bg-gradient-to-br from-white to-[#0B3C5D]/[0.02]">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 p-1.5">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              AI Action Recommendations
            </CardTitle>
            <CardDescription>
              Intelligent suggestions based on assignment readiness analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiRecommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg border p-4 bg-white",
                  rec.priority === "Critical" && "border-red-200",
                  rec.priority === "High" && "border-orange-200",
                  rec.priority === "Medium" && "border-amber-200",
                  rec.priority === "Low" && "border-blue-200"
                )}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={cn("text-[10px]", getPriorityColor(rec.priority))}>
                      {rec.priority}
                    </Badge>
                    <h4 className="text-sm font-semibold text-[#1F2937]">{rec.title}</h4>
                  </div>
                  <p className="text-xs text-[#1F2937]/60 leading-relaxed">{rec.description}</p>
                </div>
                <Button
                  size="sm"
                  className={cn(
                    "shrink-0 gap-1.5",
                    rec.priority === "Critical"
                      ? "bg-[#E63946] hover:bg-[#E63946]/90 text-white"
                      : "bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({
                      title: "Action Initiated",
                      description: `"${rec.title}" has been queued for processing.`,
                    });
                  }}
                >
                  <Zap className="h-3.5 w-3.5" />
                  Act Now
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
