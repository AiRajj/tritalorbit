"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/dashboards/states";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-20">
      <ErrorState
        title="Something went wrong"
        description="The request could not be completed. Please retry or contact support if the issue persists."
      />
      <div className="mt-4">
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
