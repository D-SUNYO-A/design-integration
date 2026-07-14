import type { Metadata } from "next"

import { ContactCard, type ContactCardData } from "@/components/contacts/contact-card"
import { EntiteSettings } from "@/components/parametres/entite-settings"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Entité — Paramètres généraux",
  description: "Coordonnées, suivi et personnalisation de l'entité.",
}

const ENTITE_CARD: ContactCardData = {
  initials: "PA",
  name: "Projet Agriculture, Jeunes et Entreprenariat",
  role: "Éducation",
  status: "Entité",
  details: [
    { label: "Sigle", value: "DEMO" },
    { label: "Numéro", value: "1233" },
    { label: "Pays", value: "Madagascar" },
    { label: "N.I.F.", value: "1A" },
  ],
  tags: ["DEMO"],
}

export default function EntitePage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-10 px-6 py-10">
      <div className="flex justify-center">
        <ContactCard contact={ENTITE_CARD} />
      </div>
      <Separator />
      <EntiteSettings defaultTab="coordonnees" />
      <Separator />
      <EntiteSettings defaultTab="suivi" />
      <Separator />
      <EntiteSettings defaultTab="personnalisation" />
    </main>
  )
}
