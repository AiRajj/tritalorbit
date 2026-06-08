"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plane,
  Home,
  Car,
  GripVertical,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Filter,
  DollarSign,
  MessageSquare,
} from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";
type Status = "new" | "in_progress" | "waiting_candidate" | "completed";
type RequestType = "flight" | "housing" | "car";

interface ConciergeTask {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  facility: string;
  location: string;
  requestTypes: RequestType[];
  priority: Priority;
  dueDate: string;
  assignedTo: string;
  assignedAvatar: string;
  status: Status;
  notes: string;
  budget: string;
  moveDate: string;
}

const MOCK_TASKS: ConciergeTask[] = [
  {
    id: "t1",
    candidateName: "Sarah Chen",
    candidateAvatar: "SC",
    facility: "Memorial Hospital",
    location: "Houston, TX",
    requestTypes: ["flight", "housing", "car"],
    priority: "urgent",
    dueDate: "2026-05-10",
    assignedTo: "Maria Lopez",
    assignedAvatar: "ML",
    status: "new",
    notes: "Flying from Portland, OR. Needs furnished apartment near TMC. Prefers in-unit W/D.",
    budget: "$1,500-$2,000",
    moveDate: "2026-06-12",
  },
  {
    id: "t2",
    candidateName: "Marcus Johnson",
    candidateAvatar: "MJ",
    facility: "Cedars-Sinai",
    location: "Los Angeles, CA",
    requestTypes: ["flight", "housing"],
    priority: "high",
    dueDate: "2026-05-12",
    assignedTo: "James Park",
    assignedAvatar: "JP",
    status: "new",
    notes: "Studio or 1BR near hospital. Will use public transit.",
    budget: "$2,000+",
    moveDate: "2026-06-20",
  },
  {
    id: "t3",
    candidateName: "Emily Rodriguez",
    candidateAvatar: "ER",
    facility: "Mayo Clinic",
    location: "Rochester, MN",
    requestTypes: ["housing", "car"],
    priority: "medium",
    dueDate: "2026-05-15",
    assignedTo: "Maria Lopez",
    assignedAvatar: "ML",
    status: "new",
    notes: "Driving from Chicago. Open to shared housing options.",
    budget: "Under $1,000",
    moveDate: "2026-07-01",
  },
  {
    id: "t4",
    candidateName: "David Kim",
    candidateAvatar: "DK",
    facility: "Mass General",
    location: "Boston, MA",
    requestTypes: ["flight", "housing"],
    priority: "high",
    dueDate: "2026-05-09",
    assignedTo: "James Park",
    assignedAvatar: "JP",
    status: "in_progress",
    notes: "Flying from Seattle. Prefers T-accessible location in Cambridge.",
    budget: "$1,500-$2,000",
    moveDate: "2026-06-25",
  },
  {
    id: "t5",
    candidateName: "Lisa Wang",
    candidateAvatar: "LW",
    facility: "Johns Hopkins",
    location: "Baltimore, MD",
    requestTypes: ["housing"],
    priority: "medium",
    dueDate: "2026-05-14",
    assignedTo: "Maria Lopez",
    assignedAvatar: "ML",
    status: "in_progress",
    notes: "Needs pet-friendly apartment. Has a small dog.",
    budget: "$1,000-$1,500",
    moveDate: "2026-06-28",
  },
  {
    id: "t6",
    candidateName: "Tom Bradley",
    candidateAvatar: "TB",
    facility: "Cleveland Clinic",
    location: "Cleveland, OH",
    requestTypes: ["flight", "housing", "car"],
    priority: "low",
    dueDate: "2026-05-20",
    assignedTo: "James Park",
    assignedAvatar: "JP",
    status: "in_progress",
    notes: "Flexible on housing location. Economy car is fine.",
    budget: "$1,000-$1,500",
    moveDate: "2026-07-10",
  },
  {
    id: "t7",
    candidateName: "Rachel Adams",
    candidateAvatar: "RA",
    facility: "Stanford Health",
    location: "Palo Alto, CA",
    requestTypes: ["car"],
    priority: "urgent",
    dueDate: "2026-05-08",
    assignedTo: "Maria Lopez",
    assignedAvatar: "ML",
    status: "in_progress",
    notes: "Needs SUV for family. Starting in 3 days.",
    budget: "$2,000+",
    moveDate: "2026-05-11",
  },
  {
    id: "t8",
    candidateName: "Mike Torres",
    candidateAvatar: "MT",
    facility: "UCSF Medical",
    location: "San Francisco, CA",
    requestTypes: ["housing"],
    priority: "high",
    dueDate: "2026-05-11",
    assignedTo: "James Park",
    assignedAvatar: "JP",
    status: "waiting_candidate",
    notes: "3 housing options sent. Waiting for candidate to select preference.",
    budget: "$2,000+",
    moveDate: "2026-06-18",
  },
  {
    id: "t9",
    candidateName: "Amy Lin",
    candidateAvatar: "AL",
    facility: "Mount Sinai",
    location: "New York, NY",
    requestTypes: ["flight", "housing"],
    priority: "medium",
    dueDate: "2026-05-13",
    assignedTo: "Maria Lopez",
    assignedAvatar: "ML",
    status: "waiting_candidate",
    notes: "Flight options sent. Candidate reviewing 2 apartment options in UES.",
    budget: "$2,000+",
    moveDate: "2026-06-22",
  },
  {
    id: "t10",
    candidateName: "Kevin Patel",
    candidateAvatar: "KP",
    facility: "NYU Langone",
    location: "New York, NY",
    requestTypes: ["flight", "housing", "car"],
    priority: "low",
    dueDate: "2026-05-05",
    assignedTo: "James Park",
    assignedAvatar: "JP",
    status: "completed",
    notes: "All booked. Flight: May 28 SFO→JFK. Housing: Murray Hill 1BR. Car: Enterprise sedan.",
    budget: "$1,500-$2,000",
    moveDate: "2026-05-28",
  },
  {
    id: "t11",
    candidateName: "Sandra Lee",
    candidateAvatar: "SL",
    facility: "Emory Hospital",
    location: "Atlanta, GA",
    requestTypes: ["housing"],
    priority: "medium",
    dueDate: "2026-05-03",
    assignedTo: "Maria Lopez",
    assignedAvatar: "ML",
    status: "completed",
    notes: "Confirmed: Furnished 1BR in Midtown Atlanta, $1,350/mo. Move-in June 1.",
    budget: "$1,000-$1,500",
    moveDate: "2026-06-01",
  },
  {
    id: "t12",
    candidateName: "Chris Nguyen",
    candidateAvatar: "CN",
    facility: "Rush University",
    location: "Chicago, IL",
    requestTypes: ["flight", "car"],
    priority: "high",
    dueDate: "2026-05-02",
    assignedTo: "James Park",
    assignedAvatar: "JP",
    status: "completed",
    notes: "All confirmed. Flight: May 25 LAX→ORD. Hertz compact SUV reserved.",
    budget: "$1,000-$1,500",
    moveDate: "2026-05-25",
  },
];

const COLUMNS: { key: Status; label: string; color: string }[] = [
  { key: "new", label: "New", color: "bg-blue-500" },
  { key: "in_progress", label: "In Progress", color: "bg-amber-500" },
  { key: "waiting_candidate", label: "Waiting Candidate", color: "bg-violet-500" },
  { key: "completed", label: "Completed", color: "bg-emerald-500" },
];

const priorityConfig: Record<Priority, { label: string; variant: "destructive" | "warning" | "secondary" | "default"; }> = {
  urgent: { label: "Urgent", variant: "destructive" },
  high: { label: "High", variant: "warning" },
  medium: { label: "Medium", variant: "secondary" },
  low: { label: "Low", variant: "default" },
};

const typeIcons: Record<RequestType, typeof Plane> = {
  flight: Plane,
  housing: Home,
  car: Car,
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function isOverdue(dateStr: string) {
  return new Date(dateStr) < new Date();
}

export default function ConciergeRequestsPage() {
  const [selectedTask, setSelectedTask] = useState<ConciergeTask | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredTasks = MOCK_TASKS.filter((task) => {
    if (priorityFilter !== "all" && task.priority !== priorityFilter) return false;
    if (typeFilter !== "all" && !task.requestTypes.includes(typeFilter as RequestType)) return false;
    return true;
  });

  const getColumnTasks = (status: Status) =>
    filteredTasks.filter((t) => t.status === status);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="border-b border-[#1F2937]/10 bg-white">
        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#1F2937]">
                Concierge Requests
              </h1>
              <p className="text-sm text-[#1F2937]/60">
                Manage mobility support requests across all candidates
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#1F2937]/40" />
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px] h-9 text-sm">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[120px] h-9 text-sm">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="flight">Flight</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="car">Car</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-[1000px]">
          {COLUMNS.map((column) => {
            const tasks = getColumnTasks(column.key);
            return (
              <div key={column.key} className="flex-1 min-w-[250px]">
                {/* Column Header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={`h-2.5 w-2.5 rounded-full ${column.color}`} />
                  <h3 className="font-semibold text-sm text-[#1F2937]">
                    {column.label}
                  </h3>
                  <Badge variant="secondary" className="text-xs h-5 min-w-[20px] justify-center">
                    {tasks.length}
                  </Badge>
                </div>

                {/* Column Content */}
                <div className="space-y-3">
                  {tasks.map((task) => {
                    const prioConfig = priorityConfig[task.priority];
                    const overdue = isOverdue(task.dueDate) && task.status !== "completed";
                    return (
                      <Card
                        key={task.id}
                        className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => setSelectedTask(task)}
                      >
                        <CardContent className="p-3">
                          {/* Drag Hint */}
                          <div className="flex items-center justify-between mb-2">
                            <GripVertical className="h-4 w-4 text-[#1F2937]/20 group-hover:text-[#1F2937]/40 transition-colors" />
                            <Badge variant={prioConfig.variant} className="text-[10px] px-1.5 py-0">
                              {prioConfig.label}
                            </Badge>
                          </div>

                          {/* Candidate */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-[#0B3C5D] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                              {task.candidateAvatar}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold text-sm text-[#1F2937] truncate">
                                {task.candidateName}
                              </div>
                              <div className="text-xs text-[#1F2937]/50 truncate">
                                {task.facility}
                              </div>
                            </div>
                          </div>

                          {/* Request Type Icons */}
                          <div className="flex items-center gap-1.5 mb-2">
                            {task.requestTypes.map((type) => {
                              const Icon = typeIcons[type];
                              return (
                                <div
                                  key={type}
                                  className="h-6 w-6 rounded bg-[#0B3C5D]/10 flex items-center justify-center"
                                  title={type}
                                >
                                  <Icon className="h-3 w-3 text-[#0B3C5D]" />
                                </div>
                              );
                            })}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between">
                            <div
                              className={`flex items-center gap-1 text-xs ${
                                overdue ? "text-[#E63946]" : "text-[#1F2937]/50"
                              }`}
                            >
                              {overdue ? (
                                <AlertTriangle className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                              {formatDate(task.dueDate)}
                            </div>
                            <div
                              className="h-6 w-6 rounded-full bg-[#1F2937]/10 flex items-center justify-center text-[8px] font-semibold text-[#1F2937]/60"
                              title={task.assignedTo}
                            >
                              {task.assignedAvatar}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {tasks.length === 0 && (
                    <div className="rounded-lg border border-dashed border-[#1F2937]/15 p-6 text-center">
                      <p className="text-xs text-[#1F2937]/40">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Detail Dialog */}
      <Dialog
        open={!!selectedTask}
        onOpenChange={(open) => !open && setSelectedTask(null)}
      >
        {selectedTask && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg">Request Details</DialogTitle>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Candidate Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#F8FAFC]">
                <div className="h-10 w-10 rounded-full bg-[#0B3C5D] flex items-center justify-center text-white text-sm font-semibold">
                  {selectedTask.candidateAvatar}
                </div>
                <div>
                  <div className="font-semibold text-[#1F2937]">
                    {selectedTask.candidateName}
                  </div>
                  <div className="text-xs text-[#1F2937]/60">
                    {selectedTask.facility} &middot; {selectedTask.location}
                  </div>
                </div>
                <Badge
                  variant={priorityConfig[selectedTask.priority].variant}
                  className="ml-auto"
                >
                  {priorityConfig[selectedTask.priority].label}
                </Badge>
              </div>

              {/* Request Types */}
              <div>
                <h4 className="text-sm font-medium text-[#1F2937] mb-2">
                  Requested Services
                </h4>
                <div className="flex gap-2">
                  {selectedTask.requestTypes.map((type) => {
                    const Icon = typeIcons[type];
                    return (
                      <div
                        key={type}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="capitalize">{type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#F8FAFC]">
                  <div className="flex items-center gap-1.5 text-xs text-[#1F2937]/50 mb-1">
                    <Calendar className="h-3 w-3" />
                    Move Date
                  </div>
                  <div className="text-sm font-medium text-[#1F2937]">
                    {formatDate(selectedTask.moveDate)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#F8FAFC]">
                  <div className="flex items-center gap-1.5 text-xs text-[#1F2937]/50 mb-1">
                    <DollarSign className="h-3 w-3" />
                    Budget
                  </div>
                  <div className="text-sm font-medium text-[#1F2937]">
                    {selectedTask.budget}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#F8FAFC]">
                  <div className="flex items-center gap-1.5 text-xs text-[#1F2937]/50 mb-1">
                    <Clock className="h-3 w-3" />
                    Due Date
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      isOverdue(selectedTask.dueDate) && selectedTask.status !== "completed"
                        ? "text-[#E63946]"
                        : "text-[#1F2937]"
                    }`}
                  >
                    {formatDate(selectedTask.dueDate)}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#F8FAFC]">
                  <div className="flex items-center gap-1.5 text-xs text-[#1F2937]/50 mb-1">
                    <User className="h-3 w-3" />
                    Assigned To
                  </div>
                  <div className="text-sm font-medium text-[#1F2937]">
                    {selectedTask.assignedTo}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="text-sm font-medium text-[#1F2937] mb-2 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-[#1F2937]/40" />
                  Notes
                </h4>
                <p className="text-sm text-[#1F2937]/70 bg-[#F8FAFC] rounded-lg p-3">
                  {selectedTask.notes}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {selectedTask.status !== "completed" && (
                  <>
                    <Button className="flex-1 bg-[#0B3C5D] hover:bg-[#0B3C5D]/90">
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Move Forward
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message Candidate
                    </Button>
                  </>
                )}
                {selectedTask.status === "completed" && (
                  <div className="flex items-center gap-2 w-full justify-center text-emerald-600 py-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
