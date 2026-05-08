import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(11,60,93,0.09)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
}

export function GlassCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
