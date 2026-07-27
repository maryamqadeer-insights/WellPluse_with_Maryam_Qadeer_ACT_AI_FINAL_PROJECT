"use client"

import { useState } from "react"
import { Activity, ArrowLeft, ArrowRight, HeartPulse, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useWellPulse } from "@/components/wellpulse-provider"
import type { ActivityLevel, Gender, Goal } from "@/lib/health"
import { cn } from "@/lib/utils"

const goals: { value: Goal; title: string; desc: string }[] = [
  { value: "lose", title: "Lose weight", desc: "Trim body fat & feel lighter" },
  { value: "tone", title: "Tone up", desc: "Sculpt & define muscles" },
  { value: "maintain", title: "Stay healthy", desc: "Maintain & feel great" },
  { value: "gain", title: "Build muscle", desc: "Add lean strength" },
]

const activities: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Lightly active" },
  { value: "moderate", label: "Moderately active" },
  { value: "active", label: "Very active" },
]

const genders: { value: Gender; label: string }[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
]

export function Onboarding() {
  const { completeOnboarding } = useWellPulse()
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState<Gender>("female")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activity, setActivity] = useState<ActivityLevel>("light")
  const [goal, setGoal] = useState<Goal>("lose")

  const step1Valid = name.trim().length > 0 && Number(age) >= 12 && Number(age) <= 100
  const step2Valid = Number(height) >= 120 && Number(height) <= 230 && Number(weight) >= 30 && Number(weight) <= 250

  const finish = () => {
    completeOnboarding({
      name: name.trim(),
      age: Number(age),
      gender,
      heightCm: Number(height),
      weightKg: Number(weight),
      activity,
      goal,
    })
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <HeartPulse className="h-7 w-7" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">WellPulse</h1>
          <p className="text-sm font-semibold text-primary">Track. Thrive. Transform.</p>
        </div>

        <Card className="border-border/60 shadow-xl shadow-primary/5">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>Step {step} of 2</span>
                <span>{step === 1 ? "About you" : "Your goals"}</span>
              </div>
              <Progress value={step === 1 ? 50 : 100} className="h-2" />
            </div>

            {step === 1 ? (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">What should we call you?</Label>
                  <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="28"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Gender</Label>
                    <div className="flex gap-2">
                      {genders.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          onClick={() => setGender(g.value)}
                          className={cn(
                            "flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                            gender === g.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/40",
                          )}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="mt-2 w-full" size="lg" disabled={!step1Valid} onClick={() => setStep(2)}>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="165"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="62"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Activity level</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {activities.map((a) => (
                      <button
                        key={a.value}
                        type="button"
                        onClick={() => setActivity(a.value)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                          activity === a.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40",
                        )}
                      >
                        <Activity className="h-4 w-4 shrink-0" />
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Your main goal</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {goals.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setGoal(g.value)}
                        className={cn(
                          "flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2.5 text-left transition-colors",
                          goal === g.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/40",
                        )}
                      >
                        <span className={cn("text-sm font-semibold", goal === g.value ? "text-primary" : "text-foreground")}>
                          {g.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" size="lg" disabled={!step2Valid} onClick={finish}>
                    <Sparkles className="h-4 w-4" />
                    Build my plan
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">Powered by Maryam Qadeer</p>
      </div>
    </main>
  )
}
