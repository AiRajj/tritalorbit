import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { runAiAgent } from "@/lib/services/ai";

export async function PATCH(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { status: "NEW" | "IN_PROGRESS" | "WAITING_CANDIDATE" | "COMPLETED" | "CANCELLED" };
  const { taskId } = await params;

  const task = await prisma.conciergeTask.update({
    where: { id: taskId },
    data: { status: body.status },
    include: { candidate: true }
  });

  if (body.status === "COMPLETED") {
    const ai = await runAiAgent(
      "Concierge AI Agent",
      `Draft concise candidate update for completed concierge task: ${task.title}`
    );

    if (task.candidate?.userId) {
      await prisma.notification.create({
        data: {
          userId: task.candidate.userId,
          type: "INFO",
          title: "Concierge update",
          message: ai.summary
        }
      });
    }

    await prisma.activityLog.create({
      data: {
        agencyId: task.agencyId,
        actorId: session.user.id,
        candidateId: task.candidateId,
        assignmentId: task.assignmentId,
        action: "concierge.task.completed",
        metadata: { message: ai.summary }
      }
    });
  }

  return NextResponse.json({ id: task.id, status: task.status });
}
