"use client"

import { Droplets, Flame, Footprints, Target, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BMIGauge } from "@/components/bmi-gauge"
import { ProgressRing } from "@/components/progress-ring"
import { MotivationalQuote } from "@/components/motivational-quote"
import { useWellPulse } from "@/components/wellpulse-provider"
import { recommendGoal } from "@/lib/health"

export function Overview() {
  const { profile, bmi, steps, stepGoal, caloriesBurned, calorieGoal, water, waterGoal } = useWellPulse()
  if (!profile) return null
  const rec = recommendGoal(bmi, profile.goal)

  const rings = [
    {
      label: "Steps",
      value: steps,
      max: stepGoal,
      display: steps.toLocaleString(),
      icon: Footprints,
      color: "var(--primary)",
    },
    {
      label: "Calories",
      value: caloriesBurned,
      max: Math.round(calorieGoal * 0.25),
      display: `${caloriesBurned}`,
      icon: Flame,
      color: "var(--chart-2)",
    },
    {
      label: "Water",
      value: water,
      max: waterGoal,
      display: `${water}/${waterGoal}`,
      icon: Droplets,
      color: "var(--chart-3)",
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Body Mass Index</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center pt-2">
            <BMIGauge bmi={bmi} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-5 w-5 text-primary" />
              {rec.title}
            </CardTitle>
            <Badge className="bg-accent text-accent-foreground hover:bg-accent">{rec.focus}</Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-pretty leading-relaxed text-muted-foreground">{rec.summary}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {rec.tips.map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground">
                  <Utensils className="h-4 w-4 shrink-0 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {rings.map((r) => (
          <Card key={r.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <ProgressRing value={r.value} max={r.max} size={90} stroke={9} color={r.color}>
                <r.icon className="h-5 w-5" style={{ color: r.color }} />
              </ProgressRing>
              <div>
                <p className="font-display text-2xl font-bold text-foreground">{r.display}</p>
                <p className="text-sm text-muted-foreground">{r.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <MotivationalQuote />
    </div>
  )
}
