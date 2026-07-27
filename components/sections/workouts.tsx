"use client"

import { useState } from "react"
import { Clock, Play } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { workoutVideos } from "@/lib/content"
import { cn } from "@/lib/utils"

const filters = ["All", "Cardio", "Strength", "Yoga", "HIIT"] as const

export function Workouts() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [active, setActive] = useState<string | null>(null)

  const videos = workoutVideos.filter((v) => filter === "All" || v.category === filter)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Play className="h-5 w-5 text-primary" />
          Workout Videos
        </CardTitle>
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3.5 py-1 text-sm font-medium transition-colors",
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {videos.map((v) => (
          <div key={v.id} className="overflow-hidden rounded-xl border border-border/70">
            <div className="relative aspect-video w-full bg-muted">
              {active === v.id ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(v.id)}
                  className="group relative h-full w-full"
                  aria-label={`Play ${v.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    className="h-full w-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/25 transition-colors group-hover:bg-foreground/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 p-4">
              <div>
                <p className="font-medium leading-tight text-foreground">{v.title}</p>
                <p className="text-xs text-muted-foreground">{v.channel}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="secondary">{v.category}</Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {v.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
