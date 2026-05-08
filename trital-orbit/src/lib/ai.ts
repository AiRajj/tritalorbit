import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

export async function generateOfferBoost(offerData: {
  candidateName: string;
  role: string;
  specialty: string;
  facilityName: string;
  facilityCity: string;
  facilityState: string;
  weeklyPay: number;
  duration: number;
  startDate?: string;
  perks: string[];
  totalContractValue?: number;
}) {
  const openai = getOpenAI();

  const prompt = `You are an expert healthcare staffing offer specialist. Create compelling offer content for the following assignment:

Candidate: ${offerData.candidateName}
Role: ${offerData.role} (${offerData.specialty})
Facility: ${offerData.facilityName} in ${offerData.facilityCity}, ${offerData.facilityState}
Weekly Pay: $${offerData.weeklyPay.toLocaleString()}
Duration: ${offerData.duration} weeks
Start Date: ${offerData.startDate ?? "Flexible"}
Total Contract Value: ${offerData.totalContractValue ? `$${offerData.totalContractValue.toLocaleString()}` : "Not specified"}
Included Perks: ${offerData.perks.join(", ") || "None specified"}

Generate the following in JSON format:
{
  "enhancedSummary": "3-4 sentence premium offer summary highlighting value beyond pay",
  "valueStatement": "1-2 sentence candidate-facing value statement that speaks to life quality, not just money",
  "recruiterTalkingPoints": "3 specific talking points for the recruiter to use on the phone",
  "smsPitch": "SMS message under 160 characters",
  "emailPitch": "Professional 3-paragraph email pitch",
  "closeStrategy": "Specific close strategy for this candidate and offer",
  "confidenceScore": 75
}

Write in a warm, professional healthcare staffing tone. Focus on the complete life experience, not just the pay rate.`;

  if (!openai) {
    return getMockOfferBoost(offerData);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content ?? "{}");
  } catch (error) {
    console.error("[AI_OFFER_BOOST]", error);
    return getMockOfferBoost(offerData);
  }
}

function getMockOfferBoost(data: {
  candidateName: string;
  role: string;
  specialty: string;
  facilityCity: string;
  facilityState: string;
  weeklyPay: number;
  duration: number;
  perks: string[];
}) {
  return {
    enhancedSummary: `This ${data.duration}-week assignment at ${data.facilityCity}, ${data.facilityState} isn't just another travel contract — it's a complete mobility package designed around ${data.candidateName}'s success. With $${data.weeklyPay.toLocaleString()}/week gross and ${data.perks.length > 0 ? data.perks.join(", ") : "comprehensive support services"} included, we've removed every barrier between acceptance and day one. This is your most competitive, worry-free assignment yet.`,
    valueStatement: `When you accept this offer, you're not just accepting a pay rate — you're accepting a fully supported life transition with housing, travel, and concierge support handled before you even arrive.`,
    recruiterTalkingPoints: `1. "We've already identified verified housing options within 10 miles of the facility — I can send those to you today." 2. "Your flight and car rental are covered from day one, so there's zero out-of-pocket to get started." 3. "We have a dedicated concierge team that handles every logistics question so you can focus on what you do best."`,
    smsPitch: `Hi ${data.candidateName.split(" ")[0]}! Your ${data.facilityCity} offer is ready — $${data.weeklyPay.toLocaleString()}/wk + housing + travel. Full details inside. 🏥`,
    emailPitch: `Subject: Your ${data.facilityCity}, ${data.facilityState} ${data.role} Offer — Complete Package Inside\n\nHi ${data.candidateName.split(" ")[0]},\n\nI wanted to personally reach out about your ${data.facilityCity} assignment. This isn't just a competitive pay package — we've built a complete mobility solution around your specific needs.\n\nYour offer includes $${data.weeklyPay.toLocaleString()}/week gross pay, ${data.perks.join(", ")}, and full concierge support from offer acceptance through your first week on the unit.\n\nI'd love to walk you through the offer personally. Are you available for a quick 10-minute call today? I have housing options pulled for your facility area and can answer any questions you have.\n\nLooking forward to helping you land this one.`,
    closeStrategy: `Lead with the housing solution — most candidates who hesitate on ${data.facilityCity} assignments cite uncertainty about where they'll live. Have 2-3 verified housing options ready to send immediately. Follow up with a text within 4 hours of sending the offer. If no response in 24 hours, escalate to a voice call using the SMS pitch.`,
    confidenceScore: 78,
  };
}

export async function calculateRetentionRisk(inputs: {
  candidateName: string;
  hasViewedOffer: boolean;
  hoursSinceOfferSent: number;
  housingRequested: boolean;
  travelRequested: boolean;
  daysToStartDate: number | null;
  weeklyPay: number | null;
  locationDifficulty: number;
  engagementScore: number;
  unansweredMessages: number;
  offerStatus: string;
}) {
  const openai = getOpenAI();

  const prompt = `You are a healthcare staffing retention risk analyst. Calculate a retention risk score for this candidate.

Candidate: ${inputs.candidateName}
Offer Status: ${inputs.offerStatus}
Viewed Offer: ${inputs.hasViewedOffer ? "Yes" : "No"}
Hours Since Offer Sent: ${inputs.hoursSinceOfferSent}
Housing Requested: ${inputs.housingRequested ? "Yes" : "No"}
Travel Requested: ${inputs.travelRequested ? "Yes" : "No"}
Days to Start Date: ${inputs.daysToStartDate ?? "Unknown"}
Weekly Pay: ${inputs.weeklyPay ? `$${inputs.weeklyPay.toLocaleString()}` : "Unknown"}
Location Difficulty Score: ${inputs.locationDifficulty}/10
Engagement Score: ${inputs.engagementScore}/100
Unanswered Messages: ${inputs.unansweredMessages}

Return JSON:
{
  "score": 0-100,
  "riskLevel": "LOW|MEDIUM|HIGH|CRITICAL",
  "reasoning": "2-3 sentence explanation of main risk factors",
  "suggestedAction": "Specific recommended recruiter action",
  "suggestedSMS": "Ready-to-send SMS under 160 chars",
  "suggestedCallScript": "2-3 sentence phone call opener"
}`;

  if (!openai) {
    return getMockRiskScore(inputs);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content ?? "{}");
  } catch (error) {
    console.error("[AI_RISK_SCORE]", error);
    return getMockRiskScore(inputs);
  }
}

function getMockRiskScore(inputs: {
  hasViewedOffer: boolean;
  hoursSinceOfferSent: number;
  housingRequested: boolean;
  daysToStartDate: number | null;
  unansweredMessages: number;
}) {
  let score = 20;
  if (!inputs.hasViewedOffer && inputs.hoursSinceOfferSent > 4) score += 30;
  if (!inputs.housingRequested) score += 15;
  if (inputs.daysToStartDate !== null && inputs.daysToStartDate < 7) score += 20;
  if (inputs.unansweredMessages > 2) score += 15;
  score = Math.min(score, 100);

  const riskLevel = score >= 75 ? "CRITICAL" : score >= 50 ? "HIGH" : score >= 25 ? "MEDIUM" : "LOW";

  return {
    score,
    riskLevel,
    reasoning: `Candidate has not viewed the offer in ${inputs.hoursSinceOfferSent} hours and has not requested housing support. With ${inputs.daysToStartDate ?? "unknown"} days to start date, this represents a time-sensitive risk.`,
    suggestedAction: "Call candidate immediately. Lead with housing options and confirm start date availability. Send housing directory link via text before the call.",
    suggestedSMS: `Hi! Just checking in on your assignment offer. I have 3 great housing options near the facility ready to send you. Got 5 mins to chat today?`,
    suggestedCallScript: `"Hi [Name], I wanted to personally follow up on your offer and make sure I've answered all your questions. I also have some housing options near the facility that I think you'll love — can I send those over to you today?"`,
  };
}

export async function generateConciergeInsights(request: {
  candidateName: string;
  assignmentCity: string;
  assignmentState: string;
  startDate?: string;
  needsHousing: boolean;
  needsFlight: boolean;
  needsCar: boolean;
  notes?: string;
}) {
  const openai = getOpenAI();

  const prompt = `You are a concierge coordinator for healthcare travel assignments. Summarize this booking request and suggest next steps.

Candidate: ${request.candidateName}
Assignment: ${request.assignmentCity}, ${request.assignmentState}
Start Date: ${request.startDate ?? "TBD"}
Needs: ${[
    request.needsHousing && "Housing",
    request.needsFlight && "Flight",
    request.needsCar && "Car Rental",
  ].filter(Boolean).join(", ")}
Notes: ${request.notes ?? "None"}

Return JSON:
{
  "summary": "2-sentence summary of the request",
  "nextTasks": ["task 1", "task 2", "task 3"],
  "candidateUpdateDraft": "Professional 2-sentence update to send candidate",
  "vendorRecommendations": "Specific vendor type recommendations for this city"
}`;

  if (!openai) {
    return {
      summary: `${request.candidateName} requires ${[request.needsHousing && "housing", request.needsFlight && "flight", request.needsCar && "car rental"].filter(Boolean).join(", ")} support for their ${request.assignmentCity}, ${request.assignmentState} assignment${request.startDate ? ` starting ${request.startDate}` : ""}.`,
      nextTasks: [
        `Search verified housing options in ${request.assignmentCity}, ${request.assignmentState}`,
        "Contact 2-3 preferred vendors for availability and pricing",
        `Send candidate a housing shortlist within 24 hours`,
        "Confirm start date and move logistics",
        "Book flight/car rental once housing is confirmed",
      ],
      candidateUpdateDraft: `Hi ${request.candidateName.split(" ")[0]}, your concierge team has received your request and is already searching for the best options in ${request.assignmentCity}. We'll have a shortlist ready for you within 24 hours.`,
      vendorRecommendations: `Search for furnished short-term rentals and extended-stay hotels within 10 miles of the facility. For ${request.assignmentCity}, check Furnished Finder, Airbnb for Work, and local corporate housing providers.`,
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content ?? "{}");
  } catch (error) {
    console.error("[AI_CONCIERGE]", error);
    return { summary: "Request received.", nextTasks: [], candidateUpdateDraft: "", vendorRecommendations: "" };
  }
}
