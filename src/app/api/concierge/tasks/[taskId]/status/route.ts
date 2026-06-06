import { NextResponse } from "next/server";
import { z } from "zod";
import { Role, TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAgencyRole } from "@/lib/api-auth";
import { runAiAgent } from "@/lib/services/ai";

const bodySchema = z.object({
  status: z.nativeEnum(TaskStatus)
});

export async function PATCH(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  const taskBefore = await prisma.conciergeTask.findUnique({
    where: { id: taskId },
    select: { agencyId: true }
  });
  if (!taskBefore) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const guard = await requireAgencyRole(taskBefore.agencyId, [
    Role.AGENCY_OWNER,
    Role.CONCIERGE_MANAGER,
    Role.RECRUITER
  ]);
  if (!guard.ok) return guard.response;

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const task = await prisma.conciergeTask.update({
    where: { id: taskId },
    data: { status: parsed.data.status },
    include: { candidate: true }
  });

  if (parsed.data.status === TaskStatus.COMPLETED) {
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
        actorId: guard.session.user.id,
        candidateId: task.candidateId,
        assignmentId: task.assignmentId,
        action: "concierge.task.completed",
        metadata: { message: ai.summary }
      }
    });
  }

  return NextResponse.json({ id: task.id, status: task.status });
}
