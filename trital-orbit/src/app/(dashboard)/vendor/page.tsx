"use client";

import React from "react";
import { Home, Star, CheckCircle2, Clock, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/kpi-card";
import { Badge } from "@/components/ui/badge";

const myListings = [
  { id: "1", title: "Phoenix Corporate Suites", city: "Phoenix", state: "AZ", monthlyRate: 2400, isAvailable: true, rating: 4.8 },
  { id: "2", title: "Desert View Furnished Apt", city: "Scottsdale", state: "AZ", monthlyRate: 2100, isAvailable: false, rating: 4.6 },
];

const recentRequests = [
  { candidate: "Maria Santos", city: "Phoenix", moveDate: "Jun 15", status: "NEW" },
  { candidate: "James Okafor", city: "Phoenix", moveDate: "Jun 10", status: "IN_PROGRESS" },
];

export default function VendorDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Vendor Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your listings and housing requests</p>
        </div>
        <Button className="bg-orbit-blue hover:bg-orbit-blue-light text-white">
          <Plus className="h-4 w-4 mr-2" />Add Listing
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Listings" value={myListings.filter(l => l.isAvailable).length} icon={Home} iconColor="bg-emerald-50 text-emerald-600" />
        <KPICard title="New Requests" value={recentRequests.filter(r => r.status === "NEW").length} icon={Clock} iconColor="bg-sky-50 text-sky-600" />
        <KPICard title="Avg Rating" value="4.7" icon={Star} iconColor="bg-amber-50 text-amber-600" />
        <KPICard title="Placements (30d)" value={8} icon={CheckCircle2} iconColor="bg-purple-50 text-purple-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">My Listings</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {myListings.map((listing) => (
              <div key={listing.id} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Home className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-orbit-dark">{listing.title}</div>
                  <div className="text-xs text-slate-500">{listing.city}, {listing.state} · ${listing.monthlyRate.toLocaleString()}/mo</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Star className="h-3 w-3 fill-current" />{listing.rating}
                  </div>
                  <Badge className={listing.isAvailable ? "bg-emerald-100 text-emerald-700 border-0" : "bg-slate-100 text-slate-500 border-0"}>
                    {listing.isAvailable ? "Available" : "Occupied"}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent Requests</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {recentRequests.map((req, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-200">
                <div className="flex-1">
                  <div className="font-semibold text-sm text-orbit-dark">{req.candidate}</div>
                  <div className="text-xs text-slate-500">{req.city} · Move date: {req.moveDate}</div>
                </div>
                <Badge className={req.status === "NEW" ? "bg-sky-100 text-sky-700 border-0" : "bg-amber-100 text-amber-700 border-0"}>
                  {req.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
