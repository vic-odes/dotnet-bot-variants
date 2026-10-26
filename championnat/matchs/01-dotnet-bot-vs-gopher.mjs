// Combat n°1 — Poule A, journée 1 : dotnet-bot vs Gopher.
// Avantages vérifiés le 2026-10-26 : go.dev/doc/go1.27 (Go 1.27, 19 août 2026) ;
// learn.microsoft.com « What's new in C# 15 » et « What's new in .NET 11 » (RC2, GA prévue en novembre 2026).
// Approches acrobatiques : choc (choc en plein vol), saut (par-dessus l'adversaire), corde (rebond sur le réverbère ou le panneau), fumee (téléportation).
// Gestes de touche : taille, estoc, revers, toupie, shuriken ; cas spéciaux : parade, chute (gag), combo, final.
export default {
  numero: 1,
  titre: 'CODE NINJA',
  phase: 'POULE A · JOURNÉE 1',
  gauche: { id: 'dotnet-bot', nom: 'dotnet-bot', version: '.NET 11 · C# 15' },
  droite: { id: 'go', nom: 'Gopher', version: 'Go 1.27' },
  // Chaque touche = une technique de combat qui illustre un avantage réel (tag = le terrain : langage, portée,
  // exécution, concurrence, outillage, écosystème, déploiement…). Faits vérifiés le 2026-10-26.
  echanges: [
    { at: 5.6, qui: 'droite', approche: 'choc', geste: 'taille', degats: 15,
      carte: { tag: 'GO · DÉPLOIEMENT', nom: 'Lame du binaire unique', code: 'GOOS=linux go build' } },
    { at: 12.6, qui: 'gauche', approche: 'saut', geste: 'estoc', degats: 20,
      carte: { tag: '.NET · PORTÉE', nom: 'Frappe des cinq terrains', note: 'web, mobile, desktop, cloud, jeux (Unity)' } },
    { at: 19.6, qui: 'droite', approche: 'corde', geste: 'shuriken', degats: 10,
      carte: { tag: 'GO · CONCURRENCE', nom: 'Shurikens goroutines', code: 'go handle(conn)' } },
    { at: 26.6, qui: 'gauche', approche: 'fumee', geste: 'taille', degats: 15,
      carte: { tag: '.NET · EXÉCUTION', nom: 'Coup du JIT adaptatif', note: 'PGO dynamique, ou Native AOT' } },
    { at: 33.6, qui: 'droite', approche: 'saut', geste: 'toupie', degats: 10,
      carte: { tag: 'GO · OUTILLAGE', nom: 'Tornade de compilation', note: 'build en secondes, gofmt intégré' } },
    { at: 40.6, qui: 'gauche', approche: 'corde', geste: 'revers', degats: 15,
      carte: { tag: 'C# · LANGAGE', nom: 'Garde LINQ', code: 'orders.Where(o => o.Paid).Sum(o => o.Total)' } },
    { at: 47.6, qui: 'droite', approche: 'choc', geste: 'parade', degats: 0,
      carte: { tag: 'GO · ÉCOSYSTÈME', nom: 'Lame cloud-native', note: 'Docker et Kubernetes sont écrits en Go' },
      riposte: { tag: '.NET · DÉPLOIEMENT', nom: 'Bouclier conteneur', code: 'dotnet publish /t:PublishContainer' } },
    { at: 54.6, qui: 'droite', geste: 'chute', degats: 15, mini: 6,
      carte: { tag: 'GO · CONCURRENCE', nom: 'Piège des goroutines', note: '6 goroutines en fuite (profil goroutineleak)' } },
    { at: 61.6, qui: 'gauche', approche: 'fumee', geste: 'combo', degats: [7, 8],
      cartes: [
        { tag: '.NET · FRAMEWORK', nom: 'Minimal API', code: 'app.MapGet("/", () => "Hello");' },
        { tag: '.NET · OUTILLAGE', nom: 'Arsenal NuGet', note: 'paquets NuGet + Hot Reload dans l’IDE' },
      ] },
    { at: 68.6, qui: 'gauche', geste: 'final', degats: 20,
      carte: { tag: 'TECHNIQUE SECRÈTE · C# 15', nom: 'break outer;', grand: true } },
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
