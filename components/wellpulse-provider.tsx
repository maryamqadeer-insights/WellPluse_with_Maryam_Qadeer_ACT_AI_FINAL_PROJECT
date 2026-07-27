"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import {
  calcBMI,
  calorieTarget,
  stepTarget,
  todayISO,
  waterTarget,
  type Profile,
  type WeightEntry,
} from "@/lib/health"

type WellPulseState = {
  profile: Profile | null
  onboarded: boolean
  steps: number
  water: number
  weightHistory: WeightEntry[]
  // derived
  bmi: number
  stepGoal: number
  calorieGoal: number
  waterGoal: number
  caloriesBurned: number
  // actions
  completeOnboarding: (p: Profile) => void
  setSteps: (n: number) => void
  addSteps: (n: number) => void
  setWater: (n: number) => void
  logWeight: (weightKg: number) => void
  resetProfile: () => void
}

const WellPulseContext = createContext<WellPulseState | null>(null)

export function WellPulseProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [steps, setStepsState] = useState(3200)
  const [water, setWater] = useState(3)
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([])

  const bmi = profile ? calcBMI(profile.weightKg, profile.heightCm) : 0
  const stepGoal = profile ? stepTarget(profile.goal) : 8000
  const calorieGoal = profile ? calorieTarget(profile) : 2000
  const waterGoal = profile ? waterTarget(profile.weightKg) : 8
  // rough estimate: 0.045 kcal per step per kg is complex; simplified to ~0.04 kcal/step
  const caloriesBurned = Math.round(steps * 0.04)

  const value = useMemo<WellPulseState>(
    () => ({
      profile,
      onboarded: !!profile,
      steps,
      water,
      weightHistory,
      bmi,
      stepGoal,
      calorieGoal,
      waterGoal,
      caloriesBurned,
      completeOnboarding: (p) => {
        setProfile(p)
        setWeightHistory([{ date: todayISO(), weightKg: p.weightKg }])
      },
      setSteps: (n) => setStepsState(Math.max(0, n)),
      addSteps: (n) => setStepsState((s) => Math.max(0, s + n)),
      setWater: (n) => setWater(Math.max(0, n)),
      logWeight: (weightKg) =>
        setWeightHistory((prev) => {
          const today = todayISO()
          const filtered = prev.filter((e) => e.date !== today)
          return [...filtered, { date: today, weightKg }].sort((a, b) => a.date.localeCompare(b.date))
        }),
      resetProfile: () => {
        setProfile(null)
        setStepsState(3200)
        setWater(3)
        setWeightHistory([])
      },
    }),
    [profile, steps, water, weightHistory, bmi, stepGoal, calorieGoal, waterGoal, caloriesBurned],
  )

  return <WellPulseContext.Provider value={value}>{children}</WellPulseContext.Provider>
}

export function useWellPulse() {
  const ctx = useContext(WellPulseContext)
  if (!ctx) throw new Error("useWellPulse must be used within WellPulseProvider")
  return ctx
}
