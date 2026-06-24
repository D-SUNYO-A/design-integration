# Mapping design → projet

Référence pour traduire une maquette Claude Design vers le design system du projet.
Tokens définis dans [`app/globals.css`](../../../../app/globals.css) ; composants dans
`components/ui/` (shadcn `base-nova`, sur **Base UI**).

## Composants

| Élément maquette | Composant | Notes d'API (Base UI ≠ Radix) |
| ---------------- | --------- | ----------------------------- |
| Carte / panneau / dialog | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | — |
| Champ texte | `Input` + `Label` (`htmlFor`/`id`) | `Input` = `@base-ui/react/input` |
| Zone de texte | `Textarea` (`add` si absent) | — |
| Liste déroulante | `Select` + `SelectTrigger` + `SelectValue` + `SelectContent` + `SelectItem` | placeholder via **`<SelectValue placeholder="…" />`** ; valeur via `defaultValue`/`value` sur `Select` |
| Interrupteur | `Switch` | `defaultChecked` / `checked` ; état stylé via `data-checked` / `data-unchecked` |
| Case à cocher | `Checkbox` (`add` si absent) | — |
| Bouton | `Button` | variants `default \| outline \| ghost \| secondary \| destructive \| link` ; tailles `default \| xs \| sm \| lg \| icon*` |
| Séparateur | `Separator` | — |
| Icônes | `lucide-react` | `iconLibrary: lucide` (`components.json`) |
| Onglets | `Tabs` (`add` si absent) | pour la Variante A |
| Accordéon | `Accordion` (`add` si absent) | pour la Variante C |

> Ajouter un composant : `npx shadcn@latest add <nom> --yes`.

## Couleurs — toujours les tokens sémantiques

N'écris **jamais** de hex/oklch en dur. Le thème est neutre (`baseColor: neutral`).

| Intention | Classe |
| --------- | ------ |
| Fond de page | `bg-background` / `bg-muted/40` |
| Texte principal | `text-foreground` |
| Texte secondaire / hint | `text-muted-foreground` |
| Surface élevée (carte) | `bg-card` |
| Bordure / champ | `border` / `border-input` |
| Accent / actif (pill) | `bg-muted` |
| Action primaire | `bg-primary text-primary-foreground` |
| Erreur / requis fort | `text-destructive` |
| Anneau focus | `ring-ring` (déjà géré par les composants) |

## Espacements & rayons

- Rayon : `--radius: 0.625rem` → `rounded-lg` (champs, cartes), `rounded-md` (items).
- Rythme vertical d'un formulaire : `space-y-2` (label→champ), `space-y-4` (champ→champ),
  `space-y-10` (section→section).
- Lignes multi-colonnes : `grid grid-cols-1 sm:grid-cols-2 gap-4`.

## Conventions de code

- Alias : `@/components`, `@/lib/utils` (`cn`), `@/components/ui`.
- Fusion de classes : `cn(...)` (clsx + tailwind-merge).
- `data-slot` sur les primitives, variants via `class-variance-authority` (cf.
  [`button.tsx`](../../../../components/ui/button.tsx)).
- RSC par défaut ; `'use client'` uniquement si état/événements/hooks.
