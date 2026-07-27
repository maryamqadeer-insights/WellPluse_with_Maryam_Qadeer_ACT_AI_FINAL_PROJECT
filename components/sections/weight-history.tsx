"use client"

import { useState } from "react"
import { LineChart, Plus, TrendingDown, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWellPulse } from "@/components/wellpulse-provider"
import { formatShortDate } from "@/lib/health"

export function WeightHistory() {
  const { weightHistory, logWeight, profile } = useWellPulse()
  const [value, setValue] = useState("")

  const data = weightHistory
  const weights = data.map((d) => d.weightKg)
  const min = Math.min(...weights) - 1
  const max = Math.max(...weights) + 1
  const range = Math.max(1, max - min)

  const start = data[0]?.weightKg ?? 0
  const current = data[data.length - 1]?.weightKg ?? 0
  const change = +(current - start).toFixed(1)

  const W = 520
  const H = 200
  const pad = 24
  const points = data.map((d, i) => {
    const x = data.length === 1 ? W / 2 : pad + (i / (data.length - 1)) * (W - pad * 2)
    const y = pad + (1 - (d.weightKg - min) / range) * (H - pad * 2)
    return { x, y, d }
  })
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const areaPath =
    points.length > 1
      ? `${linePath} L ${points[points.length - 1].x} ${H - pad} L ${points[0].x} ${H - pad} Z`
      : ""

  const submit = () => {
    const n = Number(value)
    if (n >= 30 && n <= 250) {
      logWeight(n)
      setValue("")
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <LineChart className="h-5 w-5 text-primary" />
          Weight History
        </CardTitle>
        <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-medium">
          {change <= 0 ? (
            <TrendingDown className="h-4 w-4 text-primary" />
          ) : (
            <TrendingUp className="h-4 w-4 text-chart-5" />
          )}
          <span className={change <= 0 ? "text-primary" : "text-chart-5"}>
            {change > 0 ? "+" : ""}
            {change} kg
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-52 w-full min-w-[420px]" role="img" aria-label="Weight trend chart">
            {[0, 0.25, 0.5, 0.75, 1].map((g) => (
              <line
                key={g}
                x1={pad}
                x2={W - pad}
                y1={pad + g * (H - pad * 2)}
                y2={pad + g * (H - pad * 2)}
                stroke="var(--border)"
                strokeWidth={1}
              />
            ))}
            {areaPath && <path d={areaPath} fill="var(--primary)" opacity={0.12} />}
            {points.length > 1 && (
              <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            )}
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={5} fill="var(--card)" stroke="var(--primary)" strokeWidth={3} />
                <text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                  {p.d.weightKg}
                </text>
                <text x={p.x} y={H - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
                  {formatShortDate(p.d.date)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="log-weight">Log today&apos;s weight (kg)</Label>
            <Input
              id="log-weight"
              type="number"
              placeholder={String(current || profile?.weightKg || 60)}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) submit()
              }}
            />
          </div>
          <Button onClick={submit}>
            <Plus className="h-4 w-4" />
            Log
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
