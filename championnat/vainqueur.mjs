// Tirage du vainqueur d'un combat sans dotnet-bot (championnat/PROMPT.md).
// Reproductible : graine championnat-dotnet-bot-2026-<N>, même PRNG que tirage.mjs.
// Usage : node championnat/vainqueur.mjs <N> <gauche> <droite>   -> affiche le vainqueur
const [N, gauche, droite] = process.argv.slice(2);
const SEED = `championnat-dotnet-bot-2026-${N}`;
let h = 1779033703 ^ SEED.length;
for (const c of SEED) { h = Math.imul(h ^ c.charCodeAt(0), 3432918353); h = (h << 13) | (h >>> 19); }
let s = h >>> 0;
const rnd = () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const u = rnd();
console.log(`graine ${SEED} : ${u.toFixed(6)} -> vainqueur ${u < 0.5 ? `gauche (${gauche})` : `droite (${droite})`}`);
