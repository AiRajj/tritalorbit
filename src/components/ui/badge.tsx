import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3C5D] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0B3C5D] text-[#F8FAFC] hover:bg-[#0B3C5D]/80",
        secondary:
          "border-transparent bg-[#1F2937]/10 text-[#1F2937] hover:bg-[#1F2937]/20",
        destructive:
          "border-transparent bg-[#E63946] text-[#F8FAFC] hover:bg-[#E63946]/80",
        outline: "text-[#1F2937]",
        success:
          "border-transparent bg-emerald-500 text-white hover:bg-emerald-500/80",
        warning:
          "border-transparent bg-amber-500 text-white hover:bg-amber-500/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
