---
name: integrate-claude-design
description: Use when integrating a Claude Design (claude.ai/design) share link or .dc.html mockup into this Next.js + shadcn project — turns a design link into native, faithful shadcn/Base UI components. Triggers on "intègre ce design", "claude.ai/design", ".dc.html", "Plan de tiers", or any Claude Design URL.
---

# Intégrer un design Claude Design

Transforme un **lien de partage Claude Design** (ou un fichier `.dc.html`) en
composants **natifs** du design system de ce projet : Next.js 16 (App Router),
shadcn style `base-nova` (**Base UI**, pas Radix), Tailwind v4, lucide, zustand.

> **Principe directeur** : on ne « porte » pas le HTML du design. On l'utilise comme
> **référence visuelle de vérité** et on **reconstruit** avec les composants
> `components/ui/*` existants. C'est ce que Claude Design recommande lui-même, et la
> seule voie fiable (la source `.dc.html` n'est pas extractible en headless).

## Vue d'ensemble du pipeline

```
1. ACQUÉRIR   lien → rendu authentifié → captures de référence
2. ANALYSER   sections, champs, tokens, structure, textes
3. MAPPER     primitives du design → composants shadcn/Base UI + tokens Tailwind
4. IMPLÉMENTER  reconstruction native (RSC + 'use client' si interactif)
5. VÉRIFIER   build + comparaison visuelle à la capture
6. TRACER     designs/<nom>/ (lien, périmètre, écarts, captures)
```

Crée une todo (TodoWrite) par étape et suis-les dans l'ordre.

---

## 1. Acquérir

Un lien `claude.ai/design/...` **n'est pas récupérable** avec `curl`/WebFetch
(403 Cloudflare ; avec UA navigateur → 302 vers `/login`) ni en lisant le DOM
(iframe de rendu **cross-origin**). La seule source exploitable est l'**image**.

→ Détails et contraintes : [`reference/extraction.md`](reference/extraction.md).

### Méthode primaire — captures fournies par l'utilisateur (recommandée)

**Demande à l'utilisateur de coller les captures** de chaque section/état dans le chat
(bouton de capture de Claude Code). C'est **la voie la plus économique en tokens et la
plus fidèle** : pas d'aller-retours de navigation, et l'utilisateur capture exactement
les états voulus (un design tabbé n'expose pas tous ses états en une vue). Voir
[`reference/cost-tradeoffs.md`](reference/cost-tradeoffs.md).

### Fallback — extension Claude-in-Chrome (si l'utilisateur ne peut pas capturer)

1. `list_connected_browsers` → `select_browser`.
2. `tabs_create_mcp`, puis `navigate` vers le lien **avec `&present=1`** (plein écran).
3. `computer screenshot` de chaque état ; **clique** chaque entrée du sommaire / onglet /
   accordéon pour révéler son contenu, puis recapture. Sauvegarde dans
   `designs/<nom>/reference/`.

> Coûteux : chaque écran = un round-trip + une image. À réserver aux cas sans capture
> manuelle possible, ou quand il faut explorer interactivement des états cachés.

## 2. Analyser

Pour chaque écran, relève : **sections** et leur hiérarchie, **champs** (label, type,
required, placeholder, valeur d'exemple), **layout** (colonnes, navigation), **états**
(actif/inactif, toggles), **textes** exacts.

> ⚠️ **Ne présume jamais qu'une maquette est statique.** Un sommaire / des onglets
> changent souvent le contenu affiché (pattern « tabs »). Si tu ne vois pas le contenu
> d'une section, **demande la capture correspondante** plutôt que d'extrapoler.
> N'invente un champ qu'en dernier recours, et **marque-le** comme extrapolation.

## 3. Mapper

→ Table complète : [`reference/token-mapping.md`](reference/token-mapping.md).

| Élément design | Composant projet |
| -------------- | ---------------- |
| Carte / dialog | `Card` (`components/ui/card`) |
| Champ texte | `Input` + `Label` |
| Liste déroulante | `Select` (`SelectTrigger`/`SelectValue placeholder`/`SelectItem`) |
| Interrupteur | `Switch` (`defaultChecked`, état `data-checked`) |
| Bouton | `Button` (variants : default/outline/ghost/secondary/destructive/link) |
| Séparateur | `Separator` |
| Icône | `lucide-react` |
| Couleurs | tokens sémantiques (`bg-muted`, `text-muted-foreground`, `border`, …) — **jamais** de hex |

Composant manquant → `npx shadcn@latest add <nom> --yes` (respecte `base-nova`).

## 4. Implémenter

- **AVANT d'écrire**, lis le guide pertinent dans `node_modules/next/dist/docs/`
  (cette version de Next a des breaking changes — règle de `AGENTS.md`).
- Pages/layouts = **Server Components** par défaut ; ajoute `'use client'` seulement aux
  composants avec état/événements/hooks.
- Respecte les conventions : alias `@/`, util `cn`, `data-slot`, CVA (cf. `button.tsx`).
- Reconstruis avec les tokens et composants — pas de styles inline ni de couleurs en dur.
- Place les composants métier sous `components/<domaine>/`, la route sous `app/`.

## 5. Vérifier (obligatoire avant de conclure)

- `npm run build` (ou skill `build`) doit passer — **zéro** erreur TypeScript.
- Lance l'app et **compare le rendu à la capture** de référence (skill `run` /
  Claude Preview / extension). Corrige les écarts.
- N'annonce « intégré » qu'après ces preuves. (cf. `verification-before-completion`)

## 6. Tracer

Crée/maj `designs/<nom>/README.md` : lien source, page intégrée, périmètre, **écarts
assumés** (extrapolations), pointeur vers les composants + la route. Ajoute la ligne au
tableau de `designs/README.md`.

---

## Anti-patterns

- ❌ Copier le HTML/CSS du `.dc.html` tel quel → ✅ reconstruire en `components/ui/*`.
- ❌ Couleurs/espacements en dur → ✅ tokens sémantiques Tailwind du thème.
- ❌ Inventer des champs non designés sans le dire → ✅ extrapoler **et** documenter.
- ❌ Tout en `'use client'` → ✅ client minimal, RSC par défaut.
- ❌ Conclure sans build + comparaison visuelle.
