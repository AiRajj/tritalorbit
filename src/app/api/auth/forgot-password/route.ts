import { addHours } from "date-fns";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = randomUUID();

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: addHours(new Date(), 1),
    },
  });

  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const resetUrl = `${process.env.APP_URL ?? "http://localhost:3000"}/login?resetToken=${token}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: "TRITAL Orbit password reset",
      html: `<p>You requested a password reset for TRITAL Orbit.</p><p>Use this temporary link to continue: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  }

  return NextResponse.json({ ok: true });
}
