# `designs/` — sources Claude Design

Ce dossier conserve la **trace de chaque design intégré** depuis [Claude Design](https://claude.ai/design) : le lien de partage, les captures de référence et les notes d'extraction. Il rend l'intégration **traçable et reproductible** (et versionnée dans git).

Le workflow d'intégration lui-même est décrit dans le skill
[`integrate-claude-design`](../.claude/skills/integrate-claude-design/SKILL.md).

## Convention

Un dossier par design, en `kebab-case` :

```
designs/
  <nom-du-design>/
    README.md        # lien source, périmètre intégré, écarts assumés
    reference/       # captures haute-résolution (mode présentation)
```

## Pourquoi des captures et pas le `.dc.html` ?

Le `.dc.html` d'un design Claude n'est **pas téléchargeable en headless** : le lien
de partage exige une session authentifiée (redirige vers `/login`) et le fichier
est servi via un runtime sandbox (`*.claudeusercontent.com/_bootstrap`) qui rend
le contenu côté client. L'extraction fiable se fait donc par **rendu + captures**
dans une session navigateur authentifiée (extension Claude-in-Chrome), puis
**reconstruction native** dans le design system du projet. Voir
[`reference/extraction.md`](../.claude/skills/integrate-claude-design/reference/extraction.md).

## Designs intégrés

| Design | Source | Périmètre | Statut |
| ------ | ------ | --------- | ------ |
| [plan-de-tiers](plan-de-tiers/README.md) | Claude Design | Variante B (sommaire latéral) | ✅ Intégré → `/tiers/nouveau` |
| [fiche-contact](fiche-contact/README.md) | App cible (capture) | Formulaire complet (4 sections) | ✅ Intégré → `/contacts/nouveau` |
| [contact-card](contact-card/README.md) | App cible (capture) | Carte contact / tiers | ✅ Intégré → `/contacts/repertoire` |
| [entite](entite/README.md) | App cible (capture) | Page Entité, 3 onglets | ✅ Intégré → `/parametres/entite` |
