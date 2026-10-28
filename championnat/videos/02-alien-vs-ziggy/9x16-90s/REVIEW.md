# Revue — combat n°2 : Alien (Lisp) vs Ziggy (Zig)

## Choix créatifs
- Produit avec `championnat/PROMPT.md` : concept, rue de nuit, interface, cartes, rappels LIKE / ABONNE-TOI et audio du combat n°1.
- Vainqueur tiré au sort (combat sans dotnet-bot) : `node championnat/vainqueur.mjs 2 Alien Ziggy`, graine
  `championnat-dotnet-bot-2026-2` → 0,601252 → Ziggy. Bilan : Ziggy 65 PV, Alien 0.
- Rôles inversés par rapport au combat n°1 : le perdant (Alien, à gauche) fait la parade et le gag `chute` ; le vainqueur
  (Ziggy, à droite) fait le combo et le coup final `return error.KO;`.
- Gag `chute` : l'Alien atterrit sur 6 mini-Aliens (ses appels récursifs) ; la carte montre un vrai atout de Lisp
  (le débogueur propose des restarts sans dérouler la pile).
- Gag du K.O. : Lisp a inventé le ramasse-miettes, l'Alien finit dans la benne « (gc) ».
- Pantins nouveaux sur le squelette commun : Alien (quatre pattes fines, trois yeux, long bras qui tient l'épée à la place
  du drapeau LISP) et Ziggy (iguane redressé, crête, queue). Cartes Alien violettes, cartes Ziggy jaunes (charte .NET).
- Musique propre au combat : `synth_synthwave.py --bpm 150 --key fm --grille i-VII-VI-V` (fa mineur, Fm-Eb-Db-C).
- Générateur généralisé (pivot des pans du bandeau, mini-combattants, couleurs d'équipe, benne et légende du K.O.) :
  le combat n°1 se régénère à l'identique (diff vide sur index.html et les 5 scènes) et sa musique aussi (MD5 identiques).

## Faits vérifiés (2026-10-28)
- Zig 0.17.0, sorti le 1er octobre 2026 : ziglang.org/download. Notes de version 0.17.0 : `SafeAllocator` (fuites signalées
  au deinit, panique sur double free), compilation incrémentale `zig build -fincremental --watch` (x86_64-linux).
- ziglang.org : comptime (« Call any function at compile-time »), compilateur C/C++ prêt à l'emploi avec cross-compilation.
  `@cImport` / `@cInclude` et `zig cc -target` : référence du langage et usage documenté de `zig cc`.
- Ghostty : « a large, shared core written in Zig » (README de github.com/ghostty-org/ghostty).
- Écarté : Bun, désormais présenté comme écrit en Rust dans son README ; TigerBeetle (pas d'affirmation officielle trouvée).
- SBCL 2.6.9, sorti le 26 septembre 2026 (sbcl.org/news.html) : support AVX512 dans SB-SIMD ; sbcl.org : « a high performance
  Common Lisp compiler » avec environnement interactif et débogueur.
- Common Lisp HyperSpec : `defmacro`, `defmethod` (CLOS, multiméthodes), conditions et restarts.
- Ramasse-miettes inventé par John McCarthy pour Lisp vers 1959 (Wikipédia, Garbage collection).
- Écarté : l'absence d'optimisation des appels terminaux garantie par la norme (sources seulement informelles).

## Mesuré / regardé
- `hyperframes check` : 0 erreur ; 6 avertissements `rotation_pivot_drift` gardés (les membres pivotent autour de leurs articulations).
- Contraste : 45/45 textes conformes WCAG AA.
- Regardé : 21 snapshots (intro, présentations, les 12 cartes, rappel LIKE, K.O., benne (gc), victoire, classement, carton final)
  et une image du rendu à 69,9 s. Texte lisible, rien sous y = 1330, pas de chevauchement carte / interface.
- Rendu `renders/championnat-02-alien-vs-ziggy-9x16.mp4` : 90 s, 1080×1920, 60 i/s, H.264 + AAC ; son normalisé à −14,9 LUFS,
  pic vrai −2,4 dB (loudnorm + limiteur, mesuré avec ebur128).
- **Le son a été mesuré, pas écouté** : musique et bruitages générés par code, à écouter avant publication.

## Plan le plus faible
- Quand Ziggy est collé au bord gauche (14,8 s, 63 s), le bout de sa queue sort du cadre : la borne des combattants ne
  tient pas compte de sa queue.
- Pendant le coup final, l'Alien éjecté passe un instant derrière la carte et la barre de vie de Ziggy (69,9 s).
- Le bandeau de l'Alien, posé sous ses yeux, se lit plutôt comme des lunettes.

## Crédits à mettre dans la description
- Ziggy : ziglang/logo, CC BY 4.0. Alien Lisp : Conrad Barski (lisperati.com), domaine public.
- Bruitages Pixabay (licence Pixabay, attribution facultative) : voir assets/sfx/CREDITS.md.
