"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Paramètres généraux › Entête › Entité.
 * Reproduit en shadcn/Base UI natif d'après la capture de référence.
 * Une seule page, 3 onglets : Coordonnées, Suivi, Personnalisation.
 *
 * `defaultTab` choisit l'onglet actif au montage. Les `id` sont préfixés par un
 * `useId()` afin que plusieurs instances puissent coexister sur la même page.
 */

export type EntiteTab = "coordonnees" | "suivi" | "personnalisation"

const PLANS = [
  { id: "poste", label: "Poste", checked: true, locked: true },
  { id: "actif", label: "Actif", checked: true, locked: true },
  { id: "geo", label: "Géo", checked: true, locked: true },
  { id: "6e-plan", label: "6e plan", checked: true, locked: true },
  { id: "financier", label: "Financier", checked: true, locked: false },
  { id: "sous-categories", label: "Sous catégories", checked: false, locked: false },
  { id: "plan-7", label: "Plan 7", checked: false, locked: false },
  { id: "plan-8", label: "Plan 8", checked: false, locked: false },
]

export function EntiteSettings({
  defaultTab = "coordonnees",
  className,
}: {
  defaultTab?: EntiteTab
  className?: string
}) {
  const uid = React.useId()
  const fid = (s: string) => `${uid}-${s}`

  return (
    <div className={cn("space-y-6", className)}>
      {/* En-tête */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Paramètres généraux / Entête</p>
          <h1 className="text-2xl font-semibold tracking-tight">Entité</h1>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Imprimer
          </Button>
          <Button type="button">Enregistrer</Button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="coordonnees">Coordonnées</TabsTrigger>
          <TabsTrigger value="suivi">Suivi</TabsTrigger>
          <TabsTrigger value="personnalisation">Personnalisation</TabsTrigger>
        </TabsList>

        {/* --- Coordonnées --- */}
        <TabsContent value="coordonnees" className="space-y-6 pt-4">
          <Panel title="Identification" hint="Informations principales de l'entité">
            <Field label="Libellé de l'entité" htmlFor={fid("libelle")}>
              <Input
                id={fid("libelle")}
                defaultValue="Projet Agriculture, Jeunes et Entreprenariat"
              />
            </Field>
            <Row cols={2}>
              <Field label="Libellé secondaire" htmlFor={fid("libelle-2")}>
                <Input id={fid("libelle-2")} defaultValue="eto madagasikara" />
              </Field>
              <Field label="Sigle" htmlFor={fid("sigle")}>
                <Input id={fid("sigle")} defaultValue="DEMO" />
              </Field>
            </Row>
            <Row cols={2}>
              <Field label="Numéro" htmlFor={fid("numero")}>
                <Input id={fid("numero")} defaultValue="1233" />
              </Field>
              <Field label="Contact" htmlFor={fid("contact")}>
                <Input id={fid("contact")} defaultValue="RAkotobekibo" />
              </Field>
            </Row>
            <Field label="Domaine d'intervention" htmlFor={fid("domaine")}>
              <Input id={fid("domaine")} defaultValue="Education" />
            </Field>
          </Panel>

          <Panel title="Domiciliation" hint="Adresse et coordonnées de contact">
            <div className="space-y-2">
              <Label htmlFor={fid("adresse-1")}>Adresse</Label>
              <Input id={fid("adresse-1")} defaultValue="Tour Europa 125 ab !!" />
              <Input
                aria-label="Adresse (2ème ligne)"
                defaultValue="Centre Commercial Belle Epine v"
              />
            </div>
            <Row cols={3}>
              <Field label="Ville" htmlFor={fid("ville")}>
                <Input id={fid("ville")} defaultValue="Thiais" />
              </Field>
              <Field label="Code postal" htmlFor={fid("code-postal")}>
                <Input id={fid("code-postal")} defaultValue="101" />
              </Field>
              <Field label="Boîte postale" htmlFor={fid("boite-postale")}>
                <Input id={fid("boite-postale")} defaultValue="BP 104" />
              </Field>
            </Row>
            <Row cols={3}>
              <Field label="Pays" htmlFor={fid("pays")}>
                <Select defaultValue="mga">
                  <SelectTrigger id={fid("pays")} className="w-full">
                    <SelectValue placeholder="Sélectionner un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mga">MGA — Madagascar</SelectItem>
                    <SelectItem value="fra">FRA — France</SelectItem>
                    <SelectItem value="mar">MAR — Maroc</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Latitude" htmlFor={fid("latitude")}>
                <Input id={fid("latitude")} defaultValue="0" />
              </Field>
              <Field label="Longitude" htmlFor={fid("longitude")}>
                <Input id={fid("longitude")} defaultValue="0" />
              </Field>
            </Row>
            <Row cols={3}>
              <Field label="Téléphone" htmlFor={fid("telephone")}>
                <Input id={fid("telephone")} type="tel" defaultValue="+33 1 46 86 57 14" />
              </Field>
              <Field label="Fax" htmlFor={fid("fax")}>
                <Input id={fid("fax")} defaultValue="+33 1 49 78 96 31" />
              </Field>
              <Field label="Email" htmlFor={fid("email")}>
                <Input
                  id={fid("email")}
                  type="email"
                  defaultValue="rakotobe-chrisostome@tomate.com"
                />
              </Field>
            </Row>
          </Panel>

          <Panel title="Fiscalité">
            <Field label="N.I.F." htmlFor={fid("nif")}>
              <Input id={fid("nif")} defaultValue="1A" />
            </Field>
          </Panel>
        </TabsContent>

        {/* --- Suivi --- */}
        <TabsContent value="suivi" className="space-y-6 pt-4">
          <Panel
            title="Plans de suivi"
            hint="Les plans verrouillés sont imposés par la configuration du projet"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PLANS.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      id={fid(`plan-${p.id}`)}
                      defaultChecked={p.checked}
                      disabled={p.locked}
                    />
                    <Label
                      htmlFor={fid(`plan-${p.id}`)}
                      className={cn("font-normal", p.locked && "text-muted-foreground")}
                    >
                      {p.label}
                    </Label>
                  </div>
                  {p.locked ? <Badge variant="secondary">Verrouillé</Badge> : null}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Axe de liaison">
            <Field label="Axe" htmlFor={fid("axe")}>
              <Select defaultValue="analytique">
                <SelectTrigger id={fid("axe")} className="w-full max-w-xs">
                  <SelectValue placeholder="Sélectionner un axe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analytique">Axe Analytique</SelectItem>
                  <SelectItem value="geographique">Axe Géographique</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </Panel>
        </TabsContent>

        {/* --- Personnalisation --- */}
        <TabsContent value="personnalisation" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Panel title="Monnaies">
              <Field
                label="Comptabilisation"
                htmlFor={fid("comptabilisation")}
                hint="Fixée à la création de l'entité, non modifiable"
              >
                <Select defaultValue="mga" disabled>
                  <SelectTrigger id={fid("comptabilisation")} className="w-full">
                    <SelectValue placeholder="Devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mga">MGA</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Rapport" htmlFor={fid("rapport")}>
                <Select defaultValue="usd">
                  <SelectTrigger id={fid("rapport")} className="w-full">
                    <SelectValue placeholder="Devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="mga">MGA</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </Panel>

            <Panel title="Gestion électronique de document">
              <Field label="Type" htmlFor={fid("ged-type")}>
                <Select defaultValue="standard">
                  <SelectTrigger id={fid("ged-type")} className="w-full">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="avance">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </Panel>

            <Panel title="Options">
              <CheckRow
                label="Plans externes"
                hint="Utiliser les plans comptables externes"
              />
              <CheckRow
                label="Gestion avancée des taxes"
                hint="Active les règles de taxes détaillées"
              />
            </Panel>

            <Panel title="Campagne">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor={fid("activer-campagnes")} className="font-normal">
                  Activer les campagnes
                </Label>
                <Checkbox id={fid("activer-campagnes")} defaultChecked />
              </div>
              <Field label="Libellé personnalisé" htmlFor={fid("libelle-campagne")}>
                <Input id={fid("libelle-campagne")} defaultValue="Campagne" />
              </Field>
            </Panel>
          </div>

          <Panel title="Logo">
            <button
              type="button"
              className="flex w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed bg-muted/20 py-10 text-center text-sm transition-colors hover:bg-muted/40"
            >
              <span className="font-medium text-foreground">
                Glissez ou déposez une image
              </span>
              <span className="text-xs text-muted-foreground">
                PNG ou JPG, 2 Mo maximum — ou cliquez pour parcourir
              </span>
            </button>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  )
}

/* ---------------------------------------------------------------- helpers -- */

function Panel({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4 rounded-xl border p-5" aria-label={title}>
      <div className="space-y-0.5">
        <h2 className="text-sm font-semibold">{title}</h2>
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

function Row({ cols, children }: { cols: 2 | 3; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
      )}
    >
      {children}
    </div>
  )
}

function CheckRow({ label, hint }: { label: string; hint?: string }) {
  const id = React.useId()
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="font-normal">
          {label}
        </Label>
        {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      <Checkbox id={id} />
    </div>
  )
}
