# Prompt — générer le combat suivant de CODE NINJA

Copier le bloc ci-dessous dans une nouvelle session Claude Code (dépôt `vic-odes/dotnet-bot-variants`) en remplaçant
`<N>` par le numéro du combat (voir le calendrier de `championnat/README.md`). Ajouter au besoin une ligne
« Vainqueur : … » ou « Remarques : … ».

---

```text
Produis le combat n°<N> du championnat CODE NINJA, dans le dépôt vic-odes/dotnet-bot-variants (branche main).

## À lire d'abord
- championnat/README.md : poules et calendrier (le combat n°<N>, sa phase, sa journée).
- championnat/generateur/README.md, generateur/match.mjs et generateur/rigs.mjs : le générateur et les pantins.
- championnat/matchs/01-dotnet-bot-vs-gopher.mjs : le modèle de données d'un combat.
- championnat/videos/01-dotnet-bot-vs-gopher/9x16-90s/ : BRIEF.md, SPEC.md, REVIEW.md = la référence validée.
- charte/BRAND-DOTNET.md : couleurs, polices, logos (charte .NET obligatoire).
- mascottes/<techno>/ : les dessins des deux combattants.
- Les skills hyperframes (hyperframes, hyperframes-cli, media-use) avant de toucher une composition.

## Le concept (déjà validé, ne pas le rediscuter)
- Combats de mascottes de langages et frameworks, à l'épée, en motion design, façon jeu de combat Arcade.
- Titre « CODE NINJA ». Combat de rue de nuit (pas de ring), chorégraphie de ninjas : rapide, acrobatique
  (saltos, rebonds sur le réverbère et le panneau, choc en plein vol, téléportation dans la fumée), mouvements
  fluides (articulations décalées, dépassement, foulées), jamais robotiques.
- Mascottes à la taille du combat n°1 (petites dans le cadre), titres et cartes aux tailles du combat n°1.
- Violence de dessin animé : des bugs (icône Fluent bug) et des jetons d'erreur propres au langage giclent, jamais de sang.
- Audio : musique de combat synthwave 150 BPM et bruitages, AUCUN commentateur, aucune voix.
- 9:16, 1080×1920, 90 s, 60 i/s, flou de mouvement.
- Chaque touche est une TECHNIQUE DE COMBAT qui illustre un avantage réel de l'attaquant. Couvrir tous les terrains,
  pas seulement les nouveautés : fonctionnalités du langage, portée et facilité du framework, exécution / performances,
  concurrence, outillage, écosystème, déploiement, communauté… Carte = étiquette « TECHNO · TERRAIN », nom de la
  technique (3 à 5 mots), puis une ligne de code courte OU une note de preuve.
- Rappel « Team <favori> ? LIKE » à mi-combat (entre deux cartes) et carton final LIKE + ABONNE-TOI (icônes Fluent
  pouce et cloche). Puis classement de la poule et annonce du prochain combat.
- dotnet-bot est le champion : il gagne tous ses combats (de préférence avec une technique C# / .NET en coup final).
  Pour un combat sans dotnet-bot : vainqueur indiqué par l'utilisateur, sinon choisi par un tirage à graine
  `championnat-dotnet-bot-2026-<N>` (script déterministe, consigné dans le fichier du combat). Le perdant montre
  quand même ses vrais points forts : c'est un combat équilibré, pas une moquerie.

## Étapes
1. Identifier le combat <N> : les deux combattants, la phase (« POULE X · JOURNÉE J », ou quart / demie / finale).
   Pour la phase finale, calculer qui est qualifié à partir des classements des combats déjà produits
   (championnat/matchs/*.mjs) ; s'il manque des combats de poule, me le dire au lieu d'inventer.
2. Rechercher les avantages de chaque techno, sources officielles, en notant la date de vérification : dernière
   version stable (et ce qui est en préversion), puis les points forts de fond. Aucun fait non vérifié sur une carte.
3. Pantins : si une mascotte n'a pas encore de pantin dans rigs.mjs, la dessiner d'après mascottes/<techno>/ sur le
   squelette commun (jambes, bassin, tête, bras à deux segments, épée, 5 états des yeux, bandeau de ninja avec pans),
   puis l'ajouter à RIGS dans match.mjs (échelle S pour une taille proche des autres, cy, couleur d'accent de la
   charte, hitTokens propres au langage). Généraliser ce qui est encore propre au Gopher dans match.mjs (attache des
   pans du bandeau, mini-combattants du gag `chute`) plutôt que de dupliquer du code. Le combat n°1 doit se
   régénérer à l'identique après ces changements.
4. Écrire championnat/matchs/<NN>-<a>-vs-<b>.mjs sur le modèle du combat n°1 : 10 échanges aux mêmes instants
   (5,6 / 12,6 / … / 68,6), approches variées (choc, saut, corde, fumee) et gestes variés (taille, estoc, revers,
   toupie, shuriken, parade avec riposte, chute, combo, final), jamais le même coup deux fois de suite ; dégâts dont
   la somme met le perdant K.O. au 10e échange ; classement de la poule à jour ; champ `prochain` = combat <N+1>.
   Gag du K.O. adapté au perdant (le Gopher finissait dans la benne /dev/null).
5. Projet : championnat/videos/<NN>-<a>-vs-<b>/9x16-90s/. Partir du projet du combat n°1 (package.json épinglé
   hyperframes@0.8.203, .gitignore, assets/common, assets/sfx) sans ses renders. Musique : régénérer
   assets/audio/combat.wav (76 s) et victoire.wav (10,4 s) avec championnat/outils/synth_synthwave.py --bpm 150
   (venv avec numpy, scipy, soundfile) ; ajouter au script une option --key (tonalité / grille d'accords) pour que
   chaque combat ait sa propre musique, sans changer celle du combat n°1 par défaut.
6. Générer : node championnat/generateur/match.mjs championnat/matchs/<fichier>.mjs <projet>.
   Les fichiers HTML générés ne se modifient jamais à la main.
7. Vérifier : npx hyperframes check (0 erreur) ; snapshots de chaque carte, du rappel LIKE, du K.O., du classement et
   du carton final ; regarder les images (texte lisible, rien sous y = 1330, combattants dans le cadre, pas de
   chevauchement carte / interface).
8. Rendre : npx hyperframes render -q delivery -f 60 -w 4 -o renders/raw.mp4, puis normaliser le son à environ
   −14 LUFS avec un pic vrai ≤ −1 dB (ffmpeg loudnorm + alimiter, vérifier avec ebur128) dans
   renders/championnat-<NN>-<a>-vs-<b>-9x16.mp4 ; supprimer raw.mp4.
9. Rédiger BRIEF.md, SPEC.md, REVIEW.md du projet (choix, faits vérifiés et sources, mesures, plan le plus faible,
   crédits des mascottes et des sons pour la description).
10. Commit et push sur main du dépôt dotnet-bot-variants (rien dans dotnet-video-pr-sentation), puis m'envoyer la
    vidéo et un résumé : les 10 techniques, le vainqueur, ce qui a été vérifié.

## Ne pas faire
- Pas de commentateur, pas de sang, pas de logos déformés ou recolorés, pas d'icônes hors Fluent UI System Icons.
- Pas de GSAP ni de polices chargés depuis un CDN (assets/common).
- Pas de publication YouTube / TikTok sans demande explicite (si demandé : règles de publication du CLAUDE.md de
  dotnet-video-pr-sentation, YouTube en « private » par défaut, pas de < ni > dans le titre et la description).
- Pas de pull request sauf demande.
```

---

## Variantes courtes

- Combat suivant, en automatique : « Produis le prochain combat CODE NINJA non encore produit, en suivant
  championnat/PROMPT.md. »
- Plusieurs combats : « Produis les combats n°<N> à <M> en suivant championnat/PROMPT.md, un commit par combat. »
- Avec storyboard d'abord : ajouter « Montre-moi d'abord les 10 techniques et le storyboard, attends mon accord
  avant le rendu. »
