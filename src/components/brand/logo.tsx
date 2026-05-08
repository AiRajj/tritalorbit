import { cn } from "@/lib/utils";

export function OrbitMark({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-xl",
        dark ? "bg-white/10 ring-1 ring-white/20" : "bg-orbit-deep",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-6 w-6" fill="none">
        <circle cx="32" cy="32" r="13" stroke={dark ? "#fff" : "#F8FAFC"} strokeWidth="2.5" />
        <ellipse cx="32" cy="32" rx="22" ry="9" stroke="#E63946" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="3" fill={dark ? "#fff" : "#F8FAFC"} />
      </svg>
    </span>
  );
}

export function OrbitWordmark({
  className,
  dark = false,
  size = "md",
}: {
  className?: string;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <OrbitMark dark={dark} />
      <span className="leading-tight">
        <span className={cn("block font-semibold tracking-tight", sizes[size], dark ? "text-white" : "text-orbit-deep")}>
          TRITAL <span className="text-orbit-red">Orbit</span>
          <sup className={cn("ml-0.5 text-[0.55em] font-medium", dark ? "text-white/70" : "text-orbit-steel")}>™</sup>
        </span>
        <span className={cn("block text-[0.62rem] uppercase tracking-[0.2em]", dark ? "text-white/60" : "text-orbit-steel")}>
          Workforce Mobility
        </span>
      </span>
    </span>
  );
}
