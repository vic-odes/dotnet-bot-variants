#!/usr/bin/env python3
"""Deterministic offline BGM: synthwave (default 100 BPM, A minor, Am-F-C-G).
Usage: synth_synthwave.py out.wav --seconds 120 --bpm 100 [--key am|bm|cm|dm|em|fm|gm] [--grille i-VI-III-VII|i-VII-VI-V]
--key transpose la grille (tonalité mineure), --grille choisit l'enchaînement : par défaut, A mineur Am-F-C-G (inchangé).
Structure: 2-bar intro (pad + arp), full groove (kick, gated snare, octave saw bass,
detuned saw pad, arp lead), 2-bar outro (pad) with fade. Bar = 4 beats."""
import argparse, numpy as np, soundfile as sf
from scipy.signal import lfilter

ap = argparse.ArgumentParser()
ap.add_argument("out"); ap.add_argument("--seconds", type=float, default=120); ap.add_argument("--bpm", type=float, default=100)
ap.add_argument("--key", default="am", choices=["am", "bm", "cm", "dm", "em", "fm", "gm"])
ap.add_argument("--grille", default="i-VI-III-VII", choices=["i-VI-III-VII", "i-VII-VI-V"])
a = ap.parse_args()
SR = 44100; beat = 60 / a.bpm; bar = 4 * beat; N = int(a.seconds * SR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(11)

def midi(n): return 440 * 2 ** ((n - 69) / 12)
def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= N: return
    s = sig[: N - i] * gain
    L[i:i+len(s)] += s * np.sqrt((1 - pan) / 2)
    R[i:i+len(s)] += s * np.sqrt((1 + pan) / 2)

def saw(f, t, ph=0.0): return 2 * ((f * t + ph) % 1.0) - 1
def lowpass(x, a_):  # one-pole, a_ in (0,1]
    return lfilter([a_], [1, a_ - 1], x)

def kick():
    n = int(0.4 * SR); t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)

_sn = None
def snare():  # gated-reverb snare: noise body + tone, hard gate at 0.28 s
    global _sn
    if _sn is None:
        n = int(0.32 * SR); t = np.arange(n) / SR
        noise = rng.standard_normal(n)
        body = lowpass(noise, 0.35) * np.exp(-t * 6)
        tone = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 25)
        tail = lowpass(rng.standard_normal(n), 0.2) * 0.5
        s = body + 0.6 * tone + tail * (t < 0.28)
        s *= np.where(t < 0.28, 1.0, np.exp(-(t - 0.28) * 120))
        _sn = s
    return _sn

def hat():
    n = int(0.05 * SR); x = np.diff(np.concatenate([[0], rng.standard_normal(n)]))
    return x * np.exp(-np.arange(n) / SR * 80) * 0.4

def bass(note, dur):  # filtered saw, octave
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(note)
    s = saw(f, t) + 0.5 * saw(f * 2, t)
    s = lowpass(s, 0.12)
    return s * np.minimum(1, t / 0.004) * np.exp(-t / (dur * 0.9))

def pad(notes, dur):  # detuned supersaw, slow attack/release, darkened
    n = int(dur * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for k in notes:
        for det in (-0.09, -0.03, 0.03, 0.09):
            s += saw(midi(k + det), t, ph=rng.uniform())
    s = lowpass(s, 0.05)
    a_ = np.minimum(1, t / 1.2); r_ = np.minimum(1, (dur - t) / 1.0)
    return s * a_ * r_ / (len(notes) * 4)

def lead(note, dur):  # square-ish pluck with vibrato-free bright tone
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(note)
    s = np.sign(np.sin(2 * np.pi * f * t)) * 0.4 + saw(f, t) * 0.6
    s = lowpass(s, 0.3)
    return s * np.minimum(1, t / 0.003) * np.exp(-t * 9)

# Am - F - C - G (or Am - G - F - E), one bar each, then transposed to --key (nearest, within -5..+6 semitones)
GRILLES = {
    "i-VI-III-VII": [(45, [57, 60, 64]), (41, [53, 57, 60]), (48, [55, 60, 64]), (43, [55, 59, 62])],
    "i-VII-VI-V": [(45, [57, 60, 64]), (43, [55, 59, 62]), (41, [53, 57, 60]), (40, [56, 59, 64])],
}
tr = {"am": 0, "bm": 2, "cm": 3, "dm": 5, "em": -5, "fm": -4, "gm": -2}[a.key]
prog = [(r + tr, [c + tr for c in ch]) for r, ch in GRILLES[a.grille]]
n_bars = int(np.ceil(a.seconds / bar))
intro, outro = 2, 2
for b in range(n_bars):
    t0 = b * bar
    root, chord = prog[b % 4]
    full = intro <= b < n_bars - outro
    add(pad([c + 12 for c in chord] + [chord[0]], bar + 0.6), t0, 0.22)
    arp = [chord[0] + 12, chord[1] + 12, chord[2] + 12, chord[1] + 12, chord[0] + 24, chord[2] + 12, chord[1] + 12, chord[2] + 12]
    for s16 in range(16):
        add(lead(arp[s16 % 8], beat / 4 * 0.95), t0 + s16 * beat / 4, 0.07 if full else 0.05, pan=(0.4 if s16 % 2 else -0.4))
    if full:
        for q in range(4):
            add(kick(), t0 + q * beat, 0.6)
            if q % 2 == 1: add(snare(), t0 + q * beat, 0.32, pan=0.05)
            add(hat(), t0 + q * beat + beat / 2, 0.18, pan=0.25)
            for e8 in range(2):
                add(bass(root + (12 if e8 else 0), beat / 2 * 0.95), t0 + q * beat + e8 * beat / 2, 0.30)

# sidechain pump on everything from the kick
pump = np.ones(N)
for b in range(intro, n_bars - outro):
    for q in range(4):
        i = int((b * bar + q * beat) * SR)
        if i >= N: break
        n = min(int(beat * SR), N - i)
        pump[i:i+n] *= 1 - 0.3 * np.exp(-np.arange(n) / SR * 10)
L *= pump; R *= pump
# ping-pong delay (dotted eighth) for space
d = int(beat * 0.75 * SR)
L[d:] += 0.22 * R[:-d]; R[d:] += 0.22 * L[:-d]
mix = np.stack([L, R], 1)
fade = int(3 * SR); mix[-fade:] *= np.linspace(1, 0, fade)[:, None]
mix[: int(0.3 * SR)] *= np.linspace(0, 1, int(0.3 * SR))[:, None]
mix = np.tanh(mix / (np.max(np.abs(mix)) + 1e-9) * 1.4) * 0.85
sf.write(a.out, mix.astype(np.float32), SR)
print(f"wrote {a.out}: {a.seconds}s @ {a.bpm} BPM, beat={beat:.4f}s")
