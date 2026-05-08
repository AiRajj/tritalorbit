import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { OrbitWordmark } from "@/components/brand/logo";
import Link from "next/link";

export const metadata = { title: "Profile" };

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div className="min-h-screen bg-orbit-mist">
      <header className="bg-white border-b border-orbit-deep/10">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/"><OrbitWordmark /></Link>
          <Button asChild variant="ghost"><Link href="/agency">Back to dashboard</Link></Button>
        </div>
      </header>
      <main className="container-tight py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-orbit-deep">Profile</h1>
        <p className="mt-1 text-sm text-slate-600">Your account information.</p>
        <Card className="mt-6">
          <CardContent className="grid gap-4 p-6 md:grid-cols-2">
            <Field label="Name"><Input defaultValue={session.user.name ?? ""} /></Field>
            <Field label="Email"><Input defaultValue={session.user.email ?? ""} disabled /></Field>
            <Field label="Role"><Input defaultValue={session.user.role} disabled /></Field>
            <div className="md:col-span-2 mt-2">
              <Button>Save</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
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
