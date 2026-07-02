import type { Metadata } from "next"

import { EntiteSettings } from "@/components/parametres/entite-settings"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Entité — Paramètres généraux",
  description: "Coordonnées, suivi et personnalisation de l'entité.",
}

export default function EntitePage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-10 px-6 py-10">
      <EntiteSettings defaultTab="coordonnees" />
      <Separator />
      <EntiteSettings defaultTab="suivi" />
      <Separator />
      <EntiteSettings defaultTab="personnalisation" />
    </main>
  )
}
