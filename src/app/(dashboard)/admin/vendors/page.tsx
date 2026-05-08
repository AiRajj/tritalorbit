"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getStatusColor } from "@/lib/utils";
import {
  Search,
  Building2,
  Star,
  Eye,
  Edit,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ListChecks,
  AlertTriangle,
} from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  type: string;
  verified: boolean;
  listings: number;
  rating: number;
  reviewCount: number;
  status: string;
  pendingVerification: boolean;
}

const vendors: Vendor[] = [
  { id: "V-001", name: "MedTravel Housing Co.", type: "Housing", verified: true, listings: 24, rating: 4.8, reviewCount: 89, status: "Active", pendingVerification: false },
  { id: "V-002", name: "NurseStay Suites", type: "Housing", verified: true, listings: 18, rating: 4.6, reviewCount: 62, status: "Active", pendingVerification: false },
  { id: "V-003", name: "TravelWheels Rentals", type: "Transportation", verified: true, listings: 35, rating: 4.4, reviewCount: 127, status: "Active", pendingVerification: false },
  { id: "V-004", name: "HealthPro Furnishings", type: "Furniture", verified: false, listings: 12, rating: 0, reviewCount: 0, status: "Pending", pendingVerification: true },
  { id: "V-005", name: "ClinicalGear Supply", type: "Equipment", verified: false, listings: 8, rating: 0, reviewCount: 0, status: "Pending", pendingVerification: true },
  { id: "V-006", name: "HomeCare Apartments", type: "Housing", verified: true, listings: 15, rating: 4.2, reviewCount: 41, status: "Active", pendingVerification: false },
  { id: "V-007", name: "QuickMove Logistics", type: "Transportation", verified: false, listings: 0, rating: 0, reviewCount: 0, status: "Inactive", pendingVerification: false },
];

export default function AdminVendorsPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: vendors.length,
    verified: vendors.filter((v) => v.verified).length,
    pending: vendors.filter((v) => v.pendingVerification).length,
    totalListings: vendors.reduce((s, v) => s + v.listings, 0),
  };

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1F2937]">Vendor Management</h1>
        <p className="text-sm text-[#1F2937]/60 mt-1">Manage vendor registrations, verification, and listings</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Vendors", value: stats.total, icon: <Building2 className="h-5 w-5 text-[#0B3C5D]" /> },
          { label: "Verified", value: stats.verified, icon: <ShieldCheck className="h-5 w-5 text-emerald-500" /> },
          { label: "Pending Verification", value: stats.pending, icon: <AlertTriangle className="h-5 w-5 text-amber-500" /> },
          { label: "Total Listings", value: stats.totalListings, icon: <ListChecks className="h-5 w-5 text-blue-500" /> },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-lg bg-[#0B3C5D]/5 p-2.5">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
                  <p className="text-xs text-[#1F2937]/60">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F2937]/40" />
          <Input
            placeholder="Search vendors by name or type..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10 bg-[#1F2937]/[0.02]">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Vendor Name</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Verified</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Listings</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((vendor) => (
                    <tr key={vendor.id} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{vendor.name}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">{vendor.type}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {vendor.verified ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-[#1F2937]/20" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-[#1F2937]">{vendor.listings}</td>
                      <td className="py-3 px-4">
                        {vendor.rating > 0 ? (
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium text-[#1F2937]">{vendor.rating}</span>
                            <span className="text-[10px] text-[#1F2937]/40">({vendor.reviewCount})</span>
                          </span>
                        ) : (
                          <span className="text-xs text-[#1F2937]/30">No reviews</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(vendor.status))} variant="outline">
                          {vendor.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {vendor.pendingVerification ? (
                            <>
                              <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white">
                                <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs text-[#E63946] border-[#E63946]/20 hover:bg-[#E63946]/5">
                                <XCircle className="h-3 w-3 mr-1" /> Reject
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Edit className="h-4 w-4" /></Button>
                            </>
                          )}
                        </div>
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
