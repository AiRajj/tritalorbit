import { AlertCircle, FolderOpenDot, Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
      <Loader2 className="h-4 w-4 animate-spin text-[#0B3C5D]" /> {label}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <FolderOpenDot className="h-8 w-8 text-slate-400" />
      <h3 className="mt-3 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-1 max-w-lg text-sm text-slate-500">{description}</p>
    </div>
  );
}

export function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <div>
        <p className="font-semibold text-red-700">{title}</p>
        <p className="text-red-600">{description}</p>
      </div>
    </div>
  );
}
