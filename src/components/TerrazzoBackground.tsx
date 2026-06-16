import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, AGGREGATE_PALETTE } from "../theme";
import { mulberry32, range, pick } from "../lib/rng";

/**
 * Fond moucheté terrazzo très discret + dégradé clair.
 * `density` ajuste le nombre d'éclats ; `opacity` l'intensité globale.
 */
export const TerrazzoBackground: React.FC<{
  density?: number;
  opacity?: number;
  seed?: number;
}> = ({ density = 120, opacity = 0.5, seed = 999 }) => {
  const specks = useMemo(() => {
    const rng = mulberry32(seed);
    const out: { x: number; y: number; rx: number; ry: number; rot: number; c: string; o: number }[] = [];
    for (let i = 0; i < density; i++) {
      out.push({
        x: range(rng, 0, 100),
        y: range(rng, 0, 100),
        rx: range(rng, 0.18, 0.55),
        ry: range(rng, 0.14, 0.4),
        rot: range(rng, 0, 180),
        c: pick(rng, AGGREGATE_PALETTE),
        o: range(rng, 0.12, 0.34),
      });
    }
    return out;
  }, [density, seed]);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${COLORS.bg} 0%, ${COLORS.bgDeep} 100%)`,
        }}
      />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity }}
      >
        {specks.map((s, i) => (
          <g key={i} transform={`rotate(${s.rot} ${s.x} ${s.y})`}>
            <ellipse cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill={s.c} opacity={s.o} />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
