"use client"

import * as React from "react"
import { ArrowLeft, ArrowUp, Check, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

/**
 * Fiche contact — création/édition d'un tiers.
 * Reproduite en shadcn/Base UI natif d'après la capture de référence.
 * Sections : Identification, Rôles, Domiciliation, Compléments.
 */

const TYPES = [
  {
    value: "particulier",
    label: "Particulier",
    sublabel: "Personne physique",
    description: "Un individu identifié par ses nom, prénom et pièce d'identité.",
  },
  {
    value: "association",
    label: "Association",
    sublabel: "But non lucratif",
    description: "Groupement de personnes sans but lucratif, identifié par son RC.",
  },
  {
    value: "societe",
    label: "Société",
    sublabel: "Personne morale",
    description: "Entreprise commerciale identifiée par ses numéros fiscaux (NIF, RC).",
  },
  {
    value: "institution",
    label: "Institution",
    sublabel: "Organisme public",
    description: "Administration ou organisme public / parapublic.",
  },
]

const ROLES = [
  { value: "personnel", label: "Personnel" },
  { value: "prestataire-fournisseur", label: "Prestataire / Fournisseur" },
  { value: "assureur", label: "Assureur" },
  { value: "responsable-ppm", label: "Responsable PPM" },
  { value: "chauffeur", label: "Chauffeur" },
  { value: "client", label: "Client" },
  { value: "avocat", label: "Avocat" },
  { value: "formateur", label: "Formateur" },
  { value: "consultant", label: "Consultant" },
  { value: "garage", label: "Garage" },
  { value: "organisation-communautaire", label: "Organisation communautaire" },
  { value: "candidat", label: "Candidat" },
  { value: "medecin-interne", label: "Medecin interne" },
  { value: "medecin-externe", label: "Medecin externe" },
  { value: "infirmier", label: "Infirmier" },
  { value: "agent-collecte", label: "Agent de collecte" },
  { value: "location-voiture", label: "Location voiture" },
  { value: "magasinier", label: "Magasinier" },
  { value: "prestataire-externe", label: "Prestataire externe" },
]

export function FicheContactForm({ className }: { className?: string }) {
  const [roles, setRoles] = React.useState<string[]>([
    "chauffeur",
    "client",
    "medecin-interne",
  ])
  const [tomselfActif, setTomselfActif] = React.useState(true)

  return (
    <form className={cn("space-y-8", className)}>
      {/* En-tête */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Fiche contact</h1>
          <p className="text-sm text-muted-foreground">
            Identification, rôles et coordonnées du tiers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline">
            <ArrowLeft />
            Retour
          </Button>
          <Button type="button" variant="outline">
            Enregistrer
          </Button>
          <Button type="submit">Enregistrer et Ajouter</Button>
        </div>
      </div>
      <Separator />

      {/* Identification */}
      <Section title="Identification" hint="Type de tiers et informations d'identité.">
        <Field label="Type">
          <RadioGroup defaultValue="particulier" className="grid gap-3 sm:grid-cols-2">
            {TYPES.map((t) => (
              <Label
                key={t.value}
                htmlFor={`type-${t.value}`}
                className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border p-4 font-normal leading-normal transition-colors has-[[data-checked]]:border-primary"
              >
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">{t.label}</span>{" "}
                    <span className="text-muted-foreground">({t.sublabel})</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
                <RadioGroupItem
                  id={`type-${t.value}`}
                  value={t.value}
                  className="mt-0.5"
                />
              </Label>
            ))}
          </RadioGroup>
        </Field>

        <Row>
          <Field label="Civilité" htmlFor="civilite">
            <Select defaultValue="m">
              <SelectTrigger id="civilite" className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">M.</SelectItem>
                <SelectItem value="mme">Mme</SelectItem>
                <SelectItem value="mlle">Mlle</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field
            label="CIN"
            htmlFor="cin"
            hint="Numéro de la pièce d'identité nationale."
          >
            <Input id="cin" />
          </Field>
        </Row>

        <Row>
          <Field label="Nom" htmlFor="nom">
            <Input id="nom" />
          </Field>
          <Field label="Prénom" htmlFor="prenom">
            <Input id="prenom" />
          </Field>
        </Row>

        <Row>
          <Field label="Date de naissance" htmlFor="date-naissance">
            <Input id="date-naissance" type="date" />
          </Field>
          <Field label="Délivré le" htmlFor="delivre-le">
            <Input id="delivre-le" type="date" />
          </Field>
        </Row>

        <Field label="Photo">
          <button
            type="button"
            className="flex h-28 w-44 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed bg-muted/30 text-center text-xs text-muted-foreground transition-colors hover:bg-muted/50"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ArrowUp className="size-4" />
            </span>
            Glisser ou déposer une image
          </button>
        </Field>
      </Section>
      <Separator />

      {/* Rôles */}
      <Section title="Rôles" hint="Fonctions et rattachements du contact.">
        <ToggleGroup
          value={roles}
          onValueChange={(v) => setRoles(v as string[])}
          className="w-full flex-wrap"
        >
          {ROLES.map((r) => (
            <ToggleGroupItem key={r.value} value={r.value} variant="outline">
              {roles.includes(r.value) ? <Check /> : null}
              {r.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Field label="Autres" htmlFor="autres">
          <Input id="autres" />
        </Field>
        <Field label="Fonction" htmlFor="fonction">
          <Input id="fonction" />
        </Field>

        <Row>
          <Field label="NIF" htmlFor="nif">
            <Input id="nif" />
          </Field>
          <Field label="NIU" htmlFor="niu">
            <Input id="niu" />
          </Field>
        </Row>
        <Row>
          <Field label="Numéro RC" htmlFor="numero-rc">
            <Input id="numero-rc" />
          </Field>
          <Field label="Numéro STAT" htmlFor="numero-stat">
            <Input id="numero-stat" />
          </Field>
        </Row>
      </Section>
      <Separator />

      {/* Domiciliation */}
      <Section title="Domiciliation" hint="Adresse et moyens de contact du tiers.">
        <Field label="1ère ligne d'adresse" htmlFor="adresse-1">
          <Input id="adresse-1" />
        </Field>
        <Field label="2ème ligne d'adresse" htmlFor="adresse-2">
          <Input id="adresse-2" />
        </Field>

        <Row>
          <Field label="Code postal" htmlFor="code-postal">
            <Input id="code-postal" />
          </Field>
          <Field label="Ville" htmlFor="ville">
            <Input id="ville" />
          </Field>
        </Row>

        <Field label="Pays" htmlFor="pays">
          <Select>
            <SelectTrigger id="pays" className="w-full">
              <SelectValue placeholder="Sélectionner un pays" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="cd">Congo (RDC)</SelectItem>
              <SelectItem value="be">Belgique</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Row>
          <Field label="Téléphone" htmlFor="telephone">
            <Input id="telephone" type="tel" />
          </Field>
          <Field label="Fax" htmlFor="fax">
            <Input id="fax" />
          </Field>
        </Row>

        <Field label="Adresse électronique (e-mail)" htmlFor="email">
          <Input id="email" type="email" />
        </Field>
        <Field label="Site web" htmlFor="site-web">
          <Input id="site-web" type="url" />
        </Field>
      </Section>
      <Separator />

      {/* Compléments */}
      <Section title="Compléments" hint="Accès portail et informations complémentaires.">
        <Field
          label={
            <>
              Nom du Compte{" "}
              <span className="font-normal text-muted-foreground">(Webportail)</span>
            </>
          }
          htmlFor="nom-compte"
          hint="Utilisé pour l'accès au portail client."
        >
          <Select>
            <SelectTrigger id="nom-compte" className="w-full">
              <SelectValue placeholder="Sélectionner un compte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acme">ACME Distribution SARL</SelectItem>
              <SelectItem value="beta">Beta Services</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/30 p-4">
          <div className="space-y-0.5">
            <Label htmlFor="tomself-actif">Compte Tomself actif</Label>
            <p className="text-sm text-muted-foreground">
              Visible et utilisable dans l'application mobile.
            </p>
          </div>
          <Switch
            id="tomself-actif"
            checked={tomselfActif}
            onCheckedChange={setTomselfActif}
          />
        </div>

        <Field label="Email Tomself" htmlFor="email-tomself">
          <div className="flex gap-2">
            <Input
              id="email-tomself"
              type="email"
              className="flex-1"
              disabled={!tomselfActif}
            />
            <Button type="button" variant="outline" disabled={!tomselfActif}>
              Réinitialiser mot de passe
            </Button>
          </div>
        </Field>

        <Field label="Commentaire" htmlFor="commentaire">
          <Textarea id="commentaire" rows={4} />
        </Field>

        <Field label="Pièces Jointes">
          <div className="flex items-center gap-3">
            <Button type="button" variant="outline">
              <Plus />
              Parcourir
            </Button>
            <span className="text-sm text-muted-foreground">Pas de données</span>
          </div>
        </Field>
      </Section>
    </form>
  )
}

/* ---------------------------------------------------------------- helpers -- */

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4" aria-label={title}>
      <div className="space-y-0.5">
        <h2 className="text-lg font-semibold">{title}</h2>
        {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: React.ReactNode
  htmlFor?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
}
