"use client"

import { Flame, Footprints, MapPin, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressRing } from "@/components/progress-ring"
import { useWellPulse } from "@/components/wellpulse-provider"

export function StepTracker() {
  const { steps, stepGoal, caloriesBurned, addSteps } = useWellPulse()
  const distanceKm = (steps * 0.000762).toFixed(2) // avg stride ~0.76m
  const pct = Math.round((steps / stepGoal) * 100)

  const stats = [
    { icon: Flame, label: "Calories burned", value: `${caloriesBurned}`, unit: "kcal" },
    { icon: MapPin, label: "Distance", value: distanceKm, unit: "km" },
    { icon: Footprints, label: "Goal progress", value: `${Math.min(100, pct)}`, unit: "%" },
  ]

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Footprints className="h-5 w-5 text-primary" />
            Step Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <ProgressRing value={steps} max={stepGoal} size={200} stroke={16}>
            <span className="font-display text-4xl font-bold text-foreground">{steps.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">of {stepGoal.toLocaleString()} steps</span>
          </ProgressRing>
          <div className="flex w-full items-center justify-center gap-3">
            <Button variant="outline" size="icon" onClick={() => addSteps(-500)} aria-label="Remove 500 steps">
              <Minus className="h-4 w-4" />
            </Button>
            <Button className="flex-1" onClick={() => addSteps(500)}>
              <Plus className="h-4 w-4" />
              Add 500 steps
            </Button>
            <Button variant="outline" size="icon" onClick={() => addSteps(1000)} aria-label="Add 1000 steps">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1 lg:content-start xl:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="justify-center">
            <CardContent className="flex flex-col gap-3 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/25 text-accent-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">
                  {s.value}
                  <span className="ml-1 text-sm font-medium text-muted-foreground">{s.unit}</span>
                </p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
