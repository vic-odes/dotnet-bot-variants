# Trois mises en scène pour le championnat (choix pour les 28 combats)

## A. Arcade (recommandée)

- **Procédé** : les personnages font le travail ; **forme** : un seul plan fixe de jeu de combat, vue de profil,
  avec des zooms secs sur chaque impact.
- **Ce qu'on voit** : un vrai jeu de combat 2D. Barres de vie en haut, chrono, « ROUND 1 / FIGHT! », compteur de
  combo. À chaque touche : arrêt sur image, flash, la carte de la fonctionnalité jaillit du point d'impact, des
  bugs et des octets rouges giclent.
- **Deux premières secondes** : les deux combattants déjà face à face, en garde, sous les projecteurs ;
  « dotnet-bot VS Gopher » claque en travers de l'écran.
- **Temps** : face-à-face → FIGHT! → 8 échanges → combo → `break outer;` → K.O. → classement de la poule → prochain combat.
- **Look** : ring violet .NET sous projecteur (fond uni #0D0A1A + halo radial), Space Grotesk 700 en capitales
  pour l'interface, cartes de fonctionnalités en Space Mono.
- **Son** : synthwave de combat ≈ 150 BPM ; bruitages lame, impacts, parade ; la musique coupe net sur
  `break outer;`, puis le jingle du K.O.

## B. Retransmission TV

- **Procédé** : la retransmission d'un grand combat ; **forme** : montage sur le temps entre plusieurs caméras
  (plan large, gros plan sur les visages, contre-plongée au bord du ring).
- **Ce qu'on voit** : un pay-per-view de boxe. Bandeau de score, ralenti du plus beau coup avec cercles tracés à
  la main autour de la fonctionnalité, panneau de statistiques entre deux échanges.
- **Deux premières secondes** : travelling sur le public en ombres chinoises vers le ring ; le bandeau « POULE A — JOURNÉE 1 » se pose.
- **Temps** : entrée des combattants → échanges en 3 angles → ralenti du coup du match → K.O. → interview muette du vainqueur.
- **Look** : habillage TV sportive aux couleurs .NET, bandeaux pleins, chiffres en Space Mono.
- **Son** : même musique, plus les rumeurs de la foule ; le public explose au K.O.
- **Coût** : plus spectaculaire, mais 3 angles par échange triplent le travail sur 28 vidéos.

## C. Le ring est un IDE (l'option audacieuse)

- **Procédé** : l'objet est l'explication ; **forme** : un seul cadre qui se reconstruit.
- **Ce qu'on voit** : le sol du ring est un éditeur de code, les cordes sont des accolades `{ }`, les barres de vie
  sont des barres de build. Chaque coup tape la vraie ligne de code de la fonctionnalité dans le sol ; les bugs
  giclent en soulignements rouges et en jetons d'erreur. K.O. = « Build failed: Gopher ».
- **Deux premières secondes** : un curseur tape `fight(dotnetBot, gopher);`, le code se replie et devient le ring.
- **Temps** : compilation du ring → échanges qui écrivent le code → erreur fatale du Gopher → « Build succeeded ».
- **Look** : thème d'éditeur sombre .NET, Space Mono partout, coloration syntaxique dans la palette .NET.
- **Son** : même musique, frappe au clavier sur chaque ligne écrite.
- **Risque** : très original et très « dev », mais on lit moins bien les coups d'épée sur téléphone.
