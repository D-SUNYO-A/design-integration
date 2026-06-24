import type { Metadata } from "next"

import { PlanTiersForm } from "@/components/tiers/plan-tiers-form"

export const metadata: Metadata = {
  title: "Ajouter un plan de tiers",
  description: "Formulaire de création d'un tiers — variante sommaire latéral.",
}

export default function NouveauTiersPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-6">
      <PlanTiersForm />
    </main>
  )
}
