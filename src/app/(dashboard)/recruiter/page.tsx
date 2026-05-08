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
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { cn, formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  Send,
  CheckCircle2,
  Clock,
  Users,
  Plus,
  Eye,
  FileText,
  ShieldAlert,
  Phone,
  ArrowRight,
  AlertTriangle,
  CalendarClock,
  MessageSquare,
} from "lucide-react";

interface RecruiterOffer {
  id: string;
  candidate: string;
  facility: string;
  weeklyPay: number;
  status: string;
  sentDate: string;
}

const kpis = [
  { label: "My Offers", value: 24, icon: <Send className="h-5 w-5 text-[#0B3C5D]" />, description: "This month" },
  { label: "Accepted Today", value: 3, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, description: "Great progress!" },
  { label: "Pending Actions", value: 7, icon: <Clock className="h-5 w-5 text-amber-500" />, description: "Need attention" },
  { label: "My Candidates", value: 42, icon: <Users className="h-5 w-5 text-[#0B3C5D]" />, description: "Active roster" },
];

const recentOffers: RecruiterOffer[] = [
  { id: "OF-2001", candidate: "Sarah Mitchell, RN", facility: "Mayo Clinic", weeklyPay: 2850, status: "Accepted", sentDate: "2026-05-07" },
  { id: "OF-2002", candidate: "Robert Taylor, RN", facility: "Northwestern Memorial", weeklyPay: 2900, status: "Pending", sentDate: "2026-05-06" },
  { id: "OF-2003", candidate: "Maria Rodriguez, RN", facility: "Cedars-Sinai", weeklyPay: 3200, status: "Pending", sentDate: "2026-05-05" },
  { id: "OF-2004", candidate: "Kevin Patel, ST", facility: "Cleveland Clinic", weeklyPay: 2400, status: "Declined", sentDate: "2026-05-04" },
  { id: "OF-2005", candidate: "Angela Foster, RN", facility: "Emory Healthcare", weeklyPay: 2700, status: "Accepted", sentDate: "2026-05-03" },
];

const urgentActions = [
  { id: "u1", title: "Emily Watson unresponsive", description: "No response in 5 days. Risk score: 85. Call immediately.", priority: "high" as const, icon: <AlertTriangle className="h-4 w-4 text-[#E63946]" /> },
  { id: "u2", title: "Robert Taylor competing offer", description: "Rival agency sent counter-offer. Review and respond.", priority: "high" as const, icon: <ShieldAlert className="h-4 w-4 text-amber-500" /> },
  { id: "u3", title: "Maria Rodriguez housing", description: "Needs housing in LA by May 30. Escalate to concierge.", priority: "medium" as const, icon: <Clock className="h-4 w-4 text-[#0B3C5D]" /> },
];

const followUps = [
  { id: "f1", time: "9:00 AM", candidate: "Lisa Chen", action: "Confirm start date at NYP", type: "call" },
  { id: "f2", time: "10:30 AM", candidate: "Michael Brown", action: "Review onboarding docs", type: "review" },
  { id: "f3", time: "1:00 PM", candidate: "David Kim", action: "Check license verification status", type: "check" },
  { id: "f4", time: "2:30 PM", candidate: "Sarah Mitchell", action: "Send welcome package details", type: "email" },
  { id: "f5", time: "4:00 PM", candidate: "Angela Foster", action: "Follow up on relocation timeline", type: "call" },
];

export default function RecruiterDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">Recruiter Dashboard</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Welcome back! Here&apos;s your daily overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#0B3C5D]/5 p-2.5">{kpi.icon}</div>
                  <div>
                    <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                    <p className="text-xs text-[#1F2937]/60">{kpi.label}</p>
                    <p className="text-[10px] text-[#1F2937]/40">{kpi.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/agency/offers/create">
            <Button className="w-full bg-[#E63946] hover:bg-[#E63946]/90 text-white h-11">
              <Plus className="h-4 w-4 mr-2" /> Create Offer
            </Button>
          </Link>
          <Link href="/agency/candidates">
            <Button variant="outline" className="w-full h-11 border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-[#0B3C5D]/5">
              <Users className="h-4 w-4 mr-2" /> View Candidates
            </Button>
          </Link>
          <Button variant="outline" className="w-full h-11 border-[#0B3C5D]/20 text-[#0B3C5D] hover:bg-[#0B3C5D]/5">
            <ShieldAlert className="h-4 w-4 mr-2" /> Check Risk Scores
          </Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Recent Offers</CardTitle>
            <CardDescription>Latest offers you&apos;ve sent out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Candidate</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Facility</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Weekly Pay</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Sent</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOffers.map((offer) => (
                    <tr key={offer.id} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] cursor-pointer transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-[#1F2937]/50">{offer.id}</td>
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{offer.candidate}</td>
                      <td className="py-3 px-4 text-[#1F2937]/70">{offer.facility}</td>
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{formatCurrency(offer.weeklyPay)}</td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(offer.status))} variant="outline">
                          {offer.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]/50 text-xs">{formatDate(offer.sentDate)}</td>
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
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#E63946]" />
                Urgent Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentActions.map((action) => (
                <div key={action.id} className={cn("rounded-lg border p-4", action.priority === "high" ? "border-red-200 bg-red-50/50" : "border-amber-200 bg-amber-50/50")}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{action.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#1F2937]">{action.title}</p>
                      <p className="text-xs text-[#1F2937]/60 mt-1">{action.description}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-7 shrink-0">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarClock className="h-5 w-5 text-[#0B3C5D]" />
                Today&apos;s Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {followUps.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-[#1F2937]/10 p-3 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                  <div className="text-xs font-mono text-[#0B3C5D] font-semibold w-16 shrink-0">{item.time}</div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1F2937]">{item.candidate}</p>
                    <p className="text-xs text-[#1F2937]/60">{item.action}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] shrink-0">
                    {item.type === "call" && <Phone className="h-3 w-3 mr-1" />}
                    {item.type === "email" && <MessageSquare className="h-3 w-3 mr-1" />}
                    {item.type === "review" && <FileText className="h-3 w-3 mr-1" />}
                    {item.type === "check" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {item.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
