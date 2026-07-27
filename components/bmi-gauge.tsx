"use client"

import { useEffect, useState } from "react"
import { bmiCategory } from "@/lib/health"
import { cn } from "@/lib/utils"

type Props = {
  bmi: number
  size?: number
  className?: string
}

// Maps a BMI value (clamped 12–40) onto a 0–180deg semicircle sweep.
function bmiToAngle(bmi: number) {
  const min = 12
  const max = 40
  const clamped = Math.min(max, Math.max(min, bmi))
  return ((clamped - min) / (max - min)) * 180
}

const toneColor: Record<string, string> = {
  low: "var(--chart-3)",
  healthy: "var(--primary)",
  warn: "var(--chart-4)",
  high: "var(--chart-5)",
}

export function BMIGauge({ bmi, size = 240, className }: Props) {
  const [animated, setAnimated] = useState(0)
  const category = bmiCategory(bmi)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const duration = 1100
    const from = 0
    const to = bmi
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setAnimated(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [bmi])

  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 18
  const angle = bmiToAngle(animated)
  const needleAngle = angle - 90 // rotate so 0 = left
  const strokeW = 16

  // arc segments (0-180deg) split into 4 zones
  const zones = [
    { color: "var(--chart-3)", from: 0, to: 46 }, // underweight
    { color: "var(--primary)", from: 46, to: 83 }, // healthy
    { color: "var(--chart-4)", from: 83, to: 116 }, // overweight
    { color: "var(--chart-5)", from: 116, to: 180 }, // obese
  ]

  const polar = (deg: number, radius: number) => {
    const rad = (Math.PI * (180 - deg)) / 180
    return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) }
  }

  const arcPath = (from: number, to: number) => {
    const a = polar(from, r)
    const b = polar(to, r)
    const large = to - from > 180 ? 1 : 0
    return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`
  }

  const needleLen = r - 6
  const needle = polar(angle, needleLen)

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size / 2 + 34} viewBox={`0 0 ${size} ${size / 2 + 34}`} role="img" aria-label={`BMI gauge showing ${bmi.toFixed(1)}, ${category.label}`}>
        {zones.map((z, i) => (
          <path
            key={i}
            d={arcPath(z.from, z.to)}
            fill="none"
            stroke={z.color}
            strokeWidth={strokeW}
            strokeLinecap="round"
            opacity={0.9}
          />
        ))}
        {/* needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needle.x}
          y2={needle.y}
          stroke="var(--foreground)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={9} fill="var(--foreground)" />
        <circle cx={cx} cy={cy} r={4} fill="var(--card)" />
      </svg>
      <div className="-mt-4 flex flex-col items-center">
        <span className="font-display text-4xl font-bold" style={{ color: toneColor[category.tone] }}>
          {animated.toFixed(1)}
        </span>
        <span className="text-sm font-semibold" style={{ color: toneColor[category.tone] }}>
          {category.label}
        </span>
        <span className="text-xs text-muted-foreground">Healthy range: 18.5 – 24.9</span>
      </div>
    </div>
  )
}
