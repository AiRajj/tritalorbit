import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().min(2),
  role: z.string().optional(),
  teamSize: z.string().optional(),
  useCase: z.string().optional(),
  message: z.string().optional(),
  preferredTime: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const demoRequest = await prisma.demoRequest.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        role: data.role,
        teamSize: data.teamSize,
        useCase: data.useCase,
        message: data.message,
        preferredTime: data.preferredTime,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, id: demoRequest.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    }
    console.error("[DEMO_REQUEST]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
