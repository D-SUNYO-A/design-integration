# Carte contact

- **Source** : capture de l'**application cible** (pas Claude Design).
- **Page intégrée** : [`/contacts/repertoire`](../../app/contacts/repertoire/page.tsx)
- **Composant** : [`components/contacts/contact-card.tsx`](../../components/contacts/contact-card.tsx)
- **Date d'intégration** : 2026-06-24

## Contenu

Carte data-driven (`ContactCardData`) :

- En-tête : cercle de sélection (gauche) + menu « … » (droite).
- Avatar à initiales, nom (**Atlas Ingénierie**), rôle (**Bureau d'études**), badge de
  statut (**Fournisseur**).
- Détails : Adresse, Pays, NIF, Compte (label muted / valeur en gras).
- Tags : **BTP**, **Études**.

Le composant est **réutilisable** : la page passe un tableau de contacts et les rend
dans une grille responsive (Server Component, sans JS client).

## Écarts assumés

- **Couleurs** : la capture utilise un badge **vert** « Fournisseur » et un avatar au
  fond **vert clair**. Thème neutre du projet (tokens sémantiques, pas de hex) → badge
  `secondary` et avatar `bg-muted`. Pour la couleur, introduire un token `success`
  dans `app/globals.css`. Voir la décision d'accent en attente (bleu/vert).
- Tags rendus en badge `outline` pour les distinguer du badge de statut (`secondary`).
