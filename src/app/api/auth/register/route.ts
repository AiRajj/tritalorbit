import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid registration payload" }, { status: 400 });
  }

  const { name, email, password, role } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (exists) {
    return NextResponse.json({ error: "Email is already registered" }, { status: 409 });
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      role,
      passwordHash,
    },
  });

  if (role === Role.AGENCY_OWNER || role === Role.RECRUITER || role === Role.CONCIERGE_MANAGER) {
    const agency = await prisma.agency.create({
      data: {
        name: `${name.split(" ")[0]}'s Agency`,
        slug: `agency-${crypto.randomUUID().slice(0, 8)}`,
      },
    });

    await prisma.agencyMember.create({
      data: {
        agencyId: agency.id,
        userId: user.id,
        isPrimary: role === Role.AGENCY_OWNER,
      },
    });
  }

  return NextResponse.json({ id: user.id });
}
