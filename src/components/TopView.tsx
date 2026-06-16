import React, { useMemo } from "react";
import { interpolate } from "remotion";
import { COLORS, AGGREGATE_PALETTE } from "../theme";
import { mulberry32, range, pick } from "../lib/rng";
import { bodyFamily } from "../lib/fonts";

/**
 * Vue de dessus : calepinage, profilés laiton, panneaux, logo incrusté.
 * `lines` 0..1 : tracé progressif des profilés.
 * `fill`  0..1 : remplissage terrazzo des panneaux.
 * `logo`  0..1 : apparition de l'incrustation centrale (logo / marbre).
 */
const VB = 1000;
const PAD = 90;

export type TopViewProps = {
  lines?: number;
  fill?: number;
  logo?: number;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export const TopView: React.FC<TopViewProps> = ({ lines = 0, fill = 0, logo = 0 }) => {
  const inner = VB - PAD * 2;
  // Découpe en panneaux 3 x 3 (calepinage).
  const divs = [PAD + inner / 3, PAD + (2 * inner) / 3];

  const specks = useMemo(() => {
    const rng = mulberry32(515);
    const out: { x: number; y: number; rx: number; ry: number; rot: number; c: string }[] = [];
    for (let i = 0; i < 320; i++) {
      out.push({
        x: range(rng, PAD + 4, VB - PAD - 4),
        y: range(rng, PAD + 4, VB - PAD - 4),
        rx: range(rng, 3, 9),
        ry: range(rng, 2.5, 7),
        rot: range(rng, 0, 180),
        c: pick(rng, AGGREGATE_PALETTE),
      });
    }
    return out;
  }, []);

  const drawLen = 4 * inner; // longueur totale approx pour le dash
  const cx = VB / 2;
  const cy = VB / 2;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="tvBrass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.brassDark} />
          <stop offset="50%" stopColor={COLORS.brassLight} />
          <stop offset="100%" stopColor={COLORS.brass} />
        </linearGradient>
        <clipPath id="tvClip">
          <rect x={PAD} y={PAD} width={inner} height={inner} rx={4} />
        </clipPath>
      </defs>

      {/* Fond panneau */}
      <rect x={PAD} y={PAD} width={inner} height={inner} fill={COLORS.resin} rx={4} />

      {/* Remplissage terrazzo */}
      <g clipPath="url(#tvClip)" opacity={clamp01(fill)}>
        {specks.map((s, i) => (
          <g key={i} transform={`rotate(${s.rot} ${s.x} ${s.y})`}>
            <ellipse cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill={s.c} opacity={0.9} />
          </g>
        ))}
      </g>

      {/* Profilés : cadre + divisions, tracé progressif */}
      <g
        fill="none"
        stroke="url(#tvBrass)"
        strokeWidth={7}
        strokeDasharray={drawLen}
        strokeDashoffset={interpolate(clamp01(lines), [0, 1], [drawLen, 0])}
      >
        <rect x={PAD} y={PAD} width={inner} height={inner} rx={4} />
      </g>
      <g
        stroke="url(#tvBrass)"
        strokeWidth={5}
        strokeDasharray={inner}
        strokeDashoffset={interpolate(clamp01(lines), [0.3, 1], [inner, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        {divs.map((x, i) => (
          <line key={`v${i}`} x1={x} y1={PAD} x2={x} y2={VB - PAD} />
        ))}
        {divs.map((y, i) => (
          <line key={`h${i}`} x1={PAD} y1={y} x2={VB - PAD} y2={y} />
        ))}
      </g>

      {/* Incrustation centrale (logo / marbre) */}
      {logo > 0.01 && (
        <g opacity={clamp01(logo)} fontFamily={bodyFamily}>
          <circle cx={cx} cy={cy} r={90} fill={COLORS.card} stroke="url(#tvBrass)" strokeWidth={6} />
          <circle cx={cx} cy={cy} r={62} fill="none" stroke={COLORS.brass} strokeWidth={2} opacity={0.6} />
          <text
            x={cx}
            y={cy + 12}
            fontSize={40}
            fontWeight={800}
            fill={COLORS.ink}
            textAnchor="middle"
            letterSpacing={1}
          >
            2A
          </text>
        </g>
      )}

      {/* Reflet laiton sur les profilés (léger) */}
      <g opacity={0.25 * clamp01(lines)}>
        <rect x={PAD} y={PAD} width={inner} height={inner} rx={4} fill="none" stroke="#FFFFFF" strokeWidth={1.5} />
      </g>
    </svg>
  );
};
