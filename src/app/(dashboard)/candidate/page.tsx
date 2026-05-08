"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Shield,
  Briefcase,
  CircleCheck,
  Circle,
} from "lucide-react";

const activeAssignment = {
  facility: "Mayo Clinic - Rochester",
  department: "ICU - Intensive Care Unit",
  startDate: "2026-04-14",
  endDate: "2026-07-12",
  weeklyPay: 2850,
  hoursPerWeek: 36,
  status: "Active",
  weeksCompleted: 4,
  totalWeeks: 13,
};

const myOffers = [
  {
    id: "OF-3001",
    facility: "Cleveland Clinic",
    location: "Cleveland, OH",
    department: "Cardiac ICU",
    weeklyPay: 3100,
    startDate: "2026-07-20",
    duration: "13 weeks",
    status: "Pending",
    expiresIn: "3 days",
  },
  {
    id: "OF-3002",
    facility: "Cedars-Sinai Medical Center",
    location: "Los Angeles, CA",
    department: "Emergency",
    weeklyPay: 3400,
    startDate: "2026-08-03",
    duration: "13 weeks",
    status: "New",
    expiresIn: "5 days",
  },
  {
    id: "OF-3003",
    facility: "Mass General Hospital",
    location: "Boston, MA",
    department: "Med-Surg",
    weeklyPay: 2950,
    startDate: "2026-07-27",
    duration: "8 weeks",
    status: "Accepted",
    expiresIn: null,
  },
];

const bookingRequests = [
  { label: "Housing", status: "Confirmed", icon: <Building2 className="h-4 w-4" /> },
  { label: "Travel", status: "In Progress", icon: <MapPin className="h-4 w-4" /> },
  { label: "Credentialing", status: "Completed", icon: <Shield className="h-4 w-4" /> },
];

const checklist = [
  { label: "License verification", completed: true },
  { label: "Background check", completed: true },
  { label: "Drug screening", completed: true },
  { label: "Skills checklist", completed: true },
  { label: "Health records", completed: false },
  { label: "Facility orientation", completed: false },
  { label: "Housing confirmation", completed: false },
  { label: "Travel arrangements", completed: false },
];

export default function CandidateDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const completedCount = checklist.filter((c) => c.completed).length;
  const readinessPercent = Math.round((completedCount / checklist.length) * 100);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-56" />
        <Skeleton className="h-48 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1F2937]">My Dashboard</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Welcome back, Sarah! Here&apos;s your latest updates.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-[#0B3C5D]/20 bg-gradient-to-r from-[#0B3C5D]/[0.03] to-transparent">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#0B3C5D]" />
                Active Assignment
              </CardTitle>
              <Badge variant="success">{activeAssignment.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#1F2937]/50 mb-1">Facility</p>
                <p className="text-sm font-semibold text-[#1F2937]">{activeAssignment.facility}</p>
                <p className="text-xs text-[#1F2937]/60">{activeAssignment.department}</p>
              </div>
              <div>
                <p className="text-xs text-[#1F2937]/50 mb-1">Dates</p>
                <p className="text-sm font-semibold text-[#1F2937]">
                  {formatDate(activeAssignment.startDate)} — {formatDate(activeAssignment.endDate)}
                </p>
                <p className="text-xs text-[#1F2937]/60">{activeAssignment.hoursPerWeek} hrs/week</p>
              </div>
              <div>
                <p className="text-xs text-[#1F2937]/50 mb-1">Weekly Pay</p>
                <p className="text-sm font-semibold text-[#1F2937]">{formatCurrency(activeAssignment.weeklyPay)}</p>
                <p className="text-xs text-[#1F2937]/60">After taxes & stipends</p>
              </div>
              <div>
                <p className="text-xs text-[#1F2937]/50 mb-1">Progress</p>
                <p className="text-sm font-semibold text-[#1F2937]">Week {activeAssignment.weeksCompleted} of {activeAssignment.totalWeeks}</p>
                <Progress value={(activeAssignment.weeksCompleted / activeAssignment.totalWeeks) * 100} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-3">My Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myOffers.map((offer, i) => (
            <motion.div key={offer.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
              <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className={cn("text-xs", getStatusColor(offer.status))} variant="outline">
                      {offer.status}
                    </Badge>
                    {offer.expiresIn && (
                      <span className="text-[10px] text-amber-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Expires in {offer.expiresIn}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-base mt-2">{offer.facility}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {offer.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#1F2937]/60">Department</span>
                      <span className="font-medium text-[#1F2937]">{offer.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1F2937]/60">Weekly Pay</span>
                      <span className="font-bold text-[#0B3C5D]">{formatCurrency(offer.weeklyPay)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1F2937]/60">Start</span>
                      <span className="text-[#1F2937]">{formatDate(offer.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#1F2937]/60">Duration</span>
                      <span className="text-[#1F2937]">{offer.duration}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {offer.status === "Accepted" ? (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled>
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Accepted
                    </Button>
                  ) : (
                    <div className="flex gap-2 w-full">
                      <Button className="flex-1 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white">Accept</Button>
                      <Button variant="outline" className="flex-1">Decline</Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Booking Requests</CardTitle>
              <CardDescription>Status of your travel and housing arrangements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookingRequests.map((req) => (
                <div key={req.label} className="flex items-center justify-between rounded-lg border border-[#1F2937]/10 p-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#0B3C5D]/5 p-2">{req.icon}</div>
                    <span className="font-medium text-sm text-[#1F2937]">{req.label}</span>
                  </div>
                  <Badge className={cn("text-xs", getStatusColor(req.status))} variant="outline">
                    {req.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Readiness Checklist</CardTitle>
              <CardDescription>{completedCount} of {checklist.length} items completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={readinessPercent} className="h-2.5 mb-4" />
              <p className="text-xs text-[#1F2937]/50 mb-4">{readinessPercent}% ready</p>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    {item.completed ? (
                      <CircleCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-[#1F2937]/20 shrink-0" />
                    )}
                    <span className={cn("text-sm", item.completed ? "text-[#1F2937]/50 line-through" : "text-[#1F2937]")}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card className="bg-[#0B3C5D] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-lg">Need Help?</h3>
                <p className="text-white/70 text-sm mt-1">Your dedicated support team is here for you 24/7.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <Phone className="h-4 w-4 mr-2" /> Call Support
                </Button>
                <Button className="bg-white text-[#0B3C5D] hover:bg-white/90">
                  <MessageSquare className="h-4 w-4 mr-2" /> Live Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
