import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { OfferBuilderForm } from "@/components/offers/offer-builder-form";

export default async function CreateOfferPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const membership = await prisma.agencyMember.findFirst({ where: { userId: session.user.id } });
  const ownedAgency = await prisma.agency.findFirst({ where: { ownerId: session.user.id } });

  const agencyId = membership?.agencyId ?? ownedAgency?.id;

  if (!agencyId) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-semibold">No agency linked</h1>
        <p className="mt-2 text-sm text-slate-600">Assign this user to an agency before creating offers.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Offer Boost Builder</h1>
        <p className="text-sm text-slate-600">Create premium offers with AI-enhanced value positioning and mobility support.</p>
      </div>
      <OfferBuilderForm recruiterId={session.user.id} agencyId={agencyId} />
    </div>
  );
}
