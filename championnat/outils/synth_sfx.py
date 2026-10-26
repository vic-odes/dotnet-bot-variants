#!/usr/bin/env python3
"""Deterministic offline SFX: whoosh, impact, blip. Usage: synth_sfx.py <out_dir>"""
import sys, os, numpy as np, soundfile as sf
SR = 44100; out = sys.argv[1]; os.makedirs(out, exist_ok=True)
rng = np.random.default_rng(3)
def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    sf.write(os.path.join(out, name), np.stack([x, x], 1).astype(np.float32), SR)
# whoosh: noise through a moving one-pole lowpass, swelling then fading
n = int(0.6 * SR); t = np.arange(n) / SR; noise = rng.standard_normal(n)
cut = 0.02 + 0.25 * np.sin(np.pi * t / t[-1]) ** 2
y = np.zeros(n); acc = 0
for i in range(n): acc += cut[i] * (noise[i] - acc); y[i] = acc
save("whoosh.wav", y * np.sin(np.pi * t / t[-1]) ** 1.5)
# impact: pitched-down sine thump + short noise click + tail
n = int(0.9 * SR); t = np.arange(n) / SR
f = 45 + 110 * np.exp(-t * 18)
thump = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5)
click = rng.standard_normal(n) * np.exp(-t * 120) * 0.4
shimmer = np.sin(2 * np.pi * 880 * t) * np.exp(-t * 7) * 0.08
save("impact.wav", thump + click + shimmer)
# blip: soft sine ping with fifth
n = int(0.35 * SR); t = np.arange(n) / SR
b = (np.sin(2*np.pi*1320*t) + 0.5*np.sin(2*np.pi*1980*t)) * np.minimum(1, t/0.004) * np.exp(-t*14)
save("blip.wav", b)
print("sfx written to", out)
