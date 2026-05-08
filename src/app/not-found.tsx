import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
      <h1 className="text-4xl font-semibold text-[#1F2937]">Page not found</h1>
      <p className="max-w-lg text-slate-600">
        The requested resource is not available. Return to the TRITAL Orbit™ homepage.
      </p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </main>
  );
}
