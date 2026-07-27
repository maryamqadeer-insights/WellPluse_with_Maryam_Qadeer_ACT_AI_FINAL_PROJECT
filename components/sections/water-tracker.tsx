"use client"

import { Droplets, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useWellPulse } from "@/components/wellpulse-provider"
import { cn } from "@/lib/utils"

export function WaterTracker() {
  const { water, waterGoal, setWater } = useWellPulse()
  const pct = Math.min(100, Math.round((water / waterGoal) * 100))
  const ml = water * 250

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Droplets className="h-5 w-5 text-primary" />
          Water Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-display text-3xl font-bold text-foreground">
              {(ml / 1000).toFixed(2)}
              <span className="ml-1 text-base font-medium text-muted-foreground">L</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {water} of {waterGoal} glasses · {pct}%
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => setWater(water - 1)} aria-label="Remove a glass">
              <Minus className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={() => setWater(water + 1)} aria-label="Add a glass">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setWater(i + 1 === water ? i : i + 1)}
              aria-label={`Set water to ${i + 1} glasses`}
              className={cn(
                "flex h-11 w-9 items-end justify-center overflow-hidden rounded-md border transition-colors",
                i < water ? "border-primary bg-primary/15" : "border-border bg-muted/40 hover:border-primary/40",
              )}
            >
              <Droplets
                className={cn("mb-1 h-4 w-4", i < water ? "text-primary" : "text-muted-foreground/50")}
                fill={i < water ? "var(--primary)" : "none"}
              />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
