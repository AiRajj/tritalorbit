import { NextRequest, NextResponse } from "next/server";

const MOCK_RESPONSE = {
  score: 65,
  label: "High",
  reasoning:
    "This candidate shows elevated risk based on multiple factors: the offer was viewed but no action has been taken in 3 days, housing and travel requests remain unaddressed, and there are 2 unanswered messages. The combination of a competitive market location (San Francisco) and only 8 days until the start date significantly increases the urgency. The below-market pay rate compared to the area average further compounds the risk of candidate backout.",
  suggestedAction:
    "Initiate immediate outreach via phone call within the next 2 hours. Address the housing and travel concerns proactively by presenting pre-arranged options. Consider a pay rate adjustment of $150-200/week to align with the San Francisco market. Escalate to the concierge team for white-glove support on logistics.",
  suggestedSMS:
    "Hi Sarah, I noticed you checked out the Memorial Hospital assignment — great opportunity! I wanted to personally help with housing and travel arrangements. I have a few furnished apartments near the facility I'd love to show you. Can we chat for 5 minutes today? I'm here to make this seamless for you! 🏡",
  suggestedCallScript:
    "Opening: 'Hi Sarah, this is [Name] from TRITAL Orbit. I wanted to personally reach out because I know the Memorial Hospital ICU position is a great match for your experience, and I want to make sure we address everything you need to feel confident about this assignment.'\n\nAddress concerns: 'I saw you were looking at the details — is there anything specific you'd like to know more about? I have some great housing options already lined up near the hospital, and we can coordinate your travel so you don't have to worry about any of the logistics.'\n\nClose: 'I'd love to get your housing preference locked in today so we can secure the best option before it's taken. What type of living situation works best for you — a furnished studio close to the hospital, or a one-bedroom with more space?'",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      viewed,
      timeSinceSent,
      housingRequested,
      travelRequested,
      daysUntilStart,
      pay,
      locationDifficulty,
      engagementScore,
      unansweredMessages,
    } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are a risk analysis AI for TRITAL Orbit, a healthcare staffing platform. Analyze the following candidate engagement data and provide a dropout/backout risk assessment.

Engagement Data:
- Offer viewed: ${viewed}
- Time since sent: ${timeSinceSent}
- Housing requested: ${housingRequested}
- Travel requested: ${travelRequested}
- Days until start: ${daysUntilStart}
- Current pay offered: ${pay}
- Location difficulty: ${locationDifficulty}
- Engagement score: ${engagementScore}
- Unanswered messages: ${unansweredMessages}

Return a JSON object with:
- score: Risk score 0-100 (higher = more risk)
- label: "Low" (0-30), "Medium" (31-55), "High" (56-80), or "Critical" (81-100)
- reasoning: Detailed explanation of the risk assessment
- suggestedAction: Specific actionable steps for the recruiter
- suggestedSMS: A warm, personalized SMS to re-engage the candidate
- suggestedCallScript: A detailed call script with opening, addressing concerns, and close

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
    console.error("Risk Score API error:", error);
    return NextResponse.json(
      { error: "Failed to calculate risk score" },
      { status: 500 }
    );
  }
}
