# Balance générale

- **Source** : capture de l'**application cible** (pas Claude Design).
- **Page intégrée** : [`/comptabilite/balance`](../../app/comptabilite/balance/page.tsx)
- **Composant** : [`components/comptabilite/balance-generale.tsx`](../../components/comptabilite/balance-generale.tsx)
- **Date d'intégration** : 2026-06-24

## Contenu

Carte avec titre « Balance générale au 31/12/2024 » + badge devise **MGA**, puis un
tableau à 10 colonnes :

`Code · Libellé · A Nouveau D/C · Mouvements D/C · Total D/C · Solde D/C`

**Hiérarchie des comptes** (indentation + graisse du code, en `font-mono`) :

| Niveau | Exemple | Rendu |
| ------ | ------- | ----- |
| 1 — classe | `4` Tiers, `6` Charges | fond `bg-muted/50`, gras |
| 2 — compte | `40` Fournisseurs, `60` Achats | indenté, semi-gras |
| 3 — sous-compte | `401100`, `606200` | plus indenté, code en `text-muted-foreground` |

**Lignes de synthèse** : *Total compte de bilan*, *Total compte de gestion* (libellé
muted), *Totaux* (fond + gras), *Solde au 31/12/2024* (italique muted).

**Pied** : « Total : N éléments » (gauche) / note de solde (droite).

Montants alignés à droite en `tabular-nums`. Le tableau défile horizontalement sur
petit écran. Server Component, entièrement **data-driven** (`BalanceRow[]`).

## Écarts assumés

- **Couleur** : dans la capture, les codes de sous-comptes (`401100`, `606200`) et les
  libellés de sous-totaux apparaissent en **ambre/brun**. Thème neutre du projet →
  rendus en `text-muted-foreground`. La hiérarchie reste lisible (indentation +
  graisse). Voir la décision d'accent en attente.
