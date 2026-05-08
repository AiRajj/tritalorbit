"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate } from "@/lib/utils";
import {
  Inbox,
  Loader2,
  Clock,
  CheckCircle2,
  Home,
  Car,
  FileCheck,
  Shield,
  CalendarDays,
} from "lucide-react";

interface Task {
  id: string;
  candidateName: string;
  requestType: string;
  priority: "urgent" | "high" | "medium" | "low";
  dueDate: string;
  icon: React.ReactNode;
}

interface CompletedTask {
  id: string;
  candidateName: string;
  requestType: string;
  completedAt: string;
}

const kpis = [
  { label: "Active Requests", value: 28, icon: <Inbox className="h-5 w-5 text-[#0B3C5D]" />, color: "bg-[#0B3C5D]/5" },
  { label: "In Progress", value: 12, icon: <Loader2 className="h-5 w-5 text-blue-500" />, color: "bg-blue-50" },
  { label: "Waiting", value: 9, icon: <Clock className="h-5 w-5 text-amber-500" />, color: "bg-amber-50" },
  { label: "Completed Today", value: 7, icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />, color: "bg-emerald-50" },
];

const columns: { title: string; status: string; color: string; tasks: Task[] }[] = [
  {
    title: "New",
    status: "new",
    color: "border-t-blue-500",
    tasks: [
      { id: "T-101", candidateName: "Sarah Mitchell", requestType: "Housing Search", priority: "high", dueDate: "2026-05-10", icon: <Home className="h-4 w-4" /> },
      { id: "T-102", candidateName: "David Kim", requestType: "License Transfer", priority: "urgent", dueDate: "2026-05-09", icon: <Shield className="h-4 w-4" /> },
      { id: "T-103", candidateName: "Angela Foster", requestType: "Travel Booking", priority: "medium", dueDate: "2026-05-14", icon: <Car className="h-4 w-4" /> },
    ],
  },
  {
    title: "In Progress",
    status: "in_progress",
    color: "border-t-amber-500",
    tasks: [
      { id: "T-201", candidateName: "Maria Rodriguez", requestType: "Housing Search", priority: "high", dueDate: "2026-05-11", icon: <Home className="h-4 w-4" /> },
      { id: "T-202", candidateName: "Robert Taylor", requestType: "Credentialing", priority: "urgent", dueDate: "2026-05-09", icon: <FileCheck className="h-4 w-4" /> },
      { id: "T-203", candidateName: "Lisa Chen", requestType: "Travel Booking", priority: "low", dueDate: "2026-05-18", icon: <Car className="h-4 w-4" /> },
      { id: "T-204", candidateName: "Kevin Patel", requestType: "License Transfer", priority: "medium", dueDate: "2026-05-13", icon: <Shield className="h-4 w-4" /> },
    ],
  },
  {
    title: "Waiting Candidate",
    status: "waiting",
    color: "border-t-purple-500",
    tasks: [
      { id: "T-301", candidateName: "Emily Watson", requestType: "Document Upload", priority: "high", dueDate: "2026-05-10", icon: <FileCheck className="h-4 w-4" /> },
      { id: "T-302", candidateName: "Michael Brown", requestType: "Housing Preference", priority: "medium", dueDate: "2026-05-12", icon: <Home className="h-4 w-4" /> },
      { id: "T-303", candidateName: "James Carter", requestType: "Travel Dates", priority: "low", dueDate: "2026-05-15", icon: <Car className="h-4 w-4" /> },
    ],
  },
  {
    title: "Completed",
    status: "completed",
    color: "border-t-emerald-500",
    tasks: [
      { id: "T-401", candidateName: "Lisa Chen", requestType: "Housing Secured", priority: "medium", dueDate: "2026-05-08", icon: <Home className="h-4 w-4" /> },
      { id: "T-402", candidateName: "David Kim", requestType: "Travel Booked", priority: "low", dueDate: "2026-05-08", icon: <Car className="h-4 w-4" /> },
      { id: "T-403", candidateName: "Angela Foster", requestType: "Credentials Verified", priority: "high", dueDate: "2026-05-07", icon: <FileCheck className="h-4 w-4" /> },
      { id: "T-404", candidateName: "Sarah Mitchell", requestType: "License Transferred", priority: "medium", dueDate: "2026-05-07", icon: <Shield className="h-4 w-4" /> },
    ],
  },
];

const recentCompletions: CompletedTask[] = [
  { id: "rc1", candidateName: "Lisa Chen", requestType: "Housing secured at The Avalon, NYC", completedAt: "Today, 2:30 PM" },
  { id: "rc2", candidateName: "David Kim", requestType: "Flight booked BWI → JFK, May 25", completedAt: "Today, 1:15 PM" },
  { id: "rc3", candidateName: "Angela Foster", requestType: "Credentials verified by Emory Healthcare", completedAt: "Today, 11:45 AM" },
  { id: "rc4", candidateName: "Sarah Mitchell", requestType: "MN → WI license compact transfer complete", completedAt: "Today, 10:00 AM" },
];

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "urgent": return "destructive" as const;
    case "high": return "warning" as const;
    case "medium": return "secondary" as const;
    default: return "outline" as const;
  }
}

export default function ConciergeDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-60" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1F2937]">Concierge Dashboard</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Manage candidate mobility requests and services</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("rounded-lg p-2.5", kpi.color)}>{kpi.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-[#1F2937]">{kpi.value}</p>
                  <p className="text-xs text-[#1F2937]/60">{kpi.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-3">Task Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.status} className={cn("rounded-xl border-t-4 bg-[#1F2937]/[0.01] border border-[#1F2937]/10", column.color)}>
              <div className="p-4 pb-2 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-[#1F2937]">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">{column.tasks.length}</Badge>
              </div>
              <div className="p-3 space-y-3">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded bg-[#0B3C5D]/5 p-1">{task.icon}</div>
                          <span className="text-xs font-mono text-[#1F2937]/40">{task.id}</span>
                        </div>
                        <Badge variant={getPriorityVariant(task.priority)} className="text-[10px]">
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-[#1F2937] mb-1">{task.candidateName}</p>
                      <p className="text-xs text-[#1F2937]/60 mb-2">{task.requestType}</p>
                      <div className="flex items-center gap-1 text-xs text-[#1F2937]/40">
                        <CalendarDays className="h-3 w-3" />
                        {formatDate(task.dueDate)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Recent Completions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCompletions.map((item) => (
              <div key={item.id} className="flex items-center gap-3 rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1F2937]">{item.candidateName}</p>
                  <p className="text-xs text-[#1F2937]/60">{item.requestType}</p>
                </div>
                <span className="text-xs text-[#1F2937]/40 shrink-0">{item.completedAt}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
