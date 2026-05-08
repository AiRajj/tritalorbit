import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrbitWordmark } from "@/components/brand/logo";
import { ShieldAlert } from "lucide-react";

export const metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-orbit-mist px-6 text-center">
      <OrbitWordmark size="lg" />
      <div className="rounded-full bg-orbit-red/10 p-4 text-orbit-red">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-semibold text-orbit-deep">You don't have access to that area.</h1>
      <p className="max-w-md text-sm text-slate-600">
        Your role doesn't include access to this workspace. If this looks wrong, ask your agency owner to update
        your permissions.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Sign in as a different user</Link>
        </Button>
      </div>
    </div>
  );
}
