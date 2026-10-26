# Charte vidéo — .NET

**Règle du dépôt : toute nouvelle vidéo respecte la marque .NET**, telle que définie par le
[.NET Style Guide (nov. 2024)](brand/dotnet/guidelines/dotnet-styleGuide-2024.pdf) du dépôt
[dotnet/brand](https://github.com/dotnet/brand). Les logos de produits (.NET MAUI, .NET Foundation…)
sont disponibles dans `brand/` et s'utilisent **en complément** quand la vidéo traite de ce produit.

## Couleurs (style guide p. 10)

**Palette primaire** — chaque teinte existe en Primary, Shade (foncé) et Tint (clair).

| Couleur | Shade | Primary | Tint 30 | Tint 45 |
|---|---|---|---|---|
| Blue | `#042B66` (30) | `#0B6CFF` ¹ | `#9DC4FF` | `#E7F0FF` |
| Brand Purple | `#311A7F` (25) | **`#512BD4`** (couleur historique du logo) | `#B9AAEE` | `#EEEAFB` |
| Magenta | `#800066` (20) | `#D600AA` | `#EF99DD` | `#FBE5F6` |

**Palette secondaire**

| Couleur | Shade | Primary | Tint |
|---|---|---|---|
| Midnight blue | `#0F042C` (20), `#14053A` (10) | `#190649` | — |
| Cyan | `#18747D` (Blue shade 30) | `#28C2D1` | `#E9F9FA` (45) |
| Yellow | `#70511D` (30) | `#F7B548` | `#FDF0DA` (40) |
| Flamingo | `#74222B` (30) | `#F65163` | `#FDDCE0` (40) |

¹ Le PDF imprime par erreur `#512BD4` sous « Blue Primary ». La valeur réelle, mesurée sur le rendu de la page
et cohérente avec son CMYK (96, 58, 0, 0) et le Pantone 2194 U, est `#0B6CFF`.

**Dégradés (p. 11)** — deux roues, une par thème :
- thème clair : Purple → Magenta, Magenta → Flamingo, Flamingo → Purple, Purple → Blue, Blue → Purple ;
- thème sombre (teintes claires) : Purple → Magenta, Magenta → Flamingo, Flamingo → Purple, Purple → Cyan, Cyan → Purple.

## Contraste (WCAG AA, exigé par le style guide)

Texte normal ≥ 4,5:1, grand texte et graphiques ≥ 3:1. Ratios calculés :

| Sur fond sombre `#14053A` | Ratio | | Sur fond blanc `#FFFFFF` | Ratio |
|---|---|---|---|---|
| `#FFFFFF` | 18,9 | | `#190649` | 18,1 |
| `#EEEAFB` | 16,0 | | `#311A7F` | 13,3 |
| `#B6D3FF` (code) | 12,4 | | `#00467E` (code) | 9,6 |
| `#9DC4FF` | 10,6 | | `#512BD4` | 7,9 |
| `#F7B548` | 10,5 | | `#18747D` | 5,5 |
| `#EF99DD` | 9,2 | | `#D600AA` | 4,7 |
| `#B9AAEE` | 9,0 | | `#0B6CFF` | 4,6 |
| `#28C2D1` | 8,7 | | `#28C2D1` | **2,2 ✗** |
| `#F65163` | 5,6 | | | |
| `#0B6CFF` | **4,1** (grand texte seulement) | | | |
| `#D600AA` | **4,0** (grand texte seulement) | | | |
| `#512BD4` | **2,4 ✗** (formes uniquement) | | | |

En pratique : sur fond sombre, écrire en blanc / tints (`#EEEAFB`, `#B9AAEE`, `#9DC4FF`, `#EF99DD`) ou cyan ;
le violet et le bleu primaires servent aux **formes, aplats et dégradés**. Sur fond clair, le violet primaire
est la couleur de texte d'accent par excellence ; jamais le cyan primaire.

## Typographie (p. 12–13)

| Rôle | Police | Graisse | Fichiers |
|---|---|---|---|
| H1 | **Space Grotesk** | Bold | `fonts/space-grotesk/` |
| H2, H4 | Space Grotesk | Medium | |
| H3 | **Open Sans** | Bold | `fonts/open-sans/` |
| Corps B1–B4 | Open Sans | Regular | |
| Code | **Space Mono** | Regular | `fonts/space-mono/` |

Échelle type du guide (base 20) : 8 · 12 · 20 · 32 · 52 · 84.
Code (p. 22) : sur fond sombre `#B6D3FF`, sur fond clair `#00467E`, numéros de ligne `#7A7A7A`
(4,2:1 sur `#190649` → grand texte uniquement).

## Logo (p. 9)

- Logo principal : le carré `.NET` (`brand/dotnet/logo/dotnet-logo.svg`) ; logotype texte : `brand/dotnet/logo/text-only/{Purple,White,Black}`.
- Taille minimale à l'écran : 50 px (logo), 27 px (logotype).
- Zone de protection : la hauteur du « N » sur tous les côtés.
- Ne jamais déformer, recolorer, ni animer l'intérieur du logo. Entrée/sortie uniquement (fondu, échelle uniforme).
- Le logo et le style guide sont © les auteurs .NET : à utiliser pour représenter .NET, selon le guide.

## Imagerie (p. 14–22)

- **Icônes** : langage **Fluent** (style guide p. 15) → `icons/fluent/` (Fluent UI System Icons, MIT, 3 024 icônes).
  Style `regular` par défaut, `filled` pour l'emphase ; teinter avec les couleurs .NET lisibles (`#EEEAFB`, `#B9AAEE`,
  `#9DC4FF`, `#28C2D1`…) via `tools/use-fluent-icons.sh --color` ou `fill="currentColor"` en SVG inline. Les icônes
  `_color` (dégradés Fluent) gardent leurs couleurs : à réserver aux illustrations ponctuelles.
- **Spot illustrations** (`brand/dotnet/spot-illustrations/`) : isométriques, petites (≤ 200 px dans le guide ; en vidéo ≤ ~20 % de la largeur), en accompagnement.
- **Data viz** : couleurs de la marque, dégradés pour l'emphase, contraste ≥ 3:1 pour les graphiques.
- **Code visualization** : Space Mono, peut être animé (c'est un élément de narration central de .NET).
- **dotnet-bot**, la mascotte communautaire — deux générations (planche : `brand/dotnet-bot/_planche.jpg`) :
  - **bot 3D actuel** (style guide 2024, à privilégier) : `brand/dotnet/spot-illustrations/bot_*.png`, scènes 3D
    `brand/dotnet/wallpapers/` (`bot-01`, `bot-02`, `race-car-*`) et l'animation Lottie `brand/dotnet-bot/dotNETbot_waving.json` ;
  - **variantes générées** (vectorielles, charte .NET) : `brand/dotnet-bot/variants/` — 190 visuels (poses, expressions, accessoires, formats, scènes d'équipe, écosystème .NET) et 40 animations, catalogue dans `variants/README.md` ;
  - **bot classique 2D** (lavande) : `brand/dotnet-bot/` (poses, scènes, badges, ASCII), pour un ton communautaire / rétro.
- **Fonds d'écran 3D** (`brand/dotnet/wallpapers/`) : utilisables comme fonds de scène (1080p / 4K en 16:9, formats mobile en 9:16) ;
  garder le texte par-dessus lisible (voile sombre `#14053A` à 50–70 % si besoin).

## Ton de voix (p. 7)

Accessible, utile, authentique, simple, clair, bienveillant, inclusif.
Jamais arrogant, condescendant, faux, compliqué, ambigu, sarcastique ou excluant.

## Produits et frameworks .NET

Pour une vidéo sur un produit ou un framework, ajouter son logo **en complément** du logo .NET, avec les mêmes règles
d'intégrité (ni déformé, ni recoloré, zone de protection). Logos disponibles dans `brand/frameworks/` (planche :
`brand/frameworks/_planche.jpg`) : .NET Aspire, Blazor, .NET MAUI, Xamarin, Orleans, Roslyn, Polly, IdentityServer,
NUnit, xUnit.net, Prism, ReactiveUI, Reactive Extensions, Silk.NET, WiX, Kudu, Azure SDK, Open Live Writer ;
.NET Foundation dans `brand/dotnet-foundation/`. **Les couleurs de la vidéo restent celles de .NET**, même quand
le logo d'un projet utilise sa propre palette (ex. Xamarin bleu, Polly multicolore).
