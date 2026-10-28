# SPEC — Combat n°2 : Alien (Lisp) vs Ziggy (Zig) (Arcade ninja, CODE NINJA)

GOAL:    le spectateur voit les macros, le REPL et CLOS de Lisp toucher Ziggy, puis comptime, l'interop C et la
         cross-compilation de Zig reprendre le dessus, et rit quand `return error.KO;` envoie l'Alien au ramasse-miettes.
OUTPUT:  HyperFrames, 1080 x 1920, 60 fps (flou de mouvement), MP4 H.264 (Shorts / TikTok).
TIME:    90 s. Musique 150 BPM (1,6 s par mesure) ; un échange toutes les 7 s à partir de 5,6 s.

LOOK : identique au combat n°1 (voir sa SPEC) : rue de nuit .NET, enseigne néon « CODE NINJA », réverbère et panneau
  « RUE DU CODE » comme appuis, interface (barres de vie, pastille R1), cartes, annonces et polices inchangées.
  Seules différences, tirées des données du combat :
  - Équipes : Alien = violet #512BD4 → magenta #D600AA (cartes violettes, texte blanc) ; Ziggy = jaune #F7B548
    (cartes jaunes, texte #14053A, barre de vie jaune, nom jaune sur l'écran VS). Couleurs de la charte .NET.
  - Benne du K.O. étiquetée « (gc) » en blanc, légende « Alien part au ramasse-miettes ».

OBJECTS:
  - Alien (rigs.mjs `alien`, échelle 1,0) : haricot vert #8DE17A à écailles #55D85A, contour #3F7F3A, trois yeux sur le dessus,
    grand sourire, quatre pattes fines (deux par articulation) à orteils ronds, long bras qui tient l'épée (le drapeau LISP
    de l'original devient l'épée), bandeau de ninja sous les yeux. D'après Conrad Barski (domaine public).
  - Ziggy (rigs.mjs `ziggy`, échelle 0,75) : iguane orange #FBB040 redressé, ventre #F15A29, crête noire en pointes sur le dos
    et la tête, gros œil, museau arrondi, queue enroulée derrière, pattes à griffes. D'après ziglang/logo (CC BY 4.0).
  - Mini-Aliens (6, échelle 0,36) : les appels récursifs du gag `chute`.
  - Épées communes ; garde magenta (Alien) et jaune (Ziggy) ; traînée de lame de la même couleur.

MOTION : identique au combat n°1 (générateur commun `championnat/generateur/match.mjs`).

SHOTS (secondes) :
  01  0,0–1,9   CODE NINJA + « Alien (Common Lisp · SBCL 2.6.9) VS Ziggy (Zig 0.17) » dès l'image 0.
  02  1,9–4,0   présentation éclair : zoom Alien, zoom Ziggy.
  03  4,0–5,6   ROUND 1 puis FIGHT!
  04–13 5,6–75,6  10 échanges (ci-dessous) ; `return error.KO;` à 69,5 s coupe la musique.
  14  75,6–80,0 K.O., la caméra glisse vers la benne (gc).
  15  80,0–83,0 VICTOIRE de Ziggy, « +3 PTS ».
  16  83,0–86,6 classement CODE NINJA · POULE A + prochain combat (Poney vs Kodee).
  17  86,7–90,0 carton final LIKE + ABONNE-TOI.
  Rappel : 38,4–40,5 s, « Team Alien ? LIKE ».

ÉCHANGES (attaquant, approche, geste, dégâts, carte) :
  1  5,6  Alien  choc    taille    15  LISP · LANGAGE — Frappe des macros — (defmacro swap (a b) `(rotatef ,a ,b))
  2  12,6 Ziggy  saut    estoc     20  ZIG · LANGAGE — Estoc comptime — const n = comptime fib(10);
  3  19,6 Alien  corde   shuriken  10  LISP · OUTILLAGE — Shurikens du REPL — on redéfinit une fonction sans arrêter le programme
  4  26,6 Ziggy  fumée   taille    15  ZIG · INTEROP — Lame C sans liaison — const c = @cImport(@cInclude("zlib.h"));
  5  33,6 Alien  saut    toupie    10  LISP · LANGAGE — Tornade multiméthode — (defmethod hit ((a alien) (b iguana)) …)
  6  40,6 Ziggy  corde   revers    15  ZIG · DÉPLOIEMENT — Revers cross-compilé — zig cc -target aarch64-linux main.c
  7  47,6 Alien  choc    parade     0  LISP · EXÉCUTION — Lame compilée native — SBCL compile en code machine, SIMD AVX512
                                       riposte ZIG 0.17 · MÉMOIRE — Bouclier SafeAllocator — fuites et double free signalés au deinit
  8  54,6 Alien  —       chute     15  LISP · DÉBOGAGE — Chute rattrapée — erreur : le débogueur propose des restarts, pile intacte
  9  61,6 Ziggy  fumée   combo    7+8  ZIG 0.17 · OUTILLAGE — Compilation incrémentale — zig build -fincremental --watch
                                       ZIG · ÉCOSYSTÈME — Arsenal Ghostty — le cœur du terminal Ghostty est écrit en Zig
  10 68,6 Ziggy  —       final     20  TECHNIQUE SECRÈTE · ZIG — return error.KO;

SOUND: synthwave 150 BPM, fa mineur, grille i-VII-VI-V (Fm-Eb-Db-C), `synth_synthwave.py --key fm --grille i-VII-VI-V` ;
       bruitages et placements identiques au combat n°1 ; silence net sur `return error.KO;`, puis cloche du K.O.

QA:
  - 0,3 s : titre VS déjà là, les deux combattants lisibles.
  - chaque +1,5 s d'échange : carte entière dans la bande 380–900, pas de chevauchement avec l'interface.
  - 77 s : benne (gc) et légende lisibles ; 85 s : classement lisible, rien sous y 1330.
