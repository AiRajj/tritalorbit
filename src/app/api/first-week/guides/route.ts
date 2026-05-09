import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { firstWeekGuideSchema } from "@/lib/validators/phase3";
import { listFirstWeekGuides, upsertFirstWeekGuide } from "@/lib/services/phase3";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const candidate = await prisma.candidate.findUnique({
    where: { userId: session.user.id },
    select: { id: true }
  });

  const guides = await listFirstWeekGuides(candidate?.id);
  return NextResponse.json({ guides });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = firstWeekGuideSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid guide payload" }, { status: 400 });
  }

  const guide = await upsertFirstWeekGuide({
    ...parsed.data,
    checklistTitles: [
      'Confirm parking and arrival route',
      'Verify housing check-in details',
      'Upload emergency contacts'
    ]
  });

  return NextResponse.json({ guide }, { status: 201 });
}
