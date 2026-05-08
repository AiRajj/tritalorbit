"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type OfferRow = {
  id: string;
  candidate: string;
  facility: string;
  city: string;
  weeklyPay: number;
  status: string;
  risk: number | null;
};

function statusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "ACCEPTED") return "default";
  if (status === "BACKOUT_RISK") return "destructive";
  if (status === "SENT" || status === "VIEWED") return "secondary";
  return "outline";
}

export function ActiveOffersTable({ offers }: { offers: OfferRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    return offers.filter((offer) => {
      const matchesQuery = `${offer.candidate} ${offer.facility} ${offer.city}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = status === "ALL" ? true : offer.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [offers, query, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          placeholder="Search candidate, facility, city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="SENT">Sent</option>
          <option value="VIEWED">Viewed</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="BACKOUT_RISK">Backout Risk</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Weekly Pay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.candidate}</TableCell>
                <TableCell>{offer.facility}</TableCell>
                <TableCell>{offer.city}</TableCell>
                <TableCell>${offer.weeklyPay.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(offer.status)}>{offer.status}</Badge>
                </TableCell>
                <TableCell>{offer.risk ?? "--"}</TableCell>
                <TableCell>
                  <Link href={`/agency/offers/${offer.id}/preview`} className="text-sm text-orbit-blue hover:underline">
                    Preview
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
