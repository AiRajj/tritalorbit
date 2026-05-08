import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrbitWordmark } from "@/components/brand/logo";

export const metadata = { title: "Account settings" };

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div className="min-h-screen bg-orbit-mist">
      <header className="bg-white border-b border-orbit-deep/10">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link href="/"><OrbitWordmark /></Link>
          <Button asChild variant="ghost"><Link href="/agency">Back</Link></Button>
        </div>
      </header>
      <main className="container-tight py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-orbit-deep">Settings</h1>
        <Card className="mt-6">
          <CardContent className="space-y-3 p-6">
            <div className="rounded-xl border border-orbit-deep/10 bg-white p-4 text-sm">
              <div className="font-semibold text-orbit-deep">Two-factor authentication</div>
              <p className="text-slate-600">Available on Enterprise tier with SAML SSO + SCIM.</p>
            </div>
            <div className="rounded-xl border border-orbit-deep/10 bg-white p-4 text-sm">
              <div className="font-semibold text-orbit-deep">Notifications</div>
              <p className="text-slate-600">Email + in-app delivery configured by default.</p>
            </div>
            <div className="rounded-xl border border-orbit-deep/10 bg-white p-4 text-sm">
              <div className="font-semibold text-orbit-deep">Sessions</div>
              <p className="text-slate-600">Sign out of all devices via your dashboard menu.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
