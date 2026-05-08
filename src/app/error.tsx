"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return <ErrorState message={error.message || "Unexpected platform error"} />;
}
