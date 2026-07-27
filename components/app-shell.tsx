"use client"

import { useState } from "react"
import {
  ChefHat,
  Droplets,
  Flower2,
  Footprints,
  HeartPulse,
  LayoutDashboard,
  LineChart,
  LogOut,
  Play,
  Utensils,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useWellPulse } from "@/components/wellpulse-provider"
import { Overview } from "@/components/sections/overview"
import { StepTracker } from "@/components/sections/step-tracker"
import { WaterTracker } from "@/components/sections/water-tracker"
import { Nutrition } from "@/components/sections/nutrition"
import { MealPlans } from "@/components/sections/meal-plans"
import { Yoga } from "@/components/sections/yoga"
import { Workouts } from "@/components/sections/workouts"
import { WeightHistory } from "@/components/sections/weight-history"
import { PCOSChecker } from "@/components/sections/pcos-checker"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  icon: typeof LayoutDashboard
  render: () => React.ReactNode
}

const nav: NavItem[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, render: () => <Overview /> },
  { id: "steps", label: "Steps", icon: Footprints, render: () => <StepTracker /> },
  { id: "water", label: "Water", icon: Droplets, render: () => <WaterTracker /> },
  { id: "nutrition", label: "Nutrition", icon: Utensils, render: () => <Nutrition /> },
  { id: "meals", label: "Meal Plans", icon: ChefHat, render: () => <MealPlans /> },
  { id: "yoga", label: "Yoga", icon: Flower2, render: () => <Yoga /> },
  { id: "workouts", label: "Workouts", icon: Play, render: () => <Workouts /> },
  { id: "weight", label: "Weight", icon: LineChart, render: () => <WeightHistory /> },
  { id: "pcos", label: "PCOS Check", icon: HeartPulse, render: () => <PCOSChecker /> },
]

export function AppShell() {
  const { profile, resetProfile } = useWellPulse()
  const [active, setActive] = useState("overview")
  const current = nav.find((n) => n.id === active)!
  const initials = profile?.name?.slice(0, 2).toUpperCase() ?? "WP"

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold leading-none text-sidebar-foreground">WellPulse</p>
            <p className="text-xs text-muted-foreground">Track. Thrive. Transform.</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-4 flex items-center gap-3 rounded-xl bg-sidebar-accent p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">{profile?.name}</p>
            <p className="text-xs text-muted-foreground">Member</p>
          </div>
          <button
            type="button"
            onClick={resetProfile}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-border/50 hover:text-foreground"
            aria-label="Restart onboarding"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-bold text-foreground">WellPulse</span>
          </div>
          <Button variant="ghost" size="icon" onClick={resetProfile} aria-label="Restart onboarding">
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        {/* Mobile nav (scrollable) */}
        <div className="sticky top-[57px] z-20 flex gap-2 overflow-x-auto border-b border-border bg-background/80 px-4 py-2 backdrop-blur lg:hidden">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        <main className="mx-auto w-full max-w-5xl flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <p className="text-sm font-medium text-primary">
              Good to see you{profile?.name ? `, ${profile.name}` : ""}
            </p>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{current.label}</h1>
          </div>
          {current.render()}
          <p className="mt-10 text-center text-xs text-muted-foreground">
            WellPulse — Track. Thrive. Transform. · Powered by Maryam Qadeer
          </p>
        </main>
      </div>
    </div>
  )
}
