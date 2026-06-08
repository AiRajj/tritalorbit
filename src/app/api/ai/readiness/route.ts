import { NextRequest, NextResponse } from "next/server";

const MOCK_RESPONSE = {
  overallReadiness: 72,
  housingStatus: "pending" as const,
  travelStatus: "confirmed" as const,
  documentsStatus: "incomplete" as const,
  readinessGaps: [
    "Housing arrangement not yet confirmed — candidate requested furnished apartment near Memorial Hospital",
    "BLS certification expires in 2 weeks and needs renewal before start date",
    "Background check results pending — estimated 2-3 business days",
    "Facility-specific orientation modules not yet started (3 of 8 required modules)",
    "Emergency contact information incomplete in candidate profile",
  ],
  recommendations: [
    "Prioritize housing confirmation: Send candidate 2-3 pre-vetted options within 24 hours to prevent delays",
    "Schedule BLS renewal ASAP: Connect candidate with local AHA training center or online renewal option",
    "Follow up on background check with vendor — flag for expedited processing given 8-day timeline",
    "Send candidate the orientation module links with a clear deadline of June 10 for completion",
    "Request emergency contact info via the candidate portal with a gentle SMS reminder",
    "Consider assigning a concierge coordinator for white-glove support given the tight timeline",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assignment, bookingStatus, documentStatus } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are an assignment readiness analyst for TRITAL Orbit, a healthcare staffing platform. Analyze the following data and provide a comprehensive readiness assessment.

Assignment Data: ${JSON.stringify(assignment)}
Booking Status: ${JSON.stringify(bookingStatus)}
Document Status: ${JSON.stringify(documentStatus)}

Return a JSON object with:
- overallReadiness: Number 0-100 representing overall readiness percentage
- housingStatus: One of "confirmed", "pending", "not_started", "issue"
- travelStatus: One of "confirmed", "pending", "not_started", "issue"
- documentsStatus: One of "complete", "incomplete", "pending_review", "expired"
- readinessGaps: Array of specific gaps that need to be addressed (4-6 items)
- recommendations: Array of actionable recommendations with specific timelines (5-7 items)

Return ONLY valid JSON, no markdown formatting.`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            response_format: { type: "json_object" },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);

      return NextResponse.json(result);
    }

    return NextResponse.json(MOCK_RESPONSE);
  } catch (error) {
    console.error("Readiness API error:", error);
    return NextResponse.json(
      { error: "Failed to assess readiness" },
      { status: 500 }
    );
  }
}
