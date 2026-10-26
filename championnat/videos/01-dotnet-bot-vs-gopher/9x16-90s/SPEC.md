# SPEC — Match 1 : dotnet-bot vs Gopher (Arcade ninja, CODE NINJA)

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

MOTION (révision ninja) :
  - Gestes 0,1–0,25 s (armé 0,14 s power2.in, frappe 0,1 s expo.out) ; sauts 0,5–0,75 s, arc power2.out/in, saltos linéaires,
    atterrissage écrasé (1,12 × 0,84 en 0,05 s puis back.out) ; garde = petit rebond toutes les 0,36 s ; pans du bandeau qui flottent.
  - Chaque échange (7 s) : approche acrobatique (choc en plein vol, saut par-dessus avec changement de côté, rebond sur les cordes,
    fumée-téléportation) → touche (taille, estoc, revers, toupie, shuriken) → roulade arrière de la victime → trois chocs rapides
    au sol pendant la lecture de la carte → séparation en salto arrière → menace du prochain attaquant.
  - Combattants bornés entre x 190 et 890 ; écart de garde 290 px.
  - Caméra : coup de zoom 1,08 à chaque touche, secousse ±12 px 5 images.

SHOTS (secondes) :
  01  0,0–1,9   CODE NINJA + « dotnet-bot (.NET 11 · C# 15) VS Gopher (Go 1.27) » dès l'image 0 ; salto arrière des deux ninjas.
  02  1,9–4,0   présentation éclair : zoom dotnet-bot, zoom Gopher.
  03  4,0–5,6   ROUND 1 (cloche) puis FIGHT!
  04–13 5,6–75,6  10 échanges de 7 s (données du combat) ; `break outer;` à 69,5 s coupe la musique.
  14  75,6–80,0 K.O., la caméra glisse vers le Gopher hors du ring.
  15  80,0–83,5 VICTOIRE : salto arrière de dotnet-bot, « +3 PTS ».
  16  83,5–90,0 classement CODE NINJA · POULE A + prochain combat.

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
