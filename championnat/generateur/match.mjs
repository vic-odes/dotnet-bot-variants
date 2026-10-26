// Générateur d'un combat du championnat : node championnat/generateur/match.mjs <match.mjs> <projet HyperFrames>
// Écrit index.html et compositions/*.html (intro, fight-a, fight-b, finish, outro) à partir des données du combat.
// Tout est calculé ici (poses, cinématique, gerbes) : les scènes ne contiennent que des tweens déterministes.
import { writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { K, jt, rootT, dotnetBot, dotnetBotDefs, gopher, BOT_JOINTS, GO_JOINTS, EYE_STATES } from './rigs.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
const [matchFile, outDir] = process.argv.slice(2);
const M = (await import(pathToFileURL(path.resolve(matchFile)))).default;
const OUT = path.resolve(outDir);

const W = 1080, H = 1920, WORLD_W = 1700, FEET = 1290, FPS = 30;
const fr = (n) => n / FPS;

// ---------- combattants ----------
const RIGS = {
  'dotnet-bot': { draw: dotnetBot, defs: dotnetBotDefs, J: BOT_JOINTS, S: 1.15, team: K.purple, accent: K.magenta, k: 1, legK: 1,
    hitTokens: ['null', 'Exception', 'NRE', 'throw'] },
  go: { draw: gopher, defs: () => '', J: GO_JOINTS, S: 0.85, team: K.cyan, accent: K.cyan, k: 1.2, legK: 0.35,
    hitTokens: ['panic:', 'nil', 'err', '0xDEAD'] },
};
const STATION = { gauche: 300, droite: 780 };
const F = {};
for (const side of ['gauche', 'droite']) {
  const d = M[side], R = RIGS[d.id];
  const dir = side === 'gauche' ? 1 : -1;
  F[side] = { side, p: side === 'gauche' ? 'fl' : 'fr', d, R, dir,
    pose: Object.fromEntries(Object.entries(R.J).map(([k, v]) => [k, v[2]])),
    root: { x: STATION[side], y: FEET, r: 0, sx: dir * R.S, sy: R.S }, eyes: 'normal', hp: 100 };
}
const other = (s) => (s === 'gauche' ? 'droite' : 'gauche');

// Poses : écarts par articulation (angles absolus) par rapport à la garde.
const POSES = {
  garde: {},
  arme_haut: { body: -10, armF: 160, elbF: -30, handF: -10, armB: -20, elbB: -40 },
  taille: { body: 16, armF: -60, elbF: -10, handF: -20, armB: 40, legF: -30, kneeF: 20, legB: 26 },
  arme_estoc: { body: -12, armF: 70, elbF: -120, handF: -60, armB: -40 },
  estoc: { body: 18, armF: -95, elbF: -5, handF: -12, armB: 60, legF: -46, kneeF: 30, legB: 34, kneeB: -20 },
  arme_revers: { body: 8, armF: 20, elbF: 40, handF: 30, armB: 30 },
  revers: { body: -10, armF: -165, elbF: -20, handF: -10, armB: 50, legF: -20 },
  arme_moulinet: { body: -6, armF: 100, elbF: -20, handF: -40, armB: 20 },
  moulinet: { body: 12, armF: -90, elbF: 0, handF: 0, armB: 70, legF: -30, legB: 20 },
  parade: { body: -6, armF: -150, elbF: 30, handF: 30, armB: 30 },
  touche: { body: -18, head: -10, armF: 40, elbF: -20, handF: 0, armB: 70, legF: 10 },
  vol: { body: -40, head: -20, armF: 130, elbF: -10, armB: 150, legF: -50, legB: 40 },
  dash: { body: 30, armF: -80, elbF: 0, handF: -10, armB: 80, legF: -60, kneeF: 40, legB: 50 },
  victoire: { armF: 170, elbF: 10, handF: 0, armB: 40, elbB: -60 },
};
const LEGS = new Set(['legF', 'legB', 'kneeF', 'kneeB']);
function target(f, name) {
  const t = Object.fromEntries(Object.entries(f.R.J).map(([k, v]) => [k, v[2]]));
  for (const [k, a] of Object.entries(POSES[name])) t[k] = LEGS.has(k) ? f.R.J[k][2] + (a - BOT_JOINTS[k][2]) * f.R.legK : a;
  return t;
}

// ---------- cinématique (pointe de l'épée, épaule) ----------
const mul = (a, b) => [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
const T = (x, y) => [1, 0, 0, 1, x, y];
const Rm = (deg) => { const r = (deg * Math.PI) / 180; return [Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0]; };
const Sm = (sx, sy) => [sx, 0, 0, sy, 0, 0];
const ap = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
function fk(f, pose, root) {
  const J = f.R.J;
  let m = mul(mul(T(root.x, root.y), Rm(root.r)), Sm(root.sx, root.sy));
  m = mul(mul(m, T(J.body[0], J.body[1])), Rm(pose.body));
  const sh = mul(mul(m, T(J.armF[0], J.armF[1])), Rm(pose.armF));
  const el = mul(mul(sh, T(J.elbF[0], J.elbF[1])), Rm(pose.elbF));
  const hd = mul(mul(el, T(J.handF[0], J.handF[1])), Rm(pose.handF));
  return { tip: ap(hd, 0, 195 * f.R.k), hand: ap(hd, 0, 0), shoulder: ap(sh, 0, 0) };
}

// ---------- aléa à graine ----------
function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }

// ---------- scènes ----------
const SCENES = [
  { id: 'intro', start: 0, end: 8.0 },
  { id: 'fighta', start: 8.0, end: 36.8 },
  { id: 'fightb', start: 36.8, end: 62.4 },
  { id: 'finish', start: 62.4, end: M.fin },
  { id: 'outro', start: M.fin, end: 90.0 },
];
let S; // scène courante : { ops, extra markup… }
const r2 = (n) => +n.toFixed(3);
function op(kind, sel, t, a, b) { S.ops.push([kind, sel, r2(t - S.start), a, b]); }
const to = (sel, t, d, ease, vars) => op('to', sel, t, { ...vars, duration: r2(d), ease });
const set = (sel, t, vars) => op('set', sel, t, vars);
const fromTo = (sel, t, d, ease, from, vars) => op('fromTo', sel, t, from, { ...vars, duration: r2(d), ease });

function poseTo(f, name, t, d, ease, override = {}) {
  const tg = { ...target(f, name), ...override };
  for (const [j, a] of Object.entries(tg)) {
    if (Math.abs(a - f.pose[j]) < 0.01) continue;
    const [x, y] = f.R.J[j];
    to(`#${f.p}-${j}`, t, d, ease, { attr: { transform: jt(x, y, a) } });
    f.pose[j] = a;
  }
}
function rootTo(f, t, d, ease, ch) {
  Object.assign(f.root, ch);
  const { x, y, sx, sy, r } = f.root;
  to(`#${f.p}-root`, t, d, ease, { attr: { transform: rootT(x, y, sx, sy, r) } });
}
function eyes(f, state, t) {
  if (f.eyes === state) return;
  set(`#${f.p}-eyes-${f.eyes}`, t, { opacity: 0 });
  set(`#${f.p}-eyes-${state}`, t, { opacity: 1 });
  f.eyes = state;
}
function breathe(f, t0, t1, phase = 0) {
  const base = f.R.S;
  let t = t0 + phase;
  let up = true;
  while (t + 0.8 <= t1) {
    rootTo(f, t, 0.8, 'sine.inOut', { sy: up ? base * 0.975 : base });
    t += 0.8; up = !up;
  }
  if (!up) rootTo(f, t, Math.min(0.4, t1 - t), 'sine.out', { sy: base });
}

// HUD
function hp(f, t, value) {
  const old = f.hp; f.hp = Math.max(0, value);
  if (old === f.hp) return;
  const sel = `#hud-${f.side}`;
  to(`${sel}-fill`, t, 0.2, 'power3.out', { scaleX: f.hp / 100 });
  to(`${sel}-lag`, t + 0.35, 0.5, 'power2.inOut', { scaleX: f.hp / 100 });
}

// Caméra : coup de zoom sur un point, secousse
function punch(t, px, py, s = 1.08, hold = 0.08) {
  const x = (1 - s) * (px - W / 2), y = (1 - s) * (py - H / 2);
  to('#cam', t, hold, 'expo.out', { scale: s, x, y });
  to('#cam', t + hold + 0.05, 0.5, 'power2.inOut', { scale: 1, x: S.camX || 0, y: 0 });
}
function shake(t, frames = 6, amp = 12, seed = 7) {
  const r = rng(seed);
  for (let i = 0; i < frames; i++) to('#shake', t + fr(i), fr(1), 'none', { x: r2((r() * 2 - 1) * amp), y: r2((r() * 2 - 1) * amp) });
  to('#shake', t + fr(frames), fr(2), 'none', { x: 0, y: 0 });
}

// Effets dans le monde : étincelle, gerbe de bugs, traînée de lame
const BUG = 'M14.25 2c.38 0 .7.28.74.65l.01.1v.75q-.02.97-.53 1.7a3.8 3.8 0 0 1 2.52 3.3h.26a2.25 2.25 0 0 0 2.24-2.26V4.75a.75.75 0 0 1 1.5 0v1.48c0 2-1.56 3.65-3.54 3.76H17v1.51h4.25c.38 0 .7.28.75.65v.1c0 .38-.28.7-.65.74l-.1.01H17v2h.45a3.75 3.75 0 0 1 3.53 3.57v1.68a.75.75 0 0 1-1.5.1v-1.59c.01-1.2-.9-2.17-2.08-2.25h-.15l-.48-.01a5 5 0 0 1-9.54 0h-.49a2.25 2.25 0 0 0-2.24 2.26v1.49a.75.75 0 1 1-1.5 0v-1.48c0-2 1.56-3.65 3.54-3.76h.21L7 15v-2H2.75a.75.75 0 0 1-.74-.65l-.01-.1c0-.38.28-.7.65-.74h.1L7 11.5V10h-.46A3.75 3.75 0 0 1 3 6.42V4.75a.75.75 0 0 1 1.5-.1v1.59c0 1.19.92 2.17 2.09 2.25H7a3.8 3.8 0 0 1 2.52-3.28q-.46-.65-.52-1.5L9 3.51v-.76a.75.75 0 0 1 1.5-.1v.85a1.5 1.5 0 0 0 3 .15v-.9c0-.41.34-.75.75-.75'; // Fluent UI System Icons bug_24_filled (MIT)
let fxN = 0;
function spark(t, x, y, color = K.yellow, s = 1) {
  const id = `fx${fxN++}`;
  const pts = Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8, r = (i % 2 ? 26 : 90) * s; return `${r2(Math.cos(a) * r)},${r2(Math.sin(a) * r)}`; }).join(' ');
  S.fx += `<g transform="translate(${r2(x)} ${r2(y)})"><g id="${id}" opacity="0"><polygon points="${pts}" fill="${color}"/><circle r="${22 * s}" fill="#FFFFFF"/></g></g>`;
  fromTo(`#${id}`, t, 0.06, 'expo.out', { opacity: 1, scale: 0.2, transformOrigin: '0px 0px' }, { scale: 1, immediateRender: false });
  to(`#${id}`, t + 0.07, 0.16, 'power2.in', { scale: 1.35, opacity: 0 });
}
function splatter(t, x, y, dir, tokens, seed, n = 9) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const id = `fx${fxN++}`;
    const isBug = i % 2 === 0;
    const col = i % 3 === 1 ? K.yellow : K.flamingo;
    const inner = isBug
      ? `<path d="${BUG}" transform="translate(-24 -24) scale(2)" fill="${K.flamingo}"/>`
      : `<text x="0" y="10" text-anchor="middle" font-family="Space Mono" font-weight="700" font-size="${26 + Math.floor(r() * 9)}" fill="${col}" stroke="${K.midnight10}" stroke-width="6" paint-order="stroke fill">${tokens[i % tokens.length]}</text>`;
    S.fx += `<g transform="translate(${r2(x)} ${r2(y)})"><g id="${id}" opacity="0">${inner}</g></g>`;
    const dx = dir * (90 + r() * 260) + (r() - 0.5) * 80, up = 120 + r() * 220, down = 120 + r() * 260, d = 0.8 + r() * 0.25, rot = (r() * 2 - 1) * 300;
    set(`#${id}`, t, { opacity: 1, x: 0, y: 0, rotation: 0, transformOrigin: '0px 0px' });
    to(`#${id}`, t, d, 'none', { x: r2(dx), rotation: r2(rot) });
    to(`#${id}`, t, d * 0.42, 'power2.out', { y: r2(-up) });
    to(`#${id}`, t + d * 0.42, d * 0.58, 'power2.in', { y: r2(-up + down + up) });
    to(`#${id}`, t + d * 0.7, d * 0.3, 'none', { opacity: 0 });
  }
}
function swoosh(t, d, a, b, shoulder, color) {
  const id = `fx${fxN++}`;
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const c = [shoulder[0] + (mid[0] - shoulder[0]) * 1.7, shoulder[1] + (mid[1] - shoulder[1]) * 1.7];
  let L = 0, prev = a;
  for (let i = 1; i <= 20; i++) { const u = i / 20, p = [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]; L += Math.hypot(p[0] - prev[0], p[1] - prev[1]); prev = p; }
  L = Math.ceil(L);
  S.fx += `<path id="${id}" d="M${r2(a[0])} ${r2(a[1])} Q${r2(c[0])} ${r2(c[1])} ${r2(b[0])} ${r2(b[1])}" fill="none" stroke="${color}" stroke-width="30" stroke-linecap="round" opacity="0" stroke-dasharray="${L}" stroke-dashoffset="${L}"/>`;
  set(`#${id}`, t, { opacity: 0.7 });
  to(`#${id}`, t, d, 'expo.out', { attr: { 'stroke-dashoffset': 0 } });
  to(`#${id}`, t + d + 0.02, 0.18, 'power2.in', { opacity: 0 });
}

// Cartes (espace écran)
let cardN = 0;
function card(t, tEnd, owner, c, ix, iy, slot = 'haut') {
  const id = `card${cardN++}`;
  const team = owner.side === 'gauche' ? 'db' : 'go';
  const top = c.grand ? 430 : 400;
  const body = c.grand ? `<div class="big">${c.nom}</div>`
    : `<div class="name">${c.nom}</div>${c.code ? `<div class="code">${esc(c.code)}</div>` : ''}${c.note ? `<div class="note">${c.note}</div>` : ''}`;
  S.cards += `<div class="card ${team}${c.grand ? ' grand' : ''}" id="${id}" data-layout-allow-overlap style="top:${top}px"><div class="tag">${c.tag}</div>${body}</div>`;
  const cx = 540, cy = top + (c.grand ? 150 : 120);
  fromTo(`#${id}`, t, 0.25, 'back.out(1.6)', { opacity: 0, scale: 0.2, rotation: -20, x: r2(ix - cx), y: r2(iy - cy) }, { opacity: 1, scale: 1, rotation: -4, x: 0, y: 0 });
  to(`#${id}`, tEnd, 0.15, 'power2.in', { opacity: 0, scale: 0.9, filter: 'blur(8px)' });
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Annonces (espace écran)
let annN = 0;
function announce(t, tEnd, text, cls = '') {
  const id = `ann${annN++}`;
  S.cards += `<div class="ann ${cls}" id="${id}">${text}</div>`;
  fromTo(`#${id}`, t, 0.15, 'expo.out', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1 });
  if (tEnd) to(`#${id}`, tEnd, 0.12, 'power3.in', { opacity: 0, scale: 0.92 });
}

// ---------- un échange ----------
const WIND = { taille: 'arme_haut', estoc: 'arme_estoc', revers: 'arme_revers', moulinet: 'arme_moulinet', saut: 'arme_haut', final: 'arme_estoc' };
const STRIKE = { taille: 'taille', estoc: 'estoc', revers: 'revers', moulinet: 'moulinet', saut: 'taille', final: 'dash' };

function strike(att, def, Ts, geste, dmg, seed) {
  // armé puis frappe ; renvoie le point d'impact
  const w = WIND[geste], s = STRIKE[geste];
  poseTo(att, w, Ts, 0.25, 'power2.in');
  if (geste === 'saut') { rootTo(att, Ts, 0.3, 'power2.out', { y: FEET - 170 }); }
  if (geste === 'moulinet') { rootTo(att, Ts + 0.05, 0.2, 'power2.inOut', { sx: -att.root.sx }); rootTo(att, Ts + 0.28, 0.12, 'power2.out', { sx: -att.root.sx }); }
  const a = fk(att, target(att, w), { ...att.root, y: geste === 'saut' ? FEET - 170 : att.root.y }).tip;
  const t1 = Ts + 0.3;
  poseTo(att, s, t1, 0.12, 'expo.out');
  if (geste === 'saut') rootTo(att, t1, 0.12, 'power3.in', { y: FEET });
  const k = fk(att, target(att, s), { ...att.root });
  swoosh(t1, 0.12, a, k.tip, k.shoulder, att.R.accent);
  const I = t1 + 0.12;
  // point d'impact : sur le corps du défenseur, à hauteur de la pointe
  const ix = def.root.x - def.dir * 60, iy = Math.min(Math.max(k.tip[1], FEET - 420), FEET - 160);
  if (dmg > 0) {
    spark(I, ix, iy);
    splatter(I, ix, iy, att.dir, def.R.hitTokens, seed);
    punch(I, ix, iy); shake(I, 6, 12, seed);
    eyes(def, 'hurt', I);
    poseTo(def, 'touche', I + fr(4), 0.35, 'back.out(1.4)');
    rootTo(def, I + fr(4), 0.35, 'back.out(1.4)', { x: def.root.x + att.dir * 40 });
    hp(def, I + fr(4), def.hp - dmg);
  }
  return { I, ix, iy };
}

function reset(f, t, eyesState = 'normal') {
  poseTo(f, 'garde', t, 0.5, 'power2.inOut');
  eyes(f, eyesState, t + 0.2);
}
function home(f, t) { rootTo(f, t, 0.6, 'power2.inOut', { x: STATION[f.side], y: FEET, r: 0, sx: f.dir * f.R.S, sy: f.R.S }); }

function exchange(e, i) {
  const att = F[e.qui], def = F[other(e.qui)];
  const T0 = e.at, seed = 100 + i * 17;
  const next = M.echanges[i + 1];
  if (e.geste === 'parade') {
    eyes(att, 'angry', T0);
    rootTo(att, T0, 0.5, 'power2.inOut', { x: att.root.x + att.dir * 130 });
    eyes(def, 'angry', T0 + 0.3);
    poseTo(def, 'parade', T0 + 0.55, 0.25, 'power2.out');
    poseTo(att, 'arme_haut', T0 + 0.5, 0.25, 'power2.in');
    poseTo(att, 'taille', T0 + 0.8, 0.12, 'expo.out');
    const I = T0 + 0.92;
    const p = fk(def, target(def, 'parade'), def.root).tip, h = fk(def, target(def, 'parade'), def.root).hand;
    const cx = (p[0] + h[0]) / 2, cy = (p[1] + h[1]) / 2;
    spark(I, cx, cy, K.yellow, 1.3); spark(I + 0.05, cx + 30, cy - 20, K.white, 0.6);
    punch(I, cx, cy, 1.05); shake(I, 4, 8, seed);
    rootTo(att, I + fr(3), 0.3, 'back.out(1.4)', { x: att.root.x - att.dir * 50 });
    rootTo(def, I + fr(3), 0.3, 'back.out(1.4)', { x: def.root.x - def.dir * 30 });
    card(I + 0.08, I + 2.25, att, e.carte, cx, cy);
    card(I + 2.4, T0 + 5.9, def, e.riposte, h[0], h[1]);
    reset(att, T0 + 1.6); reset(def, T0 + 2.2);
    home(att, T0 + 2.6); home(def, T0 + 2.6);
    breathe(att, T0 + 3.2, T0 + 6.2); breathe(def, T0 + 3.2, T0 + 6.2, 0.4);
  } else if (e.geste === 'chute') {
    eyes(att, 'angry', T0);
    rootTo(att, T0, 0.5, 'power2.inOut', { x: att.root.x + att.dir * 40 });
    // goroutines qui s'échappent de derrière le Gopher
    for (let k = 0; k < (e.mini || 0); k++) {
      const id = `${att.p}m${k}`;
      const r = rng(seed + k);
      const x0 = att.root.x - att.dir * 60, x1 = att.root.x + att.dir * (-300 + k * 95) + (r() - 0.5) * 40;
      S.minis += gopher(id).replace(`<g id="${id}-root">`, `<g id="${id}-root" opacity="0" transform="${rootT(x0, FEET + 10, att.dir * 0.32, 0.32)}">`);
      set(`#${id}-root`, T0 + 0.35 + k * 0.06, { opacity: 1 });
      to(`#${id}-root`, T0 + 0.35 + k * 0.06, 0.45, 'power2.out', { attr: { transform: rootT(x1, FEET + 14, att.dir * 0.32, 0.32) } });
      // ils courent puis filent hors champ
      const xo = att.dir > 0 ? -200 - k * 40 : W + 200 + k * 40;
      to(`#${id}-root`, T0 + 2.2 + k * 0.08, 1.1, 'power2.in', { attr: { transform: rootT(xo, FEET + 14, -att.dir * 0.32, 0.32) } });
    }
    poseTo(att, 'arme_haut', T0 + 0.8, 0.3, 'power2.in');
    eyes(att, 'hurt', T0 + 1.15);
    poseTo(att, 'touche', T0 + 1.15, 0.3, 'power2.in');
    rootTo(att, T0 + 1.15, 0.4, 'power2.in', { r: -att.dir * 22, y: FEET + 24, sy: att.R.S * 0.78 });
    const I = T0 + 1.55;
    const ix = att.root.x - att.dir * 80, iy = FEET - 40;
    spark(I, ix, iy, K.yellow, 0.8);
    splatter(I, ix, iy - 60, att.dir, att.R.hitTokens, seed, 7);
    punch(I, ix, iy, 1.06); shake(I, 5, 10, seed);
    hp(att, I + 0.1, att.hp - e.degats);
    card(I + 0.1, T0 + 4.7, att, e.carte, ix, iy, 'haut');
    eyes(def, 'happy', I + 0.2);
    rootTo(att, T0 + 3.3, 0.7, 'back.out(1.2)', { r: 0, y: FEET, sy: att.R.S });
    reset(att, T0 + 3.3); eyes(def, 'normal', T0 + 4.2);
    home(att, T0 + 4.2);
    breathe(def, T0 + 2.0, T0 + 6.2, 0.2); breathe(att, T0 + 4.8, T0 + 6.2);
  } else if (e.geste === 'combo') {
    eyes(att, 'angry', T0);
    rootTo(att, T0, 0.5, 'power2.inOut', { x: att.root.x + att.dir * 170 });
    const h1 = strike(att, def, T0 + 0.5, 'revers', e.degats[0], seed);
    poseTo(att, 'garde', T0 + 1.6, 0.3, 'power2.inOut');
    const h2 = strike(att, def, T0 + 2.5, 'estoc', e.degats[1], seed + 5);
    card(h1.I + 0.08, h2.I - 0.1, att, e.cartes[0], h1.ix, h1.iy);
    card(h2.I + 0.08, T0 + 6.1, att, e.cartes[1], h2.ix, h2.iy);
    reset(att, T0 + 3.6, 'angry'); reset(def, T0 + 4.0, 'hurt');
    home(att, T0 + 4.0); home(def, T0 + 4.0);
    breathe(att, T0 + 4.6, T0 + 6.3); breathe(def, T0 + 4.6, T0 + 6.3, 0.3);
  } else if (e.geste === 'final') {
    eyes(att, 'angry', T0);
    poseTo(att, 'arme_estoc', T0 + 0.3, 0.3, 'power2.in');
    rootTo(att, T0 + 0.3, 0.3, 'power2.in', { x: att.root.x - att.dir * 40, sy: att.R.S * 0.94 });
    poseTo(att, 'dash', T0 + 0.75, 0.15, 'expo.out');
    const a0 = fk(att, target(att, 'arme_estoc'), att.root).tip;
    rootTo(att, T0 + 0.75, 0.15, 'expo.out', { x: def.root.x - att.dir * 150, sy: att.R.S });
    const k = fk(att, target(att, 'dash'), att.root);
    swoosh(T0 + 0.75, 0.15, a0, k.tip, k.shoulder, att.R.accent);
    const I = T0 + 0.9, ix = def.root.x - def.dir * 40, iy = FEET - 300;
    spark(I, ix, iy, K.yellow, 1.6); spark(I + 0.06, ix + 40, iy - 60, K.white, 0.8);
    splatter(I, ix, iy, att.dir, def.R.hitTokens, seed, 11);
    punch(I, ix, iy, 1.15, 0.1); shake(I, 10, 16, seed);
    eyes(def, 'ko', I);
    hp(def, I + fr(4), 0);
    // le Gopher passe par-dessus les cordes et sort du cadre
    poseTo(def, 'vol', I + fr(4), 0.3, 'power2.out');
    const s0 = def.root;
    to(`#${def.p}-root`, I + fr(4), 0.5, 'power2.out', { attr: { transform: rootT(1180, 700, s0.sx, s0.sy, -att.dir * 300) } });
    to(`#${def.p}-root`, I + fr(4) + 0.5, 0.45, 'power2.in', { attr: { transform: rootT(1330, 1470, s0.sx, s0.sy, -att.dir * 450) } });
    Object.assign(def.root, { x: 1330, y: 1470, r: -att.dir * 450 });
    card(I + 0.1, T0 + 4.8, att, e.carte, ix, iy);
    reset(att, T0 + 1.8, 'happy');
    rootTo(att, T0 + 2.2, 0.8, 'power2.inOut', { x: 470 });
    breathe(att, T0 + 3.0, T0 + 6.4);
  } else {
    eyes(att, 'angry', T0);
    rootTo(att, T0, 0.5, 'power2.inOut', { x: att.root.x + att.dir * 170 });
    const h = strike(att, def, T0 + 0.5, e.geste, e.degats, seed);
    card(h.I + 0.08, T0 + 4.4, att, e.carte, h.ix, h.iy);
    reset(att, T0 + 1.4);
    reset(def, T0 + 1.8);
    home(att, T0 + 2.4); home(def, T0 + 2.4);
    breathe(att, T0 + 3.0, T0 + 6.3); breathe(def, T0 + 3.0, T0 + 6.3, 0.4);
  }
  if (next && next.geste !== 'final') eyes(F[next.qui], 'angry', T0 + 5.8);
}

// ---------- décor ----------
function arena() {
  const r = rng(3);
  let crowd = '';
  for (let row = 0; row < 3; row++) {
    const y = 1000 + row * 62, col = row === 1 ? K.midnight10 : K.midnight;
    for (let x = -20 + row * 24; x < WORLD_W + 40; x += 64 + Math.floor(r() * 18)) {
      const hr = 26 + r() * 10;
      crowd += `<circle cx="${r2(x)}" cy="${r2(y - hr)}" r="${r2(hr)}" fill="${col}"/><rect x="${r2(x - hr * 1.5)}" y="${r2(y - 4)}" width="${r2(hr * 3)}" height="90" rx="${r2(hr)}" fill="${col}"/>`;
    }
  }
  return `<svg class="layer" viewBox="0 0 ${WORLD_W} ${H}" width="${WORLD_W}" height="${H}">
    <defs><radialGradient id="spot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${K.purpleTint}" stop-opacity="0.22"/><stop offset="1" stop-color="${K.purpleTint}" stop-opacity="0"/></radialGradient></defs>
    <rect width="${WORLD_W}" height="${H}" fill="${K.midnight20}"/>
    <ellipse cx="540" cy="760" rx="760" ry="640" fill="url(#spot)"/>
    ${crowd}
    <rect x="1100" y="1360" width="${WORLD_W - 1100}" height="${H - 1360}" fill="${K.midnight}"/>
    <rect x="1100" y="1360" width="${WORLD_W - 1100}" height="10" fill="${K.purpleShade}"/>
    <rect x="96" y="1000" width="22" height="190" rx="6" fill="${K.purpleShade}"/><rect x="962" y="1000" width="22" height="190" rx="6" fill="${K.purpleShade}"/>
    <g stroke-width="8" stroke-linecap="round"><line x1="107" y1="1030" x2="973" y2="1030" stroke="${K.magenta}"/><line x1="107" y1="1080" x2="973" y2="1080" stroke="${K.white}"/><line x1="107" y1="1130" x2="973" y2="1130" stroke="${K.blue}"/></g>
    <polygon points="100,1180 980,1180 1100,1360 -20,1360" fill="${K.purpleTint45}"/>
    <polygon points="-20,1360 1100,1360 1100,1380 -20,1380" fill="${K.purpleTint}"/>
    <rect x="-20" y="1380" width="1120" height="${H - 1380}" fill="${K.purple}"/>
    <rect x="-20" y="1380" width="1120" height="8" fill="#7253E3"/>
    <text x="540" y="1470" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="44" letter-spacing="2" fill="${K.white}">CHAMPIONNAT .NET · ${M.phase.split(' · ')[0]}</text>
  </svg>`;
}
function frontRow() {
  const r = rng(11);
  let s = '';
  for (let x = -40; x < WORLD_W + 60; x += 120 + Math.floor(r() * 50)) {
    const hr = 52 + r() * 16, y = 1830 + r() * 40;
    s += `<circle cx="${r2(x)}" cy="${r2(y - hr)}" r="${r2(hr)}" fill="${K.midnight20}"/><rect x="${r2(x - hr * 1.6)}" y="${r2(y - 10)}" width="${r2(hr * 3.2)}" height="200" rx="${r2(hr)}" fill="${K.midnight20}"/>`;
  }
  return s;
}
function ropesFront() {
  return `<svg class="layer" viewBox="0 0 ${WORLD_W} ${H}" width="${WORLD_W}" height="${H}">
    <g stroke-width="11" stroke-linecap="round"><line x1="-10" y1="1200" x2="1090" y2="1200" stroke="${K.magenta}"/><line x1="-10" y1="1262" x2="1090" y2="1262" stroke="${K.white}"/><line x1="-10" y1="1324" x2="1090" y2="1324" stroke="${K.blue}"/></g>
    <rect x="-16" y="1150" width="38" height="232" rx="8" fill="${K.purpleShade}"/><rect x="-22" y="1160" width="50" height="190" rx="14" fill="${K.magenta}"/>
    <rect x="1058" y="1150" width="38" height="232" rx="8" fill="${K.purpleShade}"/><rect x="1052" y="1160" width="50" height="190" rx="14" fill="${K.cyan}"/>
    ${frontRow()}
  </svg>`;
}
function fighterMarkup(f) {
  const { x, y, sx, sy, r } = f.root;
  const J = Object.fromEntries(Object.entries(f.R.J).map(([k, v]) => [k, [v[0], v[1], f.pose[k]]]));
  let s = f.R.draw(f.p, J).replace(`<g id="${f.p}-root">`, `<g id="${f.p}-root" transform="${rootT(x, y, sx, sy, r)}">`);
  for (const st of EYE_STATES) {
    s = s.replace(new RegExp(`id="${f.p}-eyes-${st}"( opacity="0")?`), `id="${f.p}-eyes-${st}" opacity="${f.eyes === st ? 1 : 0}"`);
  }
  return s;
}

function hudMarkup() {
  const bar = (f) => `<div class="hud-side ${f.side}"><div class="hud-name">${f.d.nom}</div>
      <div class="hud-bar"><div class="hud-lag" id="hud-${f.side}-lag" style="transform:scaleX(${f.hp / 100})"></div><div class="hud-fill ${f.side}" id="hud-${f.side}-fill" style="transform:scaleX(${f.hp / 100})"></div></div></div>`;
  return `<div id="hud" class="hud">${bar(F.gauche)}<div class="hud-round">R1</div>${bar(F.droite)}</div>`;
}

const CSS = `
  @font-face { font-family: 'Space Grotesk'; font-weight: 700; src: url('assets/common/fonts/space-grotesk/space-grotesk-latin-700-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Space Grotesk'; font-weight: 500; src: url('assets/common/fonts/space-grotesk/space-grotesk-latin-500-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Space Mono'; font-weight: 400; src: url('assets/common/fonts/space-mono/space-mono-latin-400-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Space Mono'; font-weight: 700; src: url('assets/common/fonts/space-mono/space-mono-latin-700-normal.woff2') format('woff2'); }
  @font-face { font-family: 'Open Sans'; font-weight: 600; src: url('assets/common/fonts/open-sans/open-sans-latin-600-normal.woff2') format('woff2'); }
  #root { position: absolute; inset: 0; overflow: hidden; background: ${K.midnight20}; font-family: 'Space Grotesk', sans-serif; }
  .cam { position: absolute; left: 0; top: 0; width: ${WORLD_W}px; height: ${H}px; transform-origin: ${W / 2}px ${H / 2}px; }
  .shake { position: absolute; inset: 0; }
  .layer { position: absolute; left: 0; top: 0; overflow: visible; }
  .hud { position: absolute; left: 40px; right: 40px; top: 196px; height: 130px; display: flex; align-items: flex-end; gap: 24px; }
  .hud-side { flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .hud-side.droite { align-items: flex-end; }
  .hud-name { color: #FFFFFF; font-weight: 700; font-size: 40px; letter-spacing: 0.01em; }
  .hud-bar { position: relative; width: 100%; height: 40px; background: ${K.midnight}; border: 4px solid #FFFFFF; border-radius: 6px; overflow: hidden; }
  .hud-lag, .hud-fill { position: absolute; inset: 0; }
  .hud-lag { background: ${K.flamingo}; }
  .gauche .hud-lag, .hud-fill.gauche { transform-origin: left center; }
  .droite .hud-lag, .hud-fill.droite { transform-origin: right center; }
  .hud-fill.gauche { background: linear-gradient(90deg, ${K.purple}, ${K.magenta}); }
  .hud-fill.droite { background: ${K.cyan}; }
  .hud-round { width: 92px; height: 92px; border-radius: 46px; background: ${K.yellow}; color: ${K.midnight10}; font-weight: 700; font-size: 38px; display: flex; align-items: center; justify-content: center; border: 5px solid #FFFFFF; flex: none; }
  .card { position: absolute; left: 80px; width: 920px; padding: 24px 36px 30px; border: 6px solid #FFFFFF; border-radius: 18px; opacity: 0; }
  .card.db { background: ${K.purple}; color: #FFFFFF; }
  .card.go { background: ${K.cyan}; color: ${K.midnight10}; }
  .card .tag { font-family: 'Space Mono'; font-weight: 700; font-size: 30px; letter-spacing: 0.08em; }
  .card .name { font-weight: 700; font-size: 76px; line-height: 1.02; letter-spacing: -0.02em; margin-top: 6px; }
  .card .code { font-family: 'Space Mono'; font-size: 30px; color: ${K.code}; background: ${K.midnight}; padding: 12px 18px; border-radius: 10px; margin-top: 16px; white-space: nowrap; }
  .card .note { font-family: 'Open Sans'; font-weight: 600; font-size: 36px; margin-top: 12px; }
  .card .big { font-family: 'Space Mono'; font-weight: 700; font-size: 104px; color: ${K.code}; background: ${K.midnight}; padding: 18px 26px; border-radius: 14px; margin-top: 14px; text-align: center; }
  .ann { position: absolute; left: 0; right: 0; top: 480px; text-align: center; font-weight: 700; font-size: 220px; line-height: 1; color: ${K.yellow}; -webkit-text-stroke: 14px ${K.midnight10}; paint-order: stroke fill; opacity: 0; }
  .ann.small { font-size: 150px; }
  .ann.top { top: 380px; }
`;

function sceneFile(sc, inner) {
  return `<template>
  <style>${CSS}${sc.css || ''}</style>
  <div id="root" data-composition-id="${sc.id}" data-width="${W}" data-height="${H}">
    ${inner}
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      const OPS = ${JSON.stringify(S.ops)};
      for (const [k, sel, t, a, b] of OPS) {
        if (k === 'to') tl.to(sel, a, t);
        else if (k === 'set') tl.set(sel, a, t);
        else tl.fromTo(sel, a, b, t);
      }
      tl.set({}, {}, ${r2(sc.end - sc.start)});
      window.__timelines["${sc.id}"] = tl;
    })();
  </script>
</template>
`;
}

function world() {
  return `<div id="cam" class="cam"><div id="shake" class="shake">
      ${arena()}
      <svg class="layer" viewBox="0 0 ${WORLD_W} ${H}" width="${WORLD_W}" height="${H}">
        <defs>${F.gauche.R.defs(F.gauche.p)}${F.droite.R.defs(F.droite.p)}</defs>
        ${S.minis}
        ${S.fighters}
      </svg>
      ${ropesFront()}
      <svg class="layer" data-layout-ignore viewBox="0 0 ${WORLD_W} ${H}" width="${WORLD_W}" height="${H}">${S.fx}</svg>
    </div></div>`;
}

function begin(sc) { S = { ...sc, ops: [], fx: '', cards: '', minis: '', camX: 0, fighters: fighterMarkup(F.gauche) + fighterMarkup(F.droite), hud: hudMarkup() }; }

// ---------- écriture des scènes ----------
mkdirSync(path.join(OUT, 'compositions'), { recursive: true });
const written = [];
function finish(sc, extraTop = '', extraOver = '') {
  const markupWorld = world();
  const pre = (m) => m.replace(/\bid="([^"]+)"/g, `id="${sc.id}-$1"`).replace(/url\(#([^)]+)\)/g, `url(#${sc.id}-$1)`);
  const inner = pre(`<div style="position:absolute;inset:0">${markupWorld}${extraTop}${S.cards}${extraOver}</div>`);
  S.ops = S.ops.map(([k, sel, ...rest]) => [k, sel.replace(/#([\w-]+)/g, `#${sc.id}-$1`), ...rest]);
  writeFileSync(path.join(OUT, 'compositions', `${sc.id}.html`), sceneFile(sc, inner));
  written.push(sc);
}

// INTRO
{
  const sc = SCENES[0]; begin(sc);
  eyes(F.gauche, 'angry', 0); eyes(F.droite, 'angry', 0);
  breathe(F.gauche, 0, 3.2); breathe(F.droite, 0, 3.2, 0.4);
  // le titre est déjà là à l'image 0 (vignette), il se pose en 0,3 s
  S.cards += `<div class="vs" id="vs"><div class="vs-l">${M.gauche.nom}</div><div class="vs-x">VS</div><div class="vs-r">${M.droite.nom}</div></div>`;
  fromTo('#vs', 0, 0.3, 'expo.out', { scale: 1.12, opacity: 1 }, { scale: 1 });
  to('#vs', 3.0, 0.15, 'power3.in', { opacity: 0, scale: 0.94 });
  S.cards += `<div class="band" id="band">${M.phase}</div>`;
  fromTo('#band', 3.2, 0.25, 'expo.out', { opacity: 0, y: -30 }, { opacity: 1, y: 0 });
  // présentation : zoom sur chaque combattant, avec sa plaque
  const plate = (f, id, side) => `<div class="plate ${side}" id="${id}"><div class="plate-name">${f.d.nom}</div><div class="plate-ver">${f.d.version}</div></div>`;
  S.cards += plate(F.gauche, 'plate-l', 'l') + plate(F.droite, 'plate-r', 'r');
  const zoomOn = (x, t, d) => { const s = 1.3, px = x, py = FEET - 280; to('#cam', t, d, 'power2.inOut', { scale: s, x: (1 - s) * (px - W / 2), y: (1 - s) * (py - H / 2) }); };
  zoomOn(STATION.gauche + 60, 3.2, 0.6);
  fromTo('#plate-l', 3.5, 0.3, 'expo.out', { opacity: 0, x: -60 }, { opacity: 1, x: 0 });
  to('#plate-l', 5.4, 0.15, 'power3.in', { opacity: 0 });
  zoomOn(STATION.droite - 60, 5.5, 0.7);
  fromTo('#plate-r', 5.9, 0.3, 'expo.out', { opacity: 0, x: 60 }, { opacity: 1, x: 0 });
  to('#plate-r', 7.5, 0.15, 'power3.in', { opacity: 0 });
  to('#cam', 7.5, 0.45, 'power2.inOut', { scale: 1, x: 0, y: 0 });
  breathe(F.gauche, 3.4, 8.0); breathe(F.droite, 3.6, 8.0);
  to('#band', 7.7, 0.15, 'power3.in', { opacity: 0 });
  sc.css = `
    .vs { position: absolute; left: 0; right: 0; top: 300px; text-align: center; color: #FFFFFF; font-weight: 700; transform-origin: 540px 260px; }
    .vs-l, .vs-r { font-size: 110px; line-height: 1.05; letter-spacing: -0.03em; }
    .vs-r { color: ${K.cyan}; }
    .vs-x { font-size: 200px; line-height: 1; color: ${K.yellow}; -webkit-text-stroke: 14px ${K.midnight10}; paint-order: stroke fill; }
    .band { position: absolute; left: 0; right: 0; top: 200px; text-align: center; font-family: 'Space Mono'; font-weight: 700; font-size: 40px; letter-spacing: 0.12em; color: ${K.yellow}; opacity: 0; }
    .plate { position: absolute; top: 380px; width: 760px; padding: 26px 38px; border: 6px solid #FFFFFF; border-radius: 18px; opacity: 0; }
    .plate.l { left: 60px; background: ${K.purple}; color: #FFFFFF; }
    .plate.r { right: 60px; background: ${K.cyan}; color: ${K.midnight10}; text-align: right; }
    .plate-name { font-weight: 700; font-size: 110px; line-height: 1; letter-spacing: -0.03em; }
    .plate-ver { font-family: 'Space Mono'; font-weight: 700; font-size: 44px; margin-top: 12px; }`;
  finish(sc);
}

// FIGHT A
{
  const sc = SCENES[1]; begin(sc);
  fromTo('#hud', 8.0, 0.3, 'expo.out', { opacity: 0, y: -40 }, { opacity: 1, y: 0 });
  announce(8.2, 9.5, 'ROUND 1', 'small');
  announce(9.8, 10.9, 'FIGHT!');
  breathe(F.gauche, 8.0, 11.2); breathe(F.droite, 8.0, 11.2, 0.4);
  M.echanges.filter((e) => e.at >= sc.start && e.at < sc.end).forEach((e) => exchange(e, M.echanges.indexOf(e)));
  finish(sc, S.hud);
}
// FIGHT B
{
  const sc = SCENES[2]; begin(sc);
  const hud = S.hud; // le HUD et les combattants repartent de l'état de fin de la scène précédente
  M.echanges.filter((e) => e.at >= sc.start && e.at < sc.end).forEach((e) => exchange(e, M.echanges.indexOf(e)));
  finish(sc, hud);
}
// FINISH : combo, coup final, K.O.
{
  const sc = SCENES[3]; begin(sc);
  const hud = S.hud;
  M.echanges.filter((e) => e.at >= sc.start && e.at < sc.end).forEach((e) => exchange(e, M.echanges.indexOf(e)));
  announce(M.ko + 0.1, M.ko + 1.3, 'K.O.');
  // la caméra glisse vers la droite : le Gopher, K.O., hors du ring
  S.camX = -560;
  to('#cam', M.ko + 1.45, 1.0, 'power2.inOut', { x: -560 });
  S.cards += `<div class="caption" id="ko-cap">${M.droite.nom} est hors du ring</div>`;
  fromTo('#ko-cap', M.ko + 2.6, 0.25, 'expo.out', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1 });
  sc.css = `.caption { position: absolute; left: 60px; right: 60px; top: 520px; text-align: center; font-weight: 700; font-size: 84px; line-height: 1.05; color: #FFFFFF; opacity: 0; }`;
  finish(sc, hud);
}
// OUTRO : victoire, classement, prochain combat
{
  const sc = SCENES[4];
  const win = F[M.vainqueur];
  Object.assign(win.root, { x: 540, y: FEET, r: 0, sx: win.dir * win.R.S, sy: win.R.S });
  win.pose = target(win, 'victoire'); win.eyes = 'happy';
  Object.assign(F[other(M.vainqueur)].root, { x: 1500 }); // hors champ
  begin(sc);
  breathe(win, sc.start, sc.start + 4.8);
  announce(sc.start + 0.2, sc.start + 4.6, 'VICTOIRE', 'small top');
  S.cards += `<div class="pts" id="pts"><span>${win.d.nom}</span><b>+3 PTS</b></div>`;
  fromTo('#pts', sc.start + 0.9, 0.25, 'back.out(1.6)', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 });
  to('#pts', sc.start + 4.6, 0.12, 'power3.in', { opacity: 0 });
  const rows = M.classement.map((c, i) => `<div class="row${i === 0 ? ' first' : ''}"><span class="rk">${i + 1}</span><span class="nm">${c.nom} <i>${c.techno}</i></span><span class="j">${c.j}</span><span class="p">${c.pts}</span></div>`).join('');
  mkdirSync(path.join(OUT, 'assets/img'), { recursive: true });
  const imgs = M.prochain.images.map((src, i) => { const name = `prochain-${i}.png`; copyFileSync(path.join(REPO, src), path.join(OUT, 'assets/img', name)); return `<img src="assets/img/${name}" alt="">`; });
  S.cards += `<div class="dim" id="dim"></div><div class="table" id="table"><div class="t-title">${M.phase.split(' · ')[0]}</div>
    <div class="row head"><span class="rk"></span><span class="nm"></span><span class="j">J</span><span class="p">PTS</span></div>${rows}
    <div class="next"><div class="n-label">PROCHAIN COMBAT</div><div class="n-imgs">${imgs.join('<span>VS</span>')}</div><div class="n-title">${M.prochain.titre}</div></div></div>`;
  fromTo('#dim', sc.start + 4.8, 0.3, 'power2.inOut', { opacity: 0 }, { opacity: 1 });
  fromTo('#table', sc.start + 4.9, 0.35, 'expo.out', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 });
  sc.css = `
    .pts { position: absolute; left: 0; right: 0; top: 560px; text-align: center; color: #FFFFFF; font-weight: 700; font-size: 72px; opacity: 0; }
    .pts b { display: inline-block; margin-left: 24px; padding: 6px 26px; background: ${K.yellow}; color: ${K.midnight10}; border-radius: 14px; }
    .dim { position: absolute; inset: 0; background: rgba(20,5,58,0.78); opacity: 0; }
    .table { position: absolute; left: 70px; right: 70px; top: 300px; padding: 36px 44px; background: ${K.midnight}; border: 6px solid #FFFFFF; border-radius: 22px; color: #FFFFFF; opacity: 0; }
    .t-title { font-family: 'Space Mono'; font-weight: 700; font-size: 44px; letter-spacing: 0.12em; color: ${K.yellow}; margin-bottom: 18px; }
    .row { display: flex; align-items: center; font-weight: 700; font-size: 52px; padding: 14px 0; border-top: 3px solid ${K.purpleShade}; }
    .row.head { font-family: 'Space Mono'; font-size: 30px; color: ${K.purpleTint}; border-top: none; padding: 4px 0; }
    .row.first { color: ${K.yellow}; }
    .rk { width: 70px; } .nm { flex: 1; } .nm i { font-style: normal; font-family: 'Space Mono'; font-weight: 400; font-size: 32px; color: ${K.purpleTint}; margin-left: 12px; }
    .j, .p { width: 110px; text-align: right; }
    .next { margin-top: 40px; padding-top: 30px; border-top: 6px solid ${K.purple}; text-align: center; }
    .n-label { font-family: 'Space Mono'; font-weight: 700; font-size: 34px; letter-spacing: 0.12em; color: ${K.purpleTint}; }
    .n-imgs { display: flex; align-items: center; justify-content: center; gap: 30px; margin: 20px 0 10px; }
    .n-imgs img { height: 210px; width: 260px; object-fit: contain; }
    .n-imgs span { font-weight: 700; font-size: 70px; color: ${K.yellow}; }
    .n-title { font-weight: 700; font-size: 54px; }`;
  finish(sc);
}

// ---------- racine ----------
const hosts = written.map((sc, i) => `      <div id="${sc.id}" data-composition-id="${sc.id}" data-composition-src="compositions/${sc.id}.html" data-start="${sc.start}" data-duration="${r2(sc.end - sc.start)}" data-track-index="${i + 1}" data-track-kind="graphics" data-width="${W}" data-height="${H}"></div>`).join('\n');
writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="fr" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${W}, height=${H}" />
    <script src="assets/common/vendor/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; width: ${W}px; height: ${H}px; overflow: hidden; background: ${K.midnight20}; }
    </style>
  </head>
  <body>
    <!-- Généré par championnat/generateur/match.mjs à partir de championnat/matchs/*.mjs : modifier les données, pas ce fichier. -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="90" data-width="${W}" data-height="${H}">
${hosts}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`);
console.log(`✓ ${written.length} scènes écrites dans ${OUT}`);
