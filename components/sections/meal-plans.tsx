"use client"

import { useState } from "react"
import { ChefHat, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mealPlans } from "@/lib/content"
import { useWellPulse } from "@/components/wellpulse-provider"
import { cn } from "@/lib/utils"
import type { Goal } from "@/lib/health"

const goalLabels: Record<Goal, string> = {
  lose: "Lose weight",
  tone: "Tone up",
  maintain: "Maintain",
  gain: "Build muscle",
}

export function MealPlans() {
  const { profile } = useWellPulse()
  const [active, setActive] = useState<Goal>(profile?.goal ?? "maintain")
  const plan = mealPlans.find((p) => p.goal === active)!
  const total = plan.meals.reduce((sum, m) => sum + m.kcal, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ChefHat className="h-5 w-5 text-primary" />
          Meal Plans
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {mealPlans.map((p) => (
            <button
              key={p.goal}
              type="button"
              onClick={() => setActive(p.goal)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                active === p.goal
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40",
              )}
            >
              {goalLabels[p.goal]}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-accent/20 px-4 py-3">
          <div>
            <p className="font-display text-base font-semibold text-foreground">{plan.name}</p>
            <p className="text-sm text-muted-foreground">{plan.kcal} per day</p>
          </div>
          <Badge className="bg-primary text-primary-foreground">{total} kcal</Badge>
        </div>

        <ol className="flex flex-col gap-3">
          {plan.meals.map((m, i) => (
            <li key={i} className="flex items-center gap-4 rounded-xl border border-border/70 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {m.time}
                </p>
                <p className="font-medium text-foreground">{m.name}</p>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{m.kcal} kcal</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}
