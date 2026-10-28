---
workflow: hyperframes
flow: automation
storyboard: no
message: "Les macros et le REPL de Lisp frappent juste, mais comptime, la cross-compilation et l'allocateur sûr de Zig l'emportent"
destination: youtube-shorts
aspect: 1080x1920
language: fr
length: 90s
angle: character
---

## Intent

Championnat **CODE NINJA**, combat n°2 (Poule A, journée 1) : l'Alien (Lisp) contre Ziggy (Zig), combat de rue de nuit
à l'épée, chorégraphie de ninjas. Concept, décor, interface, cartes et audio repris tels quels du combat n°1
(référence validée : `championnat/videos/01-dotnet-bot-vs-gopher/9x16-90s/`), produits par `championnat/PROMPT.md`.

Combat sans dotnet-bot : vainqueur tiré au sort, `node championnat/vainqueur.mjs 2 Alien Ziggy`
(graine `championnat-dotnet-bot-2026-2`, valeur 0,601252 → **Ziggy**). L'Alien montre quand même ses vrais points forts :
combat équilibré, pas une moquerie.

Violence de dessin animé : bugs Fluent et jetons d'erreur (`NIL`, `(error)`, `UNBOUND`, `error.OOM`, `unreachable`…), pas de sang.
Audio : synthwave 150 BPM en fa mineur (grille andalouse i-VII-VI-V, propre à ce combat), bruitages, aucun commentateur.

## Échanges (faits vérifiés le 2026-10-28)

Zig 0.17.0 (sorti le 1er octobre 2026, ziglang.org/download) contre Common Lisp, implémentation SBCL 2.6.9
(sortie le 26 septembre 2026, sbcl.org/news.html). Échanges, gestes et horaires : `championnat/matchs/02-alien-vs-ziggy.mjs`.

Bilan : Ziggy 65 PV restants, Alien 0.

## Assets

- mascottes/lisp/ — l'alien Lisp de Conrad Barski (lisperati.com, domaine public) : référence du pantin redessiné.
- mascottes/zig/ziggy.svg — Ziggy (ziglang/logo, CC BY 4.0) : référence du pantin redessiné.
- championnat/outils/synth_synthwave.py `--bpm 150 --key fm --grille i-VII-VI-V` — musique générée.
- assets/sfx — bruitages du combat n°1 (voir assets/sfx/CREDITS.md).

## Notes

- Charte .NET pour la rue, l'interface et les cartes (charte/BRAND-DOTNET.md) ; cartes Alien violettes, cartes Ziggy jaunes.
- Gag du K.O. : Lisp a inventé le ramasse-miettes (McCarthy, vers 1959), l'Alien finit dans la benne « (gc) ».
- Description YouTube : « Ziggy : ziglang/logo, CC BY 4.0 ; alien Lisp : Conrad Barski, domaine public ».
