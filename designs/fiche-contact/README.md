# Fiche contact

- **Source** : capture de l'**application cible** (pas Claude Design).
- **Page intégrée** : [`/contacts/nouveau`](../../app/contacts/nouveau/page.tsx)
- **Composant** : [`components/contacts/fiche-contact-form.tsx`](../../components/contacts/fiche-contact-form.tsx)
- **Date d'intégration** : 2026-06-24

## Contenu

Formulaire en **défilement unique** (pas d'onglets), en-tête avec actions
(Retour / Enregistrer / **Enregistrer et Ajouter**) puis 4 sections :

- **Identification** — Type en **radio-cards** (Particulier/Association/Société/
  Institution : label + sublabel + description + radio en haut à droite),
  Civilité, CIN (+ aide), Nom, Prénom, Date de naissance, Délivré le, Photo (dépôt).
- **Rôles** — chips multi-sélection (19 rôles, coche sur les actifs), Autres, Fonction,
  NIF, NIU, Numéro RC, Numéro STAT.
- **Domiciliation** — 2 lignes d'adresse, Code postal, Ville, Pays, Téléphone, Fax,
  e-mail, Site web.
- **Compléments** — Nom du Compte (Webportail) + aide, « Compte Tomself actif »
  (interrupteur), Email Tomself + « Réinitialiser mot de passe » (activés selon
  l'interrupteur), Commentaire (zone de texte), Pièces Jointes (Parcourir).

## Écarts assumés

- **Couleur d'accent** : la capture utilise un **bleu** primaire (bouton principal,
  radio/chips sélectionnés). Le projet étant en thème **neutre** (tokens sémantiques,
  pas de hex — cf. `AGENTS.md`), l'accent est mappé sur le token `primary` neutre.
  Pour retrouver le bleu, introduire un token d'accent bleu dans `app/globals.css`.
- **Champs de saisie sélectionnés/cochés** : rendus avec `bg-muted` + icône ✓ (état
  natif shadcn), au lieu du surlignage bleu de la capture.
- **Type (radio-cards)** : les **sublabels et descriptions** ne figuraient pas dans le
  modèle fourni (générique « Label (Sublabel) + description ») — remplis avec un
  contenu FR plausible **à ajuster** (`TYPES` dans le composant).
