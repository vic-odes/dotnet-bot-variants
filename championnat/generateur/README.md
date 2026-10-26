# Générateur des combats

```bash
node championnat/generateur/match.mjs championnat/matchs/<combat>.mjs championnat/videos/<combat>/9x16-90s
```

- `rigs.mjs` : les pantins articulés (squelette commun : jambes, bassin, tête, bras à deux segments, épée, états des yeux).
  Un nouveau combattant = une fonction de dessin + ses articulations, sur le même squelette.
- `match.mjs` : la chorégraphie. À partir des données du combat (`championnat/matchs/*.mjs` : échanges, gestes, cartes,
  dégâts), il écrit `index.html` et les 5 scènes HyperFrames (intro, fighta, fightb, finish, outro).
  Les fichiers générés ne se modifient pas à la main : on change les données ou le générateur, puis on relance.
- Gestes disponibles : `taille`, `estoc`, `revers`, `moulinet`, `saut` ; cas spéciaux : `parade`, `chute` (gag), `combo`, `final`.
