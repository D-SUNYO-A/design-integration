# design-integration

Intégration de designs **[Claude Design](https://claude.ai/design)** en composants
natifs : **Next.js 16** (App Router), **shadcn** `base-nova` (sur **Base UI**),
**Tailwind v4**, **lucide**, **zustand**.

## Démarrer

```bash
npm run dev     # http://localhost:3000
npm run build   # compilation / vérification TypeScript
```

## Intégrer un design

Workflow décrit dans le skill **`integrate-claude-design`**
([`.claude/skills/integrate-claude-design/SKILL.md`](.claude/skills/integrate-claude-design/SKILL.md)).

**Voie rapide** : colle les **captures** de chaque section du design dans le chat et
demande l'intégration. C'est la méthode la plus fidèle et la plus économique
([pourquoi](.claude/skills/integrate-claude-design/reference/cost-tradeoffs.md)).

Chaque intégration est tracée dans [`designs/`](designs/README.md).

## Exemple intégré

`/tiers/nouveau` — « Plan de tiers », Variante B (sommaire latéral / tabs verticaux).
Voir [`designs/plan-de-tiers/`](designs/plan-de-tiers/README.md).
