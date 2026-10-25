# Animations « écosystème .NET »

9 animations générées par `tools/dotnet-bot-variants/generate-animations.mjs` à partir du même bot vectoriel que les visuels fixes (charte .NET, icônes Fluent).

- **.webp** animé : stickers avec transparence (chat, web, Teams/Slack/Discord).
- **.gif** : repli universel (320 px, 480 px pour les scènes d'équipe ; transparence 1 bit).
- **.webm** (VP9 avec alpha) : à superposer dans un montage ou une composition HyperFrames (`<video>` sur fond transparent).
- **.mp4** : scènes plein cadre avec fond.
- **.png** : image fixe (poster / aperçu).

Les boucles sont parfaites (dernière image → première) sauf mention d'une entrée / sortie.
Régénérer : `node tools/dotnet-bot-variants/generate-animations.mjs` (filtre optionnel : `… generate-animations.mjs salut`).

| Aperçu | Animation | Usage | Taille · durée | Fichiers |
|---|---|---|---|---|
| <img src="hub.png" width="160"> | Une plateforme pour tout construire | Ouverture de keynote / vidéo (MP4) | 1920×1080 · 6 s @ 30 i/s | [mp4](hub.mp4) · [webm](hub.webm) · [png](hub.png) |
| <img src="carrousel.png" width="160"> | Carrousel des possibilités | Bouclage d’écran d’accueil, stand, salle d’attente (MP4) | 1920×1080 · 14.4 s @ 30 i/s | [mp4](carrousel.mp4) · [webm](carrousel.webm) · [png](carrousel.png) |
| <img src="grille.png" width="160"> | Toutes les possibilités | Récapitulatif animé de l’écosystème (MP4) | 1920×1080 · 7 s @ 30 i/s | [mp4](grille.mp4) · [webm](grille.webm) · [png](grille.png) |
| <img src="orbite.gif" width="160"> | Orbite des workloads | Sticker / overlay : tout gravite autour de .NET | 960×960 · 4 s @ 25 i/s | [webp](orbite.webp) · [gif](orbite.gif) · [webm](orbite.webm) · [png](orbite.png) |
| <img src="multiplateforme.gif" width="160"> | Saut multiplateforme | Le même code partout : desktop, mobile, serveur | 1280×720 · 3 s @ 25 i/s | [webp](multiplateforme.webp) · [gif](multiplateforme.gif) · [webm](multiplateforme.webm) · [png](multiplateforme.png) |
| <img src="performance.gif" width="160"> | Course de vitesse | Performance, benchmarks, « plus rapide » | 1280×720 · 1.6 s @ 25 i/s | [webp](performance.webp) · [gif](performance.gif) · [webm](performance.webm) · [png](performance.png) |
| <img src="jonglage-langages.gif" width="160"> | Jonglage C#, F#, VB | Langages .NET, polyglotte | 960×960 · 2.4 s @ 25 i/s | [webp](jonglage-langages.webp) · [gif](jonglage-langages.gif) · [webm](jonglage-langages.webm) · [png](jonglage-langages.png) |
| <img src="ia.gif" width="160"> | Assistant IA | IA générative, agents, chat | 960×960 · 3 s @ 25 i/s | [webp](ia.webp) · [gif](ia.gif) · [webm](ia.webm) · [png](ia.png) |
| <img src="construction.gif" width="160"> | Tout construire | Briques qui s’empilent : « build anything » | 960×960 · 4 s @ 25 i/s | [webp](construction.webp) · [gif](construction.gif) · [webm](construction.webm) · [png](construction.png) |
