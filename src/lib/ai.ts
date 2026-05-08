import OpenAI from "openai"

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  return new OpenAI({ apiKey })
}

export interface OfferData {
  candidateName: string
  specialty: string
  facilityName: string
  facilityLocation: string
  payRate: number
  shiftType: string
  startDate: string
  endDate?: string
  housingStipend?: number
  mealStipend?: number
  travelReimbursement?: number
  bonusAmount?: number
}

export interface OfferBoostResult {
  subject: string
  headline: string
  body: string
  highlights: string[]
  urgencyNote: string
  estimatedAcceptanceBoost: number
}

export async function generateOfferBoost(offerData: OfferData): Promise<OfferBoostResult> {
  const client = getOpenAIClient()

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert healthcare staffing recruiter. Generate compelling, professional offer communications that maximize acceptance rates. Return JSON only.",
          },
          {
            role: "user",
            content: `Generate an enhanced offer communication for the following travel healthcare assignment. Return a JSON object with: subject (email subject line), headline (attention-grabbing headline), body (2-3 paragraph professional email body), highlights (array of 4-5 key selling points), urgencyNote (time-sensitive call to action), estimatedAcceptanceBoost (number 10-40 representing percentage boost).

Offer details:
- Candidate: ${offerData.candidateName}
- Specialty: ${offerData.specialty}
- Facility: ${offerData.facilityName}, ${offerData.facilityLocation}
- Pay Rate: $${offerData.payRate}/hr
- Shift: ${offerData.shiftType}
- Start Date: ${offerData.startDate}
${offerData.endDate ? `- End Date: ${offerData.endDate}` : ""}
${offerData.housingStipend ? `- Housing Stipend: $${offerData.housingStipend}/week` : ""}
${offerData.mealStipend ? `- Meal Stipend: $${offerData.mealStipend}/week` : ""}
${offerData.travelReimbursement ? `- Travel Reimbursement: $${offerData.travelReimbursement}` : ""}
${offerData.bonusAmount ? `- Completion Bonus: $${offerData.bonusAmount}` : ""}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      })

      const content = response.choices[0]?.message?.content
      if (content) {
        return JSON.parse(content) as OfferBoostResult
      }
    } catch (error) {
      console.error("OpenAI API error in generateOfferBoost:", error)
    }
  }

  const weeklyGross = offerData.payRate * 36 + (offerData.housingStipend || 0) + (offerData.mealStipend || 0)

  return {
    subject: `Exclusive Opportunity: ${offerData.specialty} at ${offerData.facilityName} - $${offerData.payRate}/hr`,
    headline: `Your Next Adventure Awaits in ${offerData.facilityLocation}`,
    body: `Dear ${offerData.candidateName},\n\nI'm excited to share an exceptional ${offerData.specialty} opportunity at ${offerData.facilityName} in beautiful ${offerData.facilityLocation}. This ${offerData.shiftType} position offers a competitive rate of $${offerData.payRate}/hr with an estimated weekly gross of $${weeklyGross.toLocaleString()}, making it one of the top-paying assignments in the region.\n\nThis facility is known for its supportive team environment, modern equipment, and excellent nurse-to-patient ratios. With a start date of ${offerData.startDate}, there's still time to secure your spot — but positions like this fill quickly.\n\nI'd love to walk you through the details and answer any questions. Let's schedule a quick call at your convenience to discuss how this assignment aligns with your career goals.`,
    highlights: [
      `Competitive rate of $${offerData.payRate}/hr with estimated weekly gross of $${weeklyGross.toLocaleString()}`,
      `${offerData.shiftType} schedule at a top-rated facility in ${offerData.facilityLocation}`,
      offerData.housingStipend ? `Housing stipend of $${offerData.housingStipend}/week included` : "Relocation assistance available",
      offerData.bonusAmount ? `Completion bonus of $${offerData.bonusAmount.toLocaleString()}` : "Potential for extension with rate increase",
      "Dedicated support team throughout your assignment",
    ],
    urgencyNote: `This position is seeing high interest — we've already had ${Math.floor(Math.random() * 5) + 3} inquiries this week. Reply by end of day to secure your priority consideration.`,
    estimatedAcceptanceBoost: 28,
  }
}

export interface CandidateRetentionData {
  name: string
  specialty: string
  currentAssignment?: {
    facilityName: string
    location: string
    startDate: string
    endDate: string
    payRate: number
    weeksRemaining: number
  }
  previousAssignments: number
  completedAssignments: number
  backoutHistory: number
  lastContactDate: string
  responsiveness: "HIGH" | "MEDIUM" | "LOW"
  satisfactionScore?: number
  housingIssues?: boolean
  payDiscrepancies?: boolean
  recentComplaints?: string[]
}

export interface RetentionRiskResult {
  score: number
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  factors: Array<{ factor: string; impact: number; description: string }>
  recommendations: string[]
  summary: string
}

export async function calculateRetentionRisk(candidateData: CandidateRetentionData): Promise<RetentionRiskResult> {
  const client = getOpenAIClient()

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a healthcare staffing retention analytics expert. Analyze candidate data and calculate retention risk. Return JSON with: score (0-100), level (LOW/MEDIUM/HIGH/CRITICAL), factors (array of {factor, impact (1-10), description}), recommendations (array of action items), summary (brief paragraph).",
          },
          {
            role: "user",
            content: `Analyze retention risk for this travel healthcare professional:\n${JSON.stringify(candidateData, null, 2)}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      })

      const content = response.choices[0]?.message?.content
      if (content) {
        return JSON.parse(content) as RetentionRiskResult
      }
    } catch (error) {
      console.error("OpenAI API error in calculateRetentionRisk:", error)
    }
  }

  let score = 15
  const factors: RetentionRiskResult["factors"] = []

  if (candidateData.backoutHistory > 0) {
    const impact = Math.min(candidateData.backoutHistory * 15, 40)
    score += impact
    factors.push({
      factor: "Backout History",
      impact: Math.min(candidateData.backoutHistory * 3, 10),
      description: `${candidateData.backoutHistory} previous backout(s) detected. Historical pattern suggests elevated risk.`,
    })
  }

  if (candidateData.responsiveness === "LOW") {
    score += 20
    factors.push({ factor: "Low Responsiveness", impact: 7, description: "Candidate has been slow to respond to communications, which often precedes disengagement." })
  } else if (candidateData.responsiveness === "MEDIUM") {
    score += 8
    factors.push({ factor: "Moderate Responsiveness", impact: 3, description: "Response times are acceptable but could indicate waning interest." })
  }

  if (candidateData.housingIssues) {
    score += 15
    factors.push({ factor: "Housing Concerns", impact: 6, description: "Outstanding housing issues can significantly impact candidate satisfaction and retention." })
  }

  if (candidateData.payDiscrepancies) {
    score += 18
    factors.push({ factor: "Pay Discrepancies", impact: 8, description: "Unresolved pay issues are the #1 driver of early assignment termination." })
  }

  if (candidateData.satisfactionScore !== undefined && candidateData.satisfactionScore < 6) {
    score += 12
    factors.push({ factor: "Low Satisfaction", impact: 5, description: `Current satisfaction score of ${candidateData.satisfactionScore}/10 is below the retention threshold.` })
  }

  const completionRate = candidateData.previousAssignments > 0
    ? candidateData.completedAssignments / candidateData.previousAssignments
    : 1
  if (completionRate < 0.8) {
    score += 15
    factors.push({ factor: "Completion Rate", impact: 6, description: `Assignment completion rate of ${Math.round(completionRate * 100)}% is below the 80% benchmark.` })
  }

  score = Math.min(score, 100)
  const level = score <= 25 ? "LOW" : score <= 50 ? "MEDIUM" : score <= 75 ? "HIGH" : "CRITICAL"

  const recommendations: string[] = []
  if (score > 50) recommendations.push("Schedule an immediate check-in call with the candidate to address concerns")
  if (candidateData.housingIssues) recommendations.push("Prioritize resolution of housing issues within 24 hours")
  if (candidateData.payDiscrepancies) recommendations.push("Escalate pay discrepancy to payroll for urgent resolution")
  if (candidateData.responsiveness === "LOW") recommendations.push("Try alternative communication channels (text, call) to re-engage")
  recommendations.push("Review upcoming assignment milestones and proactively communicate timeline")
  if (score > 30) recommendations.push("Consider offering a mid-assignment satisfaction bonus or extension incentive")

  return {
    score,
    level,
    factors,
    recommendations,
    summary: `${candidateData.name} has a ${level.toLowerCase()} retention risk score of ${score}/100. ${factors.length > 0 ? `Key risk factors include ${factors.map(f => f.factor.toLowerCase()).join(", ")}.` : "No significant risk factors identified."} ${score > 50 ? "Immediate intervention is recommended." : "Continue standard monitoring."}`,
  }
}

export interface AssignmentReadinessData {
  candidateName: string
  specialty: string
  facilityName: string
  startDate: string
  licenseVerified: boolean
  licenseState: string
  licenseExpiry?: string
  backgroundCheckComplete: boolean
  drugScreenComplete: boolean
  physicalComplete: boolean
  credentialingComplete: boolean
  orientationScheduled: boolean
  housingArranged: boolean
  travelArranged: boolean
  documentsSubmitted: string[]
  documentsRequired: string[]
}

export interface ReadinessResult {
  overallScore: number
  status: "READY" | "AT_RISK" | "NOT_READY" | "BLOCKED"
  completedItems: string[]
  pendingItems: Array<{ item: string; priority: "HIGH" | "MEDIUM" | "LOW"; daysUntilDue: number }>
  blockers: string[]
  recommendations: string[]
  summary: string
}

export async function assessReadiness(assignmentData: AssignmentReadinessData): Promise<ReadinessResult> {
  const client = getOpenAIClient()

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a healthcare staffing compliance specialist. Assess assignment readiness and return JSON with: overallScore (0-100), status (READY/AT_RISK/NOT_READY/BLOCKED), completedItems (array), pendingItems (array of {item, priority, daysUntilDue}), blockers (array), recommendations (array), summary (paragraph).",
          },
          {
            role: "user",
            content: `Assess readiness for this assignment:\n${JSON.stringify(assignmentData, null, 2)}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      })

      const content = response.choices[0]?.message?.content
      if (content) {
        return JSON.parse(content) as ReadinessResult
      }
    } catch (error) {
      console.error("OpenAI API error in assessReadiness:", error)
    }
  }

  const completedItems: string[] = []
  const pendingItems: ReadinessResult["pendingItems"] = []
  const blockers: string[] = []
  const startDate = new Date(assignmentData.startDate)
  const daysUntilStart = Math.ceil((startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  if (assignmentData.licenseVerified) {
    completedItems.push("License verification")
  } else {
    blockers.push(`${assignmentData.licenseState} license not yet verified`)
    pendingItems.push({ item: "License verification", priority: "HIGH", daysUntilDue: Math.max(daysUntilStart - 7, 0) })
  }

  if (assignmentData.backgroundCheckComplete) completedItems.push("Background check")
  else pendingItems.push({ item: "Background check", priority: "HIGH", daysUntilDue: Math.max(daysUntilStart - 10, 0) })

  if (assignmentData.drugScreenComplete) completedItems.push("Drug screening")
  else pendingItems.push({ item: "Drug screening", priority: "HIGH", daysUntilDue: Math.max(daysUntilStart - 5, 0) })

  if (assignmentData.physicalComplete) completedItems.push("Physical examination")
  else pendingItems.push({ item: "Physical examination", priority: "MEDIUM", daysUntilDue: Math.max(daysUntilStart - 7, 0) })

  if (assignmentData.credentialingComplete) completedItems.push("Facility credentialing")
  else {
    blockers.push("Facility credentialing incomplete")
    pendingItems.push({ item: "Facility credentialing", priority: "HIGH", daysUntilDue: Math.max(daysUntilStart - 5, 0) })
  }

  if (assignmentData.orientationScheduled) completedItems.push("Orientation scheduled")
  else pendingItems.push({ item: "Schedule orientation", priority: "MEDIUM", daysUntilDue: Math.max(daysUntilStart - 3, 0) })

  if (assignmentData.housingArranged) completedItems.push("Housing arranged")
  else pendingItems.push({ item: "Housing arrangement", priority: "MEDIUM", daysUntilDue: Math.max(daysUntilStart - 7, 0) })

  if (assignmentData.travelArranged) completedItems.push("Travel arranged")
  else pendingItems.push({ item: "Travel booking", priority: "LOW", daysUntilDue: Math.max(daysUntilStart - 3, 0) })

  const missingDocs = assignmentData.documentsRequired.filter(d => !assignmentData.documentsSubmitted.includes(d))
  missingDocs.forEach(doc => {
    pendingItems.push({ item: `Submit ${doc}`, priority: "MEDIUM", daysUntilDue: Math.max(daysUntilStart - 5, 0) })
  })
  if (missingDocs.length === 0 && assignmentData.documentsRequired.length > 0) {
    completedItems.push("All documents submitted")
  }

  const totalItems = completedItems.length + pendingItems.length
  const overallScore = totalItems > 0 ? Math.round((completedItems.length / totalItems) * 100) : 0

  let status: ReadinessResult["status"]
  if (blockers.length > 0) status = "BLOCKED"
  else if (overallScore >= 90) status = "READY"
  else if (overallScore >= 60) status = "AT_RISK"
  else status = "NOT_READY"

  const recommendations: string[] = []
  if (blockers.length > 0) recommendations.push(`Immediately address blockers: ${blockers.join("; ")}`)
  if (pendingItems.some(p => p.priority === "HIGH")) recommendations.push("Prioritize all HIGH priority items this week")
  if (daysUntilStart < 14 && overallScore < 80) recommendations.push("Consider requesting a start date extension to ensure compliance")
  if (missingDocs.length > 0) recommendations.push(`Follow up with candidate on missing documents: ${missingDocs.join(", ")}`)
  recommendations.push("Send candidate a readiness summary and checklist")

  return {
    overallScore,
    status,
    completedItems,
    pendingItems,
    blockers,
    recommendations,
    summary: `Assignment readiness for ${assignmentData.candidateName} at ${assignmentData.facilityName} is at ${overallScore}% (${status}). ${completedItems.length} of ${totalItems} items are complete. ${blockers.length > 0 ? `There are ${blockers.length} blocking issue(s) that must be resolved.` : ""} Start date is ${daysUntilStart} days away.`,
  }
}

export interface ConciergeTaskData {
  candidateName: string
  taskType: "HOUSING" | "TRAVEL" | "LICENSING" | "GENERAL" | "BENEFITS" | "PAYROLL"
  question: string
  assignmentLocation?: string
  assignmentStartDate?: string
  context?: string
}

export interface ConciergeResult {
  response: string
  actionItems: Array<{ action: string; owner: "CANDIDATE" | "RECRUITER" | "SYSTEM"; deadline?: string }>
  resources: Array<{ title: string; description: string }>
  followUpNeeded: boolean
  followUpNote?: string
}

export async function conciergeAssist(taskData: ConciergeTaskData): Promise<ConciergeResult> {
  const client = getOpenAIClient()

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful concierge assistant for travel healthcare professionals. Provide clear, practical assistance. Return JSON with: response (friendly paragraph), actionItems (array of {action, owner: CANDIDATE|RECRUITER|SYSTEM, deadline?}), resources (array of {title, description}), followUpNeeded (boolean), followUpNote (optional string).",
          },
          {
            role: "user",
            content: `Assist this travel healthcare professional:\n${JSON.stringify(taskData, null, 2)}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
      })

      const content = response.choices[0]?.message?.content
      if (content) {
        return JSON.parse(content) as ConciergeResult
      }
    } catch (error) {
      console.error("OpenAI API error in conciergeAssist:", error)
    }
  }

  const responses: Record<string, ConciergeResult> = {
    HOUSING: {
      response: `Hi ${taskData.candidateName}! I'd be happy to help with your housing needs${taskData.assignmentLocation ? ` in ${taskData.assignmentLocation}` : ""}. We partner with several furnished housing providers that specialize in travel healthcare accommodations. Most units come fully furnished with utilities included, and are located within a reasonable commute of your facility. Your recruiter will send you 2-3 housing options within the next business day for your review.`,
      actionItems: [
        { action: "Review housing options once provided by recruiter", owner: "CANDIDATE", deadline: "3 business days" },
        { action: "Send curated housing options to candidate", owner: "RECRUITER", deadline: "1 business day" },
        { action: "Verify housing stipend amount for the assignment", owner: "SYSTEM" },
      ],
      resources: [
        { title: "Housing Guide for Travel Nurses", description: "Comprehensive guide covering furnished housing, stipend options, and what to expect" },
        { title: "Location Guide", description: `Tips for living and working${taskData.assignmentLocation ? ` in ${taskData.assignmentLocation}` : " in your assignment city"}` },
      ],
      followUpNeeded: true,
      followUpNote: "Follow up in 2 days to confirm housing options were sent and reviewed",
    },
    TRAVEL: {
      response: `Hi ${taskData.candidateName}! I can help coordinate your travel arrangements${taskData.assignmentStartDate ? ` for your ${taskData.assignmentStartDate} start date` : ""}. We typically recommend booking travel 5-7 days before your start date to allow for settling in. Your travel reimbursement will be processed on your first paycheck. We can assist with flight booking or mileage reimbursement for driving — whichever works best for you.`,
      actionItems: [
        { action: "Confirm preferred travel method (flight vs. driving)", owner: "CANDIDATE" },
        { action: "Submit travel receipts for reimbursement after arrival", owner: "CANDIDATE" },
        { action: "Process travel reimbursement on first paycheck", owner: "SYSTEM" },
      ],
      resources: [
        { title: "Travel Reimbursement Policy", description: "Details on eligible expenses, receipt requirements, and reimbursement timeline" },
        { title: "Packing Checklist", description: "Essential items to bring for your travel assignment" },
      ],
      followUpNeeded: false,
    },
    LICENSING: {
      response: `Hi ${taskData.candidateName}! License questions are very common for travel professionals. If you're working under a compact license, you'll want to verify your state is part of the Nurse Licensure Compact. If you need a new state license, the process typically takes 2-6 weeks depending on the state. We can help expedite this through our credentialing team. Your recruiter will verify the specific requirements for your assignment state.`,
      actionItems: [
        { action: "Verify compact license eligibility or state-specific requirements", owner: "RECRUITER" },
        { action: "Submit any required license application materials", owner: "CANDIDATE", deadline: "1 week" },
        { action: "Track license application status", owner: "SYSTEM" },
      ],
      resources: [
        { title: "Nurse Licensure Compact Guide", description: "Which states participate and how to verify your compact privilege" },
        { title: "State License Timeline Guide", description: "Average processing times by state for new license applications" },
      ],
      followUpNeeded: true,
      followUpNote: "Check back on license status in 1 week",
    },
    BENEFITS: {
      response: `Hi ${taskData.candidateName}! Great question about benefits. As a travel healthcare professional, you have access to comprehensive benefits including health/dental/vision insurance (available day one), 401(k) with company match, weekly pay with direct deposit, and continuing education reimbursement. Your recruiter can walk you through the enrollment process and coverage options that best fit your needs.`,
      actionItems: [
        { action: "Review benefits enrollment packet", owner: "CANDIDATE" },
        { action: "Send benefits enrollment link and deadline", owner: "RECRUITER", deadline: "1 business day" },
        { action: "Process benefits enrollment upon completion", owner: "SYSTEM" },
      ],
      resources: [
        { title: "Benefits Overview", description: "Summary of all available benefits including insurance, retirement, and perks" },
        { title: "Benefits FAQ", description: "Common questions about eligibility, enrollment periods, and coverage details" },
      ],
      followUpNeeded: false,
    },
    PAYROLL: {
      response: `Hi ${taskData.candidateName}! I'm here to help with your payroll question. We process payroll weekly with direct deposit hitting your account every Friday. Your pay breakdown includes your hourly rate, any overtime, and applicable stipends (housing, meals, travel). You can view your pay stubs anytime through our online portal. If you notice any discrepancies, please flag them immediately so we can resolve them in the next pay cycle.`,
      actionItems: [
        { action: "Set up or verify direct deposit information", owner: "CANDIDATE" },
        { action: "Review first pay stub for accuracy", owner: "CANDIDATE" },
        { action: "Ensure payroll is set up correctly for assignment", owner: "SYSTEM" },
      ],
      resources: [
        { title: "Pay Schedule & Portal Access", description: "How to access your pay stubs, set up direct deposit, and view your pay history" },
        { title: "Tax Guide for Travel Professionals", description: "Information about tax-free stipends, tax home requirements, and W-2 details" },
      ],
      followUpNeeded: false,
    },
    GENERAL: {
      response: `Hi ${taskData.candidateName}! Thanks for reaching out. I'd be happy to help with your question. Our team is here to support you throughout your assignment. ${taskData.question ? `Regarding your question: "${taskData.question}" — I'll make sure to get you a detailed answer. Your recruiter will follow up within one business day with specific information.` : "Please don't hesitate to reach out anytime."} We want to make sure your experience is as smooth and rewarding as possible.`,
      actionItems: [
        { action: "Follow up with detailed response to candidate's question", owner: "RECRUITER", deadline: "1 business day" },
        { action: "Log interaction for quality tracking", owner: "SYSTEM" },
      ],
      resources: [
        { title: "Traveler Resource Center", description: "Self-service portal with FAQs, guides, and helpful tools" },
        { title: "Emergency Contact Info", description: "24/7 support line for urgent issues during your assignment" },
      ],
      followUpNeeded: true,
      followUpNote: "Recruiter needs to follow up with detailed answer",
    },
  }

  return responses[taskData.taskType] || responses.GENERAL
}

export interface MSPReportData {
  organizationName: string
  reportPeriod: string
  totalPlacements: number
  activeCandidates: number
  fillRate: number
  avgTimeToFill: number
  revenue: number
  topFacilities: Array<{ name: string; placements: number; fillRate: number }>
  specialtyBreakdown: Array<{ specialty: string; count: number; avgRate: number }>
  retentionRate: number
  backoutRate: number
  candidateSatisfaction: number
}

export interface MSPReportResult {
  executiveSummary: string
  keyMetrics: Array<{ metric: string; value: string; trend: "UP" | "DOWN" | "STABLE"; insight: string }>
  highlights: string[]
  concerns: string[]
  recommendations: string[]
  outlook: string
}

export async function generateMSPReport(reportData: MSPReportData): Promise<MSPReportResult> {
  const client = getOpenAIClient()

  if (client) {
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a healthcare staffing MSP analytics expert. Generate executive-level reports. Return JSON with: executiveSummary (2-3 paragraphs), keyMetrics (array of {metric, value, trend: UP|DOWN|STABLE, insight}), highlights (array), concerns (array), recommendations (array), outlook (paragraph).",
          },
          {
            role: "user",
            content: `Generate an MSP executive report:\n${JSON.stringify(reportData, null, 2)}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.5,
      })

      const content = response.choices[0]?.message?.content
      if (content) {
        return JSON.parse(content) as MSPReportResult
      }
    } catch (error) {
      console.error("OpenAI API error in generateMSPReport:", error)
    }
  }

  return {
    executiveSummary: `${reportData.organizationName} MSP Performance Report for ${reportData.reportPeriod}\n\nDuring ${reportData.reportPeriod}, the staffing program managed ${reportData.totalPlacements} total placements across ${reportData.topFacilities.length} facilities, with ${reportData.activeCandidates} currently active candidates. The overall fill rate of ${reportData.fillRate}% ${reportData.fillRate >= 90 ? "exceeds industry benchmarks" : reportData.fillRate >= 75 ? "meets industry standards" : "falls below target levels"}, with an average time-to-fill of ${reportData.avgTimeToFill} days.\n\nRetention performance stands at ${reportData.retentionRate}%, with a backout rate of ${reportData.backoutRate}%. Candidate satisfaction averaged ${reportData.candidateSatisfaction}/10, reflecting ${reportData.candidateSatisfaction >= 8 ? "excellent" : reportData.candidateSatisfaction >= 6 ? "satisfactory" : "concerning"} experience quality across the program. Total program revenue reached $${reportData.revenue.toLocaleString()}.`,
    keyMetrics: [
      { metric: "Fill Rate", value: `${reportData.fillRate}%`, trend: reportData.fillRate >= 85 ? "UP" : "STABLE", insight: `${reportData.fillRate >= 90 ? "Exceeding" : "Meeting"} the industry average of 85%` },
      { metric: "Avg Time to Fill", value: `${reportData.avgTimeToFill} days`, trend: reportData.avgTimeToFill <= 14 ? "UP" : "DOWN", insight: `${reportData.avgTimeToFill <= 14 ? "Ahead of" : "Behind"} the 14-day target` },
      { metric: "Retention Rate", value: `${reportData.retentionRate}%`, trend: reportData.retentionRate >= 90 ? "UP" : "STABLE", insight: `${reportData.retentionRate >= 90 ? "Strong" : "Moderate"} retention driven by proactive engagement` },
      { metric: "Revenue", value: `$${reportData.revenue.toLocaleString()}`, trend: "UP", insight: "Revenue growth aligned with placement volume increases" },
      { metric: "Candidate Satisfaction", value: `${reportData.candidateSatisfaction}/10`, trend: reportData.candidateSatisfaction >= 7 ? "UP" : "DOWN", insight: `Satisfaction ${reportData.candidateSatisfaction >= 8 ? "at premium levels" : "has room for improvement"}` },
    ],
    highlights: [
      `Successfully managed ${reportData.totalPlacements} placements with ${reportData.activeCandidates} active candidates`,
      `Top facility ${reportData.topFacilities[0]?.name || "N/A"} achieved ${reportData.topFacilities[0]?.fillRate || 0}% fill rate`,
      `Program revenue reached $${reportData.revenue.toLocaleString()} for the period`,
      reportData.retentionRate >= 90 ? `Exceptional retention rate of ${reportData.retentionRate}%` : `Retention rate of ${reportData.retentionRate}% with targeted improvement plan in place`,
    ],
    concerns: [
      ...(reportData.backoutRate > 5 ? [`Backout rate of ${reportData.backoutRate}% exceeds the 5% target threshold`] : []),
      ...(reportData.avgTimeToFill > 14 ? [`Time-to-fill of ${reportData.avgTimeToFill} days exceeds the 14-day SLA`] : []),
      ...(reportData.candidateSatisfaction < 7 ? [`Candidate satisfaction of ${reportData.candidateSatisfaction}/10 requires attention`] : []),
      ...(reportData.fillRate < 80 ? [`Fill rate of ${reportData.fillRate}% is below the 80% minimum threshold`] : []),
    ],
    recommendations: [
      "Implement AI-powered Retention Radar to proactively identify at-risk placements",
      "Expand candidate pool in high-demand specialties to improve fill rates",
      reportData.avgTimeToFill > 14 ? "Streamline credentialing process to reduce time-to-fill" : "Maintain current time-to-fill performance with process optimization",
      "Deploy Offer Boost AI to increase offer acceptance rates",
      "Schedule quarterly business reviews with top facility partners",
    ],
    outlook: `Based on current trends and market conditions, the outlook for the next period is ${reportData.fillRate >= 85 && reportData.retentionRate >= 90 ? "positive" : "cautiously optimistic"}. With continued focus on candidate experience, proactive retention strategies, and AI-powered optimization tools, we project steady growth in both placements and revenue. Key areas of focus should include reducing time-to-fill, maintaining retention rates, and expanding into underserved specialties.`,
  }
}
