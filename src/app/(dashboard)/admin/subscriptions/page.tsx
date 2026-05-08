"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Building2,
  Star,
  Eye,
  ArrowUpRight,
  Zap,
  Crown,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 299,
    period: "/month",
    icon: <Zap className="h-5 w-5" />,
    features: ["Up to 10 users", "50 offers/month", "Basic risk scoring", "Email support"],
    activeCount: 8,
    color: "border-blue-200 bg-blue-50/30",
  },
  {
    name: "Pro",
    price: 799,
    period: "/month",
    icon: <Star className="h-5 w-5" />,
    features: ["Up to 50 users", "Unlimited offers", "Advanced AI insights", "Concierge access", "Priority support"],
    activeCount: 11,
    color: "border-[#0B3C5D]/20 bg-[#0B3C5D]/[0.03]",
  },
  {
    name: "Enterprise",
    price: 1999,
    period: "/month",
    icon: <Crown className="h-5 w-5" />,
    features: ["Unlimited users", "Unlimited everything", "Custom AI models", "Dedicated concierge", "MSP reporting", "24/7 phone support", "Custom integrations"],
    activeCount: 4,
    color: "border-amber-200 bg-amber-50/30",
  },
];

const revenueMetrics = [
  { label: "Monthly Recurring Revenue", value: "$48,500", change: "+12% MoM", icon: <DollarSign className="h-5 w-5 text-emerald-500" /> },
  { label: "Annual Run Rate", value: "$582,000", change: "+18% YoY", icon: <TrendingUp className="h-5 w-5 text-[#0B3C5D]" /> },
  { label: "Active Subscriptions", value: 23, change: "+2 this month", icon: <CreditCard className="h-5 w-5 text-purple-500" /> },
  { label: "Avg Revenue Per Agency", value: "$2,109", change: "+5% MoM", icon: <Building2 className="h-5 w-5 text-blue-500" /> },
];

const subscriptions = [
  { agency: "Apex Healthcare Staffing", plan: "Enterprise", users: 42, mrr: 1999, status: "Active", renewDate: "2026-06-01", usage: 87 },
  { agency: "MedPro Travel Nurses", plan: "Pro", users: 35, mrr: 799, status: "Active", renewDate: "2026-06-15", usage: 72 },
  { agency: "NurseFlex Partners", plan: "Pro", users: 28, mrr: 799, status: "Active", renewDate: "2026-05-28", usage: 94 },
  { agency: "TravelCare Solutions", plan: "Starter", users: 19, mrr: 299, status: "Active", renewDate: "2026-06-10", usage: 61 },
  { agency: "HealthBridge Staffing", plan: "Starter", users: 15, mrr: 299, status: "Active", renewDate: "2026-05-20", usage: 45 },
  { agency: "Pacific Health Group", plan: "Enterprise", users: 55, mrr: 1999, status: "Active", renewDate: "2026-07-01", usage: 78 },
  { agency: "SunCoast Medical Staffing", plan: "Pro", users: 22, mrr: 799, status: "Active", renewDate: "2026-06-22", usage: 83 },
  { agency: "Midwest Care Partners", plan: "Starter", users: 12, mrr: 299, status: "Past Due", renewDate: "2026-05-05", usage: 38 },
];

export default function AdminSubscriptionsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1F2937]">Subscription Management</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Plans, revenue, and billing overview</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueMetrics.map((metric, i) => (
          <motion.div key={metric.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="rounded-lg bg-[#0B3C5D]/5 p-2">{metric.icon}</div>
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-[#1F2937]">{metric.value}</p>
                <p className="text-xs text-[#1F2937]/60">{metric.label}</p>
                <p className="text-[10px] text-emerald-600 mt-0.5">{metric.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-3">Plans Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("hover:shadow-md transition-shadow", plan.color)}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="text-[#0B3C5D]">{plan.icon}</div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                </div>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-[#1F2937]">{formatCurrency(plan.price)}</span>
                  <span className="text-sm text-[#1F2937]/50">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {plan.activeCount} active
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#1F2937]/70">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Subscriptions</CardTitle>
            <CardDescription>All agency subscriptions and their usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Agency</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Plan</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Users</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">MRR</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Usage</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Renewal</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.agency} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{sub.agency}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={sub.plan === "Enterprise" ? "default" : sub.plan === "Pro" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {sub.plan}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]">{sub.users}</td>
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{formatCurrency(sub.mrr)}</td>
                      <td className="py-3 px-4 w-32">
                        <div className="flex items-center gap-2">
                          <Progress value={sub.usage} className="h-2 flex-1" />
                          <span className="text-xs text-[#1F2937]/60 w-8">{sub.usage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(sub.status === "Past Due" ? "declined" : sub.status))} variant="outline">
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-xs text-[#1F2937]/60">{formatDate(sub.renewDate)}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
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
