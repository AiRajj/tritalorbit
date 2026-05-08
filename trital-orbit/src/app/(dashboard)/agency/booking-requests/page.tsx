"use client";

import React, { useEffect, useState } from "react";
import { Search, Filter, Home, Plane, Car, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate, formatRelativeTime } from "@/lib/utils";

const mockBookings = [
  {
    id: "1", candidateName: "Maria Santos", offerId: "o1", facilityCity: "Phoenix", facilityState: "AZ",
    needsHousing: true, needsFlight: true, needsCar: false, status: "NEW",
    moveDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    budgetRange: "$2,000-$3,000/mo", notes: "Needs pet-friendly housing", createdAt: new Date().toISOString(),
  },
  {
    id: "2", candidateName: "David Chen", offerId: "o2", facilityCity: "Dallas", facilityState: "TX",
    needsHousing: true, needsFlight: false, needsCar: true, status: "IN_PROGRESS",
    moveDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    budgetRange: "$1,500-$2,500/mo", notes: null, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3", candidateName: "Lisa Park", offerId: "o3", facilityCity: "Chicago", facilityState: "IL",
    needsHousing: false, needsFlight: true, needsCar: true, status: "COMPLETED",
    moveDate: null, budgetRange: null, notes: null, createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function AgencyBookingRequestsPage() {
  const [bookings] = useState(mockBookings);
  const [search, setSearch] = useState("");

  const filtered = bookings.filter(b =>
    b.candidateName.toLowerCase().includes(search.toLowerCase()) ||
    b.facilityCity.toLowerCase().includes(search.toLowerCase())
  );

  const countByStatus = {
    NEW: bookings.filter(b => b.status === "NEW").length,
    IN_PROGRESS: bookings.filter(b => b.status === "IN_PROGRESS").length,
    COMPLETED: bookings.filter(b => b.status === "COMPLETED").length,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-orbit-dark">Booking Requests</h1>
        <p className="text-slate-500 text-sm mt-1">Monitor housing, travel, and transportation requests from your candidates</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "New Requests", count: countByStatus.NEW, color: "bg-sky-50 border-sky-200 text-sky-700" },
          { label: "In Progress", count: countByStatus.IN_PROGRESS, color: "bg-amber-50 border-amber-200 text-amber-700" },
          { label: "Completed", count: countByStatus.COMPLETED, color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl border p-4 ${item.color}`}>
            <div className="text-2xl font-bold mb-1">{item.count}</div>
            <div className="text-xs font-semibold uppercase tracking-wider">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Search requests..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Candidate</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Location</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Needs</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Move Date</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 py-3">Submitted</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-sm text-orbit-dark">{booking.candidateName}</div>
                      {booking.notes && <div className="text-xs text-slate-500 mt-0.5">{booking.notes}</div>}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600">{booking.facilityCity}, {booking.facilityState}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-1.5">
                        {booking.needsHousing && (
                          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5 text-xs font-medium">
                            <Home className="h-3 w-3" />Housing
                          </span>
                        )}
                        {booking.needsFlight && (
                          <span className="flex items-center gap-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full px-2 py-0.5 text-xs font-medium">
                            <Plane className="h-3 w-3" />Flight
                          </span>
                        )}
                        {booking.needsCar && (
                          <span className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2 py-0.5 text-xs font-medium">
                            <Car className="h-3 w-3" />Car
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600">
                      {booking.moveDate ? formatDate(booking.moveDate) : "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400">{formatRelativeTime(booking.createdAt)}</td>
                    <td className="px-4 py-3.5">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
