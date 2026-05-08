import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole).optional(),
  agencyName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);
    const role = data.role ?? UserRole.CANDIDATE;

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        passwordHash,
        role,
      },
    });

    // If agency owner, create agency
    if (role === UserRole.AGENCY_OWNER && data.agencyName) {
      const slug = data.agencyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const agency = await prisma.agency.create({
        data: {
          name: data.agencyName,
          slug: `${slug}-${user.id.slice(0, 8)}`,
          email: data.email,
        },
      });

      await prisma.agencyMember.create({
        data: {
          agencyId: agency.id,
          userId: user.id,
          role: UserRole.AGENCY_OWNER,
        },
      });
    }

    return NextResponse.json(
      { success: true, userId: user.id, role: user.role },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    }
    console.error("[REGISTER]", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
