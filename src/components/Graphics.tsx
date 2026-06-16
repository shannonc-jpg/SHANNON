import React, { useMemo } from "react";
import { interpolate } from "remotion";
import { COLORS, AGGREGATE_PALETTE } from "../theme";
import { mulberry32, range, pick } from "../lib/rng";
import { headingFamily, bodyFamily } from "../lib/fonts";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Malaxage de la matrice : composants qui se versent puis se mélangent. */
export const MixingBowl: React.FC<{ progress: number }> = ({ progress }) => {
  const spin = progress * 720;
  const blobs = useMemo(() => {
    const rng = mulberry32(88);
    return Array.from({ length: 60 }).map(() => ({
      a: range(rng, 0, Math.PI * 2),
      r: range(rng, 18, 120),
      rx: range(rng, 5, 14),
      ry: range(rng, 4, 10),
      c: pick(rng, AGGREGATE_PALETTE),
    }));
  }, []);
  const cx = 250;
  const cy = 260;
  return (
    <svg viewBox="0 0 500 420" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <clipPath id="bowlClip">
          <path d="M 90 200 A 160 160 0 0 0 410 200 L 380 200 A 130 130 0 0 1 120 200 Z" />
        </clipPath>
      </defs>

      {/* Composants qui se versent (début du mix) */}
      {(["Part A — Résine", "Durcisseur", "Granulats + pigments"] as const).map((label, i) => {
        const start = 0.04 + i * 0.05;
        const fall = clamp01((progress - start) / 0.12);
        const x = 150 + i * 100;
        return (
          <g key={i} opacity={1 - clamp01((progress - 0.32) / 0.12)} fontFamily={bodyFamily}>
            <circle cx={x} cy={interpolate(fall, [0, 1], [40, 170])} r={12} fill={[COLORS.resin, COLORS.primerLight, COLORS.accent][i]} stroke={COLORS.ink} strokeOpacity={0.15} />
            <text x={x} y={28} fontSize={15} fill={COLORS.inkSoft} textAnchor="middle">{label}</text>
          </g>
        );
      })}

      {/* Bol */}
      <path d="M 90 200 A 160 160 0 0 0 410 200 Z" fill={COLORS.card} stroke={COLORS.hair} strokeWidth={3} />
      {/* Mélange qui tournoie */}
      <g clipPath="url(#bowlClip)">
        <rect x="90" y="180" width="320" height="180" fill={COLORS.resin} opacity={clamp01(progress / 0.3)} />
        <g transform={`rotate(${spin} ${cx} ${cy})`} opacity={clamp01(progress / 0.3)}>
          {blobs.map((b, i) => (
            <ellipse
              key={i}
              cx={cx + Math.cos(b.a) * b.r}
              cy={cy - 40 + Math.sin(b.a) * b.r * 0.4}
              rx={b.rx}
              ry={b.ry}
              fill={b.c}
              opacity={0.9}
            />
          ))}
        </g>
      </g>
      {/* Pale de malaxeur */}
      <g transform={`rotate(${spin} ${cx} ${cy - 40})`} opacity={clamp01((progress - 0.1) / 0.15)}>
        <rect x={cx - 4} y={cy - 150} width={8} height={150} rx={4} fill={COLORS.concreteEdge} />
        <rect x={cx - 60} y={cy - 60} width={120} height={10} rx={5} fill={COLORS.concreteEdge} />
      </g>
      <line x1={cx} y1={60} x2={cx} y2={cy - 150} stroke={COLORS.concreteEdge} strokeWidth={8} strokeLinecap="round" />
    </svg>
  );
};

/** Chrono circulaire pour les phases de polymérisation. */
export const Chrono: React.FC<{ progress: number; label: string }> = ({ progress, label }) => {
  const R = 130;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 360 360" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <circle cx={180} cy={180} r={R} fill="none" stroke={COLORS.hair} strokeWidth={16} />
      <circle
        cx={180}
        cy={180}
        r={R}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={16}
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={C * (1 - clamp01(progress))}
        transform="rotate(-90 180 180)"
      />
      <text x={180} y={172} fontSize={64} fontWeight={800} fill={COLORS.ink} textAnchor="middle" fontFamily={headingFamily}>
        {label}
      </text>
      <text x={180} y={216} fontSize={22} fill={COLORS.inkSoft} textAnchor="middle" fontFamily={bodyFamily} letterSpacing={2}>
        POLYMÉRISATION
      </text>
    </svg>
  );
};

/** Compteur de grain de ponçage (24 → 3000). */
export const GritCounter: React.FC<{ progress: number }> = ({ progress }) => {
  const grits = [24, 50, 100, 200, 400, 800, 1500, 3000];
  const idx = Math.min(grits.length - 1, Math.floor(progress * grits.length));
  const finishes = ["Mat", "Satiné", "Satiné", "Poli", "Poli miroir"];
  const fi = Math.min(finishes.length - 1, Math.floor(progress * finishes.length));
  return (
    <div style={{ textAlign: "center", fontFamily: headingFamily }}>
      <div style={{ fontSize: 22, letterSpacing: 3, color: COLORS.inkSoft, fontFamily: bodyFamily }}>GRAIN</div>
      <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 1, color: COLORS.ink }}>{grits[idx]}</div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
        {grits.map((g, i) => (
          <div
            key={g}
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: i <= idx ? COLORS.accent : COLORS.hair,
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 22, fontSize: 30, fontWeight: 700, color: COLORS.accent }}>{finishes[fi]}</div>
    </div>
  );
};
