"use client"

import { Sparkles, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { nutritionTips } from "@/lib/content"
import { useWellPulse } from "@/components/wellpulse-provider"

const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const

const aiInsight: Record<string, string> = {
  lose: "For fat loss, keep meals protein-forward and fibre-rich to stay full on fewer calories. Aim to fill half your plate with non-starchy veg.",
  maintain: "To maintain, keep balanced plates: a palm of protein, a fist of carbs, a thumb of healthy fats, and plenty of colour.",
  gain: "To build muscle, add an extra 300–400 kcal from quality carbs and protein, and don't skip post-workout fuel.",
  tone: "For toning, prioritise protein at every meal and time most carbs around your workouts for energy and recovery.",
}

export function Nutrition() {
  const { profile, calorieGoal } = useWellPulse()
  const goal = profile?.goal ?? "maintain"

  return (
    <div className="flex flex-col gap-5">
      <Card className="border-primary/20 bg-gradient-to-br from-accent/20 to-transparent">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-base font-semibold text-foreground">AI Nutrition Insight</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{aiInsight[goal]}</p>
            <p className="mt-2 text-sm font-medium text-primary">Your daily target: ~{calorieGoal.toLocaleString()} kcal</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Utensils className="h-5 w-5 text-primary" />
            Nutrition Ideas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Breakfast">
            <TabsList className="w-full">
              {categories.map((c) => (
                <TabsTrigger key={c} value={c} className="flex-1">
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((c) => (
              <TabsContent key={c} value={c} className="mt-4 grid gap-3 sm:grid-cols-2">
                {nutritionTips
                  .filter((t) => t.category === c)
                  .map((t) => (
                    <div key={t.title} className="rounded-xl border border-border/70 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-sm font-semibold text-foreground">{t.title}</h4>
                        <Badge variant="secondary" className="shrink-0">
                          {t.calories} kcal
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                      <div className="mt-3 flex gap-4 text-xs font-medium text-muted-foreground">
                        <span>P {t.macros.protein}g</span>
                        <span>C {t.macros.carbs}g</span>
                        <span>F {t.macros.fat}g</span>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
