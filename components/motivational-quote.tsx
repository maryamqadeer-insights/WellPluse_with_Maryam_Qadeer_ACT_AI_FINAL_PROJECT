"use client"

import { useState } from "react"
import { Quote, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quotes } from "@/lib/content"

export function MotivationalQuote() {
  const [index, setIndex] = useState(0)
  const q = quotes[index]

  return (
    <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
      <CardContent className="relative flex flex-col gap-3 p-6">
        <Quote className="h-8 w-8 opacity-40" />
        <p className="text-pretty font-display text-lg font-semibold leading-relaxed">{q.text}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">— {q.author}</span>
          <Button
            variant="secondary"
            size="sm"
            className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
            onClick={() => setIndex((i) => (i + 1) % quotes.length)}
          >
            <RefreshCw className="h-4 w-4" />
            New quote
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
