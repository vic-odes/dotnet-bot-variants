# SPEC — Match 1 : dotnet-bot vs Gopher (Arcade)

GOAL:    le spectateur voit chaque nouveauté de Go 1.27 frapper, puis C# 15 / .NET 11 répondre coup pour coup,
         et rit quand `break outer;` éjecte le Gopher du ring.
OUTPUT:  HyperFrames, 1080 x 1920, 30 fps, MP4 H.264 (Shorts / TikTok).
TIME:    90 s x 30 = 2700 images. Musique 150 BPM → 12 images par temps, 48 par mesure (1,6 s).
         Chaque échange = 4 mesures = 6,4 s.

LOOK (jeu de combat 2D, vue de profil, charte .NET — charte/BRAND-DOTNET.md) :
  - Salle : fond #0F042C ; 3 rangées de public en ombres (têtes rondes 34–46 px) #190649 / #14053A,
    décalées, sans détail ; un projecteur = halo radial #B9AAEE à 22 % centré au-dessus du ring (pas de dégradé plein écran).
  - Ring : plancher en perspective (trapèze, haut 860 px, bas 1080 px, y 1040→1230) toile #EEEAFB, bord avant #B9AAEE ;
    tablier y 1230→1520 #512BD4 avec « CHAMPIONNAT .NET · POULE A » Space Grotesk 700 44 px blanc (élément du décor,
    pas un logo collé) ; 3 cordes 10 px #D600AA / #FFFFFF / #0B6CFF ; poteaux #311A7F, coussin magenta (coin dotnet-bot,
    gauche) et cyan #28C2D1 (coin Gopher, droite).
  - Combattants : dotnet-bot à gauche (pieds x≈300, y 1150), Gopher à droite (pieds x≈780, y 1150), ≈ 560 px de haut,
    pantins vectoriels articulés, ombre portée ellipse #0F042C à 35 %.
  - Équipes : dotnet-bot = violet #512BD4 → magenta #D600AA ; Gopher = cyan #28C2D1 (couleurs .NET, proches du bleu Go).
  - Interface : bandeau y 190–330. Noms Space Grotesk 700 40 px #FFFFFF ; barres de vie 430 x 36 px inclinées -12°,
    fond #190649, remplissage équipe, traînée de dégâts #F65163 qui rattrape avec 0,35 s de retard ; pastille centrale « R1 ».
  - Annonces : ROUND 1 / FIGHT! / K.O. / VICTOIRE en Space Grotesk 700 200–260 px, #F7B548, contour 12 px #14053A, y≈700.
  - Cartes de fonctionnalité : dalle inclinée -6°, 920 px de large, bordure 6 px #FFFFFF, coins 18 px.
    dotnet-bot : fond #512BD4, texte #FFFFFF. Gopher : fond #28C2D1, texte #14053A.
    Étiquette de version Space Mono 700 30 px (« C# 15 », « GO 1.27 ») ; nom Space Grotesk 700 84 px, 3 mots maxi ;
    ligne de code Space Mono 400 30 px #B6D3FF sur panneau #190649 (≤ 40 caractères).
    Zone : y 380–900, toujours dans la bande lisible 168–1330.
  - Gerbes : à la place du sang, bugs (icône Fluent `bug`) #F65163 et jetons d'erreur Space Mono 700 26–34 px
    (`panic:`, `nil`, `NullReferenceException`, `0xDEAD`, `err`) en #F65163 / #F7B548, trajectoires balistiques, 0,9 s.
  - Rien de lisible sous y = 1330 (interface de la plateforme).

OBJECTS:
  - dotnet-bot : grosse tête ronde violette, visière blanche avec deux yeux ovales, antenne, bande lavande, petit bassin,
    bras et jambes à deux segments, bottes. D'après le bot 3D du style guide 2024 (même dessin que variants/).
  - Gopher : corps en haricot bleu clair, gros yeux blancs ronds à pupilles, museau beige, deux incisives, oreilles rondes,
    petites pattes. D'après Renée French (CC BY 4.0), redessiné en pantin.
  - Épées : lame 260 px #E7F0FF à arête #9DC4FF, garde dans la couleur d'équipe ; traînée de lame = arc 0,12 s couleur d'équipe à 60 %.
  - Mini-gophers (goroutines) : 6 petits gophers de 90 px pour le gag `goroutineleak`.

MOTION:
  - Anticipation 0,25 s power2.in (recul du corps 30 px, bras armé) ; frappe 0,12 s expo.out ; arrêt sur image 4 images
    à l'impact ; recul de la victime back.out(1.4) 0,35 s, 60–90 px ; retour en garde 0,5 s power2.inOut.
  - Garde vivante : respiration scaleY 1→1,025 sur 2 temps, décalée entre les deux personnages ; jamais les deux bras ensemble.
  - Caméra (wrapper) : coup de zoom 1→1,08 en 0,08 s expo.out vers l'impact, retour 0,5 s power2.inOut ;
    secousse ±12 px pendant 6 images, tirée d'un aléa à graine fixe.
  - Carte : surgit du point d'impact, scale 0,2→1 + rotation -20°→-6° en 0,25 s back.out(1.6), immobile pendant la lecture
    (≥ 2,6 s), sort en 0,15 s (scale 1→0,9, flou 8 px, opacité 0). Le texte ne bouge jamais pendant qu'on le lit.
  - Barres de vie : chute en 0,2 s power3.out, traînée rouge en 0,5 s après 0,35 s.
  - Annonces : claquent en 0,15 s (scale 1,6→1) puis tiennent ; sortie 0,12 s.
  - Chaque attaque a son geste : coup de taille vertical, estoc, moulinet, saut, parade-riposte, traversée ; jamais deux fois le même d'affilée.

SHOTS (secondes, voir STORYBOARD.md) :
  01  0,0–3,2   face-à-face en garde, « dotnet-bot VS Gopher » claque à 0,3 s ; lecture 0,3–3,0.
  02  3,2–8,0   cartes des combattants : « .NET 11 · C# 15 » / « Go 1.27 », « POULE A · JOURNÉE 1 ».
  03  8,0–11,2  ROUND 1 (8,2) puis FIGHT! (9,8), sur les temps forts.
  04–11 11,2–62,4  8 échanges de 6,4 s (BRIEF.md) : impact à +1,1 s, carte lisible +1,35→+4,4 s, retour en garde.
  12  62,4–68,8 combo dotnet-bot : Extension indexers puis `[with(capacity: 64), ..]`, deux cartes à 1,6 s d'écart.
  13  68,8–75,2 `break outer;` : dotnet-bot traverse, le Gopher passe par-dessus les cordes et sort du cadre ; musique coupée net.
  14  75,2–80,0 K.O. : le Gopher étourdi hors du ring (yeux en spirale), « K.O. » claque.
  15  80,0–84,8 VICTOIRE : dotnet-bot épée levée, « +3 PTS ».
  16  84,8–90,0 classement de la poule A + « Prochain combat : Alien (Lisp) vs Ziggy (Zig) ».

SOUND: synthwave de combat 150 BPM (outils/synth_synthwave.py) qui entre fort sur la mesure 1 ; bruitages : lame (2 ou 3 prises
       en rotation), impact sur chaque touche, parade métallique sur l'échange 7 ; silence net sur `break outer;`, puis jingle du K.O.

BANNED: fond vide sombre avec de petits éléments au milieu ; lueurs, néons, particules décoratives (seules les gerbes d'impact,
        causées par un coup) ; dégradés plein écran ; tout qui entre en fondu-glissé vers le haut ; texte qui bouge pendant
        qu'on le lit ; logo collé dans un coin ; trois cartes en rangée ; le même coup deux fois de suite ; les deux bras ou
        les deux personnages qui bougent à l'unisson ; sang.

QA:
  - 0,3 s : le titre VS est déjà là (vignette), les deux combattants lisibles.
  - chaque +1,5 s d'échange : carte entière dans la bande 380–900, texte ≥ 28 px, pas de chevauchement avec l'interface.
  - 70 s : le Gopher en l'air au-dessus des cordes, `break outer;` lisible.
  - 85 s : classement lisible, rien sous y 1330.
