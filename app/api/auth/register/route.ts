import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma, safeDb } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registration", issues: parsed.error.flatten() }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await safeDb(
    () =>
      prisma.user.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email.toLowerCase(),
          role: parsed.data.role,
          passwordHash
        },
        select: { id: true, email: true, role: true }
      }),
    null
  );

  if (!user) {
    return NextResponse.json(
      { error: "Database is not configured for persistent registration", fallback: true },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true, user });
}
