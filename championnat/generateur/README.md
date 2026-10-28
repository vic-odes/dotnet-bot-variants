# Générateur des combats

```bash
node championnat/generateur/match.mjs championnat/matchs/<combat>.mjs championnat/videos/<combat>/9x16-90s
```

- `rigs.mjs` : les pantins articulés (squelette commun : jambes, bassin, tête, bras à deux segments, épée, états des yeux).
  Un nouveau combattant = une fonction de dessin + ses articulations, sur le même squelette.
- `match.mjs` : la chorégraphie. À partir des données du combat (`championnat/matchs/*.mjs` : échanges, gestes, cartes,
  dégâts), il écrit `index.html` et les 5 scènes HyperFrames (intro, fighta, fightb, finish, outro).
  Les fichiers générés ne se modifient pas à la main : on change les données ou le générateur, puis on relance.
- Approches : `choc`, `saut`, `corde`, `fumee`. Gestes de touche : `taille`, `estoc`, `revers`, `toupie`, `shuriken` ;
  cas spéciaux : `parade` (avec `riposte`), `chute` (gag, `mini` = nombre de mini-combattants), `combo` (2 cartes), `final`.
- Un combattant = une entrée de `RIGS` dans `match.mjs` : pantin, échelle `S`, centre de rotation `cy`, couleur d'accent,
  pivot des pans du bandeau (`tails`), échelle des mini-combattants du gag `chute` (`mini`), couleurs d'équipe (`team`),
  jetons d'erreur (`hitTokens`). Pantins disponibles : dotnet-bot, Gopher, Alien (Lisp), Ziggy (Zig).
- Champs facultatifs d'un combat : `gag` (étiquette, couleur de la benne du K.O. et légende ; par défaut « /dev/null »),
  `favori` (nom affiché dans « Team … ? LIKE » ; par défaut le combattant de gauche).
- Vainqueur d'un combat sans dotnet-bot : `node championnat/vainqueur.mjs <N> <gauche> <droite>`.
- Pour produire un nouveau combat : `championnat/PROMPT.md`.
