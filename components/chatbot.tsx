"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { botReply } from "@/lib/content"
import { cn } from "@/lib/utils"

type Message = { role: "bot" | "user"; text: string }

const suggestions = ["How much water?", "Steps goal?", "PCOS help", "Meal ideas"]

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! I'm your WellPulse assistant. Ask me about BMI, water, steps, meals, yoga, or PCOS." },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { role: "user", text: trimmed }])
    setInput("")
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: botReply(trimmed) }])
    }, 400)
  }

  return (
    <>
      <div className={cn("fixed bottom-5 right-5 z-50 transition-all", open ? "pointer-events-none opacity-0" : "opacity-100")}>
        <Button
          size="lg"
          className="h-14 w-14 rounded-full p-0 shadow-xl shadow-primary/30"
          onClick={() => setOpen(true)}
          aria-label="Open WellPulse assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed bottom-5 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        style={{ height: "min(70vh, 520px)" }}
        role="dialog"
        aria-label="WellPulse assistant"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/15">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">WellPulse Assistant</p>
              <p className="text-xs opacity-80">Always here to help</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1 hover:bg-primary-foreground/15"
            aria-label="Close assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground",
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
