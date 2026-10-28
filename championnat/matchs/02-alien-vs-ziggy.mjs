// Combat n°2 — Poule A, journée 1 : Alien (Lisp) vs Ziggy (Zig).
// Vainqueur tiré au sort (pas de dotnet-bot) : node championnat/vainqueur.mjs 2 Alien Ziggy
//   graine championnat-dotnet-bot-2026-2 : 0.601252 -> vainqueur droite (Ziggy)
// Avantages vérifiés le 2026-10-28 : ziglang.org/download (Zig 0.17.0, 1er octobre 2026) et ses notes de version ;
// ziglang.org (comptime, compilateur C/C++ avec cross-compilation) ; github.com/ghostty-org/ghostty (cœur en Zig) ;
// sbcl.org (SBCL 2.6.9, 26 septembre 2026, compilateur natif, environnement interactif) ; Common Lisp HyperSpec
// (macros, CLOS, conditions et restarts) ; McCarthy invente le ramasse-miettes pour Lisp vers 1959.
// Approches acrobatiques : choc (choc en plein vol), saut (par-dessus l'adversaire), corde (rebond sur le réverbère ou le panneau), fumee (téléportation).
// Gestes de touche : taille, estoc, revers, toupie, shuriken ; cas spéciaux : parade, chute (gag), combo, final.
export default {
  numero: 2,
  titre: 'CODE NINJA',
  phase: 'POULE A · JOURNÉE 1',
  gauche: { id: 'lisp', nom: 'Alien', version: 'Common Lisp · SBCL 2.6.9' },
  droite: { id: 'zig', nom: 'Ziggy', version: 'Zig 0.17' },
  // Chaque touche = une technique de combat qui illustre un avantage réel (tag = le terrain). Faits vérifiés le 2026-10-28.
  echanges: [
    { at: 5.6, qui: 'gauche', approche: 'choc', geste: 'taille', degats: 15,
      carte: { tag: 'LISP · LANGAGE', nom: 'Frappe des macros', code: '(defmacro swap (a b) `(rotatef ,a ,b))' } },
    { at: 12.6, qui: 'droite', approche: 'saut', geste: 'estoc', degats: 20,
      carte: { tag: 'ZIG · LANGAGE', nom: 'Estoc comptime', code: 'const n = comptime fib(10);' } },
    { at: 19.6, qui: 'gauche', approche: 'corde', geste: 'shuriken', degats: 10,
      carte: { tag: 'LISP · OUTILLAGE', nom: 'Shurikens du REPL', note: 'on redéfinit une fonction sans arrêter le programme' } },
    { at: 26.6, qui: 'droite', approche: 'fumee', geste: 'taille', degats: 15,
      carte: { tag: 'ZIG · INTEROP', nom: 'Lame C sans liaison', code: 'const c = @cImport(@cInclude("zlib.h"));' } },
    { at: 33.6, qui: 'gauche', approche: 'saut', geste: 'toupie', degats: 10,
      carte: { tag: 'LISP · LANGAGE', nom: 'Tornade multiméthode', code: '(defmethod hit ((a alien) (b iguana)) …)' } },
    { at: 40.6, qui: 'droite', approche: 'corde', geste: 'revers', degats: 15,
      carte: { tag: 'ZIG · DÉPLOIEMENT', nom: 'Revers cross-compilé', code: 'zig cc -target aarch64-linux main.c' } },
    { at: 47.6, qui: 'gauche', approche: 'choc', geste: 'parade', degats: 0,
      carte: { tag: 'LISP · EXÉCUTION', nom: 'Lame compilée native', note: 'SBCL compile en code machine, SIMD AVX512' },
      riposte: { tag: 'ZIG 0.17 · MÉMOIRE', nom: 'Bouclier SafeAllocator', note: 'fuites et double free signalés au deinit' } },
    { at: 54.6, qui: 'gauche', geste: 'chute', degats: 15, mini: 6,
      carte: { tag: 'LISP · DÉBOGAGE', nom: 'Chute rattrapée', note: 'erreur : le débogueur propose des restarts, pile intacte' } },
    { at: 61.6, qui: 'droite', approche: 'fumee', geste: 'combo', degats: [7, 8],
      cartes: [
        { tag: 'ZIG 0.17 · OUTILLAGE', nom: 'Compilation incrémentale', code: 'zig build -fincremental --watch' },
        { tag: 'ZIG · ÉCOSYSTÈME', nom: 'Arsenal Ghostty', note: 'le cœur du terminal Ghostty est écrit en Zig' },
      ] },
    { at: 68.6, qui: 'droite', geste: 'final', degats: 20,
      carte: { tag: 'TECHNIQUE SECRÈTE · ZIG', nom: 'return error.KO;', grand: true } },
  ],
  ko: 75.6,
  fin: 80.0,
  vainqueur: 'droite',
  // Lisp a inventé le ramasse-miettes (McCarthy, vers 1959) : l'Alien finit dans la benne du GC.
  gag: { benne: '(gc)', couleur: '#FFFFFF', legende: 'Alien part au ramasse-miettes' },
  classement: [
    { nom: 'dotnet-bot', techno: '.NET', j: 1, pts: 3 },
    { nom: 'Ziggy', techno: 'Zig', j: 1, pts: 3 },
    { nom: 'Gopher', techno: 'Go', j: 1, pts: 0 },
    { nom: 'Alien', techno: 'Lisp', j: 1, pts: 0 },
  ],
  prochain: { titre: 'Poney (Django) vs Kodee (Kotlin)', images: ['mascottes/django/poney-django.png', 'mascottes/kotlin/png/kodee-greeting.png'] },
};
