# dotnet-bot — toutes les variantes

Collection des représentations du **dotnet-bot**, extraites de [vic-odes/dotnet-video-pr-sentation](https://github.com/vic-odes/dotnet-video-pr-sentation) (`Assets/brand/`).

| Dossier | Contenu |
|---|---|
| [`variants/`](variants/README.md) | 190 variantes générées (SVG + PNG) en 11 catégories : réactions, statuts, dev/tech, équipe, saisons, formats, écosystème .NET… et leurs versions animées (WebP, GIF, WebM alpha, MP4). Catalogue détaillé et planches d'aperçu dans [`variants/README.md`](variants/README.md). |
| `originaux/` | Représentations officielles du dotnet-bot : emoticon, pot, surfing, patch, ASCII, hex, outer space, summer, animation « waving » (GIF + Lottie JSON), modèle 3D riggé (`.fbx`). |
| `spot-illustrations/` | Illustrations du bot du style guide .NET 2024 (tête, jetpack, de face). |
| `wallpapers/` | Fonds d'écran bot-01 et bot-02 (desktop 1080p/4K, mobile, montre). |
| [`mascottes/`](mascottes/README.md) | Mascottes des autres langages et frameworks (Go, Rust, Java, PHP, Kotlin, Dart/Flutter, Perl, Raku, Zig, Gleam, Lisp, Scratch, .NET MAUI, Node.js, Django) : SVG + PNG 2048 px, source et licence de chacune. |
| [`championnat/`](championnat/README.md) | **Championnat des mascottes** : tirage et calendrier (`tirage.mjs`), une vidéo HyperFrames par combat dans `videos/`, scripts audio dans `outils/`. dotnet-bot en sort champion. |
| `charte/` | Charte vidéo .NET (`BRAND-DOTNET.md`) appliquée au ring et à l'habillage du championnat. |

Les images, vidéos et le modèle 3D sont stockés avec **Git LFS** : `git lfs install` avant de cloner.

Le générateur des variantes (`tools/dotnet-bot-variants/`) reste dans le dépôt source, car il dépend des polices, icônes Fluent et logos de `Assets/`.
