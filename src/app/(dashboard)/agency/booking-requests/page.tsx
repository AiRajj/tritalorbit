"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Home,
  Car,
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  User,
  MapPin,
  MessageSquare,
  Phone,
  CheckCircle2,
  AlertCircle,
  Timer,
  XCircle,
  MoreHorizontal,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type BookingStatus = "New" | "In Progress" | "Waiting" | "Completed" | "Cancelled";

interface BookingRequest {
  id: string;
  candidate: {
    name: string;
    role: string;
    avatar: string;
  };
  assignment: {
    facility: string;
    city: string;
    state: string;
  };
  requestTypes: ("flight" | "housing" | "car")[];
  moveDate: string;
  status: BookingStatus;
  concierge: string;
  timeline: string;
  priority: "high" | "medium" | "low";
  details: {
    notes: string;
    lastUpdate: string;
    flightDetails?: string;
    housingDetails?: string;
    carDetails?: string;
  };
}

const mockRequests: BookingRequest[] = [
  {
    id: "BR-001",
    candidate: { name: "Sarah Mitchell", role: "RN - ICU", avatar: "SM" },
    assignment: { facility: "Cedars-Sinai Medical Center", city: "Los Angeles", state: "CA" },
    requestTypes: ["flight", "housing", "car"],
    moveDate: "2026-06-10",
    status: "New",
    concierge: "Maria Garcia",
    timeline: "5 days until move",
    priority: "high",
    details: {
      notes: "Candidate prefers direct flights. Has a small pet (cat) — needs pet-friendly housing.",
      lastUpdate: "2026-05-08T09:30:00Z",
      flightDetails: "Searching LAX direct flights from DFW, Jun 10",
      housingDetails: "3 pet-friendly options identified near facility",
      carDetails: "Compact SUV reserved through Enterprise",
    },
  },
  {
    id: "BR-002",
    candidate: { name: "James Rodriguez", role: "RT - NICU", avatar: "JR" },
    assignment: { facility: "Mayo Clinic", city: "Rochester", state: "MN" },
    requestTypes: ["flight", "housing"],
    moveDate: "2026-06-15",
    status: "In Progress",
    concierge: "David Kim",
    timeline: "10 days until move",
    priority: "medium",
    details: {
      notes: "First-time traveler. Needs extra orientation support.",
      lastUpdate: "2026-05-07T14:20:00Z",
      flightDetails: "Flight booked: UA 1482 SFO→RST Jun 15, 8:15am",
      housingDetails: "Reviewing 2 furnished apartments on 2nd Ave",
    },
  },
  {
    id: "BR-003",
    candidate: { name: "Emily Chen", role: "LPN - Med-Surg", avatar: "EC" },
    assignment: { facility: "Johns Hopkins Hospital", city: "Baltimore", state: "MD" },
    requestTypes: ["housing"],
    moveDate: "2026-06-01",
    status: "Waiting",
    concierge: "Sarah Taylor",
    timeline: "Awaiting candidate response",
    priority: "medium",
    details: {
      notes: "Candidate driving from Philadelphia. Only needs housing assistance.",
      lastUpdate: "2026-05-06T11:00:00Z",
      housingDetails: "Sent 3 housing options via email, waiting for preference",
    },
  },
  {
    id: "BR-004",
    candidate: { name: "Marcus Johnson", role: "CNA - ER", avatar: "MJ" },
    assignment: { facility: "Cleveland Clinic", city: "Cleveland", state: "OH" },
    requestTypes: ["flight", "car"],
    moveDate: "2026-05-28",
    status: "Completed",
    concierge: "Maria Garcia",
    timeline: "Completed May 5",
    priority: "low",
    details: {
      notes: "All travel arrangements confirmed. Candidate notified.",
      lastUpdate: "2026-05-05T16:45:00Z",
      flightDetails: "Flight confirmed: DL 892 ATL→CLE May 28, 10:30am",
      carDetails: "Midsize sedan reserved at CLE airport, Hertz confirmation #H928371",
    },
  },
  {
    id: "BR-005",
    candidate: { name: "Jessica Patel", role: "RN - OR", avatar: "JP" },
    assignment: { facility: "Mass General Hospital", city: "Boston", state: "MA" },
    requestTypes: ["flight", "housing", "car"],
    moveDate: "2026-07-01",
    status: "New",
    concierge: "Unassigned",
    timeline: "24 days until move",
    priority: "medium",
    details: {
      notes: "52-week assignment. Needs long-term housing solution. Prefers Back Bay area.",
      lastUpdate: "2026-05-08T08:00:00Z",
    },
  },
  {
    id: "BR-006",
    candidate: { name: "Daniel Foster", role: "PT - Rehab", avatar: "DF" },
    assignment: { facility: "Shirley Ryan AbilityLab", city: "Chicago", state: "IL" },
    requestTypes: ["housing", "car"],
    moveDate: "2026-06-20",
    status: "In Progress",
    concierge: "David Kim",
    timeline: "12 days until move",
    priority: "medium",
    details: {
      notes: "Relocating from Phoenix. Needs parking-included housing near the Loop.",
      lastUpdate: "2026-05-07T10:15:00Z",
      housingDetails: "Touring 2 apartments virtually on May 10",
      carDetails: "Weekly rental quote received from Budget — $285/wk",
    },
  },
  {
    id: "BR-007",
    candidate: { name: "Ashley Williams", role: "RN - L&D", avatar: "AW" },
    assignment: { facility: "Texas Children's Hospital", city: "Houston", state: "TX" },
    requestTypes: ["flight"],
    moveDate: "2026-06-05",
    status: "Cancelled",
    concierge: "Sarah Taylor",
    timeline: "Cancelled by candidate",
    priority: "low",
    details: {
      notes: "Candidate declined assignment. Flight booking cancelled, refund processed.",
      lastUpdate: "2026-05-04T13:30:00Z",
      flightDetails: "Cancelled: SW 412 SEA→IAH Jun 5 — Refund $342 processed",
    },
  },
  {
    id: "BR-008",
    candidate: { name: "Robert Chang", role: "CRNA - Cardiac", avatar: "RC" },
    assignment: { facility: "Stanford Medical Center", city: "Palo Alto", state: "CA" },
    requestTypes: ["flight", "housing", "car"],
    moveDate: "2026-06-22",
    status: "In Progress",
    concierge: "Maria Garcia",
    timeline: "14 days until move",
    priority: "high",
    details: {
      notes: "VIP candidate — 15yr experience. Premium housing requested. Prefers luxury SUV.",
      lastUpdate: "2026-05-08T07:45:00Z",
      flightDetails: "Business class flight search in progress, BOS→SFO",
      housingDetails: "2BR premium apartment shortlisted in downtown Palo Alto",
      carDetails: "Luxury SUV quote pending from National",
    },
  },
];

const statusConfig: Record<BookingStatus, { color: string; icon: React.ComponentType<{ className?: string }>; variant: "default" | "secondary" | "success" | "warning" | "destructive" }> = {
  New: { color: "bg-blue-500", icon: AlertCircle, variant: "default" },
  "In Progress": { color: "bg-amber-500", icon: Timer, variant: "warning" },
  Waiting: { color: "bg-purple-500", icon: Clock, variant: "secondary" },
  Completed: { color: "bg-emerald-500", icon: CheckCircle2, variant: "success" },
  Cancelled: { color: "bg-red-500", icon: XCircle, variant: "destructive" },
};

const requestTypeIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string }> = {
  flight: { icon: Plane, label: "Flight" },
  housing: { icon: Home, label: "Housing" },
  car: { icon: Car, label: "Car" },
};

type FilterTab = "all" | BookingStatus;

export default function BookingRequestsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredRequests = activeFilter === "all"
    ? mockRequests
    : mockRequests.filter((r) => r.status === activeFilter);

  const counts = {
    all: mockRequests.length,
    New: mockRequests.filter((r) => r.status === "New").length,
    "In Progress": mockRequests.filter((r) => r.status === "In Progress").length,
    Waiting: mockRequests.filter((r) => r.status === "Waiting").length,
    Completed: mockRequests.filter((r) => r.status === "Completed").length,
    Cancelled: mockRequests.filter((r) => r.status === "Cancelled").length,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937]">Booking Requests</h1>
            <p className="mt-1 text-[#1F2937]/60">
              Manage mobility concierge requests for your travelers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              {counts.New} new
            </Badge>
            <Badge variant="warning" className="px-3 py-1">
              {counts["In Progress"]} in progress
            </Badge>
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as FilterTab)} className="mb-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="gap-1">
              All <span className="ml-1 text-xs opacity-60">{counts.all}</span>
            </TabsTrigger>
            <TabsTrigger value="New" className="gap-1">
              New <span className="ml-1 text-xs opacity-60">{counts.New}</span>
            </TabsTrigger>
            <TabsTrigger value="In Progress" className="gap-1">
              In Progress <span className="ml-1 text-xs opacity-60">{counts["In Progress"]}</span>
            </TabsTrigger>
            <TabsTrigger value="Waiting" className="gap-1">
              Waiting <span className="ml-1 text-xs opacity-60">{counts.Waiting}</span>
            </TabsTrigger>
            <TabsTrigger value="Completed" className="gap-1">
              Completed <span className="ml-1 text-xs opacity-60">{counts.Completed}</span>
            </TabsTrigger>
            <TabsTrigger value="Cancelled" className="gap-1">
              Cancelled <span className="ml-1 text-xs opacity-60">{counts.Cancelled}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {activeFilter === "all" ? "All Requests" : `${activeFilter} Requests`}
              <span className="ml-2 text-sm font-normal text-[#1F2937]/50">
                ({filteredRequests.length})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="hidden border-b border-[#1F2937]/10 bg-[#F8FAFC] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1F2937]/50 lg:grid lg:grid-cols-12 lg:gap-4">
              <div className="col-span-2">Candidate</div>
              <div className="col-span-2">Assignment</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1">Move Date</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Concierge</div>
              <div className="col-span-2">Timeline</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-[#1F2937]/5">
              {filteredRequests.map((request) => {
                const isExpanded = expandedRow === request.id;
                const statusCfg = statusConfig[request.status];
                const StatusIcon = statusCfg.icon;

                return (
                  <div key={request.id}>
                    <div
                      className={cn(
                        "cursor-pointer px-6 py-4 transition-colors hover:bg-[#0B3C5D]/5",
                        isExpanded && "bg-[#0B3C5D]/5"
                      )}
                      onClick={() => setExpandedRow(isExpanded ? null : request.id)}
                    >
                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B3C5D]/10 text-xs font-bold text-[#0B3C5D]">
                              {request.candidate.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-[#1F2937]">{request.candidate.name}</p>
                              <p className="text-xs text-[#1F2937]/60">{request.candidate.role}</p>
                            </div>
                          </div>
                          <Badge variant={statusCfg.variant}>{request.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#1F2937]/60">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {request.assignment.city}, {request.assignment.state}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(request.moveDate).toLocaleDateString()}
                          </span>
                          <div className="flex gap-1">
                            {request.requestTypes.map((type) => {
                              const TypeIcon = requestTypeIcons[type].icon;
                              return <TypeIcon key={type} className="h-3.5 w-3.5 text-[#0B3C5D]" />;
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-4">
                        <div className="col-span-2 flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B3C5D]/10 text-xs font-bold text-[#0B3C5D]">
                            {request.candidate.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#1F2937]">{request.candidate.name}</p>
                            <p className="text-xs text-[#1F2937]/60">{request.candidate.role}</p>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-[#1F2937]">{request.assignment.facility}</p>
                          <p className="text-xs text-[#1F2937]/60">
                            {request.assignment.city}, {request.assignment.state}
                          </p>
                        </div>
                        <div className="col-span-1 flex gap-1.5">
                          {request.requestTypes.map((type) => {
                            const TypeIcon = requestTypeIcons[type].icon;
                            return (
                              <div
                                key={type}
                                className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0B3C5D]/10"
                                title={requestTypeIcons[type].label}
                              >
                                <TypeIcon className="h-3.5 w-3.5 text-[#0B3C5D]" />
                              </div>
                            );
                          })}
                        </div>
                        <div className="col-span-1">
                          <p className="text-sm text-[#1F2937]">
                            {new Date(request.moveDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="col-span-1">
                          <Badge variant={statusCfg.variant} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {request.status}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1F2937]/10 text-[10px] font-bold text-[#1F2937]">
                              {request.concierge === "Unassigned"
                                ? "?"
                                : request.concierge
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <span
                              className={cn(
                                "text-sm",
                                request.concierge === "Unassigned"
                                  ? "italic text-[#E63946]"
                                  : "text-[#1F2937]"
                              )}
                            >
                              {request.concierge}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-[#1F2937]/70">{request.timeline}</p>
                        </div>
                        <div className="col-span-1 flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-[#1F2937]/40" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#1F2937]/40" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#1F2937]/5 bg-[#F8FAFC] px-6 py-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {/* Notes */}
                              <div className="sm:col-span-2 lg:col-span-4">
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="h-4 w-4 mt-0.5 text-[#0B3C5D]" />
                                  <div>
                                    <p className="text-xs font-semibold text-[#1F2937]/50 uppercase">Notes</p>
                                    <p className="mt-1 text-sm text-[#1F2937]/80">{request.details.notes}</p>
                                  </div>
                                </div>
                              </div>

                              {request.details.flightDetails && (
                                <div className="rounded-lg border border-[#1F2937]/10 bg-white p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Plane className="h-4 w-4 text-[#0B3C5D]" />
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Flight</span>
                                  </div>
                                  <p className="text-sm text-[#1F2937]/70">{request.details.flightDetails}</p>
                                </div>
                              )}
                              {request.details.housingDetails && (
                                <div className="rounded-lg border border-[#1F2937]/10 bg-white p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Home className="h-4 w-4 text-[#0B3C5D]" />
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Housing</span>
                                  </div>
                                  <p className="text-sm text-[#1F2937]/70">{request.details.housingDetails}</p>
                                </div>
                              )}
                              {request.details.carDetails && (
                                <div className="rounded-lg border border-[#1F2937]/10 bg-white p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Car className="h-4 w-4 text-[#0B3C5D]" />
                                    <span className="text-xs font-semibold text-[#0B3C5D]">Car Rental</span>
                                  </div>
                                  <p className="text-sm text-[#1F2937]/70">{request.details.carDetails}</p>
                                </div>
                              )}

                              <div className="rounded-lg border border-[#1F2937]/10 bg-white p-3">
                                <p className="text-xs text-[#1F2937]/50">Last Updated</p>
                                <p className="mt-1 text-sm text-[#1F2937]">
                                  {new Date(request.details.lastUpdate).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="mr-1 h-3.5 w-3.5" />
                                Contact Candidate
                              </Button>
                              <Button size="sm" variant="outline">
                                <User className="mr-1 h-3.5 w-3.5" />
                                Assign Concierge
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="mr-1 h-3.5 w-3.5" />
                                Add Note
                              </Button>
                              {request.status !== "Completed" && request.status !== "Cancelled" && (
                                <Button size="sm">
                                  <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                                  Mark Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredRequests.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1F2937]/5">
                    <ClipboardCheck className="h-7 w-7 text-[#1F2937]/30" />
                  </div>
                  <p className="mt-4 text-lg font-medium text-[#1F2937]/50">No requests found</p>
                  <p className="mt-1 text-sm text-[#1F2937]/40">
                    There are no booking requests matching this filter
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
