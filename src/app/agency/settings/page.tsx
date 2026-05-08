import { Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getSessionContext, resolveAgencyId } from "@/lib/queries/user";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agency settings" };

export default async function Page() {
  const ctx = await getSessionContext();
  const agencyId = await resolveAgencyId(ctx?.role ?? "AGENCY_OWNER", ctx?.agencyId ?? null);
  const agency = agencyId ? await prisma.agency.findUnique({ where: { id: agencyId } }) : null;

  return (
    <>
      <PageHeader eyebrow="Account" title="Agency settings" description="Brand, team, and configuration." />
      <Card>
        <CardContent className="p-6">
          <h3 className="text-base font-semibold text-orbit-deep">Workspace</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Agency name">
              <Input defaultValue={agency?.name ?? ""} placeholder="Your agency" />
            </Field>
            <Field label="Slug">
              <Input defaultValue={agency?.slug ?? ""} disabled />
            </Field>
            <Field label="Brand color">
              <Input defaultValue={agency?.brandColor ?? "#0B3C5D"} />
            </Field>
            <Field label="Timezone">
              <Input defaultValue={agency?.timezone ?? "America/Chicago"} />
            </Field>
          </div>
          <div className="mt-6">
            <Button>Save changes</Button>
            <p className="mt-2 text-xs text-slate-500">Changes save once persistence handlers are enabled in your environment.</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
