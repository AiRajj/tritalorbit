import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { generatePdfPlaceholder } from "@/lib/services/export";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = generatePdfPlaceholder("TRITAL Orbit Executive Summary", [
    "Acceptance Rate: 84%",
    "Backout Rate: 7%",
    "Readiness Rate: 88%",
    "Executive Insight: Mobility-enabled offers continue to outperform baseline."
  ]);

  return new Response(content, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=orbit-summary.pdf"
    }
  });
}
