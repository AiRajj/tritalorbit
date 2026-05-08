import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OrbitWordmark } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { BookingRequestForm } from "@/components/candidate/booking-form";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ offerId: string }>;
  searchParams: Promise<{ need?: string }>;
}) {
  const { offerId } = await params;
  const { need } = await searchParams;

  // offerId here is the public token to keep the link consistent
  const offer = await prisma.offer.findFirst({
    where: { OR: [{ id: offerId }, { publicToken: offerId }] },
    include: { candidate: true },
  });
  if (!offer) notFound();

  return (
    <div className="min-h-screen bg-orbit-mist">
      <header className="bg-orbit-hero py-6 text-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5">
          <OrbitWordmark size="sm" dark />
          <Badge variant="inverse">Concierge request</Badge>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 md:px-6">
        <div className="rounded-3xl bg-white p-6 shadow-elevate ring-1 ring-orbit-deep/10 md:p-8">
          <h1 className="text-2xl font-semibold text-orbit-deep">
            Request mobility support
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            For {offer.candidate.firstName}'s {offer.facilityName} assignment in {offer.city}, {offer.state}.
          </p>

          <BookingRequestForm
            offerId={offer.id}
            candidateId={offer.candidateId}
            agencyId={offer.agencyId}
            defaults={{
              needFlight: need === "flight",
              needHousing: need === "housing",
              needCar: need === "car",
            }}
            preferredLocation={`${offer.city}, ${offer.state}`}
          />
        </div>
      </main>
    </div>
  );
}
