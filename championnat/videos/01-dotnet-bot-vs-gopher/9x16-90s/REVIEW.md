# Revue — combat n°1 : dotnet-bot vs Gopher

## Choix créatifs
- Mise en scène **Arcade** (choisie par l'utilisateur) ; non construites : « Retransmission TV » et « Le ring est un IDE » (STORYLINES.md).
- Pantins redessinés sur un squelette commun (dotnet-bot d'après les variantes vectorielles, Gopher d'après Renée French).
- Violence de dessin animé : bugs Fluent et jetons d'erreur (`null`, `Exception`, `panic:`, `nil`…) à la place du sang.
- Fonctionnalités des dernières versions, vérifiées le 2026-10-26 : Go 1.27 (sorti) contre C# 15 / .NET 11 (RC2, GA en novembre 2026).

## Mesuré / regardé
- `hyperframes check` : 0 erreur.
- Avertissements gardés : `rotation_pivot_drift` (les membres pivotent volontairement autour de leurs articulations, pas de leur centre),
  `composition_file_too_large` (scènes générées, on ne les édite pas à la main), `text_occluded` à 85 s (le décor sous le panneau du classement).
- Regardé : 16 plans du storyboard, planche de revue, raccords des 4 coupes (continus), planche téléphone 360 px (tout se lit),
  décomposition d'un estoc image par image (17,9–18,8 s).
- **Le son a été mesuré, pas écouté** : placement des pics une image après l'action (`hyperframes audio`). Rendu
  `renders/championnat-01-dotnet-bot-vs-gopher-9x16.mp4` : 90 s, 1080×1920, H.264 + AAC, 25,5 Mo ; mixage remonté de −19,9 à
  −14,5 LUFS (loudnorm + limiteur), pic vrai −0,9 dB, aucune saturation. Silences voulus : 72,9–75,3 s (après `break outer;`)
  et 78,3–80,2 s (le Gopher étourdi, avant la victoire). Musique et bruitages générés par code (Openverse injoignable, pas de compte HeyGen dans la session) : à écouter avant publication.

## Plan le plus faible
- Le gag `goroutineleak` (56–62 s) : la chute du Gopher est lisible mais raide ; avec plus de temps, une vraie glissade sur les goroutines.
- L'estoc de dotnet-bot fait passer l'épée devant sa visière pendant l'armé (P2).

## Crédits à mettre dans la description
- Gopher : Renée French, CC BY 4.0. Bruitages Pixabay (licence Pixabay, attribution facultative) : voir assets/sfx/CREDITS.md.
- Publier après la sortie de .NET 11 (novembre 2026), ou préciser « .NET 11 RC ».
