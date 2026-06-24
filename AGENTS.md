<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Objet du projet

Ce projet **intègre des designs Claude Design** (`claude.ai/design`) sous forme de
composants natifs. Quand on te donne un lien Claude Design ou un `.dc.html` à intégrer,
**utilise le skill `integrate-claude-design`** — il décrit le pipeline complet
(acquisition par capture authentifiée → reconstruction shadcn native → vérification).

## Stack

- **Next.js 16** App Router — RSC par défaut, `'use client'` seulement si interactif.
  (Cette version diffère de tes connaissances : lis `node_modules/next/dist/docs/`.)
- **shadcn** style `base-nova`, basé sur **Base UI** (`@base-ui/react`) — **pas Radix**.
  L'API diffère (ex. placeholder de `Select` via `<SelectValue placeholder>`, états en
  `data-checked`). Calque les nouveaux composants sur l'existant (`components/ui/button.tsx`).
- **Tailwind v4** (config CSS-first dans `app/globals.css`), thème neutre, **tokens
  sémantiques uniquement** (`bg-muted`, `text-muted-foreground`, …) — jamais de hex.
- **lucide-react** (icônes), **zustand** (état client si besoin).
- Alias `@/*` ; util `cn` (`lib/utils.ts`) ; ajout de composants via `npx shadcn@latest add <nom>`.

## Conventions

- Composants UI génériques : `components/ui/`. Composants métier : `components/<domaine>/`.
- Routes : `app/<segment>/page.tsx`.
- Toute intégration de design est **tracée** dans `designs/<nom>/` (lien source,
  périmètre, écarts assumés, captures de référence). Voir `designs/README.md`.

## Vérification

Avant d'annoncer un travail terminé : `npm run build` (ou skill `build`) sans erreur,
**et** comparaison visuelle du rendu à la capture de référence.
