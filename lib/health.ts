export type Gender = "female" | "male" | "other"
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active"
export type Goal = "lose" | "maintain" | "gain" | "tone"

export type Profile = {
  name: string
  age: number
  gender: Gender
  heightCm: number
  weightKg: number
  activity: ActivityLevel
  goal: Goal
}

export type WeightEntry = {
  date: string // ISO date
  weightKg: number
}

export function calcBMI(weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm) return 0
  const m = heightCm / 100
  return weightKg / (m * m)
}

export type BMICategory = {
  label: string
  range: string
  tone: "low" | "healthy" | "warn" | "high"
}

export function bmiCategory(bmi: number): BMICategory {
  if (bmi < 18.5) return { label: "Underweight", range: "< 18.5", tone: "low" }
  if (bmi < 25) return { label: "Healthy", range: "18.5 – 24.9", tone: "healthy" }
  if (bmi < 30) return { label: "Overweight", range: "25 – 29.9", tone: "warn" }
  return { label: "Obese", range: "≥ 30", tone: "high" }
}

const activityFactor: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
}

// Mifflin-St Jeor
export function calcBMR(p: Pick<Profile, "weightKg" | "heightCm" | "age" | "gender">): number {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age
  if (p.gender === "male") return base + 5
  if (p.gender === "female") return base - 161
  return base - 78
}

export function calcTDEE(p: Profile): number {
  return calcBMR(p) * activityFactor[p.activity]
}

export function calorieTarget(p: Profile): number {
  const tdee = calcTDEE(p)
  switch (p.goal) {
    case "lose":
      return Math.round(tdee - 400)
    case "gain":
      return Math.round(tdee + 400)
    case "tone":
      return Math.round(tdee - 150)
    default:
      return Math.round(tdee)
  }
}

export function waterTarget(weightKg: number): number {
  // ~35ml per kg, expressed in 250ml glasses
  const ml = weightKg * 35
  return Math.max(6, Math.round(ml / 250))
}

export function stepTarget(goal: Goal): number {
  switch (goal) {
    case "lose":
      return 10000
    case "tone":
      return 9000
    case "gain":
      return 7000
    default:
      return 8000
  }
}

export type GoalRecommendation = {
  title: string
  focus: string
  summary: string
  tips: string[]
}

export function recommendGoal(bmi: number, goal: Goal): GoalRecommendation {
  const cat = bmiCategory(bmi)
  const focusByGoal: Record<Goal, string> = {
    lose: "Fat loss & cardio",
    maintain: "Balance & consistency",
    gain: "Strength & muscle",
    tone: "Toning & mobility",
  }
  const base: Record<Goal, GoalRecommendation> = {
    lose: {
      title: "Lean & Energized Plan",
      focus: focusByGoal.lose,
      summary: "A gentle calorie deficit paired with daily movement to shed fat while protecting energy.",
      tips: [
        "Aim for 8k–10k steps daily",
        "Prioritise protein at every meal",
        "3 strength sessions + 2 cardio sessions weekly",
        "Hydrate before every meal",
      ],
    },
    maintain: {
      title: "Steady Wellness Plan",
      focus: focusByGoal.maintain,
      summary: "Keep your body composition stable with balanced nutrition and mixed movement.",
      tips: [
        "Balance cardio, strength and mobility",
        "Fill half your plate with veggies",
        "Keep a consistent sleep schedule",
        "Enjoy mindful rest days",
      ],
    },
    gain: {
      title: "Strong & Nourished Plan",
      focus: focusByGoal.gain,
      summary: "A slight calorie surplus with progressive strength training to build lean muscle.",
      tips: [
        "Eat in a small calorie surplus",
        "4 strength sessions weekly",
        "1.6–2g protein per kg bodyweight",
        "Rest 48h between muscle groups",
      ],
    },
    tone: {
      title: "Sculpt & Glow Plan",
      focus: focusByGoal.tone,
      summary: "Recomposition through resistance work, yoga and balanced eating for a defined, toned look.",
      tips: [
        "Mix resistance training with yoga",
        "Keep calories near maintenance",
        "Focus on time-under-tension",
        "Add mobility flows on rest days",
      ],
    },
  }
  const rec = base[goal]
  return {
    ...rec,
    summary: `${rec.summary} Your BMI is in the ${cat.label.toLowerCase()} range, so we've tuned this plan for you.`,
  }
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function formatShortDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}
