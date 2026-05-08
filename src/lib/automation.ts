import db from "./db"
import { calculateRiskLevel } from "./utils"

export interface ActivityLog {
  userId?: string
  offerId?: string
  action: string
  details?: string
  metadata?: Record<string, unknown>
  ipAddress?: string
}

export async function logCandidateActivity(activity: ActivityLog): Promise<void> {
  try {
    await db.activityLog.create({
      data: {
        userId: activity.userId,
        offerId: activity.offerId,
        action: activity.action,
        details: activity.details,
        metadata: activity.metadata ? JSON.parse(JSON.stringify(activity.metadata)) : undefined,
        ipAddress: activity.ipAddress,
      },
    })
  } catch (error) {
    console.error("Failed to log candidate activity:", error)
    throw new Error(`Activity logging failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export interface OfferViewedAlert {
  offerId: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  facilityName: string
  viewedAt: Date
  alertTriggered: boolean
  alertMessage: string
}

export async function checkOfferViewed(offerId: string): Promise<OfferViewedAlert | null> {
  try {
    const offer = await db.offer.findUnique({
      where: { id: offerId },
      include: {
        candidate: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    })

    if (!offer) return null

    const now = new Date()
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000)
    const viewedAt = offer.viewedAt ? new Date(offer.viewedAt) : null
    const candidateName = `${offer.candidate.firstName} ${offer.candidate.lastName}`
    const facilityName = offer.facilityName || "Unknown Facility"

    if (offer.status === "SENT" && !viewedAt) {
      const sentAt = new Date(offer.sentAt || offer.createdAt)
      if (sentAt < twoHoursAgo) {
        return {
          offerId: offer.id,
          candidateId: offer.candidate.id,
          candidateName,
          candidateEmail: offer.candidate.email,
          facilityName,
          viewedAt: sentAt,
          alertTriggered: true,
          alertMessage: `Offer to ${candidateName} for ${facilityName} has not been viewed after 2 hours. Consider following up via phone or text.`,
        }
      }
    }

    if (viewedAt && offer.status === "VIEWED") {
      const viewedMoreThan24hAgo = viewedAt < new Date(now.getTime() - 24 * 60 * 60 * 1000)
      if (viewedMoreThan24hAgo) {
        return {
          offerId: offer.id,
          candidateId: offer.candidate.id,
          candidateName,
          candidateEmail: offer.candidate.email,
          facilityName,
          viewedAt,
          alertTriggered: true,
          alertMessage: `${candidateName} viewed the offer for ${facilityName} over 24 hours ago but hasn't responded. High priority follow-up recommended.`,
        }
      }
    }

    return {
      offerId: offer.id,
      candidateId: offer.candidate.id,
      candidateName,
      candidateEmail: offer.candidate.email,
      facilityName,
      viewedAt: viewedAt || now,
      alertTriggered: false,
      alertMessage: viewedAt ? "Offer viewed, within normal response window." : "Offer recently sent, within normal viewing window.",
    }
  } catch (error) {
    console.error("Failed to check offer viewed status:", error)
    throw new Error(`Offer check failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export interface BookingRequestData {
  offerId: string
  candidateId: string
  agencyId: string
  needsFlight?: boolean
  needsHousing?: boolean
  needsCar?: boolean
  moveDate?: string
  budgetMin?: number
  budgetMax?: number
  preferredLocation?: string
  notes?: string
  requestedBy: string
}

export interface BookingResult {
  bookingId: string
  status: "CREATED" | "CONFLICT" | "ERROR"
  conflicts: string[]
  checklist: string[]
  notifications: Array<{ recipient: string; type: string; message: string }>
}

export async function handleBookingRequest(data: BookingRequestData): Promise<BookingResult> {
  try {
    const conflicts: string[] = []

    const existingBookings = await db.bookingRequest.findMany({
      where: {
        candidateId: data.candidateId,
        status: { in: ["NEW", "IN_PROGRESS", "WAITING_CANDIDATE"] },
      },
      include: {
        offer: { select: { facilityName: true, city: true, state: true } },
      },
    })

    if (existingBookings.length > 0) {
      existingBookings.forEach((booking: { offer: { facilityName: string | null; city: string | null; state: string | null } }) => {
        conflicts.push(
          `Existing active booking for ${booking.offer?.facilityName || "Unknown Facility"} in ${booking.offer?.city || ""}, ${booking.offer?.state || ""}`
        )
      })
    }

    const candidate = await db.candidate.findUnique({
      where: { id: data.candidateId },
      select: { firstName: true, lastName: true, email: true, isActive: true },
    })

    if (candidate && !candidate.isActive) {
      conflicts.push("Candidate is currently inactive")
    }

    const booking = await db.bookingRequest.create({
      data: {
        offerId: data.offerId,
        candidateId: data.candidateId,
        agencyId: data.agencyId,
        needsFlight: data.needsFlight ?? false,
        needsHousing: data.needsHousing ?? false,
        needsCar: data.needsCar ?? false,
        moveDate: data.moveDate ? new Date(data.moveDate) : undefined,
        budgetMin: data.budgetMin,
        budgetMax: data.budgetMax,
        preferredLocation: data.preferredLocation,
        notes: data.notes,
        status: "NEW",
      },
    })

    const checklist = [
      "Verify candidate license is active for assignment state",
      "Confirm candidate availability for requested dates",
      "Complete background check (if not current)",
      "Submit facility credentialing packet",
      ...(data.needsHousing ? ["Arrange housing and send options to candidate"] : []),
      ...(data.needsFlight ? ["Book travel arrangements"] : []),
      ...(data.needsCar ? ["Arrange car rental"] : []),
      "Schedule orientation with facility",
    ]

    const candidateName = candidate ? `${candidate.firstName} ${candidate.lastName}` : "Unknown"

    const notifications: BookingResult["notifications"] = [
      {
        recipient: data.requestedBy,
        type: "BOOKING_CREATED",
        message: `Booking request created for ${candidateName}. ${conflicts.length > 0 ? `Note: ${conflicts.length} warning(s) flagged.` : "No conflicts detected."}`,
      },
    ]

    return {
      bookingId: booking.id,
      status: conflicts.length > 0 ? "CONFLICT" : "CREATED",
      conflicts,
      checklist,
      notifications,
    }
  } catch (error) {
    console.error("Failed to handle booking request:", error)
    return {
      bookingId: "",
      status: "ERROR",
      conflicts: [`System error: ${error instanceof Error ? error.message : "Unknown error"}`],
      checklist: [],
      notifications: [{
        recipient: data.requestedBy,
        type: "ERROR",
        message: "Failed to process booking request. Please try again or contact support.",
      }],
    }
  }
}

export interface ReadinessChecklist {
  assignmentId: string
  candidateName: string
  facilityName: string
  startDate: string
  items: Array<{
    id: string
    category: string
    item: string
    required: boolean
    completed: boolean
    dueDate: string
    notes?: string
  }>
  overallProgress: number
}

export async function createReadinessChecklist(assignmentId: string): Promise<ReadinessChecklist> {
  try {
    const assignment = await db.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        candidate: { select: { firstName: true, lastName: true, specialty: true, licenseState: true } },
      },
    })

    if (!assignment) throw new Error("Assignment not found")

    const startDate = assignment.startDate || new Date()
    const start = new Date(startDate)
    const candidateName = assignment.candidate
      ? `${assignment.candidate.firstName} ${assignment.candidate.lastName}`
      : "Unassigned"

    const daysBefore = (days: number) => {
      const d = new Date(start)
      d.setDate(d.getDate() - days)
      return d.toISOString().split("T")[0]
    }

    const licenseState = assignment.candidate?.licenseState || assignment.state || "state"

    const items = [
      { id: "lic-1", category: "Licensing", item: `Verify active ${licenseState} license`, required: true, completed: false, dueDate: daysBefore(21) },
      { id: "lic-2", category: "Licensing", item: "Confirm compact license coverage (if applicable)", required: true, completed: false, dueDate: daysBefore(21) },
      { id: "cred-1", category: "Credentialing", item: "Submit facility credentialing application", required: true, completed: false, dueDate: daysBefore(14) },
      { id: "cred-2", category: "Credentialing", item: "Complete background check", required: true, completed: false, dueDate: daysBefore(14) },
      { id: "cred-3", category: "Credentialing", item: "Drug screening", required: true, completed: false, dueDate: daysBefore(10) },
      { id: "cred-4", category: "Credentialing", item: "Physical examination / TB test", required: true, completed: false, dueDate: daysBefore(10) },
      { id: "doc-1", category: "Documentation", item: "Upload current resume/CV", required: true, completed: false, dueDate: daysBefore(14) },
      { id: "doc-2", category: "Documentation", item: "Submit professional references (minimum 2)", required: true, completed: false, dueDate: daysBefore(14) },
      { id: "doc-3", category: "Documentation", item: "Copy of professional certifications (BLS, ACLS, etc.)", required: true, completed: false, dueDate: daysBefore(14) },
      { id: "doc-4", category: "Documentation", item: "Skills checklist completion", required: true, completed: false, dueDate: daysBefore(10) },
      { id: "log-1", category: "Logistics", item: "Housing arrangement confirmation", required: false, completed: assignment.housingStatus === "COMPLETE", dueDate: daysBefore(7) },
      { id: "log-2", category: "Logistics", item: "Travel booking confirmation", required: false, completed: assignment.travelStatus === "COMPLETE", dueDate: daysBefore(5) },
      { id: "log-3", category: "Logistics", item: "Direct deposit / payroll setup", required: true, completed: false, dueDate: daysBefore(7) },
      { id: "ori-1", category: "Orientation", item: "Schedule facility orientation", required: true, completed: false, dueDate: daysBefore(3) },
      { id: "ori-2", category: "Orientation", item: "Complete online facility modules (if required)", required: false, completed: false, dueDate: daysBefore(3) },
      { id: "ori-3", category: "Orientation", item: "Review facility policies and procedures", required: false, completed: assignment.firstWeekReady, dueDate: daysBefore(1) },
    ]

    const completedCount = items.filter((i) => i.completed).length
    const overallProgress = Math.round((completedCount / items.length) * 100)

    return {
      assignmentId,
      candidateName,
      facilityName: assignment.facilityName,
      startDate: start.toISOString().split("T")[0],
      items,
      overallProgress,
    }
  } catch (error) {
    console.error("Failed to create readiness checklist:", error)
    throw new Error(`Checklist creation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export interface RiskAlert {
  id: string
  candidateId: string
  candidateName: string
  type: "BACKOUT_RISK" | "COMPLIANCE_EXPIRING" | "UNRESPONSIVE" | "SATISFACTION_LOW" | "PAY_ISSUE"
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  message: string
  createdAt: Date
  actionRequired: string
}

export async function checkRiskAlerts(): Promise<RiskAlert[]> {
  const alerts: RiskAlert[] = []

  try {
    const activeCandidates = await db.candidate.findMany({
      where: { isActive: true },
      include: {
        assignments: {
          where: { status: "IN_PROGRESS" },
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        retentionRisks: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    })

    const now = new Date()

    for (const candidate of activeCandidates) {
      const candidateName = `${candidate.firstName} ${candidate.lastName}`
      const currentAssignment = candidate.assignments[0]
      const latestRisk = candidate.retentionRisks[0]

      if (latestRisk && latestRisk.riskLevel !== "LOW") {
        alerts.push({
          id: `risk-${candidate.id}`,
          candidateId: candidate.id,
          candidateName,
          type: "BACKOUT_RISK",
          severity: latestRisk.riskLevel as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
          message: `${candidateName} has a ${latestRisk.riskLevel} retention risk score of ${latestRisk.riskScore}/100. ${latestRisk.reasoning || ""}`,
          createdAt: now,
          actionRequired: latestRisk.suggestedAction || "Review candidate engagement and schedule check-in",
        })
      }

      if (currentAssignment) {
        const endDate = currentAssignment.endDate
        if (endDate) {
          const daysUntilEnd = Math.floor(
            (new Date(endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
          )

          if (daysUntilEnd <= 14 && daysUntilEnd > 0) {
            const severity = daysUntilEnd <= 7 ? "HIGH" : "MEDIUM"
            alerts.push({
              id: `ending-${candidate.id}`,
              candidateId: candidate.id,
              candidateName,
              type: "BACKOUT_RISK",
              severity,
              message: `${candidateName}'s assignment at ${currentAssignment.facilityName} ends in ${daysUntilEnd} days. Extension or new placement needed.`,
              createdAt: now,
              actionRequired: "Discuss extension or present new opportunities",
            })
          }
        }
      }

      if (candidate.engagementScore < 30) {
        const riskLevel = calculateRiskLevel(100 - candidate.engagementScore)
        alerts.push({
          id: `engagement-${candidate.id}`,
          candidateId: candidate.id,
          candidateName,
          type: "UNRESPONSIVE",
          severity: riskLevel,
          message: `${candidateName} has a low engagement score of ${candidate.engagementScore}/100.`,
          createdAt: now,
          actionRequired: "Try alternative communication channels (text, call) to re-engage",
        })
      }
    }

    alerts.sort((a, b) => {
      const severityOrder: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
      return (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3)
    })

    return alerts
  } catch (error) {
    console.error("Failed to check risk alerts:", error)
    return []
  }
}

export interface CandidateUpdate {
  candidateId: string
  candidateName: string
  email: string
  updateType: "WEEKLY_SUMMARY" | "ASSIGNMENT_UPDATE" | "MILESTONE" | "WELCOME"
  subject: string
  body: string
  actionItems: string[]
}

export async function generateCandidateUpdate(
  candidateId: string,
  updateType: CandidateUpdate["updateType"] = "WEEKLY_SUMMARY"
): Promise<CandidateUpdate> {
  try {
    const candidate = await db.candidate.findUnique({
      where: { id: candidateId },
      include: {
        assignments: {
          where: { status: "IN_PROGRESS" },
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        offers: {
          where: { status: { in: ["SENT", "VIEWED"] } },
          take: 3,
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!candidate) throw new Error("Candidate not found")

    const candidateName = `${candidate.firstName} ${candidate.lastName}`
    const currentAssignment = candidate.assignments[0]
    const pendingOffers = candidate.offers

    switch (updateType) {
      case "WEEKLY_SUMMARY": {
        const assignmentInfo = currentAssignment
          ? `You're currently on assignment at ${currentAssignment.facilityName} in ${currentAssignment.city}, ${currentAssignment.state}.`
          : "You don't currently have an active assignment."

        const offersInfo = pendingOffers.length > 0
          ? `You have ${pendingOffers.length} pending offer(s) to review.`
          : ""

        return {
          candidateId: candidate.id,
          candidateName,
          email: candidate.email,
          updateType,
          subject: `Your Weekly Update from TRITAL Orbit`,
          body: `Hi ${candidate.firstName},\n\nHere's your weekly update:\n\n${assignmentInfo} ${offersInfo}\n\nYour recruiter is available to discuss any questions or concerns. Don't hesitate to reach out — we're here to make your experience as smooth as possible.\n\nBest regards,\nYour TRITAL Orbit Team`,
          actionItems: [
            ...(pendingOffers.length > 0 ? ["Review and respond to pending offers"] : []),
            ...(currentAssignment ? ["Submit weekly timesheet by Friday"] : []),
            "Update your profile with any new certifications",
            "Contact your recruiter with any questions",
          ],
        }
      }

      case "ASSIGNMENT_UPDATE": {
        if (!currentAssignment) {
          return {
            candidateId: candidate.id,
            candidateName,
            email: candidate.email,
            updateType,
            subject: "Assignment Update",
            body: `Hi ${candidate.firstName},\n\nWe wanted to check in and let you know we're actively working on finding the perfect assignment for you. Your recruiter will be in touch soon with new opportunities that match your preferences.\n\nBest regards,\nYour TRITAL Orbit Team`,
            actionItems: ["Ensure your availability and preferences are up to date", "Review any new opportunities in your dashboard"],
          }
        }

        const endDate = currentAssignment.endDate
        const daysRemaining = endDate
          ? Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : null

        return {
          candidateId: candidate.id,
          candidateName,
          email: candidate.email,
          updateType,
          subject: `Assignment Update: ${currentAssignment.facilityName}`,
          body: `Hi ${candidate.firstName},\n\nHere's an update on your current assignment at ${currentAssignment.facilityName} in ${currentAssignment.city}, ${currentAssignment.state}.\n\n${daysRemaining !== null ? `You have ${daysRemaining} days remaining in your current contract.` : ""} ${daysRemaining !== null && daysRemaining <= 30 ? "Let's start discussing your plans — whether that's an extension at your current facility or a new assignment." : "We hope everything is going well!"}\n\nPlease don't hesitate to reach out if you have any questions or concerns.\n\nBest regards,\nYour TRITAL Orbit Team`,
          actionItems: [
            "Submit timesheets on time",
            ...(daysRemaining !== null && daysRemaining <= 30 ? ["Discuss extension or next assignment with your recruiter"] : []),
            "Report any facility or housing issues immediately",
          ],
        }
      }

      case "MILESTONE": {
        return {
          candidateId: candidate.id,
          candidateName,
          email: candidate.email,
          updateType,
          subject: `Congratulations on Your Milestone, ${candidate.firstName}!`,
          body: `Hi ${candidate.firstName},\n\nWe wanted to take a moment to celebrate your achievements! Your dedication to providing excellent patient care makes a real difference.\n\nThank you for being a valued member of the TRITAL Orbit family. We're proud to have you on our team and look forward to supporting your career for years to come.\n\nBest regards,\nYour TRITAL Orbit Team`,
          actionItems: [
            "Share your experience with a colleague who might be interested in travel healthcare",
            "Update your profile with your latest accomplishments",
          ],
        }
      }

      case "WELCOME": {
        return {
          candidateId: candidate.id,
          candidateName,
          email: candidate.email,
          updateType,
          subject: `Welcome to TRITAL Orbit, ${candidate.firstName}!`,
          body: `Hi ${candidate.firstName},\n\nWelcome to TRITAL Orbit! We're thrilled to have you join our network of exceptional healthcare professionals.\n\nHere's what happens next:\n1. Your dedicated recruiter will reach out within 24 hours to learn about your preferences\n2. We'll start matching you with top assignments across the country\n3. Our AI-powered platform will find opportunities tailored to your goals\n\nIn the meantime, make sure your profile is complete — candidates with full profiles get matched 3x faster.\n\nBest regards,\nYour TRITAL Orbit Team`,
          actionItems: [
            "Complete your candidate profile",
            "Upload your resume and certifications",
            "Set your location and shift preferences",
            "Respond to your recruiter's introductory call",
          ],
        }
      }

      default:
        throw new Error(`Unknown update type: ${updateType}`)
    }
  } catch (error) {
    console.error("Failed to generate candidate update:", error)
    throw new Error(`Update generation failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
