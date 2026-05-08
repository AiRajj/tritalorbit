"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CalendarCheck,
  Rocket,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  User,
  MapPin,
  Activity,
  Brain,
  ChevronRight,
  Eye,
  MessageSquare,
  FileText,
  Sparkles,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

interface KPI {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
}

interface Offer {
  id: string;
  candidate: string;
  facility: string;
  cityState: string;
  startDate: string;
  weeklyPay: number;
  status: string;
  riskScore: number;
}

interface HighRiskCandidate {
  name: string;
  riskScore: number;
  reasons: string[];
  suggestedAction: string;
  specialty: string;
}

interface ActivityEntry {
  id: string;
  icon: React.ReactNode;
  description: string;
  timestamp: string;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium";
}

const kpis: KPI[] = [
  { label: "Offers Sent", value: 147, change: "↑ 12% from last month", trend: "up", icon: <Send className="h-5 w-5" /> },
  { label: "Accepted Offers", value: 89, change: "↑ 8%", trend: "up", icon: <CheckCircle2 className="h-5 w-5" /> },
  { label: "Pending Offers", value: 34, change: "→ stable", trend: "stable", icon: <Clock className="h-5 w-5" /> },
  { label: "Backout Risk", value: "12%", change: "↓ 3%", trend: "down", icon: <AlertTriangle className="h-5 w-5" /> },
  { label: "Booking Requests", value: 23, change: "↑ 15%", trend: "up", icon: <CalendarCheck className="h-5 w-5" /> },
  { label: "Assignment Ready", value: "78%", change: "↑ 5%", trend: "up", icon: <Rocket className="h-5 w-5" /> },
];

const offers: Offer[] = [
  { id: "OF-1001", candidate: "Sarah Mitchell, RN", facility: "Mayo Clinic", cityState: "Rochester, MN", startDate: "2026-06-02", weeklyPay: 2850, status: "Pending", riskScore: 22 },
  { id: "OF-1002", candidate: "James Carter, LPN", facility: "Cleveland Clinic", cityState: "Cleveland, OH", startDate: "2026-05-19", weeklyPay: 2100, status: "Accepted", riskScore: 15 },
  { id: "OF-1003", candidate: "Maria Rodriguez, RN", facility: "Cedars-Sinai", cityState: "Los Angeles, CA", startDate: "2026-06-09", weeklyPay: 3200, status: "Pending", riskScore: 68 },
  { id: "OF-1004", candidate: "David Kim, CNA", facility: "Johns Hopkins", cityState: "Baltimore, MD", startDate: "2026-05-26", weeklyPay: 1650, status: "Accepted", riskScore: 10 },
  { id: "OF-1005", candidate: "Emily Watson, RN", facility: "Mass General", cityState: "Boston, MA", startDate: "2026-06-16", weeklyPay: 3100, status: "Declined", riskScore: 85 },
  { id: "OF-1006", candidate: "Michael Brown, RT", facility: "UCSF Medical", cityState: "San Francisco, CA", startDate: "2026-05-30", weeklyPay: 2750, status: "Pending", riskScore: 45 },
  { id: "OF-1007", candidate: "Lisa Chen, NP", facility: "NewYork-Presbyterian", cityState: "New York, NY", startDate: "2026-06-05", weeklyPay: 3500, status: "Accepted", riskScore: 8 },
  { id: "OF-1008", candidate: "Robert Taylor, RN", facility: "Northwestern Memorial", cityState: "Chicago, IL", startDate: "2026-06-12", weeklyPay: 2900, status: "Pending", riskScore: 72 },
];

const highRiskCandidates: HighRiskCandidate[] = [
  { name: "Emily Watson, RN", riskScore: 85, reasons: ["Declined 2 recent offers", "Unresponsive to last 3 messages", "License renewal pending"], suggestedAction: "Schedule immediate call and offer pay increase", specialty: "ICU" },
  { name: "Robert Taylor, RN", riskScore: 72, reasons: ["Competing offer from rival agency", "Requested location change"], suggestedAction: "Present counter-offer with housing stipend", specialty: "Med-Surg" },
  { name: "Maria Rodriguez, RN", riskScore: 68, reasons: ["Housing not yet secured", "First-time traveler anxiety"], suggestedAction: "Connect with concierge for housing and assign mentor", specialty: "ER" },
];

const recentActivity: ActivityEntry[] = [
  { id: "a1", icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />, description: "Sarah Mitchell accepted offer at Mayo Clinic", timestamp: "10 min ago" },
  { id: "a2", icon: <Send className="h-4 w-4 text-[#0B3C5D]" />, description: "New offer sent to James Carter for Cleveland Clinic", timestamp: "25 min ago" },
  { id: "a3", icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, description: "Risk score increased for Emily Watson (85)", timestamp: "1 hour ago" },
  { id: "a4", icon: <MessageSquare className="h-4 w-4 text-blue-500" />, description: "Recruiter Tom left note on Robert Taylor's profile", timestamp: "2 hours ago" },
  { id: "a5", icon: <FileText className="h-4 w-4 text-purple-500" />, description: "License verification completed for David Kim", timestamp: "3 hours ago" },
  { id: "a6", icon: <CalendarCheck className="h-4 w-4 text-emerald-500" />, description: "Booking confirmed: Lisa Chen at NewYork-Presbyterian", timestamp: "4 hours ago" },
  { id: "a7", icon: <User className="h-4 w-4 text-[#0B3C5D]" />, description: "New candidate registered: Angela Foster, RN", timestamp: "5 hours ago" },
  { id: "a8", icon: <Activity className="h-4 w-4 text-[#E63946]" />, description: "Michael Brown completed onboarding checklist", timestamp: "6 hours ago" },
];

const aiRecommendations: AIRecommendation[] = [
  { id: "r1", title: "Re-engage Emily Watson", description: "Emily has a 85% backout risk. A personalized call with a $200/week pay bump has 73% success rate for similar profiles.", priority: "high" },
  { id: "r2", title: "Fast-track Maria Rodriguez", description: "First-time traveler. Assigning a concierge now reduces backout risk by 40% based on historical data.", priority: "high" },
  { id: "r3", title: "Batch housing for Chicago placements", description: "3 candidates starting in Chicago within 2 weeks. Bulk housing booking saves $1,200 and improves readiness scores.", priority: "medium" },
  { id: "r4", title: "License renewal alert", description: "4 candidates have licenses expiring within 60 days. Proactive renewal reminders reduce assignment delays by 65%.", priority: "medium" },
];

function getRiskColor(score: number): string {
  if (score >= 70) return "text-[#E63946] bg-red-50";
  if (score >= 40) return "text-amber-600 bg-amber-50";
  return "text-emerald-600 bg-emerald-50";
}

export default function AgencyDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredOffers = offers.filter(
    (o) =>
      o.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.cityState.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-96 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Agency Dashboard</h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">Real-time overview of your staffing operations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
            <Input
              placeholder="Search offers, candidates..."
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/agency/offers/create">
            <Button className="bg-[#E63946] hover:bg-[#E63946]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create New Offer
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#0B3C5D]/70">{kpi.icon}</span>
                  {kpi.trend === "up" && <ArrowUpRight className="h-4 w-4 text-emerald-500" />}
                  {kpi.trend === "down" && <ArrowDownRight className="h-4 w-4 text-emerald-500" />}
                  {kpi.trend === "stable" && <Minus className="h-4 w-4 text-[#1F2937]/40" />}
                </div>
                <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                <p className="text-xs text-[#1F2937]/60 mt-1">{kpi.label}</p>
                <p className="text-xs text-[#1F2937]/40 mt-0.5">{kpi.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Offers</CardTitle>
            <CardDescription>Track and manage all current offer statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Candidate</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Facility</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">City/State</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Start Date</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Weekly Pay</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Risk Score</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOffers.map((offer) => (
                    <tr
                      key={offer.id}
                      className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{offer.candidate}</td>
                      <td className="py-3 px-4 text-[#1F2937]/70">{offer.facility}</td>
                      <td className="py-3 px-4 text-[#1F2937]/70">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {offer.cityState}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]/70">{formatDate(offer.startDate)}</td>
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{formatCurrency(offer.weeklyPay)}</td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(offer.status))} variant="outline">
                          {offer.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className={cn("inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold", getRiskColor(offer.riskScore))}>
                          {offer.riskScore}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-[#E63946]" />
                High-Risk Candidates
              </CardTitle>
              <CardDescription>Candidates requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {highRiskCandidates.map((c) => (
                <div key={c.name} className="rounded-lg border border-red-200 bg-red-50/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-[#1F2937]">{c.name}</p>
                      <p className="text-xs text-[#1F2937]/60">{c.specialty}</p>
                    </div>
                    <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold", getRiskColor(c.riskScore))}>
                      Risk: {c.riskScore}
                    </span>
                  </div>
                  <ul className="text-xs text-[#1F2937]/70 space-y-1 mb-3">
                    {c.reasons.map((r) => (
                      <li key={r} className="flex items-center gap-1.5">
                        <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-[#0B3C5D]">{c.suggestedAction}</p>
                    <Button size="sm" variant="outline" className="text-xs h-7">
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0B3C5D]" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest actions across your agency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{entry.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1F2937]">{entry.description}</p>
                      <p className="text-xs text-[#1F2937]/40 mt-0.5">{entry.timestamp}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#1F2937]/20 shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }}>
        <Card className="border-[#0B3C5D]/20 bg-gradient-to-r from-[#0B3C5D]/[0.03] to-transparent">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#0B3C5D]" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Intelligent suggestions to improve your outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className="rounded-lg border bg-white p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-[#0B3C5D]" />
                      <h4 className="font-semibold text-sm text-[#1F2937]">{rec.title}</h4>
                      <Badge variant={rec.priority === "high" ? "destructive" : "warning"} className="text-[10px] ml-auto">
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#1F2937]/60 mb-3">{rec.description}</p>
                  </div>
                  <Button size="sm" className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white w-full">
                    <TrendingUp className="h-3 w-3 mr-1.5" />
                    Act Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
