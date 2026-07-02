import type { Metadata } from "next"

import { ContactActionCards } from "@/components/contacts/contact-action-cards"
import { FicheContactForm } from "@/components/contacts/fiche-contact-form"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Fiche contact",
  description: "Création d'un contact — identification, rôles et coordonnées.",
}

export default function NouveauContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <FicheContactForm />
      <Separator className="my-10" />
      <ContactActionCards />
    </main>
  )
}
