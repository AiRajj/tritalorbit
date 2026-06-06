import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PublicBookingForm } from "@/components/candidate/public-booking-form";

export default async function PublicRequestMobilityPage({
  params
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const offer = await prisma.offer
    .findUnique({
      where: { token },
      include: { candidate: true, assignment: true }
    })
    .catch(() => null);

  if (!offer) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-8">
      <Link
        href={`/candidate/offer/${token}`}
        className="inline-flex items-center gap-1 text-sm text-orbit-blue hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to offer
      </Link>
      <PublicBookingForm
        token={token}
        candidateName={offer.candidate.name}
        assignmentLabel={`${offer.assignment.facilityName} in ${offer.assignment.city}, ${offer.assignment.state}`}
      />
    </div>
  );
}
