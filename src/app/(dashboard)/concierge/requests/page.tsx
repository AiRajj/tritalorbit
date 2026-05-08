import { ConciergeBoard } from "@/components/dashboard/concierge-board";
import { getConciergeTaskBoard } from "@/lib/services/dashboard-data";

export default async function ConciergeRequestsPage() {
  const board = await getConciergeTaskBoard();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Concierge Request Board</h1>
        <p className="text-sm text-slate-600">Manage mobility support tasks by workflow status.</p>
      </div>

      <ConciergeBoard
        initialData={{
          NEW: board.NEW.map((task) => ({ id: task.id, title: task.title, description: task.description, status: "NEW" })),
          IN_PROGRESS: board.IN_PROGRESS.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: "IN_PROGRESS"
          })),
          WAITING_CANDIDATE: board.WAITING_CANDIDATE.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: "WAITING_CANDIDATE"
          })),
          COMPLETED: board.COMPLETED.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: "COMPLETED"
          })),
          CANCELLED: board.CANCELLED.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: "CANCELLED"
          }))
        }}
      />
    </div>
  );
}
