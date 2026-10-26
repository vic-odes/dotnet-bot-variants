// Tirage au sort du championnat des mascottes (phase de poules + élimination directe).
// Reproductible : même graine => même tirage.  Usage : node championnat/tirage.mjs [graine]
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SEED = process.argv[2] ?? 'championnat-dotnet-bot-2026';
const DIR = path.dirname(fileURLToPath(import.meta.url));

// Combattants : id = dossier dans mascottes/ (dotnet-bot : originaux/ et variants/)
const F = {
  'dotnet-bot': { nom: 'dotnet-bot', techno: '.NET / C#' },
  java: { nom: 'Duke', techno: 'Java' },
  nodejs: { nom: 'Tortue-fusée', techno: 'Node.js' },
  django: { nom: 'Poney', techno: 'Django / Python' },
  php: { nom: 'elePHPant', techno: 'PHP' },
  go: { nom: 'Gopher', techno: 'Go' },
  rust: { nom: 'Ferris', techno: 'Rust' },
  kotlin: { nom: 'Kodee', techno: 'Kotlin' },
  'dart-flutter': { nom: 'Dash', techno: 'Dart / Flutter' },
  scratch: { nom: 'Scratch Cat', techno: 'Scratch' },
  perl: { nom: 'Chameau', techno: 'Perl' },
  lisp: { nom: 'Alien', techno: 'Lisp' },
  zig: { nom: 'Ziggy', techno: 'Zig' },
  gleam: { nom: 'Lucy', techno: 'Gleam' },
  raku: { nom: 'Camelia', techno: 'Raku' },
};

// Chapeaux (comme au foot) : un combattant de chaque chapeau par poule.
// dotnet-bot, tête de série, est placé d'office en poule A.
const CHAPEAUX = [
  ['dotnet-bot', 'java', 'nodejs', 'django'],
  ['php', 'go', 'rust', 'kotlin'],
  ['dart-flutter', 'scratch', 'perl', 'lisp'],
  ['zig', 'gleam', 'raku'],
];
const POULES = ['A', 'B', 'C', 'D'];

// PRNG déterministe (mulberry32) initialisé par un hachage de la graine
let h = 1779033703 ^ SEED.length;
for (const c of SEED) { h = Math.imul(h ^ c.charCodeAt(0), 3432918353); h = (h << 13) | (h >>> 19); }
let s = h >>> 0;
const rnd = () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const melange = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const poules = Object.fromEntries(POULES.map(p => [p, []]));
for (const [i, chapeau] of CHAPEAUX.entries()) {
  let tires = melange(chapeau);
  let cibles = POULES;
  if (i === 0) { poules.A.push('dotnet-bot'); tires = tires.filter(x => x !== 'dotnet-bot'); cibles = ['B', 'C', 'D']; }
  else if (tires.length < POULES.length) cibles = melange(POULES).slice(0, tires.length).sort();
  tires.forEach((f, k) => poules[cibles[k]].push(f));
}

// Calendrier : 3 journées, toutes les poules jouent à chaque journée.
// Poule de 4 [1,2,3,4] : J1 1-2 3-4 · J2 1-3 4-2 · J3 4-1 2-3 ; poule de 3 [1,2,3] : J1 1-2 · J2 3-1 · J3 2-3
const JOURNEES4 = [[[0, 1], [2, 3]], [[0, 2], [3, 1]], [[3, 0], [1, 2]]];
const JOURNEES3 = [[[0, 1]], [[2, 0]], [[1, 2]]];
const matchs = [];
for (let j = 0; j < 3; j++)
  for (const p of POULES) {
    const g = poules[p]; const plan = (g.length === 4 ? JOURNEES4 : JOURNEES3)[j];
    for (const [a, b] of plan) matchs.push({ phase: `Poule ${p}`, journee: j + 1, gauche: g[a], droite: g[b] });
  }
// Élimination directe : les 2 premiers de chaque poule
const KO = [
  { phase: 'Quart de finale 1', gauche: '1er A', droite: '2e B' },
  { phase: 'Quart de finale 2', gauche: '1er C', droite: '2e D' },
  { phase: 'Quart de finale 3', gauche: '1er B', droite: '2e A' },
  { phase: 'Quart de finale 4', gauche: '1er D', droite: '2e C' },
  { phase: 'Demi-finale 1', gauche: 'Vainqueur QF1', droite: 'Vainqueur QF2' },
  { phase: 'Demi-finale 2', gauche: 'Vainqueur QF3', droite: 'Vainqueur QF4' },
  { phase: 'Finale', gauche: 'Vainqueur DF1', droite: 'Vainqueur DF2' },
];
const tous = [...matchs, ...KO].map((m, i) => ({ n: i + 1, ...m }));

writeFileSync(path.join(DIR, 'tirage.json'), JSON.stringify({ graine: SEED, combattants: F, chapeaux: CHAPEAUX, poules, matchs: tous }, null, 2) + '\n');

const nom = id => F[id] ? `${F[id].nom} (${F[id].techno})` : id;
let md = `# Championnat des mascottes — tirage et calendrier\n\nGénéré par \`node championnat/tirage.mjs\` (graine \`${SEED}\`, données : \`tirage.json\`).\n\n` +
  `**Format** : phase de poules (chaque combattant affronte tous ceux de sa poule ; victoire = 3 points), puis élimination directe ` +
  `pour les 2 premiers de chaque poule : quarts, demies, finale. Une vidéo par combat, 9:16, 90 s. ${tous.length} vidéos au total.\n\n` +
  `## Chapeaux\n\n` + CHAPEAUX.map((c, i) => `${i + 1}. ${c.map(nom).join(' · ')}`).join('\n') +
  `\n\ndotnet-bot, tête de série, est placé d'office en poule A ; le chapeau 4 n'a que 3 combattants, une poule se joue donc à 3.\n\n## Poules\n\n` +
  POULES.map(p => `### Poule ${p}\n\n` + poules[p].map(f => `- ${nom(f)}`).join('\n')).join('\n\n') +
  `\n\n## Calendrier\n\n| # | Phase | Journée | Combat |\n|---|---|---|---|\n` +
  tous.map(m => `| ${m.n} | ${m.phase} | ${m.journee ?? ''} | ${nom(m.gauche)} **vs** ${nom(m.droite)} |`).join('\n') + '\n';
writeFileSync(path.join(DIR, 'README.md'), md);
console.log(md);
