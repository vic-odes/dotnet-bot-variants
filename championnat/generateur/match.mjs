// Générateur d'un combat du championnat : node championnat/generateur/match.mjs <match.mjs> <projet HyperFrames>
// Écrit index.html et compositions/*.html (intro, fighta, fightb, finish, outro) à partir des données du combat.
// Tout est calculé ici (poses, acrobaties, cinématique, gerbes, sons) : les scènes ne contiennent que des tweens déterministes.
import { writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { K, jt, dotnetBot, dotnetBotDefs, gopher, BOT_JOINTS, GO_JOINTS, EYE_STATES } from './rigs.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../..');
const [matchFile, outDir] = process.argv.slice(2);
const M = (await import(pathToFileURL(path.resolve(matchFile)))).default;
const OUT = path.resolve(outDir);

const W = 1080, H = 1920, WORLD_W = 1700, FEET = 1290, FPS = 30;
const fr = (n) => n / FPS;
const r2 = (n) => +n.toFixed(3);
const POULE = M.phase.split(' · ')[0];

// ---------- combattants ----------
const RIGS = {
  'dotnet-bot': { draw: dotnetBot, defs: dotnetBotDefs, J: BOT_JOINTS, S: 1.15, cy: -200, accent: K.magenta, k: 1, legK: 1,
    hitTokens: ['null', 'Exception', 'NRE', 'throw'] },
  go: { draw: gopher, defs: () => '', J: GO_JOINTS, S: 0.85, cy: -270, accent: K.cyan, k: 1.2, legK: 0.35,
    hitTokens: ['panic:', 'nil', 'err', '0xDEAD'] },
};
const STATION = { gauche: 300, droite: 780 };
const F = {};
for (const side of ['gauche', 'droite']) {
  const d = M[side], R = RIGS[d.id];
  F[side] = { side, p: side === 'gauche' ? 'fl' : 'fr', d, R, S: R.S,
    pose: Object.fromEntries(Object.entries(R.J).map(([k, v]) => [k, v[2]])),
    x: STATION[side], face: side === 'gauche' ? 1 : -1, dy: 0, r: 0, sq: [1, 1], sh: 1, alpha: 1, tail: 0,
    eyes: 'normal', hp: 100 };
}
const other = (f) => (f === F.gauche ? F.droite : F.gauche);
const dirTo = (a, b) => (b.x >= a.x ? 1 : -1);
const CL = (x) => Math.max(190, Math.min(890, x)); // le combattant reste entier dans le cadre

// Poses : angles absolus par articulation, écarts par rapport à la garde.
const POSES = {
  garde: {},
  arme_haut: { body: -10, armF: 160, elbF: -30, handF: -10, armB: -20, elbB: -40 },
  taille: { body: 16, armF: -60, elbF: -10, handF: -20, armB: 40, legF: -30, kneeF: 20, legB: 26 },
  arme_estoc: { body: -12, armF: 70, elbF: -120, handF: -60, armB: -40 },
  estoc: { body: 18, armF: -95, elbF: -5, handF: -12, armB: 60, legF: -46, kneeF: 30, legB: 34, kneeB: -20 },
  arme_revers: { body: 8, armF: 20, elbF: 40, handF: 30, armB: 30 },
  revers: { body: -10, armF: -165, elbF: -20, handF: -10, armB: 50, legF: -20 },
  lancer: { body: 10, armF: -120, elbF: 20, handF: 40, armB: 80, legF: -30 },
  parade: { body: -6, armF: -150, elbF: 30, handF: 30, armB: 30 },
  touche: { body: -18, head: -10, armF: 40, elbF: -20, handF: 0, armB: 70, legF: 10 },
  boule: { body: 20, head: 10, armF: -30, elbF: -110, handF: -40, armB: 40, elbB: -110, legF: -80, kneeF: 110, legB: -60, kneeB: 100 },
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

// ---------- cinématique ----------
const mul = (a, b) => [a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3], a[0] * b[4] + a[2] * b[5] + a[4], a[1] * b[4] + a[3] * b[5] + a[5]];
const T = (x, y) => [1, 0, 0, 1, x, y];
const Rm = (deg) => { const r = (deg * Math.PI) / 180; return [Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0]; };
const Sm = (sx, sy) => [sx, 0, 0, sy, 0, 0];
const ap = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];
function fk(f, pose = f.pose) {
  const J = f.R.J;
  let m = mul(T(f.x, FEET), Sm(f.face * f.S, f.S));
  m = mul(m, T(0, f.dy / f.S));
  m = mul(mul(mul(m, T(0, f.R.cy)), Rm(f.r)), T(0, -f.R.cy));
  m = mul(m, Sm(f.sq[0], f.sq[1]));
  m = mul(mul(m, T(J.body[0], J.body[1])), Rm(pose.body));
  const sh = mul(mul(m, T(J.armF[0], J.armF[1])), Rm(pose.armF));
  const el = mul(mul(sh, T(J.elbF[0], J.elbF[1])), Rm(pose.elbF));
  const hd = mul(mul(el, T(J.handF[0], J.handF[1])), Rm(pose.handF));
  return { tip: ap(hd, 0, 195 * f.R.k), hand: ap(hd, 0, 0), shoulder: ap(sh, 0, 0), center: ap(m, 0, -80) };
}
const center = (f) => [f.x, FEET + f.dy + f.R.cy * f.S * 0.9];

function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296); }

// ---------- scène courante et primitives ----------
let S;
function op(kind, sel, t, a, b) { S.ops.push([kind, sel, r2(t - S.start), a, b]); }
const to = (sel, t, d, ease, vars) => op('to', sel, t, { ...vars, duration: r2(Math.max(d, 0.001)), ease });
const set = (sel, t, vars) => op('set', sel, t, vars);
const fromTo = (sel, t, d, ease, from, vars) => op('fromTo', sel, t, from, { ...vars, duration: r2(d), ease });
const LAST = new Map(); // dernier tween d'attribut par élément : { vars, start }
function attr(sel, t, d, ease, transform) {
  const prev = LAST.get(sel);
  if (prev && t <= prev.start) prev.op[0] = 'skip'; // remplacé avant même d'avoir commencé
  else if (prev && t < prev.start + prev.op[3].duration) prev.op[3].duration = r2(Math.max(0.001, t - prev.start));
  to(sel, t, d, ease, { attr: { transform } });
  LAST.set(sel, { op: S.ops[S.ops.length - 1], start: t });
}

// les 5 niveaux d'un combattant : root (x) > face (sens, échelle) > air (hauteur) > spin (rotation) > sq (écrasement)
const gX = (f, t, d, ease, x) => { f.x = x; attr(`#${f.p}-root`, t, d, ease, `translate(${r2(x)} ${FEET})`); };
const gFace = (f, t, face, d = 0.08) => { if (f.face === face) return; f.face = face; attr(`#${f.p}-face`, t, d, 'power2.inOut', `scale(${r2(face * f.S)} ${f.S})`); };
const gAir = (f, t, d, ease, dy) => { f.dy = dy; attr(`#${f.p}-air`, t, d, ease, `translate(0 ${r2(dy / f.S)})`); };
const gSpin = (f, t, d, ease, r) => { f.r = r; attr(`#${f.p}-spin`, t, d, ease, `rotate(${r2(r)} 0 ${f.R.cy})`); };
const gSq = (f, t, d, ease, a, b) => { f.sq = [a, b]; attr(`#${f.p}-sq`, t, d, ease, `scale(${r2(a)} ${r2(b)})`); };
const gShadow = (f, t, d, ease, s) => { f.sh = s; attr(`#${f.p}-shadow`, t, d, ease, `scale(${r2(s)} ${r2(s)})`); };
const gAlpha = (f, t, a) => { f.alpha = a; set(`#${f.p}-root`, t, { opacity: a }); };
function lookAt(f, t, d = 0.08) { gFace(f, t, dirTo(f, other(f)), d); }

const LAG = { body: 0, legB: 0, legF: 0.01, kneeB: 0.03, kneeF: 0.03, armF: 0.02, armB: 0.04, elbF: 0.05, elbB: 0.07, handF: 0.08, handB: 0.1, head: 0.07 };
function poseTo(f, name, t, d, ease, override = {}) {
  const tg = { ...target(f, name), ...override };
  const k = Math.min(1.4, Math.max(0.6, d / 0.15));
  const windup = /\.in$/.test(ease);
  for (const [j, a] of Object.entries(tg)) {
    if (Math.abs(a - f.pose[j]) < 0.01) continue;
    const [x, y] = f.R.J[j];
    const lag = (LAG[j] || 0) * k;
    const e = !windup && lag >= 0.04 ? 'back.out(1.8)' : ease;
    attr(`#${f.p}-${j}`, t + lag, d + lag * 0.8, e, jt(x, y, a));
    f.pose[j] = a;
  }
}
function eyes(f, state, t) {
  if (f.eyes === state) return;
  set(`#${f.p}-eyes-${f.eyes}`, t, { opacity: 0 });
  set(`#${f.p}-eyes-${state}`, t, { opacity: 1 });
  f.eyes = state;
}
function land(f, t) { gSq(f, t, 0.05, 'power2.out', 1.12, 0.84); gSq(f, t + 0.05, 0.22, 'back.out(2)', 1, 1); }
// saut : déplacement, arc, saltos (flips > 0 : vers l'avant du personnage), atterrissage écrasé
function hop(f, t, d, { x = f.x, h = 200, flips = 0, air = 'boule', after = 'garde', sound = true } = {}) {
  if (x !== f.x) gX(f, t, d, 'power1.inOut', x);
  gAir(f, t, d * 0.5, 'power2.out', -h); gAir(f, t + d * 0.5, d * 0.5, 'power2.in', 0);
  gShadow(f, t, d * 0.5, 'power2.out', 0.5); gShadow(f, t + d * 0.5, d * 0.5, 'power2.in', 1);
  gSq(f, t, 0.06, 'power2.out', 0.9, 1.1);
  if (flips) { gSpin(f, t + 0.04, d - 0.08, 'power1.inOut', f.r + 360 * flips); set(`#${f.p}-spin`, t + d, { attr: { transform: `rotate(0 0 ${f.R.cy})` } }); f.r = 0; }
  if (air) poseTo(f, air, t + 0.02, 0.12, 'power2.out');
  if (after) poseTo(f, after, t + d - 0.1, 0.16, 'power2.out');
  land(f, t + d);
  if (sound && (flips || h > 150)) snd(t + d * 0.35, 'whoosh-short.mp3', VOL.whoosh * 0.7);
}
// pas rapide au sol
function step(f, t, d, x) {
  gX(f, t, d, 'power2.inOut', x); gSq(f, t, d * 0.4, 'sine.out', 1.03, 0.97); gSq(f, t + d * 0.4, d * 0.6, 'sine.inOut', 1, 1);
  const J = f.R.J, P = f.pose, s = f.R.legK;
  attr(`#${f.p}-legF`, t, d * 0.5, 'sine.out', jt(J.legF[0], J.legF[1], P.legF - 28 * s)); attr(`#${f.p}-legF`, t + d * 0.5, d * 0.5, 'sine.inOut', jt(J.legF[0], J.legF[1], P.legF));
  attr(`#${f.p}-legB`, t, d * 0.5, 'sine.out', jt(J.legB[0], J.legB[1], P.legB + 24 * s)); attr(`#${f.p}-legB`, t + d * 0.5, d * 0.5, 'sine.inOut', jt(J.legB[0], J.legB[1], P.legB));
  attr(`#${f.p}-kneeF`, t + 0.03, d * 0.5, 'sine.out', jt(J.kneeF[0], J.kneeF[1], P.kneeF + 22 * s)); attr(`#${f.p}-kneeF`, t + 0.03 + d * 0.5, d * 0.5, 'sine.inOut', jt(J.kneeF[0], J.kneeF[1], P.kneeF));
}
// garde vivante : petit rebond de ninja, décalé entre les deux
function bob(f, t0, t1, phase = 0) {
  const r = rng(Math.floor(t0 * 100) + f.p.length), J = f.R.J;
  let t = t0 + phase, down = true;
  while (t + 0.42 <= t1) {
    const d = 0.42 + r() * 0.2;
    if (t + d > t1) break;
    gSq(f, t, d, 'sine.inOut', down ? 1.012 + r() * 0.01 : 1, down ? 0.97 - r() * 0.012 : 1);
    attr(`#${f.p}-head`, t + 0.09, d, 'sine.inOut', jt(J.head[0], J.head[1], f.pose.head + (down ? 3 + r() * 2 : -1)));
    t += d; down = !down;
  }
  gSq(f, t, Math.max(0.05, Math.min(0.3, t1 - t)), 'sine.out', 1, 1);
  attr(`#${f.p}-head`, t + 0.05, Math.max(0.05, Math.min(0.3, t1 - t)), 'sine.out', jt(J.head[0], J.head[1], f.pose.head));
}
// pans du bandeau qui flottent toute la scène
function flutter(f, t0, t1, seed) {
  const r = rng(seed);
  const [tx, ty] = f.R.draw === dotnetBot ? [-108, -62] : [-150, -112];
  for (let t = t0, k = 0; t < t1 - 0.05; t += 0.18, k++) {
    attr(`#${f.p}-tails`, t, 0.18, 'sine.inOut', jt(tx, ty, (k % 2 ? -14 : 10) + (r() - 0.5) * 8));
  }
}

// HUD
function hp(f, t, value) {
  const old = f.hp; f.hp = Math.max(0, value);
  if (old === f.hp) return;
  to(`#hud-${f.side}-fill`, t, 0.15, 'power3.out', { scaleX: f.hp / 100 });
  to(`#hud-${f.side}-lag`, t + 0.3, 0.4, 'power2.inOut', { scaleX: f.hp / 100 });
}

// caméra
function punch(t, px, py, s = 1.08, hold = 0.07) {
  const x = (1 - s) * (px - W / 2), y = (1 - s) * (py - H / 2);
  to('#cam', t, hold, 'expo.out', { scale: s, x, y });
  to('#cam', t + hold + 0.04, 0.35, 'power2.inOut', { scale: 1, x: S.camX || 0, y: 0 });
}
function shake(t, frames = 6, amp = 12, seed = 7) {
  const r = rng(seed);
  for (let i = 0; i < frames; i++) to('#shake', t + fr(i), fr(1), 'none', { x: r2((r() * 2 - 1) * amp), y: r2((r() * 2 - 1) * amp) });
  to('#shake', t + fr(frames), fr(2), 'none', { x: 0, y: 0 });
}

// ---------- effets ----------
const BUG = 'M14.25 2c.38 0 .7.28.74.65l.01.1v.75q-.02.97-.53 1.7a3.8 3.8 0 0 1 2.52 3.3h.26a2.25 2.25 0 0 0 2.24-2.26V4.75a.75.75 0 0 1 1.5 0v1.48c0 2-1.56 3.65-3.54 3.76H17v1.51h4.25c.38 0 .7.28.75.65v.1c0 .38-.28.7-.65.74l-.1.01H17v2h.45a3.750 3.75 0 0 1 3.53 3.57v1.68a.75.75 0 0 1-1.5.1v-1.59c.01-1.2-.9-2.170-2.08-2.25h-.15l-.48-.01a5 5 0 0 1-9.54 0h-.49a2.25 2.25 0 0 0-2.24 2.26v1.49a.75.75 0 1 1-1.5 0v-1.48c0-2 1.56-3.65 3.54-3.76h.21L7 15v-2H2.75a.75.75 0 0 1-.74-.65l-.01-.1c0-.38.28-.7.65-.74h.1L7 11.5V10h-.46A3.75 3.75 0 0 1 3 6.42V4.75a.75.75 0 0 1 1.5-.1v1.59c0 1.19.92 2.17 2.09 2.25H7a3.8 3.8 0 0 1 2.52-3.28q-.46-.65-.52-1.5L9 3.51v-.76a.75.75 0 0 1 1.5-.1v.85a1.5 1.5 0 0 0 3 .15v-.9c0-.41.34-.75.75-.75'; // Fluent UI System Icons bug_24_filled (MIT)
let fxN = 0;
const fxId = () => `fx${fxN++}`;
function spark(t, x, y, color = K.yellow, s = 1) {
  const id = fxId();
  const pts = Array.from({ length: 16 }, (_, i) => { const a = (i * Math.PI) / 8, r = (i % 2 ? 26 : 90) * s; return `${r2(Math.cos(a) * r)},${r2(Math.sin(a) * r)}`; }).join(' ');
  S.fx += `<g transform="translate(${r2(x)} ${r2(y)})"><g id="${id}" opacity="0"><polygon points="${pts}" fill="${color}"/><circle r="${22 * s}" fill="#FFFFFF"/></g></g>`;
  fromTo(`#${id}`, t, 0.05, 'expo.out', { opacity: 1, scale: 0.2, transformOrigin: '0px 0px' }, { scale: 1, immediateRender: false });
  to(`#${id}`, t + 0.06, 0.14, 'power2.in', { scale: 1.35, opacity: 0 });
}
function splatter(t, x, y, dir, tokens, seed, n = 9) {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const id = fxId();
    const col = i % 3 === 1 ? K.yellow : K.flamingo;
    const inner = i % 2 === 0
      ? `<path d="${BUG}" transform="translate(-24 -24) scale(2)" fill="${K.flamingo}"/>`
      : `<text x="0" y="10" text-anchor="middle" font-family="Space Mono" font-weight="700" font-size="${26 + Math.floor(r() * 9)}" fill="${col}" stroke="${K.midnight10}" stroke-width="6" paint-order="stroke fill">${tokens[i % tokens.length]}</text>`;
    S.fx += `<g transform="translate(${r2(x)} ${r2(y)})"><g id="${id}" opacity="0">${inner}</g></g>`;
    const dx = dir * (90 + r() * 260) + (r() - 0.5) * 80, up = 120 + r() * 220, down = 120 + r() * 260, d = 0.7 + r() * 0.2, rot = (r() * 2 - 1) * 300;
    set(`#${id}`, t, { opacity: 1, x: 0, y: 0, rotation: 0, transformOrigin: '0px 0px' });
    to(`#${id}`, t, d, 'none', { x: r2(dx), rotation: r2(rot) });
    to(`#${id}`, t, d * 0.42, 'power2.out', { y: r2(-up) });
    to(`#${id}`, t + d * 0.42, d * 0.58, 'power2.in', { y: r2(down) });
    to(`#${id}`, t + d * 0.7, d * 0.3, 'none', { opacity: 0 });
  }
}
function swoosh(t, d, a, b, shoulder, color) {
  const id = fxId();
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const c = [shoulder[0] + (mid[0] - shoulder[0]) * 1.7, shoulder[1] + (mid[1] - shoulder[1]) * 1.7];
  let L = 0, prev = a;
  for (let i = 1; i <= 20; i++) { const u = i / 20, p = [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]; L += Math.hypot(p[0] - prev[0], p[1] - prev[1]); prev = p; }
  L = Math.ceil(L);
  S.fx += `<path id="${id}" d="M${r2(a[0])} ${r2(a[1])} Q${r2(c[0])} ${r2(c[1])} ${r2(b[0])} ${r2(b[1])}" fill="none" stroke="${color}" stroke-width="30" stroke-linecap="round" opacity="0" stroke-dasharray="${L}" stroke-dashoffset="${L}"/>`;
  set(`#${id}`, t, { opacity: 0.7 });
  to(`#${id}`, t, d, 'expo.out', { attr: { 'stroke-dashoffset': 0 } });
  to(`#${id}`, t + d + 0.02, 0.15, 'power2.in', { opacity: 0 });
}
// nuage de fumée de ninja
function smoke(t, x, y, seed) {
  const r = rng(seed);
  for (let i = 0; i < 7; i++) {
    const id = fxId(), a = (i / 7) * Math.PI * 2, rr = 50 + r() * 40;
    const cx = x + Math.cos(a) * rr * 0.8, cy = y + Math.sin(a) * rr * 0.6, rad = 60 + r() * 40;
    S.fx += `<g transform="translate(${r2(cx)} ${r2(cy)})"><circle id="${id}" r="${r2(rad)}" fill="${i % 2 ? K.purpleTint45 : K.purpleTint}" opacity="0"/></g>`;
    fromTo(`#${id}`, t + i * 0.01, 0.12, 'power2.out', { opacity: 0.9, scale: 0.2, transformOrigin: '0px 0px' }, { scale: 1.1, immediateRender: false });
    to(`#${id}`, t + 0.14 + i * 0.01, 0.35, 'power2.in', { scale: 1.5, opacity: 0, x: r2(Math.cos(a) * 50), y: r2(Math.sin(a) * 30 - 40) });
  }
}
// traits de vitesse derrière un élan
function speedLines(t, x0, x1, y, seed) {
  const r = rng(seed);
  for (let i = 0; i < 5; i++) {
    const id = fxId(), yy = y + (i - 2) * 46 + (r() - 0.5) * 20;
    S.fx += `<line id="${id}" x1="${r2(x0)}" y1="${r2(yy)}" x2="${r2(x1)}" y2="${r2(yy)}" stroke="#FFFFFF" stroke-width="${6 + (i % 2) * 4}" stroke-linecap="round" opacity="0"/>`;
    set(`#${id}`, t + i * 0.015, { opacity: 0.8 });
    to(`#${id}`, t + 0.05 + i * 0.015, 0.22, 'power2.in', { opacity: 0 });
  }
}
// shuriken : vole de la main jusqu'à la cible en tournant
function shuriken(t, from, toPt, d = 0.28) {
  const id = fxId();
  const blade = 'M0 -34 L9 -9 L34 0 L9 9 L0 34 L-9 9 L-34 0 L-9 -9 Z';
  S.fx += `<g transform="translate(${r2(from[0])} ${r2(from[1])})"><g id="${id}" opacity="0"><path d="${blade}" fill="${K.blueTint45}" stroke="${K.midnight10}" stroke-width="4"/><circle r="7" fill="${K.midnight10}"/></g></g>`;
  set(`#${id}`, t, { opacity: 1, x: 0, y: 0, rotation: 0, transformOrigin: '0px 0px' });
  to(`#${id}`, t, d, 'none', { x: r2(toPt[0] - from[0]), y: r2(toPt[1] - from[1]), rotation: 900 });
  set(`#${id}`, t + d + 0.01, { opacity: 0 });
}

// cartes
let cardN = 0;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function card(t, tEnd, owner, c, ix, iy) {
  const id = `card${cardN++}`;
  const team = owner.side === 'gauche' ? 'db' : 'go';
  const top = c.grand ? 430 : 400;
  const body = c.grand ? `<div class="big">${c.nom}</div>`
    : `<div class="name">${c.nom}</div>${c.code ? `<div class="code">${esc(c.code)}</div>` : ''}${c.note ? `<div class="note">${c.note}</div>` : ''}`;
  S.cards += `<div class="card ${team}" id="${id}" data-layout-allow-overlap style="top:${top}px"><div class="tag">${c.tag}</div>${body}</div>`;
  const cx = 540, cy = top + (c.grand ? 150 : 120);
  fromTo(`#${id}`, t, 0.2, 'back.out(1.6)', { opacity: 0, scale: 0.2, rotation: -20, x: r2(ix - cx), y: r2(iy - cy) }, { opacity: 1, scale: 1, rotation: -4, x: 0, y: 0 });
  to(`#${id}`, tEnd, 0.12, 'power2.in', { opacity: 0, scale: 0.9, filter: 'blur(8px)' });
}
let annN = 0;
function announce(t, tEnd, text, cls = '') {
  const id = `ann${annN++}`;
  S.cards += `<div class="ann ${cls}" id="${id}">${text}</div>`;
  fromTo(`#${id}`, t, 0.12, 'expo.out', { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1 });
  if (tEnd) to(`#${id}`, tEnd, 0.1, 'power3.in', { opacity: 0, scale: 0.92 });
}

// ---------- sons (temps absolus ; le pic du son tombe une image après l'action) ----------
const SFX = { // durée, instant du pic (mesurés avec npx hyperframes audio)
  'swing-1.wav': [0.32, 0.13], 'swing-2.wav': [0.32, 0.14], 'swing-3.wav': [0.32, 0.18],
  'hit-1.wav': [0.55, 0], 'hit-2.wav': [0.55, 0], 'hit-3.wav': [0.55, 0], 'clash.wav': [1.3, 0], 'thud.wav': [0.7, 0],
  'bell.wav': [2.02, 0], 'bell-ko.wav': [2.22, 0], 'crowd.wav': [3.0, 0.07],
  'impact-bass-1.mp3': [2.12, 0.07], 'pop.mp3': [0.72, 0.12], 'whoosh-short.mp3': [0.57, 0.16], 'riser.mp3': [4.3, 0],
};
const VOL = { swing: 0.5, hit: 0.95, clash: 0.7, thud: 0.85, bell: 0.55, crowd: 0.45, impact: 0.45, pop: 0.8, whoosh: 0.55, riser: 0.4 };
const SOUNDS = [];
let MUSIC_CUT = null;
const take = { swing: 0, hit: 0 };
function snd(t, file, vol, { atPeak = true } = {}) {
  const [d, peak] = SFX[file];
  const tt = Math.max(0, r2(t + (atPeak ? fr(1) - peak : 0)));
  if (SOUNDS.some((x) => x.file === file && Math.abs(x.t - tt) < 0.02)) return;
  SOUNDS.push({ t: Math.max(0, r2(t + (atPeak ? fr(1) - peak : 0))), file, d, vol: r2(vol) });
}
const swingSnd = (t) => snd(t + 0.04, `swing-${(take.swing++ % 3) + 1}.wav`, VOL.swing);
const hitSnd = (t) => snd(t, `hit-${(take.hit++ % 3) + 1}.wav`, VOL.hit);

// ---------- techniques ----------
function clash(t, a, b, seed, big = false, at = null) {
  const [x, y] = at || [(a.x + b.x) / 2, Math.min(center(a)[1], center(b)[1]) - 40];
  spark(t, x, y, K.yellow, big ? 1.2 : 0.7); if (big) spark(t + 0.04, x + 30, y - 30, K.white, 0.6);
  snd(t, 'clash.wav', VOL.clash * (big ? 1 : 0.55));
  if (big) { punch(t, x, y, 1.05); shake(t, 4, 8, seed); }
}
// touche : armé, frappe (traînée de lame), impact, la victime roule en arrière
const WIND = { taille: 'arme_haut', estoc: 'arme_estoc', revers: 'arme_revers', toupie: 'arme_revers' };
const STRIKE = { taille: 'taille', estoc: 'estoc', revers: 'revers', toupie: 'taille' };
function strike(att, def, Ts, geste, dmg, seed, { roll = true } = {}) {
  const dir = dirTo(att, def);
  let I;
  if (geste === 'shuriken') {
    poseTo(att, 'arme_revers', Ts, 0.12, 'power2.in');
    poseTo(att, 'lancer', Ts + 0.14, 0.1, 'expo.out');
    const hand = fk(att, target(att, 'lancer')).hand, c = center(def);
    for (let k = 0; k < 3; k++) { shuriken(Ts + 0.2 + k * 0.08, hand, [c[0] + (k - 1) * 18, c[1] - 40 + (k - 1) * 50]); swingSnd(Ts + 0.2 + k * 0.08); }
    I = Ts + 0.2 + 0.28 + 0.16;
  } else {
    poseTo(att, WIND[geste], Ts, 0.14, 'power2.in');
    if (geste === 'toupie') { gSpin(att, Ts + 0.14, 0.28, 'power2.in', 360); set(`#${att.p}-spin`, Ts + 0.42, { attr: { transform: `rotate(0 0 ${att.R.cy})` } }); att.r = 0; }
    const t1 = Ts + (geste === 'toupie' ? 0.36 : 0.16);
    const a = fk(att, target(att, WIND[geste])).tip;
    poseTo(att, STRIKE[geste], t1, 0.1, 'expo.out');
    const k = fk(att, target(att, STRIKE[geste]));
    swoosh(t1, 0.1, a, k.tip, k.shoulder, att.R.accent);
    swingSnd(t1);
    I = t1 + 0.1;
  }
  const c = center(def), ix = c[0] - dir * 50, iy = c[1] - 30;
  if (dmg > 0) {
    hitSnd(I);
    spark(I, ix, iy);
    splatter(I, ix, iy, dir, def.R.hitTokens, seed);
    punch(I, ix, iy); shake(I, 5, 12, seed);
    eyes(def, 'hurt', I);
    hp(def, I + fr(3), def.hp - dmg);
    if (roll) {
      // roulade arrière de la victime
      const back = CL(def.x + dir * 150);
      poseTo(def, 'touche', I + fr(3), 0.1, 'power2.out');
      hop(def, I + fr(3) + 0.1, 0.5, { x: back, h: 110, flips: -1, air: 'boule', sound: false });
    }
  }
  return { I, ix, iy };
}
// approches acrobatiques : rapprochent l'attaquant à ~230 px du défenseur
function approach(kind, att, def, T0, seed) {
  const gap = 290;
  if (kind === 'choc') {
    // les deux bondissent, choc des lames en plein vol, chacun retombe
    const mid = (att.x + def.x) / 2;
    poseTo(att, 'arme_haut', T0, 0.1, 'power2.out'); poseTo(def, 'parade', T0, 0.1, 'power2.out');
    hop(att, T0 + 0.05, 0.62, { x: mid - dirTo(att, def) * 110, h: 300, air: null, after: 'garde' });
    hop(def, T0 + 0.05, 0.62, { x: mid + dirTo(att, def) * 110, h: 300, air: null, after: 'garde' });
    poseTo(att, 'taille', T0 + 0.3, 0.08, 'expo.out');
    clash(T0 + 0.38, att, def, seed, true, [mid, FEET - 300 - 300]);
    lookAt(att, T0 + 0.7); lookAt(def, T0 + 0.7);
  } else if (kind === 'saut') {
    // l'attaquant saute par-dessus l'adversaire en salto et se retourne
    const dir = dirTo(att, def);
    const nx = CL(def.x + dir * gap);
    step(att, T0, 0.18, att.x + dir * 80);
    hop(att, T0 + 0.18, 0.62, { x: nx, h: 420, flips: 1 });
    const need = CL(nx - dir * gap); if (Math.abs(need - def.x) > 1) step(def, T0 + 0.6, 0.22, need);
    eyes(def, 'normal', T0 + 0.3);
    lookAt(att, T0 + 0.82); gFace(def, T0 + 0.9, dirTo(def, att), 0.1);
  } else if (kind === 'corde') {
    // course vers les cordes, rebond et salto vers l'adversaire
    const dir = dirTo(att, def);
    const rope = dir > 0 ? 70 : 1010;
    gFace(att, T0, -dir); gX(att, T0, 0.28, 'power2.in', rope); poseTo(att, 'dash', T0, 0.12, 'power2.out');
    speedLines(T0 + 0.1, rope - dir * 40, rope - dir * 300, FEET - 200, seed);
    gFace(att, T0 + 0.3, dir, 0.06);
    hop(att, T0 + 0.34, 0.6, { x: CL(def.x - dir * gap), h: 280, flips: 1 });
    // le défenseur esquive d'un petit saut arrière
    hop(def, T0 + 0.5, 0.42, { x: CL(def.x + dir * 40), h: 130, flips: -1, sound: false });
  } else if (kind === 'fumee') {
    // disparition dans la fumée, réapparition dans le dos de l'adversaire
    const dir = dirTo(att, def);
    const c0 = center(att);
    poseTo(att, 'parade', T0, 0.1, 'power2.out');
    smoke(T0 + 0.12, c0[0], c0[1], seed); snd(T0 + 0.12, 'pop.mp3', VOL.pop * 0.7);
    gAlpha(att, T0 + 0.2, 0);
    const nx = CL(def.x + dir * gap);
    gX(att, T0 + 0.22, 0.01, 'none', nx); gFace(att, T0 + 0.22, -dir, 0.01);
    const need = CL(nx - dir * gap); if (Math.abs(need - def.x) > 1) step(def, T0 + 0.3, 0.2, need);
    const c1 = [nx, center(att)[1]];
    smoke(T0 + 0.5, c1[0], c1[1], seed + 1); snd(T0 + 0.5, 'pop.mp3', VOL.pop * 0.7);
    gAlpha(att, T0 + 0.58, 1);
    poseTo(att, 'garde', T0 + 0.58, 0.12, 'power2.out');
    eyes(def, 'normal', T0 + 0.6);
    gFace(def, T0 + 0.85, dirTo(def, att), 0.1);
  } else {
    // simple ruée au sol
    const dir = dirTo(att, def);
    step(att, T0 + 0.6, 0.25, def.x - dir * gap);
  }
}
// enchaînement au sol : trois chocs rapides, petits sauts
function flurry(a, b, t0, seed) {
  const dir = dirTo(a, b);
  step(a, t0, 0.18, CL(b.x - dir * 270));
  for (let i = 0; i < 3; i++) {
    const t = t0 + 0.22 + i * 0.42;
    const [x, y] = i % 2 ? [b, a] : [a, b];
    poseTo(x, 'arme_haut', t, 0.1, 'power2.in'); poseTo(y, 'parade', t, 0.1, 'power2.out');
    poseTo(x, 'taille', t + 0.14, 0.08, 'expo.out');
    clash(t + 0.22, a, b, seed + i);
    poseTo(x, 'garde', t + 0.3, 0.1, 'power2.out'); poseTo(y, 'garde', t + 0.3, 0.1, 'power2.out');
    gAir(a, t, 0.1, 'power2.out', -40); gAir(a, t + 0.1, 0.12, 'power2.in', 0);
  }
}
// séparation : chacun repart à son poste en salto arrière
function separate(t, h = 170) {
  const cross = F.gauche.x > F.droite.x;
  [F.gauche, F.droite].forEach((f, k) => {
    const tx = STATION[f.side], mv = tx >= f.x ? 1 : -1;
    hop(f, t + k * 0.06, cross ? 0.7 : 0.55, { x: tx, h: cross ? (k ? 200 : 420) : h, flips: mv === f.face ? 1 : -1, sound: k === 0 });
  });
  lookAt(F.gauche, t + 0.8); lookAt(F.droite, t + 0.85);
}

function exchange(e, i) {
  const att = F[e.qui], def = other(att);
  const T0 = e.at, seed = 100 + i * 17;
  const next = M.echanges[i + 1];
  eyes(att, 'angry', T0);
  if (e.geste === 'parade') {
    approach('choc', att, def, T0, seed);
    eyes(def, 'angry', T0 + 0.8);
    const dir = dirTo(att, def);
    step(att, T0 + 0.9, 0.16, CL(def.x - dir * 280));
    poseTo(def, 'parade', T0 + 1.0, 0.12, 'power2.out');
    poseTo(att, 'arme_haut', T0 + 0.95, 0.14, 'power2.in'); poseTo(att, 'taille', T0 + 1.12, 0.1, 'expo.out'); swingSnd(T0 + 1.12);
    const I = T0 + 1.22;
    const p = fk(def, target(def, 'parade')), cx = (p.tip[0] + p.hand[0]) / 2, cy = (p.tip[1] + p.hand[1]) / 2;
    spark(I, cx, cy, K.yellow, 1.3); spark(I + 0.05, cx + 30, cy - 20, K.white, 0.6);
    snd(I, 'clash.wav', VOL.clash); punch(I, cx, cy, 1.05); shake(I, 4, 8, seed);
    hop(att, I + 0.08, 0.45, { x: att.x - dir * 120, h: 120, flips: -1, sound: false });
    card(I + 0.06, I + 2.0, att, e.carte, cx, cy);
    card(I + 2.1, T0 + 5.9, def, e.riposte, p.hand[0], p.hand[1]);
    flurry(def, att, T0 + 2.2, seed);
    separate(T0 + 5.95, 140);
  } else if (e.geste === 'chute') {
    // le Gopher fait le malin : grand salto… et atterrit sur ses propres goroutines
    const dir = dirTo(att, def);
    const nx = CL(att.x + dir * 50);
    hop(att, T0, 0.75, { x: nx, h: 380, flips: 2, after: 'touche' });
    for (let k = 0; k < (e.mini || 0); k++) {
      const id = `${att.p}m${k}`, r = rng(seed + k);
      const x1 = nx + (-260 + k * 95) + (r() - 0.5) * 40;
      S.minis += gopher(id).replace(`<g id="${id}-root">`, `<g id="${id}-root" opacity="0" transform="translate(${r2(nx)} ${FEET + 12}) scale(${r2(dir * 0.3)} 0.3)">`);
      set(`#${id}-root`, T0 + 0.55 + k * 0.04, { opacity: 1 });
      if (k % 2 === 0) snd(T0 + 0.55 + k * 0.04, 'pop.mp3', VOL.pop * 0.6);
      attr(`#${id}-root`, T0 + 0.55 + k * 0.04, 0.35, 'power2.out', `translate(${r2(x1)} ${FEET + 14}) scale(${r2(dir * 0.3)} 0.3)`);
      const xo = k % 2 ? -220 - k * 30 : W + 220 + k * 30;
      attr(`#${id}-root`, T0 + 2.0 + k * 0.07, 0.9, 'power2.in', `translate(${xo} ${FEET + 14}) scale(${r2((xo < 0 ? -1 : 1) * 0.3)} 0.3)`);
    }
    // il glisse et tombe sur le dos
    eyes(att, 'hurt', T0 + 0.8);
    gSpin(att, T0 + 0.8, 0.28, 'power2.in', -75);
    gAir(att, T0 + 0.8, 0.28, 'power2.in', 20);
    const I = T0 + 1.08, ix = att.x, iy = FEET - 60;
    snd(I, 'thud.wav', VOL.thud);
    spark(I, ix, iy, K.yellow, 0.8); splatter(I, ix, iy - 60, -dir, att.R.hitTokens, seed, 7);
    punch(I, ix, iy, 1.06); shake(I, 5, 10, seed);
    hp(att, I + 0.1, att.hp - e.degats);
    card(I + 0.1, T0 + 4.4, att, e.carte, ix, iy);
    eyes(def, 'happy', I + 0.15);
    hop(def, I + 0.3, 0.5, { h: 160, flips: 0, air: 'victoire', after: 'garde' });
    gSpin(att, T0 + 3.0, 0.4, 'back.out(1.4)', 0); gAir(att, T0 + 3.0, 0.4, 'power2.out', 0);
    eyes(att, 'angry', T0 + 3.3); eyes(def, 'normal', T0 + 3.6);
    separate(T0 + 4.5);
  } else if (e.geste === 'combo') {
    approach(e.approche, att, def, T0, seed);
    const h1 = strike(att, def, T0 + 1.0, 'revers', e.degats[0], seed);
    // seconde touche : bond en toupie
    const dir = dirTo(att, def);
    hop(att, T0 + 3.0, 0.5, { x: CL(def.x - dir * 260), h: 240, flips: 1, after: null });
    poseTo(att, 'garde', T0 + 3.48, 0.08, 'power2.out');
    const h2 = strike(att, def, T0 + 3.55, 'toupie', e.degats[1], seed + 5);
    card(h1.I + 0.06, h2.I - 0.12, att, e.cartes[0], h1.ix, h1.iy);
    card(h2.I + 0.06, T0 + 6.6, att, e.cartes[1], h2.ix, h2.iy);
    eyes(att, 'angry', T0 + 4.6); eyes(def, 'hurt', T0 + 4.6);
    separate(T0 + 5.9);
  } else if (e.geste === 'final') {
    // recul en salto jusqu'aux cordes, rebond, élan : break outer;
    const dir = dirTo(att, def);
    const rope = dir > 0 ? 70 : 1010;
    hop(att, T0, 0.55, { x: rope, h: 260, flips: -1 });
    poseTo(att, 'arme_estoc', T0 + 0.6, 0.15, 'power2.in');
    const a0 = fk(att, target(att, 'arme_estoc')).tip;
    poseTo(att, 'dash', T0 + 0.8, 0.12, 'expo.out');
    gX(att, T0 + 0.8, 0.14, 'expo.out', def.x - dir * 150);
    speedLines(T0 + 0.82, att.x - dir * 60, att.x - dir * 520, FEET - 220, seed);
    const k = fk(att, target(att, 'dash'));
    swoosh(T0 + 0.8, 0.14, a0, k.tip, k.shoulder, att.R.accent); swingSnd(T0 + 0.8);
    const I = T0 + 0.94, c = center(def), ix = c[0] - dir * 30, iy = c[1];
    snd(I - 4.25, 'riser.mp3', VOL.riser, { atPeak: false });
    hitSnd(I); snd(I, 'impact-bass-1.mp3', VOL.impact); snd(I + 0.25, 'crowd.wav', VOL.crowd);
    MUSIC_CUT = r2(I + fr(1));
    spark(I, ix, iy, K.yellow, 1.6); spark(I + 0.05, ix + 40, iy - 60, K.white, 0.8);
    splatter(I, ix, iy, dir, def.R.hitTokens, seed, 11);
    punch(I, ix, iy, 1.15, 0.1); shake(I, 10, 16, seed);
    eyes(def, 'ko', I); hp(def, I + fr(3), 0);
    // le Gopher passe par-dessus les cordes et sort du ring
    poseTo(def, 'vol', I + fr(3), 0.25, 'power2.out');
    gX(def, I + fr(3), 0.95, 'power1.out', 1330);
    gAir(def, I + fr(3), 0.5, 'power2.out', -620); gAir(def, I + fr(3) + 0.5, 0.45, 'power2.in', 180);
    gSpin(def, I + fr(3), 0.95, 'power1.out', 3 * 360 + 90);
    snd(I + fr(3) + 0.95, 'thud.wav', VOL.thud * 0.8);
    card(I + 0.08, T0 + 4.8, att, e.carte, ix, iy);
    eyes(att, 'happy', T0 + 1.6);
    hop(att, T0 + 2.0, 0.6, { x: 470, h: 300, flips: 1, after: 'garde' });
    lookAt(att, T0 + 2.7);
    bob(att, T0 + 2.8, T0 + 7.0);
  } else {
    approach(e.approche, att, def, T0, seed);
    const h = strike(att, def, T0 + 1.05, e.geste, e.degats, seed);
    card(h.I + 0.06, T0 + 4.6, att, e.carte, h.ix, h.iy);
    poseTo(att, 'garde', h.I + 0.3, 0.15, 'power2.out');
    eyes(def, 'angry', h.I + 0.9);
    flurry(def, att, h.I + 1.0, seed);
    separate(T0 + 4.0);
    bob(F.gauche, T0 + 4.9, T0 + 7.0); bob(F.droite, T0 + 4.95, T0 + 7.0, 0.1);
    if (next && next.geste !== 'final') { const n = F[next.qui]; poseTo(n, 'arme_haut', T0 + 5.9, 0.15, 'power2.out'); poseTo(n, 'garde', T0 + 6.5, 0.2, 'power2.inOut'); }
  }
  if (next && next.geste !== 'final') eyes(F[next.qui], 'angry', T0 + 6.6);
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
    <text x="540" y="1478" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="52" letter-spacing="10" fill="${K.white}">${M.titre}</text>
    <text x="540" y="1530" text-anchor="middle" font-family="Space Mono" font-weight="700" font-size="30" letter-spacing="6" fill="${K.purpleTint45}">${POULE}</text>
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
// combattant : root > face > air > spin > sq > dessin ; ombre au sol
function fighterMarkup(f) {
  const J = Object.fromEntries(Object.entries(f.R.J).map(([k, v]) => [k, [v[0], v[1], f.pose[k]]]));
  let s = f.R.draw(f.p, J);
  const shadow = s.match(/<ellipse id="[^"]+-shadow"[^>]*\/>/)[0];
  s = s.replace(shadow, '');
  const inner = s.replace(`<g id="${f.p}-root">`, '<g>');
  let out = `<g id="${f.p}-root" transform="translate(${r2(f.x)} ${FEET})" opacity="${f.alpha}">
    <g id="${f.p}-shadow" transform="scale(${f.sh} ${f.sh})">${shadow.replace(/ id="[^"]+"/, '')}</g>
    <g id="${f.p}-face" transform="scale(${r2(f.face * f.S)} ${f.S})"><g id="${f.p}-air" transform="translate(0 ${r2(f.dy / f.S)})"><g id="${f.p}-spin" transform="rotate(${r2(f.r)} 0 ${f.R.cy})"><g id="${f.p}-sq" transform="scale(${f.sq[0]} ${f.sq[1]})">${inner}</g></g></g></g></g>`;
  for (const st of EYE_STATES) out = out.replace(new RegExp(`id="${f.p}-eyes-${st}"( opacity="0")?`), `id="${f.p}-eyes-${st}" opacity="${f.eyes === st ? 1 : 0}"`);
  return out;
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
  .hud-name { color: #FFFFFF; font-weight: 700; font-size: 34px; letter-spacing: 0.01em; }
  .hud-bar { position: relative; width: 100%; height: 40px; background: ${K.midnight}; border: 4px solid #FFFFFF; border-radius: 6px; overflow: hidden; }
  .hud-lag, .hud-fill { position: absolute; inset: 0; }
  .hud-lag { background: ${K.flamingo}; }
  .gauche .hud-lag, .hud-fill.gauche { transform-origin: left center; }
  .droite .hud-lag, .hud-fill.droite { transform-origin: right center; }
  .hud-fill.gauche { background: linear-gradient(90deg, ${K.purple}, ${K.magenta}); }
  .hud-fill.droite { background: ${K.cyan}; }
  .hud-round { width: 92px; height: 92px; border-radius: 46px; background: ${K.yellow}; color: ${K.midnight10}; font-weight: 700; font-size: 38px; display: flex; align-items: center; justify-content: center; border: 5px solid #FFFFFF; flex: none; }
  .card { position: absolute; left: 110px; width: 860px; padding: 20px 30px 24px; border: 6px solid #FFFFFF; border-radius: 18px; opacity: 0; }
  .card.db { background: ${K.purple}; color: #FFFFFF; }
  .card.go { background: ${K.cyan}; color: ${K.midnight10}; }
  .card .tag { font-family: 'Space Mono'; font-weight: 700; font-size: 28px; letter-spacing: 0.08em; }
  .card .name { font-weight: 700; font-size: 54px; line-height: 1.02; letter-spacing: -0.02em; margin-top: 6px; }
  .card .code { font-family: 'Space Mono'; font-size: 28px; color: ${K.code}; background: ${K.midnight}; padding: 12px 18px; border-radius: 10px; margin-top: 16px; white-space: nowrap; }
  .card .note { font-family: 'Open Sans'; font-weight: 600; font-size: 32px; margin-top: 12px; }
  .card .big { font-family: 'Space Mono'; font-weight: 700; font-size: 72px; color: ${K.code}; background: ${K.midnight}; padding: 18px 26px; border-radius: 14px; margin-top: 14px; text-align: center; }
  .ann { position: absolute; left: 0; right: 0; top: 480px; text-align: center; font-weight: 700; font-size: 140px; line-height: 1; color: ${K.yellow}; -webkit-text-stroke: 9px ${K.midnight10}; paint-order: stroke fill; opacity: 0; }
  .ann.small { font-size: 100px; }
  .ann.top { top: 400px; }
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
      const OPS = ${JSON.stringify(S.ops.filter((o) => o[0] !== 'skip'))};
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

// ---------- scènes ----------
const E = M.echanges;
const SCENES = [
  { id: 'intro', start: 0, end: 4.0 },
  { id: 'fighta', start: 4.0, end: E[4].at },
  { id: 'fightb', start: E[4].at, end: E[8].at },
  { id: 'finish', start: E[8].at, end: M.fin },
  { id: 'outro', start: M.fin, end: 90.0 },
];
function begin(sc) {
  LAST.clear();
  S = { ...sc, ops: [], fx: '', cards: '', minis: '', camX: 0, fighters: fighterMarkup(F.gauche) + fighterMarkup(F.droite), hud: hudMarkup() };
  flutter(F.gauche, sc.start, sc.end, 31); flutter(F.droite, sc.start, sc.end, 37);
}
mkdirSync(path.join(OUT, 'compositions'), { recursive: true });
const written = [];
function finish(sc, extraTop = '') {
  const pre = (m) => m.replace(/\bid="([^"]+)"/g, `id="${sc.id}-$1"`).replace(/url\(#([^)]+)\)/g, `url(#${sc.id}-$1)`);
  const inner = pre(`<div style="position:absolute;inset:0">${world()}${extraTop}${S.cards}</div>`);
  S.ops = S.ops.map(([k, sel, ...rest]) => [k, sel.replace(/#([\w-]+)/g, `#${sc.id}-$1`), ...rest]);
  writeFileSync(path.join(OUT, 'compositions', `${sc.id}.html`), sceneFile(sc, inner));
  written.push(sc);
}
const inScene = (sc) => E.filter((e) => e.at >= sc.start && e.at < sc.end);

// INTRO (0–4 s) : titre + VS dès l'image 0, double salto des deux ninjas, présentation éclair
{
  const sc = SCENES[0];
  F.gauche.eyes = 'angry'; F.droite.eyes = 'angry'; // état initial (avant begin)
  begin(sc);
  S.cards += `<div class="title" id="title">${M.titre}</div><div class="vs" id="vs"><div class="vs-l">${M.gauche.nom}</div><div class="vs-v">${M.gauche.version}</div><div class="vs-x">VS</div><div class="vs-r">${M.droite.nom}</div><div class="vs-v">${M.droite.version}</div></div>`;
  fromTo('#vs', 0, 0.25, 'expo.out', { scale: 1.12, opacity: 1 }, { scale: 1 });
  fromTo('#title', 0, 0.25, 'expo.out', { scale: 1.1, opacity: 1 }, { scale: 1 });
  snd(0, 'impact-bass-1.mp3', VOL.impact);
  hop(F.gauche, 0.55, 0.6, { h: 150, flips: -1 }); hop(F.droite, 0.62, 0.6, { h: 150, flips: -1 });
  to('#vs', 1.85, 0.12, 'power3.in', { opacity: 0, scale: 0.94 });
  to('#title', 1.85, 0.12, 'power3.in', { opacity: 0, y: -30 });
  const plate = (f, id, side) => `<div class="plate ${side}" id="${id}"><div class="plate-name">${f.d.nom}</div></div>`;
  S.cards += plate(F.gauche, 'plate-l', 'l') + plate(F.droite, 'plate-r', 'r');
  const zoomOn = (x, t, d) => { const s = 1.3, py = FEET - 280; to('#cam', t, d, 'power3.inOut', { scale: s, x: (1 - s) * (x - W / 2), y: (1 - s) * (py - H / 2) }); };
  zoomOn(STATION.gauche + 60, 1.95, 0.3); snd(2.05, 'whoosh-short.mp3', VOL.whoosh);
  fromTo('#plate-l', 2.02, 0.15, 'expo.out', { opacity: 0, x: -60 }, { opacity: 1, x: 0 });
  to('#plate-l', 2.92, 0.08, 'power3.in', { opacity: 0 });
  zoomOn(STATION.droite - 60, 2.95, 0.3); snd(3.05, 'whoosh-short.mp3', VOL.whoosh);
  fromTo('#plate-r', 3.02, 0.15, 'expo.out', { opacity: 0, x: 60 }, { opacity: 1, x: 0 });
  to('#plate-r', 3.9, 0.08, 'power3.in', { opacity: 0 });
  to('#cam', 3.78, 0.22, 'power3.inOut', { scale: 1, x: 0, y: 0 });
  bob(F.gauche, 1.5, 4.0); bob(F.droite, 1.55, 4.0, 0.12);
  sc.css = `
    .title { position: absolute; left: 0; right: 0; top: 210px; text-align: center; font-weight: 700; font-size: 64px; letter-spacing: 0.08em; color: ${K.yellow}; -webkit-text-stroke: 7px ${K.midnight10}; paint-order: stroke fill; }
    .vs { position: absolute; left: 0; right: 0; top: 340px; text-align: center; color: #FFFFFF; font-weight: 700; transform-origin: 540px 200px; }
    .vs-l, .vs-r { font-size: 68px; line-height: 1.05; letter-spacing: -0.03em; }
    .vs-r { color: ${K.cyan}; }
    .vs-v { font-family: 'Space Mono'; font-weight: 700; font-size: 30px; color: ${K.purpleTint}; margin-top: 4px; }
    .vs-x { font-size: 96px; line-height: 1; color: ${K.white}; -webkit-text-stroke: 8px ${K.midnight10}; paint-order: stroke fill; }
    .plate { position: absolute; top: 400px; width: 560px; padding: 20px 30px; border: 6px solid #FFFFFF; border-radius: 18px; opacity: 0; }
    .plate.l { left: 60px; background: ${K.purple}; color: #FFFFFF; }
    .plate.r { right: 60px; background: ${K.cyan}; color: ${K.midnight10}; text-align: right; }
    .plate-name { font-weight: 700; font-size: 68px; line-height: 1; letter-spacing: -0.03em; }
    .plate-ver { font-family: 'Space Mono'; font-weight: 700; font-size: 44px; margin-top: 12px; }`;
  finish(sc);
}
// FIGHT A : ROUND 1, FIGHT!, échanges 1–4
{
  const sc = SCENES[1]; begin(sc);
  fromTo('#hud', 4.0, 0.2, 'expo.out', { opacity: 0, y: -40 }, { opacity: 1, y: 0 });
  announce(4.1, 4.75, 'ROUND 1', 'small'); snd(4.1, 'bell.wav', VOL.bell);
  announce(4.85, 5.5, 'FIGHT!'); snd(4.85, 'impact-bass-1.mp3', VOL.impact);
  bob(F.gauche, 4.0, 5.6); bob(F.droite, 4.0, 5.6, 0.1);
  inScene(sc).forEach((e) => exchange(e, E.indexOf(e)));
  finish(sc, S.hud);
}
// FIGHT B : échanges 5–8
{
  const sc = SCENES[2]; begin(sc);
  const hud = S.hud;
  inScene(sc).forEach((e) => exchange(e, E.indexOf(e)));
  finish(sc, hud);
}
// FINISH : combo, break outer;, K.O.
{
  const sc = SCENES[3]; begin(sc);
  const hud = S.hud;
  inScene(sc).forEach((e) => exchange(e, E.indexOf(e)));
  announce(M.ko + 0.1, M.ko + 1.1, 'K.O.'); snd(M.ko + 0.1, 'bell-ko.wav', VOL.bell); snd(M.ko + 0.1, 'crowd.wav', VOL.crowd);
  S.camX = -560;
  to('#cam', M.ko + 1.2, 0.6, 'power3.inOut', { x: -560 }); snd(M.ko + 1.45, 'whoosh-short.mp3', VOL.whoosh);
  S.cards += `<div class="caption" id="ko-cap">${M.droite.nom} est hors du ring</div>`;
  fromTo('#ko-cap', M.ko + 1.3, 0.2, 'expo.out', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1 });
  sc.css = `.caption { position: absolute; left: 60px; right: 60px; top: 520px; text-align: center; font-weight: 700; font-size: 54px; line-height: 1.1; color: #FFFFFF; opacity: 0; }`;
  finish(sc, hud);
}
// OUTRO : salto de la victoire, classement, prochain combat
{
  const sc = SCENES[4];
  const win = F[M.vainqueur], lose = other(win);
  Object.assign(win, { x: 540, dy: 0, r: 0, sq: [1, 1], sh: 1, alpha: 1 });
  win.face = 1; win.eyes = 'happy';
  Object.assign(lose, { x: 1500, dy: 0, r: 0 });
  begin(sc);
  hop(win, sc.start + 0.05, 0.7, { h: 200, flips: -1, after: 'victoire' });
  announce(sc.start + 0.2, sc.start + 3.4, 'VICTOIRE', 'small top'); snd(sc.start + 0.2, 'impact-bass-1.mp3', VOL.impact); snd(sc.start + 0.3, 'crowd.wav', VOL.crowd);
  S.cards += `<div class="pts" id="pts"><span>${win.d.nom}</span><b>+3 PTS</b></div>`;
  snd(sc.start + 0.8, 'pop.mp3', VOL.pop);
  fromTo('#pts', sc.start + 0.8, 0.2, 'back.out(1.6)', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 });
  to('#pts', sc.start + 3.4, 0.1, 'power3.in', { opacity: 0 });
  bob(win, sc.start + 0.9, sc.start + 3.5);
  const rows = M.classement.map((c, i) => `<div class="row${i === 0 ? ' first' : ''}"><span class="rk">${i + 1}</span><span class="nm">${c.nom} <i>${c.techno}</i></span><span class="j">${c.j}</span><span class="p">${c.pts}</span></div>`).join('');
  mkdirSync(path.join(OUT, 'assets/img'), { recursive: true });
  const imgs = M.prochain.images.map((src, i) => { const name = `prochain-${i}.png`; copyFileSync(path.join(REPO, src), path.join(OUT, 'assets/img', name)); return `<img src="assets/img/${name}" alt="">`; });
  S.cards += `<div class="dim" id="dim"></div><div class="table" id="table"><div class="t-title">${M.titre} · ${POULE}</div>
    <div class="row head"><span class="rk"></span><span class="nm"></span><span class="j">J</span><span class="p">PTS</span></div>${rows}
    <div class="next"><div class="n-label">PROCHAIN COMBAT</div><div class="n-imgs">${imgs.join('<span>VS</span>')}</div><div class="n-title">${M.prochain.titre}</div></div></div>`;
  snd(sc.start + 3.55, 'whoosh-short.mp3', VOL.whoosh);
  fromTo('#dim', sc.start + 3.5, 0.2, 'power2.inOut', { opacity: 0 }, { opacity: 1 });
  fromTo('#table', sc.start + 3.55, 0.25, 'expo.out', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 });
  sc.css = `
    .pts { position: absolute; left: 0; right: 0; top: 520px; text-align: center; color: #FFFFFF; font-weight: 700; font-size: 50px; opacity: 0; }
    .pts b { display: inline-block; margin-left: 24px; padding: 6px 26px; background: ${K.yellow}; color: ${K.midnight10}; border-radius: 14px; }
    .dim { position: absolute; inset: 0; background: rgba(20,5,58,0.78); opacity: 0; }
    .table { position: absolute; left: 70px; right: 70px; top: 300px; padding: 36px 44px; background: ${K.midnight}; border: 6px solid #FFFFFF; border-radius: 22px; color: #FFFFFF; opacity: 0; }
    .t-title { font-family: 'Space Mono'; font-weight: 700; font-size: 34px; letter-spacing: 0.1em; color: ${K.yellow}; margin-bottom: 18px; }
    .row { display: flex; align-items: center; font-weight: 700; font-size: 42px; padding: 14px 0; border-top: 3px solid ${K.purpleShade}; }
    .row.head { font-family: 'Space Mono'; font-size: 30px; color: ${K.purpleTint}; border-top: none; padding: 4px 0; }
    .row.first { color: ${K.yellow}; }
    .rk { width: 70px; } .nm { flex: 1; } .nm i { font-style: normal; font-family: 'Space Mono'; font-weight: 400; font-size: 32px; color: ${K.purpleTint}; margin-left: 12px; }
    .j, .p { width: 110px; text-align: right; }
    .next { margin-top: 40px; padding-top: 30px; border-top: 6px solid ${K.purple}; text-align: center; }
    .n-label { font-family: 'Space Mono'; font-weight: 700; font-size: 34px; letter-spacing: 0.12em; color: ${K.purpleTint}; }
    .n-imgs { display: flex; align-items: center; justify-content: center; gap: 30px; margin: 20px 0 10px; }
    .n-imgs img { height: 170px; width: 220px; object-fit: contain; }
    .n-imgs span { font-weight: 700; font-size: 52px; color: ${K.yellow}; }
    .n-title { font-weight: 700; font-size: 42px; }`;
  finish(sc);
}

// ---------- racine : scènes + musique + bruitages ----------
function lanes(list) { // une piste par son tant qu'il joue
  const ends = [];
  for (const x of list) {
    let k = ends.findIndex((e) => e <= x.t);
    if (k < 0) { k = ends.length; ends.push(0); }
    ends[k] = x.t + x.d; x.lane = 11 + k;
  }
  return list;
}
const audio = [
  `      <audio id="music-combat" class="clip" src="assets/audio/combat.wav" data-start="0" data-duration="${MUSIC_CUT}" data-track-index="10" data-volume="0.42" data-fade-out="0.02"></audio>`,
  `      <audio id="music-victoire" class="clip" src="assets/audio/victoire.wav" data-start="${M.fin}" data-duration="${r2(90 - M.fin)}" data-track-index="10" data-volume="0.42" data-fade-out="1.2"></audio>`,
  ...lanes(SOUNDS.sort((a, b) => a.t - b.t)).map((x, i) => `      <audio id="sfx-${String(i).padStart(3, '0')}" class="clip" src="assets/sfx/${x.file}" data-start="${x.t}" data-duration="${x.d}" data-track-index="${x.lane}" data-volume="${x.vol}"></audio>`),
].join('\n');
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
    <div id="root" data-composition-id="main" data-motion-blur="on" data-start="0" data-duration="90" data-width="${W}" data-height="${H}">
${hosts}
${audio}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`);
console.log(`✓ ${written.length} scènes, ${SOUNDS.length} sons écrits dans ${OUT}`);
