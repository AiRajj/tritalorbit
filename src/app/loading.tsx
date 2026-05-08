import { LoadingState } from "@/components/shared/loading-state";

export default function GlobalLoading() {
  return (
    <div className="mx-auto max-w-7xl p-6">
      <LoadingState />
    </div>
  );
}
