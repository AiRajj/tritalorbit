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
import { cn, formatDate, getStatusColor } from "@/lib/utils";
import {
  ListChecks,
  MessageSquare,
  CalendarCheck,
  Star,
  Eye,
  Pencil,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Plus,
  TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Active Listings", value: 5, icon: <ListChecks className="h-5 w-5 text-[#0B3C5D]" />, change: "+1 this week" },
  { label: "Total Inquiries", value: 23, icon: <MessageSquare className="h-5 w-5 text-blue-500" />, change: "+5 this week" },
  { label: "Active Bookings", value: 8, icon: <CalendarCheck className="h-5 w-5 text-emerald-500" />, change: "+2 this month" },
  { label: "Average Rating", value: "4.7", icon: <Star className="h-5 w-5 text-amber-500" />, change: "Based on 89 reviews" },
];

const listings = [
  { id: "L-001", name: "Furnished 1BR - Downtown Rochester", location: "Rochester, MN", type: "Housing", price: "$1,200/mo", status: "Active", inquiries: 5, bookings: 2 },
  { id: "L-002", name: "Shared 2BR Suite - Midtown", location: "New York, NY", type: "Housing", price: "$1,800/mo", status: "Active", inquiries: 12, bookings: 4 },
  { id: "L-003", name: "Corporate Extended Stay Package", location: "Cleveland, OH", type: "Housing", price: "$950/mo", status: "Active", inquiries: 3, bookings: 1 },
  { id: "L-004", name: "SUV Rental - Monthly Rate", location: "Los Angeles, CA", type: "Transportation", price: "$650/mo", status: "Active", inquiries: 7, bookings: 5 },
  { id: "L-005", name: "Compact Car - Weekly Flexible", location: "Boston, MA", type: "Transportation", price: "$180/wk", status: "Inactive", inquiries: 1, bookings: 0 },
];

const recentInquiries = [
  { id: "INQ-01", name: "Candidate #4821", listing: "Furnished 1BR - Downtown Rochester", date: "2026-05-08", duration: "13 weeks", budget: "$1,200/mo", status: "New", message: "Hi, is this available from June 2? I need it for 13 weeks." },
  { id: "INQ-02", name: "Candidate #3297", listing: "Shared 2BR Suite - Midtown", date: "2026-05-07", duration: "8 weeks", budget: "$1,800/mo", status: "Replied", message: "Does this include utilities? And is it pet-friendly?" },
  { id: "INQ-03", name: "Candidate #5104", listing: "SUV Rental - Monthly Rate", date: "2026-05-07", duration: "6 months", budget: "$600/mo", status: "New", message: "I'll need it starting May 30. Can you do a 3-month deal?" },
  { id: "INQ-04", name: "Candidate #2788", listing: "Corporate Extended Stay Package", date: "2026-05-06", duration: "26 weeks", budget: "$950/mo", status: "Booked", message: "Perfect, I'll take it. Starting June 5 for 8 weeks." },
  { id: "INQ-05", name: "Candidate #6015", listing: "Furnished 1BR - Downtown Rochester", date: "2026-05-05", duration: "13 weeks", budget: "$1,100/mo", status: "New", message: "Looking for availability starting July 1. Is parking included?" },
];

const profileCompletion = {
  percentage: 85,
  items: [
    { label: "Business information", done: true },
    { label: "Contact details", done: true },
    { label: "Payment setup", done: true },
    { label: "Listing photos", done: true },
    { label: "Insurance documents", done: false },
    { label: "Background verification", done: false },
    { label: "References", done: true },
  ],
};

export default function VendorDashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-52" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-[#1F2937]">Vendor Dashboard</h1>
          <p className="text-sm text-[#1F2937]/60 mt-1">Manage your listings, inquiries, and bookings</p>
        </motion.div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#0B3C5D]/20 text-[#0B3C5D]">
            Update Profile
          </Button>
          <Button className="bg-[#0B3C5D] hover:bg-[#0B3C5D]/90 text-white">
            <Plus className="h-4 w-4 mr-2" /> Add New Listing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-lg bg-[#0B3C5D]/5 p-2.5">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
                  <p className="text-xs text-[#1F2937]/60">{stat.label}</p>
                  <p className="text-[10px] text-[#1F2937]/40">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Listings</CardTitle>
            <CardDescription>All your active and inactive listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1F2937]/10">
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Listing</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Inquiries</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Bookings</th>
                    <th className="text-left py-3 px-4 font-medium text-[#1F2937]/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className="border-b border-[#1F2937]/5 hover:bg-[#0B3C5D]/[0.02] cursor-pointer transition-colors">
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{listing.name}</td>
                      <td className="py-3 px-4 text-[#1F2937]/70">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{listing.location}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">{listing.type}</Badge>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#1F2937]">{listing.price}</td>
                      <td className="py-3 px-4">
                        <Badge className={cn("text-xs", getStatusColor(listing.status))} variant="outline">
                          {listing.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center text-[#1F2937]/70">{listing.inquiries}</td>
                      <td className="py-3 px-4 text-center text-[#1F2937]/70">{listing.bookings}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-[#0B3C5D] px-2 gap-1"><Pencil className="h-3 w-3" /> Edit</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-[#1F2937]/60 px-2 gap-1"><Eye className="h-3 w-3" /> View</Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Recent Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="rounded-lg border border-[#1F2937]/10 p-3 hover:bg-[#0B3C5D]/[0.02] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-[#1F2937]">{inq.name}</p>
                    <Badge className={cn("text-[10px]", getStatusColor(inq.status))} variant="outline">
                      {inq.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#0B3C5D] mb-1">{inq.listing}</p>
                  <div className="flex items-center gap-3 text-[10px] text-[#1F2937]/40 mb-1">
                    <span>Duration: {inq.duration}</span>
                    <span>Budget: {inq.budget}</span>
                  </div>
                  <p className="text-xs text-[#1F2937]/50 line-clamp-1">{inq.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-[#1F2937]/30">{formatDate(inq.date)}</p>
                    {inq.status === "New" && (
                      <div className="flex items-center gap-1.5">
                        <Button variant="ghost" size="sm" className="h-6 text-[10px] text-[#0B3C5D] px-2">
                          <CheckCircle2 className="h-3 w-3 mr-1" /> Respond
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-[10px] text-red-500 px-2">
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#0B3C5D]" />
                Profile Completion
              </CardTitle>
              <CardDescription>Complete your profile to attract more candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Progress value={profileCompletion.percentage} className="h-3 flex-1" />
                <span className="text-sm font-bold text-[#0B3C5D]">{profileCompletion.percentage}%</span>
              </div>
              <div className="space-y-2">
                {profileCompletion.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    {item.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-[#1F2937]/20 shrink-0" />
                    )}
                    <span className={cn("text-sm", item.done ? "text-[#1F2937]/50" : "text-[#1F2937] font-medium")}>
                      {item.label}
                    </span>
                    {!item.done && (
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-[#0B3C5D] ml-auto p-0 hover:bg-transparent">
                        Complete <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
