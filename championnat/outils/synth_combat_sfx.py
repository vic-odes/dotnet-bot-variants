#!/usr/bin/env python3
"""Bruitages de combat déterministes (aucun fichier externe) : synth_combat_sfx.py <dossier>
Écrit : swing-1..3 (lame qui fend l'air), hit-1..3 (touche), clash (lames qui s'entrechoquent),
bell (cloche du ring, deux coups), bell-ko (trois coups), thud (chute), crowd (clameur du public)."""
import sys, os, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt

SR = 44100
out = sys.argv[1]; os.makedirs(out, exist_ok=True)

def t_(sec): return np.arange(int(sec * SR)) / SR
def band(x, lo, hi, order=2): return sosfilt(butter(order, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def low(x, hi, order=2): return sosfilt(butter(order, hi, 'lowpass', fs=SR, output='sos'), x)
def high(x, lo, order=2): return sosfilt(butter(order, lo, 'highpass', fs=SR, output='sos'), x)
def save(name, x, peak=0.89):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = min(len(x), int(0.01 * SR)); x[-fade:] *= np.linspace(1, 0, fade)
    sf.write(os.path.join(out, name), np.stack([x, x], 1).astype(np.float32), SR)

# lame : bruit filtré dont la bande monte puis redescend (effet Doppler), 0,32 s
for k, (seed, f0) in enumerate([(1, 900), (2, 1200), (3, 700)], 1):
    rng = np.random.default_rng(seed); t = t_(0.32); n = rng.standard_normal(len(t))
    env = np.sin(np.pi * np.clip(t / t[-1], 0, 1)) ** 2 * np.exp(-t * 2)
    y = np.zeros_like(t)
    for i, (a, b) in enumerate(zip(np.linspace(0, 1, 8)[:-1], np.linspace(0, 1, 8)[1:])):
        sl = slice(int(a * len(t)), int(b * len(t)))
        c = f0 * (0.6 + 1.6 * np.sin(np.pi * (a + b) / 2))
        y[sl] = band(n, c * 0.6, c * 1.8)[sl]
    save(f'swing-{k}.wav', y * env, 0.8)

# touche : coup sourd + claquement + petit éclat métallique
for k, (seed, f) in enumerate([(4, 70), (5, 85), (6, 60)], 1):
    rng = np.random.default_rng(seed); t = t_(0.55)
    fr = f + 140 * np.exp(-t * 35)
    thump = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 9)
    crack = high(rng.standard_normal(len(t)), 1500) * np.exp(-t * 60) * 0.7
    ting = sum(np.sin(2 * np.pi * p * t) * np.exp(-t * d) for p, d in [(2300, 30), (3410, 38)]) * 0.12
    save(f'hit-{k}.wav', thump + crack + ting)

# lames qui s'entrechoquent : partiels inharmoniques qui sonnent + attaque de bruit
t = t_(1.3); rng = np.random.default_rng(7)
ring = sum(a * np.sin(2 * np.pi * p * t) * np.exp(-t * d) for p, a, d in
           [(1180, 1, 4), (1795, 0.8, 5), (2702, 0.6, 6), (3540, 0.5, 8), (4420, 0.35, 10), (5810, 0.2, 13)])
attack = high(rng.standard_normal(len(t)), 2500) * np.exp(-t * 45)
save('clash.wav', ring * 0.6 + attack)

# cloche du ring : partiels de cloche, deux ou trois coups
def bell_strike(sec=1.6):
    t = t_(sec)
    return sum(a * np.sin(2 * np.pi * 523 * r * t) * np.exp(-t * d) for r, a, d in
               [(1, 1, 2.2), (2.76, 0.6, 3.5), (5.40, 0.35, 5), (8.93, 0.2, 7), (2.0, 0.3, 3)])
def bells(n, gap=0.32):
    y = np.zeros(int((gap * (n - 1) + 1.7) * SR))
    for i in range(n):
        s = bell_strike(); a = int(i * gap * SR); y[a:a + len(s)] += s
    return y
save('bell.wav', bells(2))
save('bell-ko.wav', bells(3, 0.26))

# chute : grondement grave + bruit sourd
t = t_(0.7); rng = np.random.default_rng(8)
fr = 50 + 60 * np.exp(-t * 20)
save('thud.wav', np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 7) + low(rng.standard_normal(len(t)), 400) * np.exp(-t * 10) * 0.6)

# clameur du public : bruit dans la bande de la voix, qui enfle puis retombe, 3 s
t = t_(3.0); rng = np.random.default_rng(9)
noise = band(rng.standard_normal(len(t)), 300, 2400, 3)
mod = 1 + 0.25 * np.sin(2 * np.pi * 3.1 * t) * np.sin(2 * np.pi * 0.7 * t)
env = np.minimum(1, t / 0.25) * np.exp(-np.maximum(0, t - 1.0) * 1.4)
save('crowd.wav', noise * mod * env, 0.7)
print('bruitages écrits dans', out)
