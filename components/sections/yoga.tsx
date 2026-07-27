"use client"

import { Clock, Flower2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { yogaPoses } from "@/lib/content"
import { useWellPulse } from "@/components/wellpulse-provider"

export function Yoga() {
  const { profile } = useWellPulse()
  const goal = profile?.goal ?? "maintain"
  const recommended = yogaPoses.filter((p) => p.tags.includes(goal))
  const others = yogaPoses.filter((p) => !p.tags.includes(goal))
  const ordered = [...recommended, ...others]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Flower2 className="h-5 w-5 text-primary" />
          Yoga for You
        </CardTitle>
        <p className="text-sm text-muted-foreground">Poses picked to support your goal and daily balance.</p>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        {ordered.map((p) => {
          const isRec = p.tags.includes(goal)
          return (
            <div key={p.name} className="flex flex-col gap-2 rounded-xl border border-border/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground">{p.name}</h4>
                  <p className="text-xs italic text-muted-foreground">{p.sanskrit}</p>
                </div>
                {isRec && <Badge className="bg-primary/15 text-primary hover:bg-primary/15">Recommended</Badge>}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.benefit}</p>
              <div className="mt-auto flex items-center gap-3 pt-1 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {p.duration}
                </span>
                <Badge variant="secondary">{p.level}</Badge>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
