"use client";

import React from "react";
import Link from "next/link";
import { Home, Plane, Car, FileText, CheckCircle2, Clock, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const demoOffer = {
  facilityName: "St. Mary's Medical Center",
  facilityCity: "Phoenix",
  facilityState: "AZ",
  role: "Registered Nurse",
  specialty: "ICU",
  weeklyPay: 2800,
  duration: 13,
  startDate: "June 15, 2026",
  status: "SENT",
  token: "demo-token-abc123",
  perks: [
    { type: "HOUSING", title: "Housing Assistance", desc: "Verified furnished apartments near facility" },
    { type: "FLIGHT", title: "Flight Support", desc: "Roundtrip flight covered" },
    { type: "FIRST_WEEK", title: "First Week Readiness", desc: "Day-1 support package" },
  ],
};

export default function CandidateDashboard() {
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-orbit-dark">My Assignment Hub</h1>
        <p className="text-slate-500 text-sm mt-1">Your active offer and support resources</p>
      </div>

      {/* Active Offer Card */}
      <Card className="bg-orbit-gradient text-white shadow-orbit-xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Badge className="bg-white/15 text-white border-0">Active Offer</Badge>
            <Badge className="bg-sky-500/30 text-white border-0">
              <Clock className="h-3 w-3 mr-1 inline" />Awaiting Decision
            </Badge>
          </div>
          <h2 className="text-xl font-bold mb-1">{demoOffer.facilityName}</h2>
          <p className="text-white/80 mb-4">{demoOffer.facilityCity}, {demoOffer.facilityState} · {demoOffer.role}</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div>
              <p className="text-white/60 text-xs mb-1">Weekly Pay</p>
              <p className="text-xl font-bold">{formatCurrency(demoOffer.weeklyPay)}</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Duration</p>
              <p className="text-xl font-bold">{demoOffer.duration}wks</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Start Date</p>
              <p className="text-sm font-semibold">{demoOffer.startDate}</p>
            </div>
          </div>
          <Link href={`/candidate/offer/${demoOffer.token}`}>
            <Button className="w-full bg-white text-orbit-dark hover:bg-white/90 font-semibold">
              View Full Offer & Accept
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Perks */}
      <div>
        <h2 className="font-semibold text-orbit-dark mb-3">Your Included Support</h2>
        <div className="space-y-2">
          {demoOffer.perks.map((perk, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-orbit">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-orbit-dark">{perk.title}</p>
                <p className="text-xs text-slate-500">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="font-semibold text-orbit-dark mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Housing", icon: Home, href: "/candidate/housing", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "Travel", icon: Plane, href: "/candidate/travel", color: "bg-sky-50 text-sky-700 border-sky-200" },
            { label: "Car Rental", icon: Car, href: "/candidate/car", color: "bg-purple-50 text-purple-700 border-purple-200" },
            { label: "Documents", icon: FileText, href: "/candidate/documents", color: "bg-amber-50 text-amber-700 border-amber-200" },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${item.color} hover:shadow-orbit transition-all`}>
                <item.icon className="h-5 w-5" />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
