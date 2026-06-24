# Plan de tiers — « Design moderne shadcn fusionné »

- **Source** : https://claude.ai/design/p/29057623-35ce-424e-bb7c-7e1bfd95d095?file=Plan+de+tiers.dc.html&via=share
- **Fichier** : `Plan de tiers.dc.html` (4 pages)
- **Page intégrée** : « Panneau latéral — 3 organisations du formulaire »
- **Date d'intégration** : 2026-06-24

## Contenu de la maquette

Un formulaire **« Ajouter un plan de tiers »** présenté en **3 variantes de layout**
(même contenu, 3 UX) :

| Variante | Organisation |
| -------- | ------------ |
| A | Onglets — navigation horizontale, une catégorie à la fois |
| **B (intégrée)** | **Sommaire latéral — liste des sections à gauche, une section affichée à la fois (tabs verticaux)** |
| C | Accordéon — tout sur un seul défilement, sections repliables |

Sections du formulaire : **Général, Adresse, Coordonnées banc., Correspondant, Taxe,
Pièces jointes**.

## Périmètre intégré

Variante **B** uniquement → [`components/tiers/plan-tiers-form.tsx`](../../components/tiers/plan-tiers-form.tsx),
route [`/tiers/nouveau`](../../app/tiers/nouveau/page.tsx).

**Comportement** : le sommaire latéral agit comme des **tabs verticaux** — cliquer une
section affiche **uniquement** ses champs à droite (pas de défilement global).

## Fidélité

Chaque section a son propre contenu, reproduit d'après les captures de référence :

- **Général** — Saisie (Compte général, Compte auxiliaire, Contact, toggle « Compte
  actif » encadré) + Identification (Nom ou raison sociale, Contact nom).
- **Adresse** — Domiciliation : 2 lignes d'adresse, Ville/Pays, Téléphone/Fax, e-mail.
- **Coordonnées bancaires** ¹ — bouton « Comptes bancaires » ; Nom de la banque,
  Domiciliation (1)/(2), Ville, Pays, Code Banque/Guichet (+ « Vérifier… »),
  N° de compte/Clé, Code SWIFT, IBAN.
- **Correspondant bancaire** — Nom de banque, Domiciliations, Ville/Pays, Code
  banque/guichet (+ « Vérifier »), N° de compte/clé, Code SWIFT/IBAN.
- **Taxe** ¹ — Types de Taxes, Numéro R.C., N.I.F. / N.I.U, N° statistique, N° BAD,
  Mode de paiement.
- **Pièces jointes** — label « Documents » + zone de dépôt (icône, « Glissez vos
  fichiers ici », « PDF, JPG ou PNG · 10 Mo max », bouton « Parcourir… »).
- **Pied de page** — « Les champs marqués * sont requis. » + Annuler / Enregistrer.

> ¹ Champs **réalignés sur l'application cible** (réf. fournies séparément), qui
> diffèrent de la maquette Claude Design d'origine. Le style natif Variante B est conservé.

## Références visuelles

Voir [`reference/`](reference/) — captures de la Variante B fournies (une par section).
