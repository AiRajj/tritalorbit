import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const notificationCreateSchema = z.object({
  userId: z.string().min(1),
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(["INFO", "SUCCESS", "WARNING", "ERROR"]).default("INFO"),
  link: z.string().optional(),
})

const mockNotifications = [
  { id: "n-001", userId: "user-001", title: "Offer Accepted", message: "Nina Patel accepted offer for Cedar Sinai", type: "SUCCESS", read: false, link: "/agency/offers/offer-003/preview", createdAt: "2026-05-08T02:00:00Z" },
  { id: "n-002", userId: "user-001", title: "New Booking Request", message: "Sarah Johnson submitted a booking request", type: "INFO", read: false, link: "/agency/booking-requests", createdAt: "2026-05-08T01:30:00Z" },
  { id: "n-003", userId: "user-001", title: "High Risk Alert", message: "David Kim has a critical risk score of 90", type: "WARNING", read: true, link: "/agency/assignment-launch", createdAt: "2026-05-07T18:00:00Z" },
  { id: "n-004", userId: "user-001", title: "Offer Viewed", message: "Kevin Hart viewed offer for St. Luke's Hospital", type: "INFO", read: true, link: "/agency/offers/offer-002/preview", createdAt: "2026-05-07T14:00:00Z" },
  { id: "n-005", userId: "user-001", title: "New Vendor Application", message: "NurseStay Express applied to join the marketplace", type: "INFO", read: true, link: "/admin/vendors", createdAt: "2026-05-07T10:00:00Z" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const unreadOnly = searchParams.get("unread") === "true"

  let data = mockNotifications
  if (userId) data = data.filter((n) => n.userId === userId)
  if (unreadOnly) data = data.filter((n) => !n.read)

  return NextResponse.json({ notifications: data, total: data.length, unread: data.filter((n) => !n.read).length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = notificationCreateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const newNotification = {
      id: `n-${Date.now()}`,
      ...parsed.data,
      read: false,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ notification: newNotification, message: "Notification created" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
