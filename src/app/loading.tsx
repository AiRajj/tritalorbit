import { LoadingState } from "@/components/dashboards/states";

export default function GlobalLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-20">
      <LoadingState label="Loading TRITAL Orbit™ workspace..." />
    </main>
  );
}
