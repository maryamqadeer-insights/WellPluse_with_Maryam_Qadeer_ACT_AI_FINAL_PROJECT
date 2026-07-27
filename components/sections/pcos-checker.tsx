"use client"

import { useState } from "react"
import { HeartPulse, Info, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { pcosResult, pcosSymptoms } from "@/lib/content"
import { cn } from "@/lib/utils"

const toneStyles: Record<string, string> = {
  healthy: "border-primary/30 bg-primary/10 text-primary",
  warn: "border-chart-4/40 bg-chart-4/15 text-chart-4",
  high: "border-chart-5/40 bg-chart-5/15 text-chart-5",
}

export function PCOSChecker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)

  const maxScore = pcosSymptoms.reduce((s, x) => s + x.weight, 0)
  const score = pcosSymptoms.reduce((s, x) => (checked[x.id] ? s + x.weight : s), 0)
  const result = pcosResult(score, maxScore)

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
    setSubmitted(false)
  }

  const reset = () => {
    setChecked({})
    setSubmitted(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <HeartPulse className="h-5 w-5 text-primary" />
          PCOS Symptom Checker
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select any symptoms you&apos;ve noticed recently for a gentle self-assessment.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          {pcosSymptoms.map((s) => (
            <Label
              key={s.id}
              htmlFor={s.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors",
                checked[s.id] ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
              )}
            >
              <Checkbox id={s.id} checked={!!checked[s.id]} onCheckedChange={() => toggle(s.id)} />
              <span className="font-medium text-foreground">{s.label}</span>
            </Label>
          ))}
        </div>

        <div className="flex gap-3">
          <Button className="flex-1" onClick={() => setSubmitted(true)}>
            Check my symptoms
          </Button>
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {submitted && (
          <div className={cn("flex flex-col gap-2 rounded-xl border p-4", toneStyles[result.tone])}>
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-bold">{result.level}</span>
              <span className="text-sm font-semibold">
                {score}/{maxScore} indicators
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">{result.message}</p>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            This tool is for educational purposes only and is not a medical diagnosis. Always consult a qualified
            healthcare professional about your health.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
