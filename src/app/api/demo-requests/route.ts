import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, company, phone, role, teamSize, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    console.log("Demo request submitted:", {
      name,
      email,
      company,
      phone,
      role,
      teamSize,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Demo request received! Our team will reach out within 24 hours to schedule your personalized walkthrough.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to submit demo request" },
      { status: 500 }
    );
  }
}
