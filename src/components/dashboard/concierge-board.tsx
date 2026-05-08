"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: "NEW" | "IN_PROGRESS" | "WAITING_CANDIDATE" | "COMPLETED" | "CANCELLED";
};

type BoardData = Record<"NEW" | "IN_PROGRESS" | "WAITING_CANDIDATE" | "COMPLETED" | "CANCELLED", Task[]>;

const columns = [
  { key: "NEW", label: "New" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "WAITING_CANDIDATE", label: "Waiting Candidate" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" }
] as const;

export function ConciergeBoard({ initialData }: { initialData: BoardData }) {
  const [data, setData] = useState(initialData);

  async function updateStatus(taskId: string, nextStatus: Task["status"]) {
    const response = await fetch(`/api/concierge/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus })
    });

    if (!response.ok) {
      toast.error("Unable to update task status");
      return;
    }

    setData((current) => {
      const next: BoardData = {
        NEW: [...current.NEW],
        IN_PROGRESS: [...current.IN_PROGRESS],
        WAITING_CANDIDATE: [...current.WAITING_CANDIDATE],
        COMPLETED: [...current.COMPLETED],
        CANCELLED: [...current.CANCELLED]
      };

      let movedTask: Task | null = null;
      (Object.keys(next) as Array<keyof BoardData>).forEach((key) => {
        next[key] = next[key].filter((task) => {
          if (task.id === taskId) {
            movedTask = { ...task, status: nextStatus };
            return false;
          }
          return true;
        });
      });

      if (movedTask) {
        next[nextStatus].unshift(movedTask);
      }

      return next;
    });

    toast.success(`Task moved to ${nextStatus.replace("_", " ")}`);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {columns.map((column) => (
        <Card key={column.key}>
          <CardHeader>
            <CardTitle>{column.label}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data[column.key].map((task) => (
              <div key={task.id} className="rounded-md border border-slate-200 p-2 text-sm">
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="text-xs text-slate-500">{task.description ?? "No description"}</p>
                <select
                  className="mt-2 h-8 w-full rounded border border-slate-300 bg-white px-2 text-xs"
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value as Task["status"])}
                >
                  {columns.map((option) => (
                    <option value={option.key} key={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
