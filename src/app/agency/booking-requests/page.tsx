import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireRole } from "@/lib/auth";
import { agencyLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function AgencyBookingRequestsPage() {
  const session = await requireRole([Role.AGENCY_OWNER, Role.RECRUITER, Role.CONCIERGE_MANAGER]);

  const requests = await prisma.bookingRequest
    .findMany({
      include: { candidate: true, assignment: true, owner: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    .catch(() => []);

  return (
    <DashboardShell
      title="Booking Requests"
      links={agencyLinks}
      user={{ name: session.user.name ?? "Agency User", email: session.user.email ?? "" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>All Booking Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Concierge Owner</TableHead>
                <TableHead>Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.candidate.fullName}</TableCell>
                  <TableCell>{request.assignment.facilityName}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === "COMPLETED" ? "success" : "secondary"}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.owner?.name ?? "Unassigned"}</TableCell>
                  <TableCell>{request.timelineNote ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
