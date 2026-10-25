# Variantes animées du dotnet-bot

20 animations générées par `tools/dotnet-bot-variants/generate-animations.mjs` à partir du même bot vectoriel que les visuels fixes (charte .NET, icônes Fluent).

- **.webp** animé : stickers avec transparence (chat, web, Teams/Slack/Discord).
- **.gif** : repli universel (320 px, 480 px pour les scènes d'équipe ; transparence 1 bit).
- **.webm** (VP9 avec alpha) : à superposer dans un montage ou une composition HyperFrames (`<video>` sur fond transparent).
- **.mp4** : scènes plein cadre avec fond.
- **.png** : image fixe (poster / aperçu).

Les boucles sont parfaites (dernière image → première) sauf mention d'une entrée / sortie.
Régénérer : `node tools/dotnet-bot-variants/generate-animations.mjs` (filtre optionnel : `… generate-animations.mjs salut`).

| Aperçu | Animation | Usage | Taille · durée | Fichiers |
|---|---|---|---|---|
| <img src="salut.gif" width="160"> | Salut (coucou) | Accueil, ouverture de vidéo, message de bienvenue | 512×512 · 2 s @ 25 i/s | [webp](salut.webp) · [gif](salut.gif) · [webm](salut.webm) · [png](salut.png) |
| <img src="bravo.gif" width="160"> | Bravo ! | Félicitations, PR mergée, objectif atteint | 512×512 · 2 s @ 25 i/s | [webp](bravo.webp) · [gif](bravo.gif) · [webm](bravo.webm) · [png](bravo.png) |
| <img src="repos.gif" width="160"> | Au repos | Boucle d’attente, mascotte d’app, coin d’écran | 512×512 · 4 s @ 25 i/s | [webp](repos.webp) · [gif](repos.gif) · [webm](repos.webm) · [png](repos.png) |
| <img src="chargement.gif" width="160"> | Chargement | Écran de chargement, opération en cours | 512×512 · 1.6 s @ 25 i/s | [webp](chargement.webp) · [gif](chargement.gif) · [webm](chargement.webm) · [png](chargement.png) |
| <img src="succes.gif" width="160"> | Succès | Build vert, tests passés, opération réussie | 512×512 · 2 s @ 25 i/s | [webp](succes.webp) · [gif](succes.gif) · [webm](succes.webm) · [png](succes.png) |
| <img src="erreur.gif" width="160"> | Erreur | Échec, exception, build rouge | 512×512 · 2 s @ 25 i/s | [webp](erreur.webp) · [gif](erreur.gif) · [webm](erreur.webm) · [png](erreur.png) |
| <img src="reflexion.gif" width="160"> | Réflexion | Question ouverte, « je réfléchis… » | 512×512 · 2.4 s @ 25 i/s | [webp](reflexion.webp) · [gif](reflexion.gif) · [webm](reflexion.webm) · [png](reflexion.png) |
| <img src="dodo.gif" width="160"> | Dodo | Inactivité, pause, « à demain » | 512×512 · 3 s @ 25 i/s | [webp](dodo.webp) · [gif](dodo.gif) · [webm](dodo.webm) · [png](dodo.png) |
| <img src="amour.gif" width="160"> | J'adore | Coup de cœur, remerciement | 512×512 · 2 s @ 25 i/s | [webp](amour.webp) · [gif](amour.gif) · [webm](amour.webm) · [png](amour.png) |
| <img src="coder.gif" width="160"> | En train de coder | Live coding, développement, « je m’en occupe » | 512×512 · 1.2 s @ 25 i/s | [webp](coder.webp) · [gif](coder.gif) · [webm](coder.webm) · [png](coder.png) |
| <img src="decollage.gif" width="160"> | Décollage | Déploiement, mise en production, lancement | 512×512 · 1.6 s @ 25 i/s | [webp](decollage.webp) · [gif](decollage.gif) · [webm](decollage.webm) · [png](decollage.png) |
| <img src="idee.gif" width="160"> | Idée ! | Eurêka, suggestion, astuce | 512×512 · 2 s @ 25 i/s | [webp](idee.webp) · [gif](idee.gif) · [webm](idee.webm) · [png](idee.png) |
| <img src="danse.gif" width="160"> | Danse | Célébration, vendredi, ambiance | 512×512 · 1.6 s @ 25 i/s | [webp](danse.webp) · [gif](danse.gif) · [webm](danse.webm) · [png](danse.png) |
| <img src="notification.gif" width="160"> | Notification | Nouveau message, alerte, rappel | 512×512 · 2 s @ 25 i/s | [webp](notification.webp) · [gif](notification.gif) · [webm](notification.webm) · [png](notification.png) |
| <img src="hiver.gif" width="160"> | Hiver | Saison froide, vœux d’hiver | 512×512 · 3 s @ 25 i/s | [webp](hiver.webp) · [gif](hiver.gif) · [webm](hiver.webm) · [png](hiver.png) |
| <img src="pouce.gif" width="160"> | Pouce levé | Validation, « c’est bon pour moi » | 512×512 · 1.4 s @ 25 i/s | [webp](pouce.webp) · [gif](pouce.gif) · [webm](pouce.webm) · [png](pouce.png) |
| <img src="emoji-clin.gif" width="160"> | Emoji clin d'œil animé | Emoji animé (Slack, Teams, Discord) | 256×256 · 1.6 s @ 25 i/s | [webp](emoji-clin.webp) · [gif](emoji-clin.gif) · [webm](emoji-clin.webm) · [png](emoji-clin.png) |
| <img src="emoji-rire.gif" width="160"> | Emoji rire animé | Emoji animé de réaction drôle | 256×256 · 0.8 s @ 25 i/s | [webp](emoji-rire.webp) · [gif](emoji-rire.gif) · [webm](emoji-rire.webm) · [png](emoji-rire.png) |
| <img src="lower-third.png" width="160"> | Bandeau nominatif animé | Lower third pour vidéo (WebM alpha à superposer) | 1920×1080 · 5 s @ 30 i/s | [webm](lower-third.webm) · [png](lower-third.png) |
| <img src="intro-logo.png" width="160"> | Intro avec logo .NET | Ouverture / générique de vidéo (MP4 / WebM) | 1920×1080 · 4 s @ 30 i/s | [mp4](intro-logo.mp4) · [webm](intro-logo.webm) · [png](intro-logo.png) |
