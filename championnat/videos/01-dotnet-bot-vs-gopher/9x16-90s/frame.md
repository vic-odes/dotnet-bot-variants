---
version: alpha
name: .NET — Frame (video / frame layer)
description: >
  Design spec commune pour toutes les vidéos du dépôt, d'après le .NET Style Guide (nov. 2024).
  Copier ce fichier dans un projet sous le nom `frame.md` (tools/use-common-assets.sh le fait).
  Détails, palette complète et ratios de contraste : Assets/BRAND-DOTNET.md.
unit: the frame — 1920×1080 primary; 1080×1920 and 1080×1080 supported
principle: brand atoms are sacred · composition is free · every technical string is real

colors:
  # thème sombre (défaut vidéo)
  canvas: "#14053A"        # midnight blue shade 10
  midnight: "#190649"      # midnight blue primary — bandes, panneaux de code
  surface: "#311A7F"       # brand purple shade 25 — cartes
  ink: "#FFFFFF"           # texte principal
  ink-soft: "#EEEAFB"      # brand purple tint 45
  muted: "#B9AAEE"         # brand purple tint 30 — texte secondaire
  purple: "#512BD4"        # BRAND PURPLE — formes / aplats / logo (jamais texte sur sombre : 2,4:1)
  blue: "#0B6CFF"          # blue primary — formes (texte sur sombre : grand texte seulement)
  blue-tint: "#9DC4FF"     # blue tint 30 — texte accent sur sombre
  magenta: "#D600AA"       # magenta primary — formes, dégradés
  magenta-tint: "#EF99DD"  # magenta tint 30 — texte accent sur sombre
  cyan: "#28C2D1"          # cyan primary — accents (texte OK sur sombre, jamais sur clair)
  yellow: "#F7B548"        # avertissement / highlight
  flamingo: "#F65163"      # erreur
  code: "#B6D3FF"          # code sur fond sombre
  code-lineno: "#7A7A7A"   # numéros de ligne (grand texte seulement)
  # thème clair
  light-bg: "#FFFFFF"
  light-bg-alt: "#EEEAFB"
  light-ink: "#190649"
  light-accent: "#512BD4"
  light-code: "#00467E"

gradients:
  purple-magenta: "linear-gradient(135deg, #512BD4 0%, #D600AA 100%)"
  magenta-flamingo: "linear-gradient(135deg, #D600AA 0%, #F65163 100%)"
  flamingo-purple: "linear-gradient(135deg, #F65163 0%, #512BD4 100%)"
  purple-blue: "linear-gradient(135deg, #512BD4 0%, #0B6CFF 100%)"
  dark-purple-cyan: "linear-gradient(135deg, #B9AAEE 0%, #28C2D1 100%)"   # roue du thème sombre (teintes claires)
  dark-purple-magenta: "linear-gradient(135deg, #B9AAEE 0%, #EF99DD 100%)"

typography:
  label:   { fontFamily: "Space Mono", cqw: 0.95, weight: 400, tracking: "0.08em", upper: true }
  code:    { fontFamily: "Space Mono", cqw: 1.5, weight: 400, lineHeight: 1.5 }
  body:    { fontFamily: "Open Sans", cqw: 1.7, weight: 400, lineHeight: 1.4 }
  h3:      { fontFamily: "Open Sans", cqw: 2.4, weight: 700, lineHeight: 1.15 }
  h2:      { fontFamily: "Space Grotesk", cqw: 4.0, weight: 500, lineHeight: 1.08 }
  h1:      { fontFamily: "Space Grotesk", cqw: 6.4, weight: 700, lineHeight: 1.05, tracking: "-0.02em" }
  display: { fontFamily: "Space Grotesk", cqw: 10.0, weight: 700, lineHeight: 1.0, tracking: "-0.03em" }

fonts:
  "Space Grotesk": "assets/common/fonts/space-grotesk/space-grotesk-latin-{300,400,500,700}-normal.woff2"
  "Open Sans": "assets/common/fonts/open-sans/open-sans-latin-{300..800}-{normal,italic}.woff2"
  "Space Mono": "assets/common/fonts/space-mono/space-mono-latin-{400,700}-normal.woff2"

logos:
  dotnet: "assets/common/brand/dotnet/logo/dotnet-logo.svg"
  dotnet-text-white: "assets/common/brand/dotnet/logo/text-only/White/dotnet-logo-text_White.svg"
  dotnet-text-purple: "assets/common/brand/dotnet/logo/text-only/Purple/dotnet-logo-text-logo-Purple.svg"
  # logos produits, en complément selon le sujet :
  maui-horizontal: "assets/common/brand/frameworks/dotnet-maui/dotnet-maui-horizontal/dotnet-maui-horizontal.svg"
  dotnet-foundation: "assets/common/brand/dotnet-foundation/dotnetfoundation_v4.svg"

spacing:
  pad-x: "6cqw"
  pad-y: "5cqw"
  keep-out-bottom: "17%"

components:
  card:
    description: "Carte `surface`, coins 1.2cqw, bordure 1px `muted` à 35 %, lueur douce `purple` autorisée, pas d'ombre dure."
  code-card:
    description: "Panneau `midnight`, Space Mono, texte `code`, numéros `code-lineno`, coins 1cqw. Mot-clé mis en avant en `cyan` ou `magenta-tint`."
  accent-rule:
    description: "Filet 4–6px en dégradé de la marque (`purple-magenta` ou `dark-purple-cyan`)."
  logo-lockup:
    description: "Logo .NET (carré) centré, hauteur ≥ 120 px en 1080p, zone de protection = hauteur du « N ». Entrée par fondu + échelle uniforme 0.96→1 ; jamais déformé ni recoloré. Logo produit éventuel à côté, même hauteur visuelle."
---

# .NET — Frame

Fond midnight, violet de marque en formes et aplats, dégradés de la roue .NET (violet → magenta → flamingo,
violet → bleu / cyan). Space Grotesk pour les titres, Open Sans pour le texte, Space Mono pour le code.

## Do
- Uniquement les couleurs de la palette .NET ; texte en `ink`, `ink-soft`, `muted` ou tints sur fond sombre.
- Logo .NET en ouverture ou en lockup final, intact.
- Contraste WCAG AA partout (vérifié par `npx hyperframes check`).
- Ton accessible, clair, bienveillant.

## Don't
- Pas de texte `#512BD4` sur fond sombre (2,4:1) ni `#28C2D1` sur fond clair (2,2:1).
- Pas de logo déformé, recoloré, animé de l'intérieur, ni sous 50 px.
- Pas d'autres polices que Space Grotesk / Open Sans / Space Mono.
- Rien de lisible sous 83 % de la hauteur.
