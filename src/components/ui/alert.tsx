import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export function Alert({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4", className)}>
      <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
      <div>
        <h4 className="font-semibold text-red-700">{title}</h4>
        <p className="text-sm text-red-600">{description}</p>
      </div>
    </div>
  );
}
