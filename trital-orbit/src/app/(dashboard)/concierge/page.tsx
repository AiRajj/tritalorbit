"use client";

import React, { useState } from "react";
import { Home, Plane, Car, Clock, CheckCircle2, AlertTriangle, Plus, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/kpi-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { formatRelativeTime } from "@/lib/utils";

const TASK_COLUMNS = ["NEW", "IN_PROGRESS", "WAITING_CANDIDATE", "COMPLETED"] as const;

const mockTasks = [
  {
    id: "1", title: "Housing + Flight for Maria Santos", candidateName: "Maria Santos",
    assignmentCity: "Phoenix", assignmentState: "AZ", taskType: "HOUSING,FLIGHT",
    status: "NEW", priority: "HIGH", dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "2", title: "Housing for David Chen", candidateName: "David Chen",
    assignmentCity: "Dallas", assignmentState: "TX", taskType: "HOUSING",
    status: "IN_PROGRESS", priority: "NORMAL", dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3", title: "Flight + Car for Lisa Park", candidateName: "Lisa Park",
    assignmentCity: "Chicago", assignmentState: "IL", taskType: "FLIGHT,CAR",
    status: "WAITING_CANDIDATE", priority: "NORMAL", dueDate: null,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4", title: "Housing for James Okafor", candidateName: "James Okafor",
    assignmentCity: "Seattle", assignmentState: "WA", taskType: "HOUSING",
    status: "COMPLETED", priority: "NORMAL", dueDate: null,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

const taskTypeIcons: Record<string, React.ElementType> = {
  HOUSING: Home,
  FLIGHT: Plane,
  CAR: Car,
};

const columnConfig = {
  NEW: { label: "New", color: "bg-sky-50 border-sky-200", headerColor: "bg-sky-100 text-sky-700", count: 0 },
  IN_PROGRESS: { label: "In Progress", color: "bg-amber-50 border-amber-200", headerColor: "bg-amber-100 text-amber-700", count: 0 },
  WAITING_CANDIDATE: { label: "Waiting Candidate", color: "bg-purple-50 border-purple-200", headerColor: "bg-purple-100 text-purple-700", count: 0 },
  COMPLETED: { label: "Completed", color: "bg-emerald-50 border-emerald-200", headerColor: "bg-emerald-100 text-emerald-700", count: 0 },
};

export default function ConciergeDashboard() {
  const [tasks] = useState(mockTasks);

  const columnTasks = TASK_COLUMNS.reduce((acc, col) => {
    acc[col] = tasks.filter(t => t.status === col);
    return acc;
  }, {} as Record<string, typeof mockTasks>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-orbit-dark">Concierge Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage housing, travel, and relocation support for candidates</p>
        </div>
        <Button className="bg-orbit-blue hover:bg-orbit-blue-light text-white">
          <Plus className="h-4 w-4 mr-2" />New Task
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="New Requests" value={columnTasks.NEW.length} icon={Clock} iconColor="bg-sky-50 text-sky-600" />
        <KPICard title="In Progress" value={columnTasks.IN_PROGRESS.length} icon={AlertTriangle} iconColor="bg-amber-50 text-amber-600" />
        <KPICard title="Waiting Candidate" value={columnTasks.WAITING_CANDIDATE.length} icon={Brain} iconColor="bg-purple-50 text-purple-600" />
        <KPICard title="Completed Today" value={columnTasks.COMPLETED.length} icon={CheckCircle2} iconColor="bg-emerald-50 text-emerald-600" />
      </div>

      {/* Kanban Board */}
      <div className="grid lg:grid-cols-4 gap-4 overflow-x-auto">
        {TASK_COLUMNS.map((col) => {
          const config = columnConfig[col];
          const colTasks = columnTasks[col];
          return (
            <div key={col} className="min-w-[280px]">
              <div className={`px-3 py-2 rounded-lg mb-3 flex items-center justify-between ${config.headerColor}`}>
                <span className="text-sm font-semibold">{config.label}</span>
                <span className="text-sm font-bold">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {colTasks.map((task) => {
                  const types = task.taskType.split(",");
                  return (
                    <Card key={task.id} className={`border ${config.color} hover:shadow-orbit-lg transition-all cursor-pointer`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm text-orbit-dark leading-tight">{task.title}</h3>
                          {task.priority === "HIGH" && (
                            <Badge className="bg-red-100 text-red-700 border-0 text-xs ml-2 flex-shrink-0">Urgent</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 mb-3">
                          {types.map((type) => {
                            const Icon = taskTypeIcons[type] ?? Home;
                            return (
                              <span key={type} className="flex items-center gap-1 text-xs bg-white rounded-full px-2 py-0.5 border border-slate-200 text-slate-600">
                                <Icon className="h-3 w-3" />{type.charAt(0) + type.slice(1).toLowerCase()}
                              </span>
                            );
                          })}
                        </div>
                        <div className="text-xs text-slate-500">
                          <span className="font-medium text-orbit-dark">{task.assignmentCity}, {task.assignmentState}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{formatRelativeTime(task.createdAt)}</div>
                      </CardContent>
                    </Card>
                  );
                })}
                {colTasks.length === 0 && (
                  <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-xl">
                    <p className="text-xs text-slate-400">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
