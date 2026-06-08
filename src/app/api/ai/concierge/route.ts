import { NextRequest, NextResponse } from "next/server";

const MOCK_RESPONSE = {
  summary:
    "New booking request received from Sarah Chen for her ICU assignment at Memorial Hospital, Houston. She needs housing (furnished apartment, budget $1,500-$2,000/mo), flight coordination (arriving from Portland, OR on June 12), and a rental car for the 13-week duration. All logistics should be confirmed by June 10 to allow a smooth transition before her June 15 start date.",
  suggestedTasks: [
    "Search and present 3 furnished apartment options within 10 miles of Memorial Hospital under $2,000/month — target completion by May 12",
    "Book round-trip flight Portland (PDX) → Houston (IAH) for June 12, return September 15 — get 3 fare options by May 10",
    "Arrange mid-size rental car pickup at IAH on June 12, return September 15 — compare Enterprise, National, and Hertz rates",
    "Send candidate a welcome packet with Houston area guide, hospital parking info, and local recommendations",
    "Schedule a pre-arrival check-in call with Sarah for June 8 to confirm all logistics",
    "Set up automated reminders: housing move-in details (June 12), orientation schedule (June 14), first shift confirmation (June 15)",
  ],
  candidateUpdate:
    "Hi Sarah! Great news — we've received your mobility support request and our concierge team is on it! Here's what we're working on:\n\n🏠 Housing: Searching for furnished apartments near Memorial Hospital within your budget\n✈️ Flight: Looking at options from Portland to Houston for June 12\n🚗 Car: Arranging a rental car for your full assignment\n\nWe'll have options for you to review within 48 hours. In the meantime, if you have any preferences or questions, don't hesitate to reach out!\n\n— Your TRITAL Orbit Concierge Team",
  vendorRecommendations: [
    "Furnished Finder (furnishedfinder.com) — Specializes in travel nurse housing, strong Houston inventory with verified listings near Medical Center",
    "Landing.com — Month-to-month furnished apartments, corporate housing rates available for 13-week stays",
    "Enterprise Rent-A-Car — Corporate healthcare traveler rates available, Houston Intercontinental location, free pickup service",
    "Southwest Airlines — Direct PDX→HOU route, 2 free checked bags included, flexible change policy ideal for travel nurses",
    "Travelers Haven — Full-service corporate housing with travel nurse specialization, handles utilities and furnishing setup",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingRequest } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are an AI concierge coordinator for TRITAL Orbit, a premium healthcare staffing platform. A new booking/mobility support request has been submitted. Analyze the request and generate an action plan.

Booking Request Data: ${JSON.stringify(bookingRequest)}

Return a JSON object with:
- summary: A comprehensive summary of the request and what needs to be done (2-3 sentences)
- suggestedTasks: Array of 5-7 specific, actionable tasks with deadlines for the concierge team
- candidateUpdate: A warm, professional message to send to the candidate confirming receipt and next steps (use emojis sparingly)
- vendorRecommendations: Array of 4-5 specific vendor/service recommendations with brief descriptions of why they're suitable

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
    console.error("Concierge API error:", error);
    return NextResponse.json(
      { error: "Failed to generate concierge plan" },
      { status: 500 }
    );
  }
}
