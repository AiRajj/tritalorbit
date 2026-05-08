import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
    }
    const { name, email, password, role, agencyName } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "An account with that email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let agencyId: string | undefined;
    if (role === "AGENCY_OWNER" && agencyName) {
      let slug = slugify(agencyName);
      let counter = 1;
      while (await prisma.agency.findUnique({ where: { slug } })) {
        slug = `${slugify(agencyName)}-${counter++}`;
      }
      const agency = await prisma.agency.create({
        data: {
          name: agencyName,
          slug,
        },
      });
      agencyId = agency.id;
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
        agencyId,
      },
    });

    if (agencyId && role === "AGENCY_OWNER") {
      await prisma.agency.update({ where: { id: agencyId }, data: { ownerId: user.id } });
      await prisma.agencyMember.create({
        data: { agencyId, userId: user.id, role: "AGENCY_OWNER" },
      });
    }

    if (role === "CANDIDATE") {
      await prisma.candidate.create({
        data: {
          userId: user.id,
          firstName: name.split(" ")[0] ?? name,
          lastName: name.split(" ").slice(1).join(" ") || "",
          email: email.toLowerCase(),
        },
      });
    }

    return NextResponse.json({ ok: true, userId: user.id, role });
  } catch (err) {
    console.error("[register] failed", err);
    return NextResponse.json({ ok: false, error: "Unable to create account." }, { status: 500 });
  }
}
