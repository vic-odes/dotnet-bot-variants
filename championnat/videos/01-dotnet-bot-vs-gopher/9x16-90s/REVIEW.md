# Revue — combat n°1 : dotnet-bot vs Gopher

## Choix créatifs
- Révision 6 (retour utilisateur) : chaque touche est une **technique de combat** (« Lame du binaire unique », « Garde LINQ »…)
  dont l'étiquette nomme le terrain de l'avantage : langage, portée du framework, exécution, concurrence, outillage,
  écosystème, déploiement. Rappel « Team dotnet-bot ? LIKE » à 38,4–40,5 s ; carton final LIKE + ABONNE-TOI (icônes Fluent
  pouce et cloche) à 86,7–90 s ; victoire et classement resserrés (80–83 s, 83–86,6 s).
- Révision 5 (retour utilisateur) : mascottes réduites d'environ un quart (dotnet-bot 0,85, Gopher 0,63), écarts et sauts ajustés.
- Révision 4 (retour utilisateur) : combat de rue au lieu du ring (rue de nuit .NET, enseigne néon, réverbère, benne /dev/null
  pour le K.O.) ; décor foncé pour que les combattants ressortent ; décor exclu de l'audit de lisibilité (`data-layout-ignore`).
- Révision 3 (retour utilisateur) : titres réduits d'environ un tiers ; animation plus fluide (articulations décalées avec
  dépassement, foulées au sol, garde irrégulière, un seul tween actif par articulation), rendu à 60 i/s avec flou de mouvement.
- Révision 2 (retour utilisateur) : titre « CODE NINJA », chorégraphie ninja beaucoup plus rapide et acrobatique, intro 4 s,
  bandeaux de ninja. Le storyboard d'origine (boards/) montre la version 1, plus lente.
- Mise en scène **Arcade** (choisie par l'utilisateur) ; non construites : « Retransmission TV » et « Le ring est un IDE » (STORYLINES.md).
- Pantins redessinés sur un squelette commun (dotnet-bot d'après les variantes vectorielles, Gopher d'après Renée French).
- Violence de dessin animé : bugs Fluent et jetons d'erreur (`null`, `Exception`, `panic:`, `nil`…) à la place du sang.
- Avantages vérifiés le 2026-10-26 : Go 1.27 (sorti) contre C# 15 / .NET 11 (RC2, GA en novembre 2026) ; avantages de fond
  (binaire unique, goroutines, Docker/Kubernetes écrits en Go ; portée multi-plateforme, PGO dynamique / Native AOT, LINQ,
  Minimal API, NuGet + Hot Reload, publication de conteneur sans Dockerfile).

## Mesuré / regardé
- `hyperframes check` : 0 erreur.
- Avertissements gardés : `rotation_pivot_drift` (les membres pivotent volontairement autour de leurs articulations, pas de leur centre),
  `composition_file_too_large` (scènes générées, on ne les édite pas à la main), `text_occluded` à 85 s (le décor sous le panneau du classement).
- Regardé : 16 plans du storyboard, planche de revue, raccords des 4 coupes (continus), planche téléphone 360 px (tout se lit),
  décomposition d'un estoc image par image (17,9–18,8 s).
- **Le son a été mesuré, pas écouté** : placement des pics une image après l'action (`hyperframes audio`). Rendu
  `renders/championnat-01-dotnet-bot-vs-gopher-9x16.mp4` : 90 s, 1080×1920, 60 i/s, H.264 + AAC ; mixage normalisé à −14,3 LUFS (loudnorm + limiteur),
  pic vrai −2,0 dB, aucune saturation. Silences voulus : 72,8–75,7 s (après `break outer;`) et 78,7–80,2 s (avant la victoire). Musique et bruitages générés par code (Openverse injoignable, pas de compte HeyGen dans la session) : à écouter avant publication.

## Plan le plus faible
- Le gag `goroutineleak` (56–62 s) : la chute du Gopher est lisible mais raide ; avec plus de temps, une vraie glissade sur les goroutines.
- L'estoc de dotnet-bot fait passer l'épée devant sa visière pendant l'armé (P2).

## Crédits à mettre dans la description
- Gopher : Renée French, CC BY 4.0. Bruitages Pixabay (licence Pixabay, attribution facultative) : voir assets/sfx/CREDITS.md.
- Publier après la sortie de .NET 11 (novembre 2026), ou préciser « .NET 11 RC ».
