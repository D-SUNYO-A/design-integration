import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

/**
 * Carte contact / tiers — reproduite en shadcn natif d'après la capture de référence.
 * Avatar à initiales, nom + rôle, badge de statut, détails et tags.
 */

export type ContactCardData = {
  initials: string
  name: string
  role: string
  status: string
  details: { label: string; value: string }[]
  tags: string[]
}

export function ContactCard({
  contact,
  className,
}: {
  contact: ContactCardData
  className?: string
}) {
  return (
    <Card className={cn("w-full max-w-xs gap-0 p-0", className)}>
      <div className="flex items-start justify-between p-4 pb-0">
        <button
          type="button"
          aria-label="Sélectionner ce contact"
          className="size-5 rounded-full border border-input transition-colors hover:border-foreground"
        />
        <Button variant="ghost" size="icon-sm" aria-label="Options">
          <MoreHorizontal />
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2 px-6 pb-5 text-center">
        <Avatar className="size-16">
          <AvatarFallback className="bg-muted text-lg font-medium">
            {contact.initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="font-semibold">{contact.name}</p>
          <p className="text-sm text-muted-foreground">{contact.role}</p>
        </div>
        <Badge variant="secondary">{contact.status}</Badge>
      </div>

      <Separator />

      <dl className="space-y-2.5 p-4 text-sm">
        {contact.details.map((d) => (
          <div key={d.label} className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">{d.label}</dt>
            <dd className="text-right font-medium">{d.value}</dd>
          </div>
        ))}
      </dl>

      {contact.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {contact.tags.map((t) => (
            <Badge key={t} variant="outline" className="font-normal">
              {t}
            </Badge>
          ))}
        </div>
      ) : null}
    </Card>
  )
}
