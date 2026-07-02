import type { Metadata } from "next"

import { ContactCard, type ContactCardData } from "@/components/contacts/contact-card"

export const metadata: Metadata = {
  title: "Répertoire des contacts",
  description: "Fiches contacts sous forme de cartes.",
}

const CONTACTS: ContactCardData[] = [
  {
    initials: "AI",
    name: "Atlas Ingénierie",
    role: "Bureau d'études",
    status: "Fournisseur",
    details: [
      { label: "Adresse", value: "12 rue des Acacias, Casablanca" },
      { label: "Pays", value: "Maroc" },
      { label: "NIF", value: "40318765" },
      { label: "Compte", value: "401 – Fournisseurs" },
    ],
    tags: ["BTP", "Études"],
  },
]

export default function RepertoirePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACTS.map((contact) => (
          <ContactCard key={contact.name} contact={contact} />
        ))}
      </div>
    </main>
  )
}
