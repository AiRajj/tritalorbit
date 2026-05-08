import { Download, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge, riskTone } from "@/components/ui/status-badge";
import { bookingRequests, housingOptions, launchRows, marketplaceCards } from "@/lib/content";

export function BookingRequestsTable({ concierge = false }: { concierge?: boolean }) {
  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black text-[#0B3C5D]">{concierge ? "Concierge task board" : "Agency booking requests"}</h2>
          <p className="mt-1 text-sm text-slate-500">Status changes call production API routes and gracefully fallback when offline.</p>
        </div>
        <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="ml-2 bg-transparent text-sm outline-none" placeholder="Search requests" />
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="py-3">Candidate</th>
              <th>Assignment</th>
              <th>Needs</th>
              <th>Status</th>
              <th>Concierge owner</th>
              <th>Timeline</th>
            </tr>
          </thead>
          <tbody>
            {bookingRequests.map((request) => (
              <tr key={request.id} className="border-b border-slate-100 text-sm">
                <td className="py-4 font-bold text-slate-900">{request.candidate}</td>
                <td>{request.assignment}</td>
                <td>{request.needs}</td>
                <td><StatusBadge label={request.status} tone={request.status === "New" ? "red" : "blue"} /></td>
                <td>{request.owner}</td>
                <td>{request.timeline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function ConciergeBoard() {
  const columns = ["New", "In Progress", "Waiting Candidate", "Completed", "Cancelled"];
  return (
    <div className="grid gap-4 xl:grid-cols-5">
      {columns.map((column) => (
        <Card key={column} className="p-4">
          <h3 className="font-black text-[#0B3C5D]">{column}</h3>
          <div className="mt-4 grid gap-3">
            {bookingRequests
              .filter((request) => request.status === column || column === "Completed")
              .slice(0, column === "Completed" ? 1 : undefined)
              .map((request) => (
                <div key={`${column}-${request.id}`} className="rounded-3xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-900">{request.candidate}</p>
                  <p className="mt-1 text-xs text-slate-500">{request.needs}</p>
                </div>
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export function AssignmentLaunchTable() {
  return (
    <Card>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black text-[#0B3C5D]">Assignment Launch Dashboard</h2>
          <p className="mt-1 text-sm text-slate-500">Track readiness between accepted offer and first day.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/api/exports/assignment-launch/csv">
            <Download className="h-4 w-4" /> Export CSV
          </Link>
        </Button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.16em] text-slate-500">
              <th className="py-3">Candidate</th><th>Role</th><th>Facility</th><th>Start Date</th><th>Housing</th><th>Travel</th><th>Documents</th><th>Readiness</th><th>Risk</th><th>Action Needed</th>
            </tr>
          </thead>
          <tbody>
            {launchRows.map((row) => (
              <tr key={row.candidate} className="border-b border-slate-100 text-sm">
                <td className="py-4 font-bold text-slate-900">{row.candidate}</td>
                <td>{row.role}</td><td>{row.facility}</td><td>{row.startDate}</td>
                <td><StatusBadge label={row.housing} tone={row.housing === "Missing" ? "red" : "blue"} /></td>
                <td><StatusBadge label={row.travel} tone={row.travel === "Booked" ? "green" : "amber"} /></td>
                <td><StatusBadge label={row.documents} tone={row.documents === "Complete" ? "green" : "amber"} /></td>
                <td>{row.readiness}</td>
                <td><StatusBadge label={`${row.risk}/100`} tone={riskTone(row.risk)} /></td>
                <td className="font-semibold text-[#E63946]">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function Marketplace({ candidate = false }: { candidate?: boolean }) {
  return (
    <div className="grid gap-6">
      {!candidate ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {marketplaceCards.map((card) => (
            <Card key={card.title} className="p-5">
              <card.icon className="h-7 w-7 text-[#E63946]" />
              <h3 className="mt-4 text-lg font-black text-[#0B3C5D]">{card.title}</h3>
              <p className="mt-1 text-sm font-bold text-slate-500">{card.stat}</p>
            </Card>
          ))}
        </div>
      ) : null}
      <Card>
        <h2 className="text-2xl font-black text-[#0B3C5D]">{candidate ? "Verified housing near your assignment" : "Vendor and landlord marketplace"}</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {housingOptions.map((option) => (
            <div key={option.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <StatusBadge label={option.verified ? "Verified" : "Pending"} tone={option.verified ? "green" : "amber"} />
              <h3 className="mt-4 text-lg font-black text-slate-950">{option.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{option.city}, {option.state} - {option.distance} from facility</p>
              <p className="mt-3 text-2xl font-black text-[#0B3C5D]">{option.cost}</p>
              <p className="mt-1 text-sm text-slate-500">{option.availability} - Rating {option.rating}</p>
              <Button asChild className="mt-5 w-full" variant={candidate ? "default" : "outline"}>
                <Link href={candidate ? "/candidate/booking-request/orbit-demo-offer" : "/contact"}>Contact request</Link>
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
