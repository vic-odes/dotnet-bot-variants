// Combat n°1 — Poule A, journée 1 : dotnet-bot vs Gopher.
// Fonctionnalités vérifiées le 2026-10-26 : go.dev/doc/go1.27 (Go 1.27, 19 août 2026) ;
// learn.microsoft.com « What's new in C# 15 » et « What's new in .NET 11 » (RC2, GA prévue en novembre 2026).
// Approches acrobatiques : choc (choc en plein vol), saut (par-dessus l'adversaire), corde (rebond sur le réverbère ou le panneau), fumee (téléportation).
// Gestes de touche : taille, estoc, revers, toupie, shuriken ; cas spéciaux : parade, chute (gag), combo, final.
export default {
  numero: 1,
  titre: 'CODE NINJA',
  phase: 'POULE A · JOURNÉE 1',
  gauche: { id: 'dotnet-bot', nom: 'dotnet-bot', version: '.NET 11 · C# 15' },
  droite: { id: 'go', nom: 'Gopher', version: 'Go 1.27' },
  echanges: [
    { at: 5.6, qui: 'droite', approche: 'choc', geste: 'taille', degats: 15,
      carte: { tag: 'GO 1.27', nom: 'Méthodes génériques', code: 'func (r *Rand) N[Int intType](n Int) Int' } },
    { at: 12.6, qui: 'gauche', approche: 'saut', geste: 'estoc', degats: 20,
      carte: { tag: 'C# 15', nom: 'Union types', code: 'public union Pet(Cat, Dog, Bird);' } },
    { at: 19.6, qui: 'droite', approche: 'corde', geste: 'shuriken', degats: 10,
      carte: { tag: 'GO 1.27', nom: 'JSON v2', code: 'import "encoding/json/v2"' } },
    { at: 26.6, qui: 'gauche', approche: 'fumee', geste: 'taille', degats: 15,
      carte: { tag: '.NET 11', nom: 'Runtime Async', note: 'async/await géré par le runtime' } },
    { at: 33.6, qui: 'droite', approche: 'saut', geste: 'toupie', degats: 10,
      carte: { tag: 'GO 1.27 · EXPÉRIMENTAL', nom: 'Package simd', code: 'GOEXPERIMENT=simd go build' } },
    { at: 40.6, qui: 'gauche', approche: 'corde', geste: 'revers', degats: 15,
      carte: { tag: 'C# 15', nom: 'Closed hierarchies', code: 'public closed record class GateState;' } },
    { at: 47.6, qui: 'droite', approche: 'choc', geste: 'parade', degats: 0,
      carte: { tag: 'GO 1.27 · POST-QUANTIQUE', nom: 'ML-DSA', code: 'import "crypto/mldsa"' },
      riposte: { tag: '.NET 11 · EXPÉRIMENTAL', nom: 'ML-KEM + HPKE', note: 'parade post-quantique' } },
    { at: 54.6, qui: 'droite', geste: 'chute', degats: 15, mini: 6,
      carte: { tag: 'GO 1.27 · PPROF', nom: 'goroutineleak', note: 'fuite détectée : 6 goroutines' } },
    { at: 61.6, qui: 'gauche', approche: 'fumee', geste: 'combo', degats: [7, 8],
      cartes: [
        { tag: 'C# 15', nom: 'Extension indexers', code: 'extension(IEnumerable<int> s)' },
        { tag: 'C# 15', nom: 'Collection arguments', code: '[with(capacity: 64), .. items]' },
      ] },
    { at: 68.6, qui: 'gauche', geste: 'final', degats: 20,
      carte: { tag: 'C# 15 · LABELED BREAK', nom: 'break outer;', grand: true } },
  ],
  ko: 75.6,
  fin: 80.0,
  vainqueur: 'gauche',
  classement: [
    { nom: 'dotnet-bot', techno: '.NET', j: 1, pts: 3 },
    { nom: 'Gopher', techno: 'Go', j: 1, pts: 0 },
    { nom: 'Alien', techno: 'Lisp', j: 0, pts: 0 },
    { nom: 'Ziggy', techno: 'Zig', j: 0, pts: 0 },
  ],
  prochain: { titre: 'Alien (Lisp) vs Ziggy (Zig)', images: ['mascottes/lisp/alien-lisp.png', 'mascottes/zig/ziggy.png'] },
};
