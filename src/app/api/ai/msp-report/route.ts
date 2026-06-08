import { NextRequest, NextResponse } from "next/server";

const MOCK_RESPONSE = {
  executiveSummary:
    "During the reporting period (Q1 2026), the staffing program demonstrated strong overall performance with an 89% offer acceptance rate and 96% show-up rate, both above industry benchmarks. However, the 7% backout rate represents an increase from last quarter's 4.5%, primarily driven by housing-related concerns in high-cost markets. Time-to-ready improved to 4.2 days (down from 5.1 days) thanks to the implementation of TRITAL Orbit's automated onboarding workflows. Three agencies consistently outperformed targets, while two agencies require performance improvement plans focused on candidate vetting and documentation completeness.",
  metrics: {
    acceptanceRate: 89,
    backoutRate: 7,
    timeToReady: 4.2,
    showUpRate: 96,
  },
  insights: [
    "Offer acceptance rate of 89% exceeds the industry average of 82%, driven by competitive compensation packages and the Offer Boost Builder's personalized outreach — candidates who received AI-enhanced offers accepted at a 14% higher rate",
    "Backout rate increased from 4.5% to 7% quarter-over-quarter, with 68% of backouts citing housing concerns in San Francisco, Boston, and New York markets — proactive housing coordination reduced backouts by 40% where implemented",
    "Time-to-ready improved 18% to 4.2 days, with the largest gains from automated credential verification and digital document submission through the candidate portal",
    "Night shift positions showed 23% lower acceptance rates compared to day shifts — consider differential adjustments of $3-5/hr to improve fill rates",
    "Top-performing agencies (MedPro, TravelNurse Solutions, StaffHealth) maintained >92% acceptance rates and <3% backout rates, suggesting their vetting processes should be studied as best practices",
    "Candidate satisfaction scores averaged 4.6/5.0 for those who used the mobility concierge service vs. 3.8/5.0 for those who did not",
  ],
  recommendations: [
    "Implement mandatory housing pre-coordination for all assignments in Tier 1 cost markets (SF, NYC, Boston, LA) to reduce the backout rate by an estimated 3-4 percentage points",
    "Introduce a night shift incentive program with enhanced differentials and priority housing selection to address the 23% acceptance gap",
    "Expand the Offer Boost Builder usage to all agencies — currently only 3 of 5 partner agencies are utilizing AI-enhanced offers, and early data shows significant improvement in acceptance rates",
    "Initiate performance improvement discussions with underperforming agencies, focusing on candidate documentation completeness (currently 71% vs. target 95%) and response time to offers (averaging 72 hours vs. target 24 hours)",
    "Scale the mobility concierge program to cover 100% of travel assignments — the 0.8-point satisfaction improvement and reduced backout rates justify the investment with an estimated ROI of 340%",
    "Deploy predictive risk scoring across all active candidates to enable proactive intervention before backout decisions are made — pilot data shows 60% of at-risk candidates can be retained with timely outreach",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dateRange, agencyFilter } = body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const prompt = `You are a healthcare staffing analytics AI for TRITAL Orbit, an MSP (Managed Service Provider) platform. Generate a comprehensive performance report for the specified period.

Date Range: ${JSON.stringify(dateRange)}
Agency Filter: ${JSON.stringify(agencyFilter)}

Return a JSON object with:
- executiveSummary: A 3-4 sentence executive summary highlighting key performance metrics, trends, and areas of concern
- metrics: Object with acceptanceRate (%), backoutRate (%), timeToReady (days as decimal), showUpRate (%)
- insights: Array of 5-7 data-driven insights with specific numbers and comparisons
- recommendations: Array of 5-7 actionable recommendations with expected impact

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
    console.error("MSP Report API error:", error);
    return NextResponse.json(
      { error: "Failed to generate MSP report" },
      { status: 500 }
    );
  }
}
