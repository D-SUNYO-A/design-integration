# Entité — Paramètres généraux › Entête

- **Source** : capture de l'**application cible** (pas Claude Design).
- **Page intégrée** : [`/parametres/entite`](../../app/parametres/entite/page.tsx)
- **Composant** : [`components/parametres/entite-settings.tsx`](../../components/parametres/entite-settings.tsx)
- **Date d'intégration** : 2026-06-24

## Contenu

En-tête (fil d'Ariane « Paramètres généraux / Entête », titre « Entité »,
boutons Imprimer / Enregistrer) puis **une seule page à 3 onglets** :

- **Coordonnées** — panneaux *Identification* (libellés, sigle, numéro, contact,
  domaine), *Domiciliation* (adresse 2 lignes, ville/CP/BP, pays/lat/long,
  tél/fax/email), *Fiscalité* (N.I.F.).
- **Suivi** — *Plans de suivi* : grille de cases à cocher, les plans **verrouillés**
  (Poste, Actif, Géo, 6e plan) cochés + désactivés + badge « Verrouillé » ; *Axe de
  liaison* (select).
- **Personnalisation** — *Monnaies* (Comptabilisation verrouillée + Rapport),
  *Gestion électronique de document* (Type), *Options* (2 cases), *Campagne*
  (activation + libellé), *Logo* (zone de dépôt).

Composant client (onglets) ; valeurs pré-remplies d'après la capture.

## Notes

- Ce design est **neutre** (pas de couleur d'accent) — rendu fidèle sans écart de
  couleur, contrairement aux designs bleus/verts précédents.
- Les cases « verrouillées » sont `disabled` + cochées, avec un badge `secondary`.
