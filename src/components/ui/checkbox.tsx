"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onCheckedChange,
  className,
  ...props
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "h-5 w-5 rounded border border-slate-300 bg-white text-white transition",
        checked && "border-orbit-blue bg-orbit-blue",
        className
      )}
      {...props}
    >
      {checked ? <Check className="mx-auto h-4 w-4" /> : null}
    </button>
  );
}
