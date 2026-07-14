import type { Metadata } from "next"

import { BalanceGenerale } from "@/components/comptabilite/balance-generale"

export const metadata: Metadata = {
  title: "Balance générale",
  description: "Balance générale des comptes au 31/12/2024.",
}

export default function BalanceGeneralePage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <BalanceGenerale />
    </main>
  )
}
