"use client"

import { WellPulseProvider, useWellPulse } from "@/components/wellpulse-provider"
import { Onboarding } from "@/components/onboarding"
import { AppShell } from "@/components/app-shell"
import { Chatbot } from "@/components/chatbot"

function WellPulseApp() {
  const { onboarded } = useWellPulse()
  return (
    <>
      {onboarded ? <AppShell /> : <Onboarding />}
      <Chatbot />
    </>
  )
}

export default function Page() {
  return (
    <WellPulseProvider>
      <WellPulseApp />
    </WellPulseProvider>
  )
}
