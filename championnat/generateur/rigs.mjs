// Pantins articulés du championnat. Squelette commun à tous les combattants :
//   root (position, sens, échelle) > legB, legF, body (bassin, inclinaison) > armB, head, armF > épée.
// Chaque articulation est un <g id="<p>-<nom>" transform="translate(x y) rotate(a)"> : on anime l'angle
// en interpolant la chaîne transform (GSAP attr), le pivot reste exact quelle que soit la pose.
// Repère local : origine aux pieds, y vers le haut négatif, personnage tourné vers +x.
// Angles en degrés, sens SVG : 0 = membre vers le bas, -90 = vers l'avant (+x), +90 = vers l'arrière.

export const K = {
  purple: '#512BD4', purpleShade: '#311A7F', purpleTint: '#B9AAEE', purpleTint45: '#EEEAFB',
  blue: '#0B6CFF', blueTint: '#9DC4FF', blueTint45: '#E7F0FF',
  magenta: '#D600AA', magentaTint: '#EF99DD', cyan: '#28C2D1', cyanShade: '#18747D',
  midnight: '#190649', midnight10: '#14053A', midnight20: '#0F042C',
  yellow: '#F7B548', flamingo: '#F65163', white: '#FFFFFF', code: '#B6D3FF',
};

// ---------- articulations ----------
const f = (n) => +n.toFixed(2);
export const jt = (x, y, a = 0) => `translate(${f(x)} ${f(y)}) rotate(${f(a)})`;
export const rootT = (x, y, sx, sy, r = 0) => `translate(${f(x)} ${f(y)}) rotate(${f(r)}) scale(${f(sx)} ${f(sy)})`;

// Épée commune, tenue dans la main : poignée centrée sur l'origine, lame dans le sens +y du membre.
function sword(p, team, k = 1) {
  const L = 170 * k, w = 13 * k;
  return `<g id="${p}-sword" transform="${jt(0, 0, 0)}">
    <g id="${p}-trail" opacity="0"><path d="M0 ${24 * k} A${L + 20 * k} ${L + 20 * k} 0 0 1 ${-(L + 10 * k) * 0.8} ${(L + 20 * k) * 0.6}" fill="none" stroke="${team}" stroke-width="${26 * k}" stroke-linecap="round" opacity="0.6"/></g>
    <rect x="${-6 * k}" y="${-16 * k}" width="${12 * k}" height="${32 * k}" rx="${5 * k}" fill="${K.midnight}"/>
    <rect x="${-30 * k}" y="${14 * k}" width="${60 * k}" height="${11 * k}" rx="${5 * k}" fill="${team}"/>
    <path d="M${-w / 2} ${25 * k} L${w / 2} ${25 * k} L${w / 2} ${25 * k + L - 16 * k} L0 ${25 * k + L} L${-w / 2} ${25 * k + L - 16 * k} Z" fill="${K.blueTint45}"/>
    <path d="M0 ${27 * k} L0 ${25 * k + L - 8 * k}" stroke="${K.blueTint}" stroke-width="${3 * k}"/>
  </g>`;
}

// ---------- dotnet-bot (d'après tools/dotnet-bot-variants/bot.mjs, bot 3D 2024 aplati) ----------
const BOT = { hi: '#7253E3', base: K.purple, lo: '#3D1FA8', deep: K.purpleShade, limb: '#4426BE', joint: '#5E3EE0',
  band: '#9C88F0', visorFrame: '#2A1585', visorLo: '#E4DEFA', eye: K.midnight10 };

export function dotnetBotDefs(p) {
  return `<radialGradient id="${p}-gHead" cx="0.36" cy="0.3" r="0.8"><stop offset="0" stop-color="${BOT.hi}"/><stop offset="0.55" stop-color="${BOT.base}"/><stop offset="1" stop-color="${BOT.lo}"/></radialGradient>
  <radialGradient id="${p}-gBall" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="${BOT.hi}"/><stop offset="1" stop-color="${BOT.lo}"/></radialGradient>
  <linearGradient id="${p}-gVisor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${BOT.visorLo}"/></linearGradient>
  <clipPath id="${p}-headClip"><circle cx="0" cy="0" r="118"/></clipPath>`;
}

function botLimb(len, w) {
  return `<line x1="0" y1="0" x2="0" y2="${len}" stroke="${BOT.limb}" stroke-width="${w}" stroke-linecap="round"/>`;
}
function botLeg(p, side, J) {
  const n = side < 0 ? 'B' : 'F';
  return `<g id="${p}-leg${n}" transform="${jt(...J[`leg${n}`])}">
    ${botLimb(62, 16)}
    <g id="${p}-knee${n}" transform="${jt(...J[`knee${n}`])}">
      ${botLimb(38, 16)}
      <rect x="-22" y="26" width="58" height="38" rx="19" fill="url(#${p}-gBall)"/>
      <rect x="-18" y="52" width="50" height="9" rx="4.5" fill="${BOT.band}"/>
    </g>
    <circle cx="0" cy="62" r="11" fill="${BOT.joint}"/>
  </g>`;
}
function botArm(p, side, J, withSword) {
  const n = side < 0 ? 'B' : 'F';
  return `<g id="${p}-arm${n}" transform="${jt(...J[`arm${n}`])}">
    ${botLimb(72, 16)}
    <g id="${p}-elb${n}" transform="${jt(...J[`elb${n}`])}">
      ${botLimb(64, 15)}
      <circle cx="0" cy="0" r="10" fill="${BOT.joint}"/>
      <g id="${p}-hand${n}" transform="${jt(...J[`hand${n}`])}">
        ${withSword ? sword(p, K.magenta) : ''}
        <circle cx="0" cy="0" r="18" fill="url(#${p}-gBall)"/>
        <circle cx="13" cy="-4" r="8" fill="url(#${p}-gBall)"/>
      </g>
    </g>
    <circle cx="0" cy="0" r="14" fill="url(#${p}-gBall)"/>
  </g>`;
}
function botEyes(p) {
  const L = { x: -30, y: 1 }, R = { x: 30, y: 1 }, dx = 9; // regard vers l'adversaire
  const oval = (q) => `<ellipse cx="${q.x + dx}" cy="${q.y}" rx="10" ry="17" fill="${BOT.eye}"/><ellipse cx="${q.x + dx + 3}" cy="${q.y - 7}" rx="3" ry="4" fill="#fff" opacity="0.9"/>`;
  const lidIn = (q, s) => `<polygon points="${s < 0 ? `${q.x - 16},${q.y - 22} ${q.x + 18},${q.y - 22} ${q.x + 18},${q.y + 2}` : `${q.x - 18},${q.y - 22} ${q.x + 16},${q.y - 22} ${q.x - 18},${q.y + 2}`}" fill="#FFFFFF" transform="translate(${dx} 0)"/>`;
  const arcUp = (q) => `<path d="M${q.x - 13} ${q.y + 6}Q${q.x} ${q.y - 16} ${q.x + 13} ${q.y + 6}" fill="none" stroke="${BOT.eye}" stroke-width="7" stroke-linecap="round"/>`;
  const squeeze = (q, s) => `<path d="M${q.x - 12} ${q.y - 10}L${q.x + 10 * s} ${q.y}L${q.x - 12} ${q.y + 10}" transform="${s < 0 ? `translate(${2 * q.x} 0) scale(-1 1)` : ''}" fill="none" stroke="${BOT.eye}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
  const x = (q) => `<path d="M${q.x - 10} ${q.y - 10}L${q.x + 10} ${q.y + 10}M${q.x + 10} ${q.y - 10}L${q.x - 10} ${q.y + 10}" stroke="${BOT.eye}" stroke-width="7" stroke-linecap="round"/>`;
  return `<g id="${p}-eyes-normal">${oval(L)}${oval(R)}</g>
    <g id="${p}-eyes-angry" opacity="0">${oval(L)}${oval(R)}${lidIn(L, -1)}${lidIn(R, 1)}</g>
    <g id="${p}-eyes-hurt" opacity="0">${squeeze(L, 1)}${squeeze(R, -1)}</g>
    <g id="${p}-eyes-happy" opacity="0">${arcUp(L)}${arcUp(R)}</g>
    <g id="${p}-eyes-ko" opacity="0">${x(L)}${x(R)}</g>`;
}

// Pose de garde (angles par articulation : [x, y, angle] ; x,y = position du pivot dans le parent).
export const BOT_JOINTS = {
  legB: [-19, -128, 14], kneeB: [0, 62, -10], legF: [19, -128, -22], kneeF: [0, 62, 14],
  body: [0, -128, 0], head: [0, -98, 0],
  armB: [-108, -30, 30], elbB: [0, 72, -40], handB: [0, 64, 0],
  armF: [108, -30, -40], elbF: [0, 72, -70], handF: [0, 64, -30],
};

export function dotnetBot(p, J = BOT_JOINTS) {
  return `<g id="${p}-root">
    <ellipse id="${p}-shadow" cx="0" cy="0" rx="110" ry="14" fill="${K.midnight20}" opacity="0.35"/>
    ${botLeg(p, -1, J)}${botLeg(p, 1, J)}
    <g id="${p}-body" transform="${jt(...J.body)}">
      ${botArm(p, -1, J, false)}
      <ellipse cx="0" cy="8" rx="36" ry="18" fill="${BOT.deep}"/>
      <g id="${p}-head" transform="${jt(...J.head)}">
        <rect x="-5" y="-142" width="10" height="34" rx="5" fill="${BOT.joint}"/><circle cx="0" cy="-146" r="12" fill="url(#${p}-gBall)"/>
        <circle cx="-120" cy="14" r="24" fill="${BOT.lo}"/><circle cx="120" cy="14" r="24" fill="${BOT.lo}"/>
        <circle cx="0" cy="0" r="118" fill="url(#${p}-gHead)"/>
        <ellipse cx="-50" cy="-74" rx="44" ry="22" fill="#fff" opacity="0.16" transform="rotate(-28 -50 -74)"/>
        <g clip-path="url(#${p}-headClip)">
          <path d="M-140 52 Q0 88 140 52 L140 80 Q0 118 -140 80Z" fill="${BOT.band}"/>
          <rect x="-12" y="68" width="24" height="20" rx="4" fill="${BOT.lo}"/>
        </g>
        <g id="${p}-tails" transform="${jt(-108, -62, 0)}">
          <path d="M0 -8 C-30 -18 -60 4 -96 -6 L-92 12 C-58 22 -30 2 0 10 Z" fill="${K.magenta}"/>
          <path d="M0 2 C-24 14 -48 40 -80 40 L-70 56 C-40 54 -18 28 4 16 Z" fill="${K.magenta}"/>
        </g>
        <g clip-path="url(#${p}-headClip)"><path d="M-140 -84 Q0 -66 140 -84 L140 -56 Q0 -38 -140 -56Z" fill="${K.magenta}"/></g>
        <rect x="-98" y="-40" width="196" height="82" rx="41" fill="${BOT.visorFrame}"/>
        <rect x="-88" y="-31" width="176" height="64" rx="32" fill="url(#${p}-gVisor)"/>
        ${botEyes(p)}
      </g>
      ${botArm(p, 1, J, true)}
    </g>
  </g>`;
}

// ---------- Gopher (d'après Renée French, CC BY 4.0 ; couleurs du favicon go.dev) ----------
const GO = { body: '#76E1FE', line: '#384E54', snout: '#E1D6B9', nose: '#171311', paw: '#E1D6B9' };
const gst = `stroke="${GO.line}" stroke-width="7" stroke-linejoin="round"`;

function goLimb(len) {
  return `<line x1="0" y1="0" x2="0" y2="${len}" stroke="${GO.line}" stroke-width="40" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="0" y2="${len}" stroke="${GO.body}" stroke-width="27" stroke-linecap="round"/>`;
}
function goFoot(p, side, J) {
  const n = side < 0 ? 'B' : 'F';
  return `<g id="${p}-leg${n}" transform="${jt(...J[`leg${n}`])}">
    <g id="${p}-knee${n}" transform="${jt(...J[`knee${n}`])}">
      <path d="M-18 0 C-22 30 -20 46 0 50 L40 50 C56 50 58 32 44 28 L22 22 C20 10 18 0 18 0 Z" fill="${GO.paw}" ${gst}/>
    </g>
  </g>`;
}
function goArm(p, side, J, withSword) {
  const n = side < 0 ? 'B' : 'F';
  return `<g id="${p}-arm${n}" transform="${jt(...J[`arm${n}`])}">
    ${goLimb(62)}
    <g id="${p}-elb${n}" transform="${jt(...J[`elb${n}`])}">
      ${goLimb(54)}
      <g id="${p}-hand${n}" transform="${jt(...J[`hand${n}`])}">
        ${withSword ? sword(p, K.cyan, 1.2) : ''}
        <ellipse cx="0" cy="0" rx="22" ry="20" fill="${GO.paw}" ${gst}/>
        <path d="M-8 -6 L-8 4 M2 -8 L2 4" stroke="${GO.line}" stroke-width="4" stroke-linecap="round"/>
      </g>
    </g>
  </g>`;
}
function goEyes(p) {
  const L = { x: -66, y: -26, r: 64 }, R = { x: 70, y: -36, r: 64 }, dx = 20;
  const white = (q) => `<circle cx="${q.x}" cy="${q.y}" r="${q.r}" fill="#FFFFFF" ${gst}/>`;
  const pupil = (q, k = 1) => `<circle cx="${q.x + dx}" cy="${q.y + 4}" r="${22 * k}" fill="${GO.nose}"/><circle cx="${q.x + dx + 8}" cy="${q.y - 4}" r="${6 * k}" fill="#FFFFFF"/>`;
  const brow = (q, s) => `<path d="M${q.x - 60} ${q.y - 58 + (s < 0 ? 0 : 26)} L${q.x + 60} ${q.y - 58 + (s < 0 ? 26 : 0)} L${q.x + 60} ${q.y - 80} L${q.x - 60} ${q.y - 80}Z" fill="${GO.body}"/><path d="M${q.x - 60} ${q.y - 58 + (s < 0 ? 0 : 26)} L${q.x + 60} ${q.y - 58 + (s < 0 ? 26 : 0)}" stroke="${GO.line}" stroke-width="9" stroke-linecap="round"/>`;
  const squeeze = (q, s) => `<path d="M${q.x - 30 * s} ${q.y - 26}L${q.x + 24 * s} ${q.y}L${q.x - 30 * s} ${q.y + 26}" fill="none" stroke="${GO.nose}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  const spiral = (q) => `<path d="M${q.x} ${q.y} m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -20 0 a18 18 0 1 1 36 0 a28 28 0 1 1 -56 0 a38 38 0 1 1 76 0" fill="none" stroke="${GO.nose}" stroke-width="6" stroke-linecap="round"/>`;
  return `${white(L)}${white(R)}
    <g id="${p}-eyes-normal">${pupil(L)}${pupil(R)}</g>
    <g id="${p}-eyes-angry" opacity="0">${pupil(L, 0.9)}${pupil(R, 0.9)}${brow(L, -1)}${brow(R, 1)}</g>
    <g id="${p}-eyes-hurt" opacity="0">${squeeze(L, 1)}${squeeze(R, -1)}</g>
    <g id="${p}-eyes-happy" opacity="0"><path d="M${L.x - 30} ${L.y + 10} Q${L.x} ${L.y - 30} ${L.x + 30} ${L.y + 10} M${R.x - 30} ${R.y + 10} Q${R.x} ${R.y - 30} ${R.x + 30} ${R.y + 10}" fill="none" stroke="${GO.nose}" stroke-width="10" stroke-linecap="round"/></g>
    <g id="${p}-eyes-ko" opacity="0">${spiral(L)}${spiral(R)}</g>`;
}

export const GO_JOINTS = {
  legB: [-58, -46, 0], kneeB: [0, 0, 8], legF: [62, -46, 0], kneeF: [0, 0, -6],
  body: [0, -46, 0], head: [0, -340, 0],
  armB: [-150, -230, 34], elbB: [0, 62, -30], handB: [0, 54, 0],
  armF: [148, -230, -46], elbF: [0, 62, -66], handF: [0, 54, -30],
};

export function gopher(p, J = GO_JOINTS) {
  return `<g id="${p}-root">
    <ellipse id="${p}-shadow" cx="0" cy="0" rx="140" ry="16" fill="${K.midnight20}" opacity="0.35"/>
    ${goFoot(p, -1, J)}
    <g id="${p}-body" transform="${jt(...J.body)}">
      <circle cx="-118" cy="-444" r="36" fill="${GO.body}" ${gst}/><circle cx="-118" cy="-444" r="16" fill="${GO.line}"/>
      <circle cx="124" cy="-456" r="36" fill="${GO.body}" ${gst}/><circle cx="124" cy="-456" r="16" fill="${GO.line}"/>
      ${goArm(p, -1, J, false)}
      <path d="M-158 -300 C-168 -430 -96 -486 0 -486 C100 -486 172 -434 166 -300 L170 -120 C174 -30 104 12 4 12 C-100 12 -172 -30 -168 -120 Z" fill="${GO.body}" ${gst}/>
      <g id="${p}-head" transform="${jt(...J.head)}">
        <g id="${p}-tails" transform="${jt(-150, -112, 0)}">
          <path d="M0 -10 C-30 -20 -60 2 -100 -8 L-96 12 C-60 22 -30 2 0 12 Z" fill="${K.midnight}" ${gst}/>
          <path d="M0 2 C-26 16 -50 44 -84 44 L-74 62 C-42 58 -18 30 6 18 Z" fill="${K.midnight}" ${gst}/>
        </g>
        <path d="M-154 -98 Q0 -132 156 -110 L160 -78 Q0 -100 -158 -66 Z" fill="${K.midnight}" ${gst}/>
        ${goEyes(p)}
        <ellipse cx="26" cy="52" rx="56" ry="36" fill="${GO.snout}" ${gst}/>
        <ellipse cx="26" cy="28" rx="28" ry="17" fill="${GO.nose}"/>
        <path d="M8 80 h18 v34 a6 6 0 0 1 -6 6 h-6 a6 6 0 0 1 -6 -6 Z M30 80 h18 v30 a6 6 0 0 1 -6 6 h-6 a6 6 0 0 1 -6 -6 Z" fill="#FFFFFF" stroke="${GO.line}" stroke-width="5" stroke-linejoin="round"/>
      </g>
      ${goArm(p, 1, J, true)}
    </g>
    ${goFoot(p, 1, J)}
  </g>`;
}

// État d'yeux : ids des groupes à basculer
export const EYE_STATES = ['normal', 'angry', 'hurt', 'happy', 'ko'];
