import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-orbit-deep/15 bg-orbit-deep/5 text-orbit-deep",
        accent: "border-orbit-red/20 bg-orbit-red/5 text-orbit-red",
        outline: "border-orbit-deep/15 bg-white text-orbit-deep",
        success: "border-emerald-500/20 bg-emerald-50 text-emerald-700",
        warning: "border-amber-400/30 bg-amber-50 text-amber-700",
        destructive: "border-red-500/20 bg-red-50 text-red-700",
        muted: "border-slate-200 bg-slate-50 text-slate-600",
        inverse: "border-white/20 bg-white/10 text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
