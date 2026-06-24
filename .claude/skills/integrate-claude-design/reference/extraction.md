# Extraction d'un design Claude Design — procédure & contraintes

Notes établies empiriquement sur un lien réel
(`claude.ai/design/p/29057623-...?file=Plan+de+tiers.dc.html&via=share`).

## Ce qui NE marche PAS (et pourquoi)

| Tentative | Résultat |
| --------- | -------- |
| `curl` / `WebFetch` direct | `403` (challenge Cloudflare `cf-mitigated: challenge`) |
| `curl` avec User-Agent navigateur | `302` → `/login?returnTo=...` (auth requise) |
| Endpoint `/published/<id>` | `200` mais = coquille SPA (~10 Ko, `react-fallback`), pas le design |
| `GET` sur `/v1/design/projects/<id>/serve/<fichier>.dc.html?t=<token>` | redirige vers le mode présentation (source gatée) |
| `fetch()` depuis l'iframe `_bootstrap` | `Failed to fetch` (CSP `connect-src`) |
| `read_page` / `get_page_text` sur l'onglet | ne voit que la coquille claude.ai — l'iframe de rendu est **cross-origin** |

**Conclusion** : la source `.dc.html` n'est pas extractible en headless. Le design est
rendu par un runtime sandbox (`https://<id>.claudeusercontent.com/_bootstrap`) qui
reçoit le fichier du parent et le rend côté client. → **rendu authentifié + captures**.

## Méthode fiable — extension Claude-in-Chrome

L'utilisateur doit avoir l'**extension connectée** et être **connecté à claude.ai**.

```
1. list_connected_browsers            # vérifier qu'un navigateur est dispo
2. select_browser <deviceId>
3. tabs_create_mcp                     # onglet dédié à la session
4. navigate "<lien>&present=1"         # mode présentation plein écran
5. computer screenshot                 # capture de l'écran rendu
   # pour révéler d'autres états : computer left_click sur onglets / sommaire,
   # puis screenshot. (Beaucoup de maquettes sont statiques : un seul état designé.)
6. computer screenshot save_to_disk:true   # garder les références
```

### Pièges observés

- **Mode présentation `present=1`** : affiche le design plein écran, sans le chrome de
  l'éditeur — idéal pour capturer. Sinon l'éditeur montre le canvas avec barre d'outils.
- **`zoom`** peut renvoyer « Region exceeds viewport » : se rabattre sur `screenshot`
  pleine page + recadrage mental, ou `computer scroll` puis `screenshot`.
- **Coordonnées** : le screenshot renvoyé et le viewport peuvent différer en taille ;
  les clics utilisent les coordonnées **viewport**.
- **Sortie bloquée `[BLOCKED: Cookie/query string data]`** : ne renvoie jamais d'URL
  contenant le token signé (`?t=...`) depuis `javascript_tool` ; strip la query.
- **Iframe cross-origin** : impossible de lire le DOM du design ; ne compte que sur les
  captures.

## Fallback — fichier `.dc.html` déposé

Si pas d'extension : l'utilisateur télécharge le `.dc.html` via *Share* dans Claude
Design et le dépose dans `designs/<nom>/`. On le lit avec `Read` — utile comme
référence de structure/textes, mais le **rendu visuel** reste la capture qui fait foi.
