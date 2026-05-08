import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-orbit-deep/5 via-orbit-deep/10 to-orbit-deep/5 bg-[length:400%_100%]",
        className,
      )}
      {...props}
    />
  );
}
