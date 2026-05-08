"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2, Users, FileText, Package, CreditCard, Brain, Activity,
  Shield, Settings, ArrowRight, TrendingUp, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const adminModules = [
  { title: "Agencies", href: "/admin/agencies", icon: Building2, color: "bg-orbit-blue/10 text-orbit-blue", count: 24 },
  { title: "Users", href: "/admin/users", icon: Users, color: "bg-purple-50 text-purple-600", count: 186 },
  { title: "Offers", href: "/admin/offers", icon: FileText, color: "bg-amber-50 text-amber-600", count: 2418 },
  { title: "Vendors", href: "/admin/vendors", icon: Package, color: "bg-emerald-50 text-emerald-600", count: 43 },
  { title: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard, color: "bg-sky-50 text-sky-600", count: 24 },
  { title: "AI Usage", href: "/admin/ai-usage", icon: Brain, color: "bg-pink-50 text-pink-600", count: 12480 },
  { title: "Audit Logs", href: "/admin/audit-logs", icon: Activity, color: "bg-orange-50 text-orange-600", count: 48291 },
  { title: "Settings", href: "/admin/settings", icon: Settings, color: "bg-slate-50 text-slate-600", count: null },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Admin Control Center</h1>
          <p className="text-slate-500 text-sm mt-1">Platform-wide management and oversight</p>
        </div>
        <Badge className="bg-orbit-blue/10 text-orbit-blue border-orbit-blue/20 px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 mr-1.5" />Super Admin
        </Badge>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Agencies" value={24} icon={Building2} iconColor="bg-orbit-blue/10 text-orbit-blue" change="+3 this month" changeType="positive" />
        <KPICard title="Total Users" value={186} icon={Users} iconColor="bg-purple-50 text-purple-600" change="+28 this month" changeType="positive" />
        <KPICard title="Offers This Month" value={342} icon={FileText} iconColor="bg-amber-50 text-amber-600" change="+18% vs last month" changeType="positive" />
        <KPICard title="AI API Calls" value="12.4K" icon={Brain} iconColor="bg-pink-50 text-pink-600" change="This month" changeType="neutral" />
      </div>

      {/* Module Grid */}
      <div>
        <h2 className="text-lg font-semibold text-orbit-dark mb-4">Platform Modules</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminModules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Card className="hover:shadow-orbit-lg transition-all cursor-pointer group h-full">
                <CardContent className="p-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${module.color} group-hover:scale-110 transition-transform`}>
                    <module.icon className="h-5.5 w-5.5 h-[22px] w-[22px]" />
                  </div>
                  <h3 className="font-semibold text-orbit-dark mb-1 group-hover:text-orbit-blue transition-colors">{module.title}</h3>
                  {module.count !== null && (
                    <p className="text-2xl font-bold text-orbit-dark">{module.count.toLocaleString()}</p>
                  )}
                  <div className="flex items-center text-xs text-orbit-blue mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Platform Health */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "API Response Time", value: "124ms", status: "good" },
              { label: "Database Load", value: "23%", status: "good" },
              { label: "AI API Usage", value: "67%", status: "warning" },
              { label: "Active Sessions", value: "48", status: "good" },
              { label: "Error Rate (24h)", value: "0.02%", status: "good" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-600">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-orbit-dark">{item.value}</span>
                  <span className={`w-2 h-2 rounded-full ${item.status === "good" ? "bg-emerald-500" : item.status === "warning" ? "bg-amber-500" : "bg-red-500"}`} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent System Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { event: "New agency registered: HealthFirst Staffing", time: "2 min ago", type: "info" },
              { event: "AI API quota at 67% — monitor usage", time: "1 hour ago", type: "warning" },
              { event: "Subscription upgraded: MedForce → Growth plan", time: "3 hours ago", type: "success" },
              { event: "New vendor verified: Phoenix Corporate Housing", time: "5 hours ago", type: "success" },
              { event: "User deactivated: Inactive for 90+ days", time: "1 day ago", type: "info" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === "success" ? "bg-emerald-500" :
                  item.type === "warning" ? "bg-amber-500" : "bg-orbit-blue"
                }`} />
                <div>
                  <p className="text-orbit-dark">{item.event}</p>
                  <p className="text-xs text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
