# Animations d’équipe du dotnet-bot

11 animations générées par `tools/dotnet-bot-variants/generate-animations.mjs` à partir du même bot vectoriel que les visuels fixes (charte .NET, icônes Fluent).

- **.webp** animé : stickers avec transparence (chat, web, Teams/Slack/Discord).
- **.gif** : repli universel (320 px, 480 px pour les scènes d'équipe ; transparence 1 bit).
- **.webm** (VP9 avec alpha) : à superposer dans un montage ou une composition HyperFrames (`<video>` sur fond transparent).
- **.mp4** : scènes plein cadre avec fond.
- **.png** : image fixe (poster / aperçu).

Les boucles sont parfaites (dernière image → première) sauf mention d'une entrée / sortie.
Régénérer : `node tools/dotnet-bot-variants/generate-animations.mjs` (filtre optionnel : `… generate-animations.mjs salut`).

| Aperçu | Animation | Usage | Taille · durée | Fichiers |
|---|---|---|---|---|
| <img src="high-five.gif" width="160"> | Tope là ! | Collaboration réussie, PR approuvée | 960×540 · 2.4 s @ 25 i/s | [webp](high-five.webp) · [gif](high-five.gif) · [webm](high-five.webm) · [png](high-five.png) |
| <img src="ola.gif" width="160"> | La ola | Ambiance, célébration, fin de live | 960×540 · 2 s @ 25 i/s | [webp](ola.webp) · [gif](ola.gif) · [webm](ola.webm) · [png](ola.png) |
| <img src="celebration.gif" width="160"> | Célébration | Release livrée, sprint terminé | 960×540 · 2 s @ 25 i/s | [webp](celebration.webp) · [gif](celebration.gif) · [webm](celebration.webm) · [png](celebration.png) |
| <img src="daily.gif" width="160"> | Daily / stand-up | Tour de parole, synchro d’équipe | 960×540 · 4 s @ 25 i/s | [webp](daily.webp) · [gif](daily.gif) · [webm](daily.webm) · [png](daily.png) |
| <img src="danse.gif" width="160"> | Danse de groupe | Vendredi, fête, ambiance | 960×540 · 1.6 s @ 25 i/s | [webp](danse.webp) · [gif](danse.gif) · [webm](danse.webm) · [png](danse.png) |
| <img src="photo.gif" width="160"> | Photo d'équipe (flash) | Souvenir, carte de vœux animée | 960×540 · 2.4 s @ 25 i/s | [webp](photo.webp) · [gif](photo.gif) · [webm](photo.webm) · [png](photo.png) |
| <img src="relais.gif" width="160"> | Passage de relais | DevOps, handoff, livraison | 960×540 · 3 s @ 25 i/s | [webp](relais.webp) · [gif](relais.gif) · [webm](relais.webm) · [png](relais.png) |
| <img src="bienvenue.gif" width="160"> | Bienvenue ! | Onboarding animé | 960×540 · 4 s @ 25 i/s | [webp](bienvenue.webp) · [gif](bienvenue.gif) · [webm](bienvenue.webm) · [png](bienvenue.png) |
| <img src="pyramide.gif" width="160"> | Pyramide | Entraide, victoire d’équipe | 960×540 · 1.6 s @ 25 i/s | [webp](pyramide.webp) · [gif](pyramide.gif) · [webm](pyramide.webm) · [png](pyramide.png) |
| <img src="visio.gif" width="160"> | Réunion à distance | Visio animée, équipe distribuée | 960×540 · 4 s @ 25 i/s | [webp](visio.webp) · [gif](visio.gif) · [webm](visio.webm) · [png](visio.png) |
| <img src="hackathon.gif" width="160"> | Hackathon | Sprint de code puis victoire | 960×540 · 4 s @ 25 i/s | [webp](hackathon.webp) · [gif](hackathon.gif) · [webm](hackathon.webm) · [png](hackathon.png) |
