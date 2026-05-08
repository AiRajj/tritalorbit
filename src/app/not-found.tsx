import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-orbit-red">404</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        The page you requested is not available. Return to the TRITAL Orbit platform home.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  );
}
