import { NextRequest, NextResponse } from "next/server";

const MOCK_RESPONSE = {
  enhancedSummary:
    "Sarah is a highly qualified ICU RN with 6+ years of critical care experience, CCRN certification, and a proven track record of excellence at Level I trauma centers. Her clinical expertise in ventilator management, hemodynamic monitoring, and rapid response protocols makes her an exceptional fit for Memorial Hospital's high-acuity ICU unit.",
  valueStatement:
    "This assignment offers a compelling total compensation package of $2,850/week ($37,050 contract value) with comprehensive travel support including furnished housing coordination, flight booking, and rental car assistance — positioning this as a top-tier opportunity in the Houston market.",
  recruiterTalkingPoints: [
    "Competitive weekly rate of $2,850 — above the Houston ICU market average by 12%",
    "Memorial Hospital is a Magnet-designated facility with a strong nurse-to-patient ratio of 1:2 in ICU",
    "Full travel support package including housing, flights, and ground transportation",
    "13-week contract with strong extension history — 78% of travelers extend at this facility",
    "Night shift differential already factored into the rate, with consistent scheduling",
    "Houston offers no state income tax, maximizing take-home pay",
  ],
  smsPitch:
    "Hi Sarah! Exciting ICU opportunity at Memorial Hospital in Houston, TX — $2,850/week for 13 weeks with full travel support (housing + flights + car). Night shift, starting June 15. This facility has a great nurse-to-patient ratio and 78% of travelers extend. Interested? 🏥",
  emailPitch:
    "Subject: ICU Travel Assignment — $2,850/week at Memorial Hospital, Houston\n\nHi Sarah,\n\nI have an excellent ICU opportunity that aligns perfectly with your experience and preferences:\n\n• Facility: Memorial Hospital (Magnet-designated)\n• Location: Houston, TX (no state income tax!)\n• Pay: $2,850/week ($37,050 total contract value)\n• Duration: 13 weeks starting June 15, 2026\n• Shift: Nights with consistent scheduling\n• Support: Full travel package — housing, flights, and rental car\n\nMemorial Hospital maintains a strong 1:2 nurse-to-patient ratio in their ICU, and 78% of their travel nurses choose to extend. With your CCRN certification and Level I trauma experience, you'd be a perfect fit.\n\nWould you like to review the full assignment details? I can walk you through everything and answer any questions.\n\nBest regards,\nYour TRITAL Orbit Recruiter",
  closeStrategy:
    "Lead with the total compensation value and tax advantage of Texas. Emphasize the facility's Magnet status and excellent ratios as quality-of-life differentiators. Address potential concerns about night shift by highlighting the consistent schedule and built-in differential. Use the 78% extension rate as social proof that travelers love this facility. Close by offering to coordinate all travel logistics through TRITAL Orbit's concierge service to remove any friction from the decision.",
  candidateConfidenceScore: 85,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidate, assignment, compensation, perks } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are an expert healthcare staffing recruiter and copywriter for TRITAL Orbit, a premium travel nursing platform. Generate persuasive, professional content to help a recruiter present this assignment to a candidate.

Candidate Info: ${JSON.stringify(candidate)}
Assignment Info: ${JSON.stringify(assignment)}
Compensation: ${JSON.stringify(compensation)}
Perks: ${JSON.stringify(perks)}

Return a JSON object with these fields:
- enhancedSummary: A compelling 2-3 sentence summary of why this candidate is a great fit
- valueStatement: A persuasive statement about the total value of this opportunity
- recruiterTalkingPoints: Array of 5-6 specific talking points for the recruiter call
- smsPitch: A concise, engaging SMS message (under 300 chars) to send to the candidate
- emailPitch: A full professional email pitch with subject line
- closeStrategy: A paragraph describing the best approach to close this candidate
- candidateConfidenceScore: A number 0-100 estimating likelihood of acceptance

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
    console.error("Offer Boost API error:", error);
    return NextResponse.json(
      { error: "Failed to generate offer boost content" },
      { status: 500 }
    );
  }
}
