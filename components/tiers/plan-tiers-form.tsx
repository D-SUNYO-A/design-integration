"use client"

import * as React from "react"
import { ArrowUp, Briefcase, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

/**
 * Variante B — « Sommaire latéral » de la page Claude Design « Plan de tiers ».
 * Source : https://claude.ai/design/p/29057623-35ce-424e-bb7c-7e1bfd95d095 (file=Plan de tiers.dc.html)
 *
 * Comportement type « tabs verticaux » : le sommaire à gauche pilote la section
 * affichée à droite (une seule à la fois). Champs reproduits d'après les captures
 * de référence — voir designs/plan-de-tiers/reference/.
 */

type SectionId =
  | "general"
  | "adresse"
  | "bancaire"
  | "correspondant"
  | "taxe"
  | "pieces"

const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "general", label: "Général" },
  { id: "adresse", label: "Adresse" },
  { id: "bancaire", label: "Coordonnées banc." },
  { id: "correspondant", label: "Correspondant" },
  { id: "taxe", label: "Taxe" },
  { id: "pieces", label: "Pièces jointes" },
]

const PANELS: Record<SectionId, React.ReactNode> = {
  general: <GeneralSection />,
  adresse: <AdresseSection />,
  bancaire: <BancaireSection />,
  correspondant: <CorrespondantSection />,
  taxe: <TaxeSection />,
  pieces: <PiecesSection />,
}

export function PlanTiersForm({ className }: { className?: string }) {
  const [active, setActive] = React.useState<SectionId>("general")

  return (
    <Card className={cn("w-full max-w-3xl gap-0 overflow-hidden p-0", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg">Ajouter un plan de tiers</CardTitle>
          <CardDescription>Renseignez les informations du tiers.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" aria-label="Fermer">
          <X />
        </Button>
      </CardHeader>
      <Separator />

      <CardContent className="grid grid-cols-1 items-stretch gap-0 p-0 sm:grid-cols-[220px_1fr]">
        {/* Sommaire latéral (tablist) */}
        <nav
          role="tablist"
          aria-orientation="vertical"
          aria-label="Sections du formulaire"
          className="hidden border-r p-3 sm:block"
        >
          <ul className="space-y-0.5">
            {SECTIONS.map((s) => {
              const isActive = active === s.id
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors",
                      isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 shrink-0 rounded-full",
                        isActive ? "bg-foreground" : "bg-muted-foreground/40"
                      )}
                    />
                    {s.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Panneau actif */}
        <div role="tabpanel" className="min-h-[22rem] px-6 py-6">
          {PANELS[active]}
        </div>
      </CardContent>

      <Separator />
      <div className="flex items-center justify-between gap-4 p-4">
        <p className="text-sm text-muted-foreground">
          Les champs marqués <span className="text-foreground">*</span> sont requis.
        </p>
        <div className="flex gap-2">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer</Button>
        </div>
      </div>
    </Card>
  )
}

/* ---------------------------------------------------------------- helpers -- */

function GroupLabel({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="space-y-0.5">
      <h3 className="text-sm font-semibold">{title}</h3>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-muted-foreground"> *</span> : null}
      </Label>
      {children}
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
}

/* --------------------------------------------------------------- sections -- */

function GeneralSection() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <GroupLabel title="Saisie" hint="Imputation comptable du tiers." />

        <Field label="Compte général" htmlFor="compte-general" required>
          <Select>
            <SelectTrigger id="compte-general" className="w-full">
              <SelectValue placeholder="Sélectionner un compte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="401000">401000 — Fournisseurs</SelectItem>
              <SelectItem value="411000">411000 — Clients</SelectItem>
              <SelectItem value="421000">421000 — Personnel</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Row>
          <Field label="Compte auxiliaire" htmlFor="compte-auxiliaire">
            <Input id="compte-auxiliaire" placeholder="FOUR-0001" />
          </Field>
          <Field label="Contact" htmlFor="contact-general">
            <Select>
              <SelectTrigger id="contact-general" className="w-full">
                <SelectValue placeholder="Sélectionner un contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jean">Jean Dupont</SelectItem>
                <SelectItem value="marie">Marie Martin</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Row>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div className="space-y-0.5">
            <Label htmlFor="compte-actif">Compte actif</Label>
            <p className="text-sm text-muted-foreground">
              Visible dans les écritures et états.
            </p>
          </div>
          <Switch id="compte-actif" defaultChecked />
        </div>
      </div>

      <div className="space-y-4">
        <GroupLabel title="Identification" />

        <Field label="Nom ou raison sociale" htmlFor="raison-sociale" required>
          <Input id="raison-sociale" placeholder="ACME Distribution SARL" />
        </Field>

        <Field label="Contact nom" htmlFor="contact-nom">
          <Input id="contact-nom" placeholder="Jean Dupont" />
        </Field>
      </div>
    </div>
  )
}

function AdresseSection() {
  return (
    <div className="space-y-4">
      <GroupLabel title="Domiciliation" hint="Adresse et moyens de contact du tiers." />

      <Field label="1ère ligne d'adresse" htmlFor="adresse-1">
        <Input id="adresse-1" placeholder="12 rue des Lilas" />
      </Field>
      <Field label="2ème ligne d'adresse" htmlFor="adresse-2">
        <Input id="adresse-2" placeholder="Bâtiment B, 3e étage" />
      </Field>

      <Row>
        <Field label="Ville" htmlFor="ville">
          <Input id="ville" placeholder="Lyon" />
        </Field>
        <Field label="Pays" htmlFor="pays">
          <Select>
            <SelectTrigger id="pays" className="w-full">
              <SelectValue placeholder="Sélectionner un pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="be">Belgique</SelectItem>
              <SelectItem value="ch">Suisse</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </Row>

      <Row>
        <Field label="Téléphone" htmlFor="adresse-tel">
          <Input id="adresse-tel" type="tel" placeholder="+33 4 00 00 00 00" />
        </Field>
        <Field label="Fax" htmlFor="adresse-fax">
          <Input id="adresse-fax" placeholder="—" />
        </Field>
      </Row>

      <Field label="Adresse électronique (e-mail)" htmlFor="adresse-email">
        <Input id="adresse-email" type="email" placeholder="contact@acme.fr" />
      </Field>
    </div>
  )
}

function BancaireSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <GroupLabel
          title="Coordonnées bancaires"
          hint="Compte bancaire principal du tiers."
        />
        <Button type="button" variant="outline">
          <Briefcase />
          Comptes bancaires
        </Button>
      </div>

      <Field label="Nom de la banque" htmlFor="banque-nom">
        <Input id="banque-nom" placeholder="BNP Paribas" />
      </Field>

      <Field label="Domiciliation (1)" htmlFor="banque-dom1">
        <Input id="banque-dom1" placeholder="Agence centrale" />
      </Field>
      <Field label="Domiciliation (2)" htmlFor="banque-dom2">
        <Input id="banque-dom2" placeholder="Complément" />
      </Field>

      <Field label="Ville" htmlFor="banque-ville">
        <Input id="banque-ville" placeholder="Paris" />
      </Field>
      <Field label="Pays" htmlFor="banque-pays">
        <Select>
          <SelectTrigger id="banque-pays" className="w-full">
            <SelectValue placeholder="Sélectionner un pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">France</SelectItem>
            <SelectItem value="be">Belgique</SelectItem>
            <SelectItem value="ch">Suisse</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Code Banque / Guichet" htmlFor="banque-code">
        <div className="flex gap-2">
          <Input id="banque-code" placeholder="Code banque" className="flex-1" />
          <Input aria-label="Guichet" placeholder="Guichet" className="w-28" />
          <Button type="button" variant="outline">
            <Check />
            Vérifier…
          </Button>
        </div>
      </Field>

      <Field label="N° de compte bancaire / Clé" htmlFor="banque-compte">
        <div className="flex gap-2">
          <Input id="banque-compte" placeholder="N° de compte" className="flex-1" />
          <Input aria-label="Clé" placeholder="Clé" className="w-20" />
        </div>
      </Field>

      <Field label="Code SWIFT" htmlFor="banque-swift">
        <Input id="banque-swift" placeholder="BNPAFRPPXXX" />
      </Field>
      <Field label="IBAN" htmlFor="banque-iban">
        <Input id="banque-iban" placeholder="FR76 …" />
      </Field>
    </div>
  )
}

function CorrespondantSection() {
  return (
    <div className="space-y-4">
      <GroupLabel
        title="Correspondant bancaire"
        hint="Banque intermédiaire pour les virements internationaux."
      />

      <Field label="Nom de la banque" htmlFor="corr-banque">
        <Input id="corr-banque" placeholder="BNP Paribas" />
      </Field>

      <Row>
        <Field label="Domiciliation (1)" htmlFor="corr-dom1">
          <Input id="corr-dom1" placeholder="Agence centrale" />
        </Field>
        <Field label="Domiciliation (2)" htmlFor="corr-dom2">
          <Input id="corr-dom2" placeholder="Complément" />
        </Field>
      </Row>

      <Row>
        <Field label="Ville" htmlFor="corr-ville">
          <Input id="corr-ville" placeholder="Paris" />
        </Field>
        <Field label="Pays" htmlFor="corr-pays">
          <Select>
            <SelectTrigger id="corr-pays" className="w-full">
              <SelectValue placeholder="Sélectionner un pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="be">Belgique</SelectItem>
              <SelectItem value="ch">Suisse</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </Row>

      <Field label="Code banque / guichet" htmlFor="corr-code-banque">
        <div className="flex gap-2">
          <Input id="corr-code-banque" placeholder="Code banque" className="flex-1" />
          <Input aria-label="Guichet" placeholder="Guichet" className="w-28" />
          <Button type="button" variant="outline">
            <Check />
            Vérifier
          </Button>
        </div>
      </Field>

      <Field label="N° de compte bancaire / clé" htmlFor="corr-compte">
        <div className="flex gap-2">
          <Input id="corr-compte" placeholder="N° de compte" className="flex-1" />
          <Input aria-label="Clé" placeholder="Clé" className="w-20" />
        </div>
      </Field>

      <Row>
        <Field label="Code SWIFT" htmlFor="corr-swift">
          <Input id="corr-swift" placeholder="BNPAFRPPXXX" />
        </Field>
        <Field label="IBAN" htmlFor="corr-iban">
          <Input id="corr-iban" placeholder="FR76 …" />
        </Field>
      </Row>
    </div>
  )
}

function TaxeSection() {
  return (
    <div className="space-y-4">
      <GroupLabel title="Taxe" hint="Identifiants fiscaux et mode de règlement du tiers." />

      <Field label="Types de Taxes" htmlFor="types-taxes">
        <Select>
          <SelectTrigger id="types-taxes" className="w-full">
            <SelectValue placeholder="Sélection…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tva">TVA</SelectItem>
            <SelectItem value="exonere">Exonéré</SelectItem>
            <SelectItem value="precompte">Précompte</SelectItem>
          </SelectContent>
        </Select>
      </Field>

      <Field label="Numéro R.C." htmlFor="numero-rc">
        <Input id="numero-rc" />
      </Field>
      <Field label="N.I.F. / N.I.U" htmlFor="nif-niu">
        <Input id="nif-niu" />
      </Field>
      <Field label="N° statistique" htmlFor="num-statistique">
        <Input id="num-statistique" />
      </Field>
      <Field label="N° BAD" htmlFor="num-bad">
        <Input id="num-bad" />
      </Field>

      <Field label="Mode de paiement" htmlFor="mode-paiement">
        <Select>
          <SelectTrigger id="mode-paiement" className="w-full">
            <SelectValue placeholder="Sélectionner…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="virement">Virement</SelectItem>
            <SelectItem value="cheque">Chèque</SelectItem>
            <SelectItem value="especes">Espèces</SelectItem>
            <SelectItem value="traite">Traite</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

function PiecesSection() {
  return (
    <div className="space-y-4">
      <GroupLabel
        title="Pièces jointes"
        hint="Justificatifs liés au tiers (KBIS, RIB, contrat…)."
      />

      <div className="space-y-2">
        <Label>Documents</Label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/30 px-6 py-10 text-center">
          <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ArrowUp className="size-5" />
          </span>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Glissez vos fichiers ici
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, JPG ou PNG · 10 Mo max
            </p>
          </div>
          <Button type="button" variant="outline">
            Parcourir…
          </Button>
        </div>
      </div>
    </div>
  )
}
