# Variantes du dotnet-bot

190 visuels générés par [`tools/dotnet-bot-variants/generate.mjs`](https://github.com/vic-odes/dotnet-video-pr-sentation/blob/main/tools/dotnet-bot-variants/generate.mjs) (dépôt source) (SVG + PNG), dessinés d'après le **bot 3D du style guide .NET 2024**
et colorés uniquement avec la [charte .NET](https://github.com/vic-odes/dotnet-video-pr-sentation/blob/main/Assets/BRAND-DOTNET.md) ; pictos = [Fluent UI System Icons](https://github.com/vic-odes/dotnet-video-pr-sentation/blob/main/Assets/icons/fluent/) ; polices Space Grotesk / Open Sans / Space Mono embarquées dans les SVG à texte.

- **SVG** : vectoriel, autonome (polices incluses en base64), à redimensionner librement.
- **PNG** : rendu à la taille nominale, fond transparent quand le visuel n'a pas de fond.
- Planches d'aperçu : `_planche-<catégorie>.jpg`.
- **Variantes animées** (WebP, GIF, WebM alpha, MP4) : [07-animations/](07-animations/README.md) [09-equipe-animee/](09-equipe-animee/README.md) (scènes d'équipe) et [11-ecosysteme-anime/](11-ecosysteme-anime/README.md) (écosystème .NET), générées par `generate-animations.mjs`.
- Régénérer : `node tools/dotnet-bot-variants/generate.mjs` (filtre optionnel : `… generate.mjs hiver`).

Les textes des formats (titres, « Prénom Nom », dates) sont des exemples : dupliquer la ligne du catalogue (`catalogue.mjs`) pour en produire une version personnalisée.

## Réactions et émotions — stickers (chat, Teams/Slack, commentaires de PR, réseaux sociaux)

![planche](_planche-01-reactions.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 001 | Salut ! | Accueil, message de bienvenue, début de vidéo | 512×512 | [svg](01-reactions/001-salut.svg) · [png](01-reactions/001-salut.png) |
| 002 | Content | Réaction positive générique | 512×512 | [svg](01-reactions/002-content.svg) · [png](01-reactions/002-content.png) |
| 003 | Bravo ! | Félicitations, PR mergée, objectif atteint | 512×512 | [svg](01-reactions/003-bravo.svg) · [png](01-reactions/003-bravo.png) |
| 004 | Clin d'œil | Astuce, sous-entendu complice | 512×512 | [svg](01-reactions/004-clin-d-oeil.svg) · [png](01-reactions/004-clin-d-oeil.png) |
| 005 | J'adore | Coup de cœur, remerciement chaleureux | 512×512 | [svg](01-reactions/005-amour.svg) · [png](01-reactions/005-amour.png) |
| 006 | Surpris | Nouvelle inattendue, « quoi ?! » | 512×512 | [svg](01-reactions/006-surpris.svg) · [png](01-reactions/006-surpris.png) |
| 007 | Triste | Mauvaise nouvelle, build cassé, compassion | 512×512 | [svg](01-reactions/007-triste.svg) · [png](01-reactions/007-triste.png) |
| 008 | Réflexion | Question ouverte, « hmm… » | 512×512 | [svg](01-reactions/008-reflexion.svg) · [png](01-reactions/008-reflexion.png) |
| 009 | Idée ! | Proposition, eurêka, suggestion | 512×512 | [svg](01-reactions/009-idee.svg) · [png](01-reactions/009-idee.png) |
| 010 | Dodo | Inactivité, pause, « à demain » | 512×512 | [svg](01-reactions/010-dodo.svg) · [png](01-reactions/010-dodo.png) |
| 011 | Pouce levé | Validation rapide, « c'est bon pour moi » | 512×512 | [svg](01-reactions/011-pouce.svg) · [png](01-reactions/011-pouce.png) |
| 012 | Je ne sais pas | Incertitude, « aucune idée » | 512×512 | [svg](01-reactions/012-sais-pas.svg) · [png](01-reactions/012-sais-pas.png) |
| 013 | Waouh | Émerveillement, démo impressionnante | 512×512 | [svg](01-reactions/013-waouh.svg) · [png](01-reactions/013-waouh.png) |
| 014 | Merci ! | Remerciement, fin de présentation | 512×512 | [svg](01-reactions/014-merci.svg) · [png](01-reactions/014-merci.png) |
| 015 | Oups | Petite erreur, mea culpa | 512×512 | [svg](01-reactions/015-oups.svg) · [png](01-reactions/015-oups.png) |
| 016 | Concentré | Mode focus, « je m’en occupe » | 512×512 | [svg](01-reactions/016-concentre.svg) · [png](01-reactions/016-concentre.png) |
| 017 | Mort de rire | Humour, blague réussie | 512×512 | [svg](01-reactions/017-mdr.svg) · [png](01-reactions/017-mdr.png) |
| 018 | Gêné | Embarras, « désolé du retard » | 512×512 | [svg](01-reactions/018-gene.svg) · [png](01-reactions/018-gene.png) |
| 019 | D'accord | Approbation, tâche acceptée | 512×512 | [svg](01-reactions/019-ok.svg) · [png](01-reactions/019-ok.png) |
| 020 | À bientôt ! | Au revoir, fin de stream, out of office | 512×512 | [svg](01-reactions/020-a-bientot.svg) · [png](01-reactions/020-a-bientot.png) |

## Statuts et états d'interface — chargement, succès, erreur, pages vides, maintenance

![planche](_planche-02-statuts.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 021 | Chargement… | Écran de chargement, opération en cours | 512×512 | [svg](02-statuts/021-chargement.svg) · [png](02-statuts/021-chargement.png) |
| 022 | Succès | Opération réussie, build vert, tests passés | 512×512 | [svg](02-statuts/022-succes.svg) · [png](02-statuts/022-succes.png) |
| 023 | Erreur | Échec, exception, build rouge | 512×512 | [svg](02-statuts/023-erreur.svg) · [png](02-statuts/023-erreur.png) |
| 024 | Avertissement | Attention requise, dépréciation | 512×512 | [svg](02-statuts/024-avertissement.svg) · [png](02-statuts/024-avertissement.png) |
| 025 | Information | Astuce, note, info-bulle | 512×512 | [svg](02-statuts/025-information.svg) · [png](02-statuts/025-information.png) |
| 026 | Rien ici | État vide (liste, recherche sans résultat) | 512×512 | [svg](02-statuts/026-liste-vide.svg) · [png](02-statuts/026-liste-vide.png) |
| 027 | Page introuvable | Page 404, lien cassé | 512×512 | [svg](02-statuts/027-404.svg) · [png](02-statuts/027-404.png) |
| 028 | Hors ligne | Pas de connexion réseau | 512×512 | [svg](02-statuts/028-hors-ligne.svg) · [png](02-statuts/028-hors-ligne.png) |
| 029 | Maintenance | Service en maintenance, travaux | 512×512 | [svg](02-statuts/029-maintenance.svg) · [png](02-statuts/029-maintenance.png) |
| 030 | Mise à jour | Mise à jour disponible / en cours | 512×512 | [svg](02-statuts/030-mise-a-jour.svg) · [png](02-statuts/030-mise-a-jour.png) |
| 031 | Accès restreint | Contenu protégé, authentification requise | 512×512 | [svg](02-statuts/031-verrouille.svg) · [png](02-statuts/031-verrouille.png) |
| 032 | Notification | Nouveau message, alerte | 512×512 | [svg](02-statuts/032-notification.svg) · [png](02-statuts/032-notification.png) |
| 033 | En attente | File d’attente, validation en attente | 512×512 | [svg](02-statuts/033-en-attente.svg) · [png](02-statuts/033-en-attente.png) |
| 034 | Synchronisation | Sauvegarde / synchronisation cloud | 512×512 | [svg](02-statuts/034-synchronisation.svg) · [png](02-statuts/034-synchronisation.png) |

## Situations de développement — technos, langages, workloads .NET

![planche](_planche-03-dev-tech.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 035 | En train de coder | Live coding, développement | 512×512 | [svg](03-dev-tech/035-coder.svg) · [png](03-dev-tech/035-coder.png) |
| 036 | Débogage | Chasse aux bugs, investigation | 512×512 | [svg](03-dev-tech/036-debug.svg) · [png](03-dev-tech/036-debug.png) |
| 037 | Tests | Tests unitaires, xUnit/NUnit/MSTest | 512×512 | [svg](03-dev-tech/037-tests.svg) · [png](03-dev-tech/037-tests.png) |
| 038 | Revue de code | Pull request, relecture | 512×512 | [svg](03-dev-tech/038-revue-de-code.svg) · [png](03-dev-tech/038-revue-de-code.png) |
| 039 | Déploiement | Mise en production, release | 512×512 | [svg](03-dev-tech/039-deploiement.svg) · [png](03-dev-tech/039-deploiement.png) |
| 040 | Cloud | Azure, cloud-native, hébergement | 512×512 | [svg](03-dev-tech/040-cloud.svg) · [png](03-dev-tech/040-cloud.png) |
| 041 | Base de données | EF Core, SQL, stockage | 512×512 | [svg](03-dev-tech/041-base-de-donnees.svg) · [png](03-dev-tech/041-base-de-donnees.png) |
| 042 | Sécurité | Authentification, sécurité applicative | 512×512 | [svg](03-dev-tech/042-securite.svg) · [png](03-dev-tech/042-securite.png) |
| 043 | API | API web, Minimal APIs, intégration | 512×512 | [svg](03-dev-tech/043-api.svg) · [png](03-dev-tech/043-api.png) |
| 044 | Performance | Benchmarks, optimisation | 512×512 | [svg](03-dev-tech/044-performance.svg) · [png](03-dev-tech/044-performance.png) |
| 045 | Git & branches | Branches, merge, contrôle de version | 512×512 | [svg](03-dev-tech/045-git.svg) · [png](03-dev-tech/045-git.png) |
| 046 | Conteneurs | Docker, images de conteneur | 512×512 | [svg](03-dev-tech/046-conteneurs.svg) · [png](03-dev-tech/046-conteneurs.png) |
| 047 | IA | IA générative, Semantic Kernel, ML.NET | 512×512 | [svg](03-dev-tech/047-ia.svg) · [png](03-dev-tech/047-ia.png) |
| 048 | Mobile | .NET MAUI, applications iOS/Android | 512×512 | [svg](03-dev-tech/048-mobile.svg) · [png](03-dev-tech/048-mobile.png) |
| 049 | Web | ASP.NET Core, Blazor | 512×512 | [svg](03-dev-tech/049-web.svg) · [png](03-dev-tech/049-web.png) |
| 050 | Desktop | WinForms, WPF, WinUI | 512×512 | [svg](03-dev-tech/050-desktop.svg) · [png](03-dev-tech/050-desktop.png) |
| 051 | Jeu vidéo | Unity, jeux en C# | 512×512 | [svg](03-dev-tech/051-jeu-video.svg) · [png](03-dev-tech/051-jeu-video.png) |
| 052 | IoT | Objets connectés, .NET nanoFramework | 512×512 | [svg](03-dev-tech/052-iot.svg) · [png](03-dev-tech/052-iot.png) |
| 053 | Données | Data, statistiques, tableaux de bord | 512×512 | [svg](03-dev-tech/053-donnees.svg) · [png](03-dev-tech/053-donnees.png) |
| 054 | Documentation | Docs, tutoriels, Microsoft Learn | 512×512 | [svg](03-dev-tech/054-documentation.svg) · [png](03-dev-tech/054-documentation.png) |
| 055 | Terminal | CLI dotnet, scripts | 512×512 | [svg](03-dev-tech/055-terminal.svg) · [png](03-dev-tech/055-terminal.png) |
| 056 | C# | Contenu dédié à C# | 512×512 | [svg](03-dev-tech/056-csharp.svg) · [png](03-dev-tech/056-csharp.png) |
| 057 | F# | Contenu dédié à F# | 512×512 | [svg](03-dev-tech/057-fsharp.svg) · [png](03-dev-tech/057-fsharp.png) |
| 058 | Visual Basic | Contenu dédié à VB | 512×512 | [svg](03-dev-tech/058-visual-basic.svg) · [png](03-dev-tech/058-visual-basic.png) |
| 059 | async / await | Asynchronisme, tâches, parallélisme | 512×512 | [svg](03-dev-tech/059-async.svg) · [png](03-dev-tech/059-async.png) |
| 060 | Hot Reload | Modification à chaud, productivité | 512×512 | [svg](03-dev-tech/060-hot-reload.svg) · [png](03-dev-tech/060-hot-reload.png) |
| 061 | Garbage collector | Mémoire, GC, allocations | 512×512 | [svg](03-dev-tech/061-garbage-collector.svg) · [png](03-dev-tech/061-garbage-collector.png) |
| 062 | Paquets NuGet | Dépendances, publication de paquets | 512×512 | [svg](03-dev-tech/062-nuget.svg) · [png](03-dev-tech/062-nuget.png) |
| 063 | Open source | Contribution, communauté GitHub | 512×512 | [svg](03-dev-tech/063-open-source.svg) · [png](03-dev-tech/063-open-source.png) |
| 064 | Astronaute | Exploration, nouveautés, « vers l’infini » | 512×512 | [svg](03-dev-tech/064-astronaute.svg) · [png](03-dev-tech/064-astronaute.png) |

## Vie d'équipe et de communauté — réunions, apprentissage, événements, support

![planche](_planche-04-equipe.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 065 | Pause café | Pause, discussion informelle | 512×512 | [svg](04-equipe/065-pause-cafe.svg) · [png](04-equipe/065-pause-cafe.png) |
| 066 | Tard le soir | Heures tardives, « encore un bug » | 512×512 | [svg](04-equipe/066-nuit-blanche.svg) · [png](04-equipe/066-nuit-blanche.png) |
| 067 | Mode focus | Ne pas déranger, deep work | 512×512 | [svg](04-equipe/067-focus.svg) · [png](04-equipe/067-focus.png) |
| 068 | Réunion | Visio, point d’équipe | 512×512 | [svg](04-equipe/068-reunion.svg) · [png](04-equipe/068-reunion.png) |
| 069 | Télétravail | Travail à distance | 512×512 | [svg](04-equipe/069-teletravail.svg) · [png](04-equipe/069-teletravail.png) |
| 070 | En vacances | Absence, congés | 512×512 | [svg](04-equipe/070-vacances.svg) · [png](04-equipe/070-vacances.png) |
| 071 | Trophée | Récompense, jalon atteint | 512×512 | [svg](04-equipe/071-trophee.svg) · [png](04-equipe/071-trophee.png) |
| 072 | Bienvenue ! | Onboarding, nouvel arrivant | 512×512 | [svg](04-equipe/072-bienvenue.svg) · [png](04-equipe/072-bienvenue.png) |
| 073 | Brainstorming | Atelier, idéation | 512×512 | [svg](04-equipe/073-brainstorming.svg) · [png](04-equipe/073-brainstorming.png) |
| 074 | Deadline | Urgence, échéance proche | 512×512 | [svg](04-equipe/074-deadline.svg) · [png](04-equipe/074-deadline.png) |
| 075 | Apprendre | Formation, cours, certification | 512×512 | [svg](04-equipe/075-apprendre.svg) · [png](04-equipe/075-apprendre.png) |
| 076 | Enseigner | Formateur, mentor, workshop | 512×512 | [svg](04-equipe/076-enseigner.svg) · [png](04-equipe/076-enseigner.png) |
| 077 | Speaker | Conférence, talk, keynote | 512×512 | [svg](04-equipe/077-speaker.svg) · [png](04-equipe/077-speaker.png) |
| 078 | Podcast | Enregistrement audio, interview | 512×512 | [svg](04-equipe/078-podcast.svg) · [png](04-equipe/078-podcast.png) |
| 079 | En direct | Live stream, Twitch/YouTube | 512×512 | [svg](04-equipe/079-live.svg) · [png](04-equipe/079-live.png) |
| 080 | Support | Aide, FAQ, service client | 512×512 | [svg](04-equipe/080-support.svg) · [png](04-equipe/080-support.png) |
| 081 | Communauté | Meetup, user group, Discord | 512×512 | [svg](04-equipe/081-communaute.svg) · [png](04-equipe/081-communaute.png) |
| 082 | Feedback | Retour, sondage, avis | 512×512 | [svg](04-equipe/082-feedback.svg) · [png](04-equipe/082-feedback.png) |

## Saisons, fêtes et célébrations

![planche](_planche-05-saisons.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 083 | Joyeux anniversaire | Anniversaire (personne, projet, .NET) | 512×512 | [svg](05-saisons/083-anniversaire.svg) · [png](05-saisons/083-anniversaire.png) |
| 084 | Bonne année | Vœux, nouvelle année | 512×512 | [svg](05-saisons/084-nouvel-an.svg) · [png](05-saisons/084-nouvel-an.png) |
| 085 | Hiver | Saison froide, neige | 512×512 | [svg](05-saisons/085-hiver.svg) · [png](05-saisons/085-hiver.png) |
| 086 | Été | Vacances d’été, beau temps | 512×512 | [svg](05-saisons/086-ete.svg) · [png](05-saisons/086-ete.png) |
| 087 | Printemps | Renouveau, éco-conception | 512×512 | [svg](05-saisons/087-printemps.svg) · [png](05-saisons/087-printemps.png) |
| 088 | Bonnes fêtes | Fin d’année, cadeaux | 512×512 | [svg](05-saisons/088-fetes.svg) · [png](05-saisons/088-fetes.png) |
| 089 | Nouvelle version | Release, annonce de version | 512×512 | [svg](05-saisons/089-nouvelle-version.svg) · [png](05-saisons/089-nouvelle-version.png) |
| 090 | Hackathon | Hackathon, challenge, code jam | 512×512 | [svg](05-saisons/090-hackathon.svg) · [png](05-saisons/090-hackathon.png) |
| 091 | Champion | Victoire, classement, MVP | 512×512 | [svg](05-saisons/091-champion.svg) · [png](05-saisons/091-champion.png) |
| 092 | Magie | Astuce, « tips & tricks », source generators | 512×512 | [svg](05-saisons/092-magicien.svg) · [png](05-saisons/092-magicien.png) |
| 093 | Saint-Valentin | Fête des amoureux, « on ♥ .NET » | 512×512 | [svg](05-saisons/093-saint-valentin.svg) · [png](05-saisons/093-saint-valentin.png) |
| 094 | Rentrée | Reprise, nouveau semestre | 512×512 | [svg](05-saisons/094-rentree.svg) · [png](05-saisons/094-rentree.png) |

## Formats prêts à l’emploi — avatars, emojis, bannières, slides, miniatures, stories, badges

![planche](_planche-06-formats.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 095 | Avatar rond | Photo de profil (GitHub, Teams, réseaux) | 512×512 | [svg](06-formats/095-avatar-rond.svg) · [png](06-formats/095-avatar-rond.png) |
| 096 | Avatar hexagonal | Badge communauté, autocollant hexagonal | 512×512 | [svg](06-formats/096-avatar-hexagone.svg) · [png](06-formats/096-avatar-hexagone.png) |
| 097 | Icône d'application | Icône d’app, favicon haute résolution | 1024×1024 | [svg](06-formats/097-icone-app.svg) · [png](06-formats/097-icone-app.png) |
| 098 | Emoji heureux | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/098-emoji-heureux.svg) · [png](06-formats/098-emoji-heureux.png) |
| 099 | Emoji clin d’œil | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/099-emoji-clin.svg) · [png](06-formats/099-emoji-clin.png) |
| 100 | Emoji amoureux | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/100-emoji-amour.svg) · [png](06-formats/100-emoji-amour.png) |
| 101 | Emoji surpris | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/101-emoji-surpris.svg) · [png](06-formats/101-emoji-surpris.png) |
| 102 | Emoji triste | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/102-emoji-triste.svg) · [png](06-formats/102-emoji-triste.png) |
| 103 | Emoji cool | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/103-emoji-cool.svg) · [png](06-formats/103-emoji-cool.png) |
| 104 | Emoji fête | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/104-emoji-fete.svg) · [png](06-formats/104-emoji-fete.png) |
| 105 | Emoji K.O. | Emoji personnalisé (Slack, Teams, Discord) — 256 px | 256×256 | [svg](06-formats/105-emoji-ko.svg) · [png](06-formats/105-emoji-ko.png) |
| 106 | Bannière de profil | En-tête LinkedIn / X / GitHub (1500×500) | 1500×500 | [svg](06-formats/106-banniere-profil.svg) · [png](06-formats/106-banniere-profil.png) |
| 107 | Miniature vidéo | Miniature YouTube (1280×720) | 1280×720 | [svg](06-formats/107-miniature-video.svg) · [png](06-formats/107-miniature-video.png) |
| 108 | Post d’annonce | Post carré réseaux sociaux (1080×1080) | 1080×1080 | [svg](06-formats/108-post-annonce.svg) · [png](06-formats/108-post-annonce.png) |
| 109 | Story verticale | Story Instagram / Reels / Shorts (1080×1920) | 1080×1920 | [svg](06-formats/109-story.svg) · [png](06-formats/109-story.png) |
| 110 | Slide de titre | Ouverture de présentation (1920×1080) | 1920×1080 | [svg](06-formats/110-slide-titre.svg) · [png](06-formats/110-slide-titre.png) |
| 111 | Slide intercalaire | Séparateur de chapitre (1920×1080) | 1920×1080 | [svg](06-formats/111-slide-section.svg) · [png](06-formats/111-slide-section.png) |
| 112 | Slide de fin | Remerciements / questions (1920×1080) | 1920×1080 | [svg](06-formats/112-slide-merci.svg) · [png](06-formats/112-slide-merci.png) |
| 113 | Bandeau nominatif | Lower third vidéo, fond transparent (1920×1080) | 1920×1080 | [svg](06-formats/113-lower-third.svg) · [png](06-formats/113-lower-third.png) |
| 114 | Invitation meetup | Affiche / post portrait (1080×1350) | 1080×1350 | [svg](06-formats/114-invitation-meetup.svg) · [png](06-formats/114-invitation-meetup.png) |
| 115 | Contour (line art) | Impression monochrome, coloriage, gravure | 1024×1024 | [svg](06-formats/115-contour.svg) · [png](06-formats/115-contour.png) |
| 116 | Silhouette | Filigrane, masque, fond sombre | 1024×1024 | [svg](06-formats/116-silhouette.svg) · [png](06-formats/116-silhouette.png) |
| 117 | Badge « Premier commit » | Badge de réussite, gamification | 512×512 | [svg](06-formats/117-badge-premier-commit.svg) · [png](06-formats/117-badge-premier-commit.png) |
| 118 | Badge « Contributeur » | Badge open source, remerciement | 512×512 | [svg](06-formats/118-badge-contributeur.svg) · [png](06-formats/118-badge-contributeur.png) |
| 119 | Indicateur de chargement | Écran de chargement d’app (anneau + tête) | 512×512 | [svg](06-formats/119-spinner.svg) · [png](06-formats/119-spinner.png) |
| 120 | L'équipe | Page équipe, travail collaboratif (1920×1080) | 1920×1080 | [svg](06-formats/120-equipe.svg) · [png](06-formats/120-equipe.png) |
| 121 | Pair programming | Binôme, mentorat, revue en direct (1600×900) | 1600×900 | [svg](06-formats/121-binome.svg) · [png](06-formats/121-binome.png) |
| 122 | Planche de stickers | Impression de stickers, aperçu de pack (2048×1536) | 2048×1536 | [svg](06-formats/122-planche-stickers.svg) · [png](06-formats/122-planche-stickers.png) |
| 123 | Fond d'écran | Fond d’écran bureau / visio (1920×1080) | 1920×1080 | [svg](06-formats/123-fond-ecran.svg) · [png](06-formats/123-fond-ecran.png) |

## Équipe — plusieurs bots ensemble (collaboration, réunions, célébrations, formats d’équipe)

![planche](_planche-08-equipe.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 124 | Photo d'équipe | Page « équipe », annonce, carte de vœux | 1600×900 | [svg](08-equipe/124-photo-equipe.svg) · [png](08-equipe/124-photo-equipe.png) |
| 125 | Tope là ! | Collaboration réussie, accord, PR approuvée | 1600×900 | [svg](08-equipe/125-high-five.svg) · [png](08-equipe/125-high-five.png) |
| 126 | Pair programming | Binôme, mentorat, live coding à deux | 1600×900 | [svg](08-equipe/126-binome.svg) · [png](08-equipe/126-binome.png) |
| 127 | Réunion | Réunion d’équipe, atelier, rétrospective | 1600×900 | [svg](08-equipe/127-reunion.svg) · [png](08-equipe/127-reunion.png) |
| 128 | Daily / stand-up | Point quotidien, synchro rapide | 1600×900 | [svg](08-equipe/128-daily.svg) · [png](08-equipe/128-daily.png) |
| 129 | Revue de code | Pull request relue à deux, feedback | 1600×900 | [svg](08-equipe/129-revue-de-code.svg) · [png](08-equipe/129-revue-de-code.png) |
| 130 | Célébration | Release livrée, sprint terminé, fête d’équipe | 1600×900 | [svg](08-equipe/130-celebration.svg) · [png](08-equipe/130-celebration.png) |
| 131 | Trophée d'équipe | Victoire collective, hackathon gagné | 1600×900 | [svg](08-equipe/131-trophee-equipe.svg) · [png](08-equipe/131-trophee-equipe.png) |
| 132 | Bienvenue dans l’équipe | Onboarding, arrivée d’un·e collègue | 1600×900 | [svg](08-equipe/132-bienvenue.svg) · [png](08-equipe/132-bienvenue.png) |
| 133 | Mentorat | Transmission, formation, pair learning | 1600×900 | [svg](08-equipe/133-mentorat.svg) · [png](08-equipe/133-mentorat.png) |
| 134 | Hackathon | Hackathon, game jam, sprint intense | 1600×900 | [svg](08-equipe/134-hackathon.svg) · [png](08-equipe/134-hackathon.png) |
| 135 | Passage de relais | DevOps, handoff dev → ops, livraison | 1600×900 | [svg](08-equipe/135-relais-devops.svg) · [png](08-equipe/135-relais-devops.png) |
| 136 | Réunion à distance | Visio, équipe distribuée, télétravail | 1600×900 | [svg](08-equipe/136-visio.svg) · [png](08-equipe/136-visio.png) |
| 137 | Conférence | Talk, meetup, public attentif | 1600×900 | [svg](08-equipe/137-conference.svg) · [png](08-equipe/137-conference.png) |
| 138 | Brainstorming | Idéation, atelier de conception | 1600×900 | [svg](08-equipe/138-brainstorming.svg) · [png](08-equipe/138-brainstorming.png) |
| 139 | Équipe support | Support client, helpdesk, hotline | 1600×900 | [svg](08-equipe/139-support.svg) · [png](08-equipe/139-support.png) |
| 140 | Communauté open source | Contributeurs, merci à la communauté | 1600×900 | [svg](08-equipe/140-open-source.svg) · [png](08-equipe/140-open-source.png) |
| 141 | Pyramide | Entraide, « on se serre les coudes » | 1600×900 | [svg](08-equipe/141-pyramide.svg) · [png](08-equipe/141-pyramide.png) |
| 142 | Selfie d’équipe | Souvenir d’événement, réseaux sociaux | 1600×900 | [svg](08-equipe/142-selfie.svg) · [png](08-equipe/142-selfie.png) |
| 143 | Pause café | Moment convivial, machine à café | 1600×900 | [svg](08-equipe/143-pause-cafe.svg) · [png](08-equipe/143-pause-cafe.png) |
| 144 | Équipe full-stack | Web, mobile, cloud, IA : une équipe .NET | 1600×900 | [svg](08-equipe/144-full-stack.svg) · [png](08-equipe/144-full-stack.png) |
| 145 | Équipe qualité | Tests, QA, chasse aux bugs | 1600×900 | [svg](08-equipe/145-qualite.svg) · [png](08-equipe/145-qualite.png) |
| 146 | Bonjour à tous ! | Ouverture de réunion, newsletter, accueil | 1600×900 | [svg](08-equipe/146-bonjour.svg) · [png](08-equipe/146-bonjour.png) |
| 147 | Merci à l’équipe | Remerciements, fin de projet, kudos | 1600×900 | [svg](08-equipe/147-merci-equipe.svg) · [png](08-equipe/147-merci-equipe.png) |
| 148 | Bannière équipe | En-tête LinkedIn / page d’équipe (1500×500) | 1500×500 | [svg](08-equipe/148-banniere-equipe.svg) · [png](08-equipe/148-banniere-equipe.png) |
| 149 | Slide « L’équipe » | Présentation de l’équipe (1920×1080) | 1920×1080 | [svg](08-equipe/149-slide-equipe.svg) · [png](08-equipe/149-slide-equipe.png) |
| 150 | Story équipe | Story / Reels « rencontrez l’équipe » (1080×1920) | 1080×1920 | [svg](08-equipe/150-story-equipe.svg) · [png](08-equipe/150-story-equipe.png) |
| 151 | Fond d’écran équipe | Fond de visio / bureau (1920×1080) | 1920×1080 | [svg](08-equipe/151-fond-ecran-equipe.svg) · [png](08-equipe/151-fond-ecran-equipe.png) |

## Écosystème .NET — la force et toutes les possibilités de la plateforme (cartes par capacité, hub, affiche, schémas)

![planche](_planche-10-ecosysteme.jpg)

| # | Visuel | Usage | Taille | Fichiers |
|---|---|---|---|---|
| 152 | Web — Sites et applications web | Carte « ce qu’on fait avec .NET » : ASP.NET Core, Blazor, Razor Pages : du site vitrine à l’app SaaS. | 1080×1080 | [svg](10-ecosysteme/152-web.svg) · [png](10-ecosysteme/152-web.png) |
| 153 | API — API et services | Carte « ce qu’on fait avec .NET » : Minimal APIs, gRPC, GraphQL, OpenAPI intégré. | 1080×1080 | [svg](10-ecosysteme/153-api.svg) · [png](10-ecosysteme/153-api.png) |
| 154 | Temps réel — Applications temps réel | Carte « ce qu’on fait avec .NET » : SignalR : chat, tableaux de bord, notifications en direct. | 1080×1080 | [svg](10-ecosysteme/154-temps-reel.svg) · [png](10-ecosysteme/154-temps-reel.png) |
| 155 | Mobile — Applications mobiles | Carte « ce qu’on fait avec .NET » : .NET MAUI : iOS et Android avec un seul code C#. | 1080×1080 | [svg](10-ecosysteme/155-mobile.svg) · [png](10-ecosysteme/155-mobile.png) |
| 156 | Desktop — Applications de bureau | Carte « ce qu’on fait avec .NET » : WinForms, WPF, WinUI, .NET MAUI pour Windows et macOS. | 1080×1080 | [svg](10-ecosysteme/156-desktop.svg) · [png](10-ecosysteme/156-desktop.png) |
| 157 | Multiplateforme — Windows, macOS, Linux | Carte « ce qu’on fait avec .NET » : Un même code, sur PC, Mac, serveurs Linux, Arm et x64. | 1080×1080 | [svg](10-ecosysteme/157-multiplateforme.svg) · [png](10-ecosysteme/157-multiplateforme.png) |
| 158 | Cloud-native — Applications cloud-native | Carte « ce qu’on fait avec .NET » : .NET Aspire : orchestration, observabilité, déploiement. | 1080×1080 | [svg](10-ecosysteme/158-cloud-native.svg) · [png](10-ecosysteme/158-cloud-native.png) |
| 159 | Microservices — Microservices distribués | Carte « ce qu’on fait avec .NET » : Services découplés, messagerie, API gateway (YARP). | 1080×1080 | [svg](10-ecosysteme/159-microservices.svg) · [png](10-ecosysteme/159-microservices.png) |
| 160 | Conteneurs — Conteneurs et Kubernetes | Carte « ce qu’on fait avec .NET » : Images optimisées, publication de conteneurs sans Dockerfile. | 1080×1080 | [svg](10-ecosysteme/160-conteneurs.svg) · [png](10-ecosysteme/160-conteneurs.png) |
| 161 | Serverless — Fonctions serverless | Carte « ce qu’on fait avec .NET » : Azure Functions, AWS Lambda : du code, sans serveur à gérer. | 1080×1080 | [svg](10-ecosysteme/161-serverless.svg) · [png](10-ecosysteme/161-serverless.png) |
| 162 | IA — Intelligence artificielle | Carte « ce qu’on fait avec .NET » : Microsoft.Extensions.AI, Semantic Kernel, agents et LLM. | 1080×1080 | [svg](10-ecosysteme/162-ia.svg) · [png](10-ecosysteme/162-ia.png) |
| 163 | Machine learning — Machine learning | Carte « ce qu’on fait avec .NET » : ML.NET, ONNX Runtime : entraîner et prédire en C#. | 1080×1080 | [svg](10-ecosysteme/163-machine-learning.svg) · [png](10-ecosysteme/163-machine-learning.png) |
| 164 | Données — Accès aux données | Carte « ce qu’on fait avec .NET » : Entity Framework Core, SQL, NoSQL, LINQ. | 1080×1080 | [svg](10-ecosysteme/164-donnees.svg) · [png](10-ecosysteme/164-donnees.png) |
| 165 | Jeux — Jeux vidéo | Carte « ce qu’on fait avec .NET » : Unity, Godot, MonoGame, Stride : le C# du jeu vidéo. | 1080×1080 | [svg](10-ecosysteme/165-jeux.svg) · [png](10-ecosysteme/165-jeux.png) |
| 166 | 3D — Graphisme 3D et multimédia | Carte « ce qu’on fait avec .NET » : Silk.NET : OpenGL, Vulkan, DirectX, audio. | 1080×1080 | [svg](10-ecosysteme/166-graphisme-3d.svg) · [png](10-ecosysteme/166-graphisme-3d.png) |
| 167 | IoT — Objets connectés | Carte « ce qu’on fait avec .NET » : .NET nanoFramework, Meadow, Raspberry Pi. | 1080×1080 | [svg](10-ecosysteme/167-iot.svg) · [png](10-ecosysteme/167-iot.png) |
| 168 | WebAssembly — .NET dans le navigateur | Carte « ce qu’on fait avec .NET » : Blazor WebAssembly : du C# côté client, sans plugin. | 1080×1080 | [svg](10-ecosysteme/168-webassembly.svg) · [png](10-ecosysteme/168-webassembly.png) |
| 169 | CLI — Outils en ligne de commande | Carte « ce qu’on fait avec .NET » : dotnet new, run, publish : des outils et scripts en C#. | 1080×1080 | [svg](10-ecosysteme/169-outils-cli.svg) · [png](10-ecosysteme/169-outils-cli.png) |
| 170 | Workers — Services en arrière-plan | Carte « ce qu’on fait avec .NET » : Worker services, files de messages, tâches planifiées. | 1080×1080 | [svg](10-ecosysteme/170-services-arriere-plan.svg) · [png](10-ecosysteme/170-services-arriere-plan.png) |
| 171 | Orleans — Systèmes distribués | Carte « ce qu’on fait avec .NET » : Orleans : acteurs virtuels à l’échelle du cloud. | 1080×1080 | [svg](10-ecosysteme/171-acteurs-distribues.svg) · [png](10-ecosysteme/171-acteurs-distribues.png) |
| 172 | Résilience — Applications résilientes | Carte « ce qu’on fait avec .NET » : Polly : retries, circuit breakers, timeouts. | 1080×1080 | [svg](10-ecosysteme/172-resilience.svg) · [png](10-ecosysteme/172-resilience.png) |
| 173 | Sécurité — Sécurité et identité | Carte « ce qu’on fait avec .NET » : Authentification, autorisation, OpenID Connect, chiffrement. | 1080×1080 | [svg](10-ecosysteme/173-securite.svg) · [png](10-ecosysteme/173-securite.png) |
| 174 | Tests — Tests automatisés | Carte « ce qu’on fait avec .NET » : xUnit, NUnit, MSTest, tests d’intégration. | 1080×1080 | [svg](10-ecosysteme/174-tests.svg) · [png](10-ecosysteme/174-tests.png) |
| 175 | Roslyn — Compilateur ouvert | Carte « ce qu’on fait avec .NET » : Roslyn : analyseurs, correctifs, générateurs de source. | 1080×1080 | [svg](10-ecosysteme/175-compilateur.svg) · [png](10-ecosysteme/175-compilateur.png) |
| 176 | Performance — Performance de haut niveau | Carte « ce qu’on fait avec .NET » : JIT optimisé, Span<T>, SIMD : parmi les frameworks les plus rapides. | 1080×1080 | [svg](10-ecosysteme/176-performance.svg) · [png](10-ecosysteme/176-performance.png) |
| 177 | Native AOT — Compilation native AOT | Carte « ce qu’on fait avec .NET » : Démarrage instantané, binaires compacts, faible mémoire. | 1080×1080 | [svg](10-ecosysteme/177-native-aot.svg) · [png](10-ecosysteme/177-native-aot.png) |
| 178 | Langages — C#, F# et Visual Basic | Carte « ce qu’on fait avec .NET » : Trois langages, un seul runtime, une seule plateforme. | 1080×1080 | [svg](10-ecosysteme/178-langages.svg) · [png](10-ecosysteme/178-langages.png) |
| 179 | Open source — 100 % open source | Carte « ce qu’on fait avec .NET » : Licence MIT, développé sur GitHub avec la communauté. | 1080×1080 | [svg](10-ecosysteme/179-open-source.svg) · [png](10-ecosysteme/179-open-source.png) |
| 180 | NuGet — Un immense écosystème | Carte « ce qu’on fait avec .NET » : NuGet : des centaines de milliers de paquets prêts à l’emploi. | 1080×1080 | [svg](10-ecosysteme/180-nuget.svg) · [png](10-ecosysteme/180-nuget.png) |
| 181 | Outils — Outils de développement | Carte « ce qu’on fait avec .NET » : Visual Studio, VS Code, Rider, Hot Reload, débogueur. | 1080×1080 | [svg](10-ecosysteme/181-outils.svg) · [png](10-ecosysteme/181-outils.png) |
| 182 | LTS — Support long terme | Carte « ce qu’on fait avec .NET » : Une version par an, des versions LTS supportées trois ans. | 1080×1080 | [svg](10-ecosysteme/182-support-long-terme.svg) · [png](10-ecosysteme/182-support-long-terme.png) |
| 183 | Interop — Interopérabilité native | Carte « ce qu’on fait avec .NET » : P/Invoke, C/C++, COM, Java et Objective-C. | 1080×1080 | [svg](10-ecosysteme/183-interop.svg) · [png](10-ecosysteme/183-interop.png) |
| 184 | Une plateforme pour tout construire | Slide d’ouverture, keynote, page d’accueil (1920×1080) | 1920×1080 | [svg](10-ecosysteme/184-hub.svg) · [png](10-ecosysteme/184-hub.png) |
| 185 | Tout ce que l’on construit avec .NET | Affiche / infographie portrait (2160×3240) | 2160×3240 | [svg](10-ecosysteme/185-affiche.svg) · [png](10-ecosysteme/185-affiche.png) |
| 186 | Écrire une fois, exécuter partout | Bannière (1500×500) | 1500×500 | [svg](10-ecosysteme/186-multiplateforme-banniere.svg) · [png](10-ecosysteme/186-multiplateforme-banniere.png) |
| 187 | Une pile unifiée | Schéma de la plateforme (1920×1080) | 1920×1080 | [svg](10-ecosysteme/187-pile-unifiee.svg) · [png](10-ecosysteme/187-pile-unifiee.png) |
| 188 | Un bot par workload | Tous les métiers .NET (1920×1080) | 1920×1080 | [svg](10-ecosysteme/188-equipe-workloads.svg) · [png](10-ecosysteme/188-equipe-workloads.png) |
| 189 | Story « Avec .NET, on peut… » | Story / Reels (1080×1920) | 1080×1920 | [svg](10-ecosysteme/189-story-possibilites.svg) · [png](10-ecosysteme/189-story-possibilites.png) |
| 190 | Un langage, toutes les plateformes | Post carré réseaux sociaux (1080×1080) | 1080×1080 | [svg](10-ecosysteme/190-post-un-langage.svg) · [png](10-ecosysteme/190-post-un-langage.png) |
