"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
    const getColorClass = (value: number) => {
      if (value < 20) return 'bg-red-300';
      if (value < 35) return 'bg-orange-300';
      if (value < 50) return 'bg-yellow-300'; 
      if (value < 70) return 'bg-emerald-300'; 
      if (value < 100) return 'bg-blue-300'; 
      return 'bg-cyan-200'; 
    };

    const clampedValue = Math.min(Math.max(value || 0, 0), 100);
  
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-muted h-3 rounded-4xl relative flex w-full items-center overflow-x-hidden",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`${value ? getColorClass(value) : 'bg-cyan-200'} size-full flex-1 transition-all`}
        style={{ transform: `translateX(-${100 - (clampedValue || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
