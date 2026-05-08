import { Role } from "@prisma/client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { requireRole } from "@/lib/auth";
import { agencyLinks } from "@/lib/navigation";
import { prisma } from "@/lib/prisma";

export default async function AssignmentLaunchPage() {
  const session = await requireRole([Role.AGENCY_OWNER, Role.RECRUITER]);

  const assignments = await prisma.assignment
    .findMany({ include: { candidate: true }, orderBy: { startDate: "asc" }, take: 100 })
    .catch(() => []);

  return (
    <DashboardShell
      title="Assignment Launch"
      links={agencyLinks}
      user={{ name: session.user.name ?? "Agency User", email: session.user.email ?? "" }}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Input placeholder="Search candidate or facility" className="max-w-xs" />
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export CSV</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Assignment readiness tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Housing</TableHead>
                  <TableHead>Travel</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Readiness</TableHead>
                  <TableHead>Action Needed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>{assignment.candidate.fullName}</TableCell>
                    <TableCell>{assignment.candidate.roleTitle ?? "Clinician"}</TableCell>
                    <TableCell>{assignment.facilityName}</TableCell>
                    <TableCell>{new Date(assignment.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={assignment.housingStatus === "READY" ? "success" : "warning"}>
                        {assignment.housingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={assignment.travelStatus === "READY" ? "success" : "warning"}>
                        {assignment.travelStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={assignment.documentsStatus === "READY" ? "success" : "warning"}>
                        {assignment.documentsStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{assignment.firstWeekReadiness}%</TableCell>
                    <TableCell>{assignment.firstWeekReadiness < 70 ? "Concierge follow-up" : "Monitor"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
