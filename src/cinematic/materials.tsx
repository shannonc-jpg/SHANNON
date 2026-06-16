import React, { useMemo } from "react";
import { COLORS, AGGREGATE_PALETTE } from "../theme";
import { mulberry32, range, pick } from "../lib/rng";

/**
 * Matériaux appliqués aux faces des briques 3D (béton, primaire, résine,
 * terrazzo, laiton, surface polie). Les mouchetures sont déterministes.
 */

// Palette pondérée vers les neutres (marbre/nacre) pour un rendu tonal,
// haut de gamme, plutôt que "confettis".
const TERRAZZO_WEIGHTED: readonly string[] = [
  "#E7E1D5", "#E7E1D5", "#CFC7B6", "#CFC7B6", "#F4F1EA", "#F4F1EA",
  "#D8D0C0", "#BFB6A2", "#3A3936", "#3A3936", "#7E7A72",
  "#C2693B", "#6E8B74", "#C9A227", "#7E94A8", "#A8413B",
];

const SpeckleFill: React.FC<{
  seed: number;
  count: number;
  vb?: number;
  minR?: number;
  maxR?: number;
  palette?: readonly string[];
  opacity?: number;
  bias?: number; // >1 biaise vers les petits éclats
}> = ({ seed, count, vb = 100, minR = 0.8, maxR = 2.6, palette = TERRAZZO_WEIGHTED, opacity = 1, bias = 2.4 }) => {
  const specks = useMemo(() => {
    const rng = mulberry32(seed);
    return Array.from({ length: count }).map(() => {
      const s = Math.pow(rng(), bias); // distribution biaisée vers le petit
      const r = minR + (maxR - minR) * s;
      return {
        x: range(rng, 0, vb),
        y: range(rng, 0, vb),
        rx: r * range(rng, 0.85, 1.15),
        ry: r * range(rng, 0.6, 0.95),
        rot: range(rng, 0, 180),
        c: pick(rng, palette),
        o: range(rng, 0.75, 1),
      };
    });
  }, [seed, count, vb, minR, maxR, palette, bias]);
  return (
    <svg
      viewBox={`0 0 ${vb} ${vb}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
    >
      {specks.map((s, i) => (
        <g key={i} transform={`rotate(${s.rot} ${s.x} ${s.y})`}>
          <ellipse cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill={s.c} opacity={s.o} />
        </g>
      ))}
    </svg>
  );
};

const fill = (bg: string): React.CSSProperties => ({
  position: "absolute",
  inset: 0,
  background: bg,
});

export const ConcreteMat: React.FC<{ seed?: number }> = ({ seed = 11 }) => (
  <div style={{ ...fill(`linear-gradient(180deg, ${COLORS.concrete}, ${COLORS.concreteDark})`) }}>
    <SpeckleFill
      seed={seed}
      count={120}
      minR={0.6}
      maxR={2}
      palette={[COLORS.concreteDark, COLORS.concreteEdge, "#B4AE9F"]}
      opacity={0.6}
    />
  </div>
);

export const PrimerMat: React.FC = () => (
  <div style={fill(`linear-gradient(180deg, ${COLORS.primerLight}, ${COLORS.primer})`)} />
);

export const BrassMat: React.FC<{ vertical?: boolean }> = ({ vertical = true }) => (
  <div
    style={fill(
      vertical
        ? `linear-gradient(90deg, ${COLORS.brassDark}, ${COLORS.brassLight} 45%, ${COLORS.brass} 60%, ${COLORS.brassDark})`
        : `linear-gradient(180deg, ${COLORS.brassLight}, ${COLORS.brass}, ${COLORS.brassDark})`
    )}
  />
);

/** Tranche de la matrice (face avant de la coupe) : résine + granulats. */
export const TerrazzoCutMat: React.FC<{ seed?: number; revealed?: number }> = ({ seed = 42, revealed = 1 }) => (
  <div style={fill(COLORS.resin)}>
    <SpeckleFill seed={seed} count={150} minR={0.8} maxR={3.4} bias={2} opacity={0.95} />
    {/* film de résine brute en haut tant que non poncé */}
    {revealed < 0.99 && (
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: `${(1 - revealed) * 55}%`,
          background: COLORS.resinFilm,
          opacity: 0.9,
        }}
      />
    )}
  </div>
);

/** Surface vue de dessus : terrazzo poncé + reflet poli optionnel. */
export const TerrazzoTopMat: React.FC<{
  seed?: number;
  gloss?: number;
  revealed?: number;
  grid?: number;
}> = ({ seed = 7, gloss = 0, revealed = 1, grid = 0 }) => (
  <div style={fill(COLORS.resin)}>
    <SpeckleFill seed={seed} count={560} minR={0.45} maxR={2.5} bias={2.7} opacity={0.95} />
    {revealed < 0.99 && (
      <div style={{ position: "absolute", inset: 0, background: COLORS.resinFilm, opacity: 0.88 * (1 - revealed) }} />
    )}
    {grid > 0.01 && (
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <g
          stroke={COLORS.brass}
          strokeWidth={0.9}
          strokeDasharray={100}
          strokeDashoffset={100 * (1 - grid)}
        >
          {[25, 50, 75].map((x) => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={100} />
          ))}
          {[33.3, 66.6].map((y) => (
            <line key={`h${y}`} x1={0} y1={y} x2={100} y2={y} />
          ))}
        </g>
      </svg>
    )}
    {gloss > 0 && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.85) 46%, rgba(255,255,255,0.05) 52%, rgba(255,255,255,0) 70%)",
          opacity: gloss,
        }}
      />
    )}
  </div>
);
