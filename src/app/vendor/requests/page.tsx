import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmptyState } from "@/components/dashboard/empty-state";

export const metadata = { title: "Requests" };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Requests" title="Inbound candidate requests" description="When agencies match a candidate to your inventory, requests appear here." />
      <Card>
        <CardContent className="p-6">
          <EmptyState
            icon={Bell}
            title="No requests yet"
            description="You'll see new bookings, vetting requests, and renewal notices in this queue."
          />
        </CardContent>
      </Card>
    </>
  );
}
