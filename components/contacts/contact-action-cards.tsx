"use client"

import * as React from "react"
import {
  Check,
  Copy,
  Download,
  PenLine,
  QrCode,
  Trash2,
  Upload,
  UploadCloud,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Cartes annexes de la fiche contact — reproduites d'après la capture de référence :
 * Signature (pad), Importer un tampon (dépôt image), Codes QR (partage lien/description).
 * Empilées à la suite sous le formulaire.
 */

const SHARE_URL =
  "http://102.16.26.134:5000/common/consultation-param/contact?id=0&origine=true&bdd=420"

export function ContactActionCards({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <SignatureCard />
      <TamponCard />
      <QrCard />
    </div>
  )
}

function CardX() {
  return (
    <Button type="button" variant="ghost" size="icon" aria-label="Fermer">
      <X />
    </Button>
  )
}

function SignatureCard() {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg">Signature</CardTitle>
          <CardDescription>
            Dessinez votre signature dans la zone ci-dessous
          </CardDescription>
        </div>
        <CardX />
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <button
          type="button"
          className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/20 text-sm text-muted-foreground transition-colors hover:bg-muted/40"
        >
          <PenLine className="size-5" />
          Cliquez ou dessinez ici
        </button>
      </CardContent>

      <Separator />
      <div className="flex items-center justify-between gap-2 p-4">
        <Button
          type="button"
          variant="ghost"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 />
          Supprimer
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            <Upload />
            Importer
          </Button>
          <Button type="button" variant="outline">
            Annuler
          </Button>
          <Button type="button">
            <Check />
            Valider
          </Button>
        </div>
      </div>
    </Card>
  )
}

function TamponCard() {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg">Importer un tampon</CardTitle>
          <CardDescription>
            Ajoutez une image de tampon depuis votre appareil
          </CardDescription>
        </div>
        <CardX />
      </CardHeader>

      <CardContent className="space-y-2 px-6 pb-6">
        <Label>Source</Label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-muted/20 py-10 text-center text-sm text-muted-foreground">
          <UploadCloud className="size-6" />
          <span>Glissez-déposez une image ici</span>
          <span className="text-xs">ou</span>
          <Button type="button" variant="outline">
            <Upload />
            Parcourir
          </Button>
        </div>
      </CardContent>

      <Separator />
      <div className="flex items-center justify-between gap-4 p-4">
        <p className="text-sm text-muted-foreground">PNG ou JPG, 5 Mo maximum</p>
        <div className="flex gap-2">
          <Button type="button" variant="outline">
            Annuler
          </Button>
          <Button type="button" disabled>
            Importer
          </Button>
        </div>
      </div>
    </Card>
  )
}

function QrCard() {
  const [copied, setCopied] = React.useState(false)

  function copy(text: string) {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg">Codes QR</CardTitle>
          <CardDescription>
            Partagez ce contact par lien ou par description
          </CardDescription>
        </div>
        <CardX />
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <Tabs defaultValue="lien">
          <TabsList>
            <TabsTrigger value="lien">Lien</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
          </TabsList>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            {/* Aperçu QR (placeholder — brancher un générateur pour le vrai code) */}
            <div className="flex size-40 shrink-0 items-center justify-center rounded-lg border bg-background text-foreground">
              <QrCode className="size-28" />
            </div>

            <div className="flex-1">
              <TabsContent value="lien" className="space-y-3">
                <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs break-all text-muted-foreground">
                  {SHARE_URL}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => copy(SHARE_URL)}
                  >
                    <Copy />
                    {copied ? "Copié" : "Copier"}
                  </Button>
                  <Button type="button" variant="outline">
                    <Download />
                    Télécharger
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="description" className="space-y-3">
                <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
                  Partagez la fiche de ce contact avec ses identifiants et coordonnées.
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      copy(
                        "Partagez la fiche de ce contact avec ses identifiants et coordonnées."
                      )
                    }
                  >
                    <Copy />
                    {copied ? "Copié" : "Copier"}
                  </Button>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </CardContent>

      <Separator />
      <div className="flex justify-end p-4">
        <Button type="button" variant="outline">
          Fermer
        </Button>
      </div>
    </Card>
  )
}
