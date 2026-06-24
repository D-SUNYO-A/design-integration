# Coût en tokens — captures manuelles vs extension navigateur

## TL;DR

**Les captures manuelles fournies par l'utilisateur sont nettement plus économiques
ET plus fidèles.** Réserver l'extension Claude-in-Chrome aux cas où l'utilisateur ne
peut pas capturer, ou quand il faut explorer des états cachés de façon interactive.

## Pourquoi

Dans les deux cas, **la source d'extraction est l'image** (l'iframe de rendu est
cross-origin, impossible de lire le DOM/texte). La différence est tout ce qu'il y a
**autour** des images.

| Poste de coût | Captures manuelles | Extension navigateur |
| ------------- | ------------------ | -------------------- |
| Images des sections | 1 fois, exactement les bonnes | idem, mais souvent recapturées |
| Découverte d'accès (Cloudflare, endpoints, réseau) | aucune | coûteuse (one-shot) |
| Round-trips navigate / wait / screenshot / clic | aucun | 1 par état + tâtonnements |
| Lecture réseau / `javascript_tool` / debug | aucun | fréquents |
| Risque d'erreur de lecture | faible (états choisis par l'humain) | élevé (états cachés ratés) |

L'humain sait quels états capturer (un design **tabbé** n'expose pas tout en une vue) ;
l'agent doit les deviner et cliquer à l'aveugle, ce qui multiplie les images et peut
quand même rater du contenu.

## Quand l'extension reste justifiée

- L'utilisateur ne peut pas / ne veut pas capturer manuellement.
- Il faut **explorer** un design dont on ignore les états (découverte).
- Vérification visuelle automatisée du rendu intégré (comparer app ↔ maquette).

## Recommandation de workflow

1. **Par défaut** : demander les captures dans le chat → intégrer.
2. **Sinon** : extension en mode présentation (`&present=1`), un clic + une capture par état.
3. Toujours : déposer les captures retenues dans `designs/<nom>/reference/` pour la traçabilité.
