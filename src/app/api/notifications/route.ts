import { NextResponse } from "next/server";

const notifications = [
  {
    id: "N-001",
    type: "alert",
    title: "Critical: Nicole Adams start date in 14 days",
    message: "Housing, travel, and documents are all unresolved. Immediate escalation required.",
    timestamp: "2026-05-08T09:15:00Z",
    read: false,
    priority: "critical",
    link: "/agency/assignment-launch",
  },
  {
    id: "N-002",
    type: "alert",
    title: "Critical: Lisa Rodriguez — all logistics pending",
    message: "Start date May 19. No housing, travel, or documents confirmed.",
    timestamp: "2026-05-08T09:10:00Z",
    read: false,
    priority: "critical",
    link: "/agency/assignment-launch",
  },
  {
    id: "N-003",
    type: "update",
    title: "Housing confirmed for Sarah Mitchell",
    message: "Haven Furnished Suites confirmed 1BR unit for June 2 start.",
    timestamp: "2026-05-07T16:30:00Z",
    read: true,
    priority: "normal",
    link: "/agency/assignment-launch",
  },
  {
    id: "N-004",
    type: "inquiry",
    title: "New vendor inquiry from SkyBridge Travel",
    message: "SkyBridge is offering a 15% group discount for Q3 bookings.",
    timestamp: "2026-05-07T14:22:00Z",
    read: false,
    priority: "normal",
    link: "/agency/vendors",
  },
  {
    id: "N-005",
    type: "update",
    title: "Emily Chen — license verification pending",
    message: "PT license for Maryland is pending state board review. Expected 3-5 business days.",
    timestamp: "2026-05-07T11:00:00Z",
    read: true,
    priority: "high",
    link: "/agency/assignment-launch",
  },
  {
    id: "N-006",
    type: "system",
    title: "New vendor listing published",
    message: "Pacific Coast Housing added 3 new furnished units in San Francisco.",
    timestamp: "2026-05-06T09:45:00Z",
    read: true,
    priority: "normal",
    link: "/agency/vendors",
  },
  {
    id: "N-007",
    type: "update",
    title: "Priya Sharma — BLS certification expiring",
    message: "BLS certification expires May 30. Renewal must be completed before start date.",
    timestamp: "2026-05-06T08:20:00Z",
    read: false,
    priority: "high",
    link: "/agency/assignment-launch",
  },
  {
    id: "N-008",
    type: "inquiry",
    title: "Booking request from Robert Taylor",
    message: "Robert has requested SUV rental in Los Angeles area starting June 14.",
    timestamp: "2026-05-05T17:10:00Z",
    read: true,
    priority: "normal",
    link: "/agency/booking-requests",
  },
];

export async function GET() {
  return NextResponse.json({ success: true, data: notifications });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id } = body;
  const notification = notifications.find((n) => n.id === id);
  if (!notification) {
    return NextResponse.json({ success: false, error: "Notification not found" }, { status: 404 });
  }
  return NextResponse.json({
    success: true,
    data: { ...notification, read: true, readAt: new Date().toISOString() },
  });
}
