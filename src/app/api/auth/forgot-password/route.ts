import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { forgotPasswordSchema } from "@/lib/validators/forms";
import { sendPasswordResetEmail } from "@/lib/services/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (!user) {
      return NextResponse.json({ success: true });
    }

    const token = randomUUID();
    const resetUrl = `${env.appUrl}/login?reset=${token}`;

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: "password.reset.requested",
        targetType: "User",
        targetId: user.id,
        metadata: { token }
      }
    });

    await sendPasswordResetEmail({ to: user.email, resetUrl });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to process request" }, { status: 500 });
  }
}
