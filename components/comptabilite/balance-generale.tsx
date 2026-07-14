import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/**
 * Balance générale — tableau comptable hiérarchique.
 * Reproduit en shadcn natif d'après la capture de référence.
 *
 * Les 8 colonnes chiffrées suivent l'ordre de COLUMNS ; `values` est un tableau
 * de même longueur (null = cellule vide).
 */

const COLUMNS = [
  "A Nouveau D",
  "A Nouveau C",
  "Mouvements D",
  "Mouvements C",
  "Total D",
  "Total C",
  "Solde D",
  "Solde C",
]

type Money = string | null

export type BalanceRow = {
  code?: string
  label: string
  /** Niveau hiérarchique du compte (1 = classe, 2 = compte, 3 = sous-compte). */
  level?: 1 | 2 | 3
  variant?: "account" | "subtotal" | "total" | "note"
  values: Money[]
}

const AMOUNT = "1 000,0"

export const BALANCE_ROWS: BalanceRow[] = [
  {
    code: "4",
    label: "Tiers",
    level: 1,
    values: [null, null, null, AMOUNT, null, AMOUNT, null, AMOUNT],
  },
  {
    code: "40",
    label: "Fournisseurs",
    level: 2,
    values: [null, null, null, AMOUNT, null, AMOUNT, null, AMOUNT],
  },
  {
    code: "401100",
    label: "Fournisseurs : dettes",
    level: 3,
    values: [null, null, null, AMOUNT, null, AMOUNT, null, AMOUNT],
  },
  {
    code: "6",
    label: "Charges",
    level: 1,
    values: [null, null, AMOUNT, null, AMOUNT, null, AMOUNT, null],
  },
  {
    code: "60",
    label: "Achats",
    level: 2,
    values: [null, null, AMOUNT, null, AMOUNT, null, AMOUNT, null],
  },
  {
    code: "606200",
    label: "Consommables",
    level: 3,
    values: [null, null, AMOUNT, null, AMOUNT, null, AMOUNT, null],
  },
  {
    label: "Total compte de bilan",
    variant: "subtotal",
    values: [null, null, null, AMOUNT, null, AMOUNT, null, AMOUNT],
  },
  {
    label: "Total compte de gestion",
    variant: "subtotal",
    values: [null, null, AMOUNT, null, AMOUNT, null, AMOUNT, null],
  },
  {
    label: "Totaux",
    variant: "total",
    values: [null, null, AMOUNT, AMOUNT, AMOUNT, AMOUNT, AMOUNT, AMOUNT],
  },
  {
    label: "Solde au 31/12/2024",
    variant: "note",
    values: [null, null, null, null, null, null, null, null],
  },
]

export function BalanceGenerale({
  title = "Balance générale au 31/12/2024",
  currency = "MGA",
  footerNote = "Solde au 31/12/2024",
  rows = BALANCE_ROWS,
  className,
}: {
  title?: string
  currency?: string
  footerNote?: string
  rows?: BalanceRow[]
  className?: string
}) {
  return (
    <Card className={cn("gap-0 overflow-hidden p-0", className)}>
      <CardHeader className="flex flex-row items-center gap-3 p-6 pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <Badge variant="secondary" className="font-mono text-xs font-normal">
          {currency}
        </Badge>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-6 font-normal text-muted-foreground">
              Code
            </TableHead>
            <TableHead className="font-normal text-muted-foreground">Libellé</TableHead>
            {COLUMNS.map((c) => (
              <TableHead
                key={c}
                className="text-right font-normal text-muted-foreground last:pr-6"
              >
                {c}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, i) => (
            <BalanceTableRow key={`${row.code ?? row.label}-${i}`} row={row} />
          ))}
        </TableBody>
      </Table>

      <Separator />
      <div className="flex items-center justify-between gap-4 px-6 py-4 text-sm text-muted-foreground">
        <span>Total : {rows.length} éléments</span>
        <span>{footerNote}</span>
      </div>
    </Card>
  )
}

function BalanceTableRow({ row }: { row: BalanceRow }) {
  const isTotal = row.variant === "total"
  const isSubtotal = row.variant === "subtotal"
  const isNote = row.variant === "note"
  const isClass = row.level === 1

  const emphasised = isClass || isTotal

  return (
    <TableRow className={cn(emphasised && "bg-muted/50")}>
      <TableCell
        className={cn(
          "pl-6 font-mono text-xs",
          row.level === 2 && "pl-10",
          row.level === 3 && "pl-14 text-muted-foreground",
          isClass && "font-semibold"
        )}
      >
        {row.code}
      </TableCell>

      <TableCell
        className={cn(
          emphasised && "font-semibold",
          row.level === 2 && "font-medium",
          (isSubtotal || isNote) && "text-muted-foreground",
          isNote && "italic"
        )}
      >
        {row.label}
      </TableCell>

      {row.values.map((value, i) => (
        <TableCell
          key={i}
          className={cn(
            "text-right tabular-nums last:pr-6",
            emphasised && "font-semibold",
            row.level === 2 && "font-medium"
          )}
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  )
}
