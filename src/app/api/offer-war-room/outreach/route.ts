import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { offerOutreachSchema } from "@/lib/validators/phase3";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = offerOutreachSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid outreach payload" }, { status: 400 });
  }

  const log = await prisma.offerOutreachLog.create({
    data: {
      ...parsed.data,
      actorId: session.user.id,
      actionCompleted: parsed.data.actionCompleted ?? false
    }
  });

  return NextResponse.json({ log }, { status: 201 });
}
