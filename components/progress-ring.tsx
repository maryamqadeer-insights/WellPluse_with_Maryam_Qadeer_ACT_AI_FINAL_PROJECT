"use client"

import { cn } from "@/lib/utils"

type Props = {
  value: number
  max: number
  size?: number
  stroke?: number
  color?: string
  trackClassName?: string
  children?: React.ReactNode
  className?: string
}

export function ProgressRing({
  value,
  max,
  size = 120,
  stroke = 10,
  color = "var(--primary)",
  trackClassName,
  children,
  className,
}: Props) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(1, max > 0 ? value / max : 0)
  const offset = circumference * (1 - pct)

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className={cn("stroke-muted", trackClassName)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  )
}
