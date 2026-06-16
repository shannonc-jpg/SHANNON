import React, { useMemo } from "react";
import { interpolate } from "remotion";
import { COLORS, AGGREGATE_PALETTE } from "../theme";
import { mulberry32, range, pick } from "../lib/rng";
import { bodyFamily } from "../lib/fonts";

/**
 * Coupe technique animée du sol terrazzo (vue de côté).
 * Visuel héros de la vidéo : chaque couche apparaît / se transforme selon
 * les props (toutes des progressions 0..1), scène après scène.
 *
 * Géométrie (unités du viewBox 1000 x 640) :
 *   béton 395..590 · primaire 380..395 · matrice/profilés 250..380
 */

// --- Géométrie de la coupe ---
const VB_W = 1000;
const VB_H = 640;
const SLAB_L = 70;
const SLAB_R = 930;
const FLOOR_BOTTOM = 590;
const CONCRETE_TOP = 395;
const PRIMER_TOP = 380;
const MATRIX_TOP = 250;
const MATRIX_H = PRIMER_TOP - MATRIX_TOP; // 130
const PROFILE_XS = [343, 657];
const PROFILE_W = 9;

export type Annotation = {
  text: string;
  atY: number;
  progress: number;
  color?: string;
};

export type CrossSectionProps = {
  concrete?: number;
  prep?: number;
  primer?: number;
  sand?: number;
  profiles?: number;
  matrixFill?: number;
  ground?: number;
  grout?: number;
  polish?: number;
  varnish?: number;
  waterDrop?: number;
  showThickness?: number;
  annotations?: Annotation[];
};

type Aggregate = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rot: number;
  color: string;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export const CrossSection: React.FC<CrossSectionProps> = ({
  concrete = 0,
  prep = 0,
  primer = 0,
  sand = 0,
  profiles = 0,
  matrixFill = 0,
  ground = 0,
  grout = 0,
  polish = 0,
  varnish = 0,
  waterDrop = 0,
  showThickness = 0,
  annotations = [],
}) => {
  // Granulats de la matrice (déterministes)
  const aggregates = useMemo<Aggregate[]>(() => {
    const rng = mulberry32(20240611);
    const out: Aggregate[] = [];
    for (let i = 0; i < 220; i++) {
      out.push({
        x: range(rng, SLAB_L + 6, SLAB_R - 6),
        y: range(rng, MATRIX_TOP + 4, PRIMER_TOP - 3),
        rx: range(rng, 5, 16),
        ry: range(rng, 4, 11),
        rot: range(rng, 0, 180),
        color: pick(rng, AGGREGATE_PALETTE),
      });
    }
    return out;
  }, []);

  // Granulats du béton (plus sombres, plus petits)
  const concreteSpecks = useMemo(() => {
    const rng = mulberry32(7777);
    const out: { x: number; y: number; r: number; c: string }[] = [];
    for (let i = 0; i < 90; i++) {
      out.push({
        x: range(rng, SLAB_L + 4, SLAB_R - 4),
        y: range(rng, CONCRETE_TOP + 6, FLOOR_BOTTOM - 6),
        r: range(rng, 2, 6),
        c: rng() > 0.5 ? COLORS.concreteDark : COLORS.concreteEdge,
      });
    }
    return out;
  }, []);

  const sandGrains = useMemo(() => {
    const rng = mulberry32(303);
    const out: { x: number; r: number }[] = [];
    for (let i = 0; i < 70; i++) {
      out.push({ x: range(rng, SLAB_L + 4, SLAB_R - 4), r: range(rng, 1.5, 3) });
    }
    return out;
  }, []);

  const matrixCurTop = PRIMER_TOP - MATRIX_H * clamp01(matrixFill);
  // Le film de résine brute disparaît au ponçage (ground) en partant du haut.
  const filmBottom = MATRIX_TOP + (PRIMER_TOP - MATRIX_TOP) * 0.55 * clamp01(ground);
  const concreteY = interpolate(clamp01(concrete), [0, 1], [FLOOR_BOTTOM, CONCRETE_TOP]);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={COLORS.brassDark} />
          <stop offset="35%" stopColor={COLORS.brassLight} />
          <stop offset="60%" stopColor={COLORS.brass} />
          <stop offset="100%" stopColor={COLORS.brassDark} />
        </linearGradient>
        <linearGradient id="concreteGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.concrete} />
          <stop offset="100%" stopColor={COLORS.concreteDark} />
        </linearGradient>
        <linearGradient id="primerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLORS.primerLight} />
          <stop offset="100%" stopColor={COLORS.primer} />
        </linearGradient>
        <linearGradient id="glossGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="matrixClip">
          <rect
            x={SLAB_L}
            y={matrixCurTop}
            width={SLAB_R - SLAB_L}
            height={PRIMER_TOP - matrixCurTop}
          />
        </clipPath>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Ombre portée du sol */}
      {concrete > 0.02 && (
        <ellipse
          cx={(SLAB_L + SLAB_R) / 2}
          cy={FLOOR_BOTTOM + 26}
          rx={(SLAB_R - SLAB_L) / 2 + 10}
          ry={14}
          fill="#000000"
          opacity={0.12 * clamp01(concrete)}
        />
      )}

      {/* ---------- BÉTON ---------- */}
      <g filter="url(#softShadow)">
        <rect
          x={SLAB_L}
          y={concreteY}
          width={SLAB_R - SLAB_L}
          height={FLOOR_BOTTOM - concreteY}
          fill="url(#concreteGrad)"
          rx={2}
        />
      </g>
      <g clipPath="none" opacity={clamp01(concrete)}>
        {concreteSpecks
          .filter((s) => s.y > concreteY + 4)
          .map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={0.5} />
          ))}
      </g>
      {/* Profil de surface grenaillé (CSP 4-6) — dents sur l'arête haute */}
      {prep > 0.01 && concrete > 0.9 && (
        <path
          d={teethPath(SLAB_L, SLAB_R, CONCRETE_TOP, 5 * clamp01(prep))}
          fill="none"
          stroke={COLORS.concreteEdge}
          strokeWidth={2}
          opacity={0.8 * clamp01(prep)}
        />
      )}

      {/* ---------- PRIMAIRE ---------- */}
      {primer > 0.01 && (
        <g>
          <rect
            x={SLAB_L}
            y={PRIMER_TOP}
            width={(SLAB_R - SLAB_L) * clamp01(primer)}
            height={CONCRETE_TOP - PRIMER_TOP}
            fill="url(#primerGrad)"
          />
          {/* Sable à refus sur le primaire */}
          {sand > 0.01 &&
            sandGrains
              .filter((g) => g.x < SLAB_L + (SLAB_R - SLAB_L) * clamp01(primer))
              .map((g, i) => (
                <circle
                  key={i}
                  cx={g.x}
                  cy={PRIMER_TOP - 1}
                  r={g.r}
                  fill={COLORS.brassLight}
                  opacity={0.85 * clamp01(sand)}
                />
              ))}
        </g>
      )}

      {/* ---------- MATRICE (granulats) ---------- */}
      {matrixFill > 0.01 && (
        <g clipPath="url(#matrixClip)">
          {/* liant résine */}
          <rect x={SLAB_L} y={MATRIX_TOP} width={SLAB_R - SLAB_L} height={MATRIX_H} fill={COLORS.resin} />
          {/* granulats */}
          {aggregates.map((a, i) => (
            <g key={i} transform={`rotate(${a.rot} ${a.x} ${a.y})`}>
              <ellipse cx={a.x} cy={a.y} rx={a.rx} ry={a.ry} fill={a.color} opacity={0.92} />
            </g>
          ))}
          {/* Film de résine brute (avant ponçage) qui masque les granulats du haut */}
          {ground < 0.99 && (
            <rect
              x={SLAB_L}
              y={MATRIX_TOP}
              width={SLAB_R - SLAB_L}
              height={Math.max(0, filmBottom - MATRIX_TOP)}
              fill={COLORS.resinFilm}
              opacity={interpolate(clamp01(ground), [0, 1], [0.92, 0])}
            />
          )}
          {/* Pleine couverture résine tant que pas poncé du tout */}
          {ground < 0.02 && (
            <rect x={SLAB_L} y={MATRIX_TOP} width={SLAB_R - SLAB_L} height={MATRIX_H} fill={COLORS.resinFilm} opacity={0.9} />
          )}
        </g>
      )}

      {/* ---------- RAGRÉAGE / GROUT ---------- */}
      {grout > 0.01 && (
        <rect
          x={SLAB_L}
          y={MATRIX_TOP - 4}
          width={SLAB_R - SLAB_L}
          height={6}
          fill={COLORS.resinFilm}
          opacity={0.55 * clamp01(grout)}
        />
      )}

      {/* ---------- PROFILÉS LAITON ---------- */}
      {profiles > 0.01 &&
        PROFILE_XS.map((px, i) => {
          const topY = interpolate(clamp01(profiles), [0, 1], [PRIMER_TOP, MATRIX_TOP]);
          return (
            <g key={i}>
              <rect
                x={px - PROFILE_W / 2}
                y={topY}
                width={PROFILE_W}
                height={PRIMER_TOP - topY}
                fill="url(#brassGrad)"
              />
              <rect x={px - PROFILE_W / 2} y={topY} width={PROFILE_W} height={2.5} fill={COLORS.brassLight} />
            </g>
          );
        })}

      {/* ---------- VERNIS / POLI (reflet) ---------- */}
      {(polish > 0.01 || varnish > 0.01) && (
        <g clipPath="url(#matrixClip)">
          <rect
            x={SLAB_L}
            y={MATRIX_TOP}
            width={SLAB_R - SLAB_L}
            height={26}
            fill="url(#glossGrad)"
            opacity={Math.max(clamp01(polish), clamp01(varnish))}
          />
          <rect
            x={SLAB_L}
            y={MATRIX_TOP + 1.5}
            width={SLAB_R - SLAB_L}
            height={2}
            fill="#FFFFFF"
            opacity={0.85 * Math.max(clamp01(polish), clamp01(varnish))}
          />
        </g>
      )}

      {/* ---------- GOUTTE D'EAU (perlage) ---------- */}
      {waterDrop > 0.01 && (
        <g opacity={clamp01(waterDrop)}>
          <path
            d={`M 500 ${MATRIX_TOP - 26 * clamp01(waterDrop)}
                C 488 ${MATRIX_TOP - 10}, 480 ${MATRIX_TOP - 2}, 500 ${MATRIX_TOP - 1}
                C 520 ${MATRIX_TOP - 2}, 512 ${MATRIX_TOP - 10}, 500 ${MATRIX_TOP - 26 * clamp01(waterDrop)} Z`}
            fill="#BFE0EC"
            opacity={0.85}
          />
          <ellipse cx={495} cy={MATRIX_TOP - 12} rx={4} ry={6} fill="#FFFFFF" opacity={0.7} />
        </g>
      )}

      {/* ---------- COTE D'ÉPAISSEUR ---------- */}
      {showThickness > 0.01 && (
        <g opacity={clamp01(showThickness)} fontFamily={bodyFamily}>
          <line x1={SLAB_R + 20} y1={MATRIX_TOP} x2={SLAB_R + 20} y2={PRIMER_TOP} stroke={COLORS.ink} strokeWidth={1.5} />
          <line x1={SLAB_R + 14} y1={MATRIX_TOP} x2={SLAB_R + 26} y2={MATRIX_TOP} stroke={COLORS.ink} strokeWidth={1.5} />
          <line x1={SLAB_R + 14} y1={PRIMER_TOP} x2={SLAB_R + 26} y2={PRIMER_TOP} stroke={COLORS.ink} strokeWidth={1.5} />
          <text x={SLAB_R + 34} y={(MATRIX_TOP + PRIMER_TOP) / 2 + 5} fontSize={22} fill={COLORS.ink} fontWeight={600}>
            ≈ 9–10 mm
          </text>
        </g>
      )}

      {/* ---------- ANNOTATIONS / LIBELLÉS DE COUCHE ---------- */}
      {annotations.map((a, i) => (
        <g key={i} opacity={clamp01(a.progress)} fontFamily={bodyFamily}>
          <line
            x1={SLAB_L - 14}
            y1={a.atY}
            x2={SLAB_L - 70}
            y2={a.atY}
            stroke={a.color ?? COLORS.inkSoft}
            strokeWidth={1.5}
          />
          <circle cx={SLAB_L - 14} cy={a.atY} r={3} fill={a.color ?? COLORS.inkSoft} />
          <text
            x={SLAB_L - 78}
            y={a.atY + 6}
            fontSize={21}
            fill={COLORS.ink}
            fontWeight={600}
            textAnchor="end"
          >
            {a.text}
          </text>
        </g>
      ))}
    </svg>
  );
};

// Arête dentelée représentant le profil grenaillé (CSP).
function teethPath(x1: number, x2: number, y: number, amp: number): string {
  const step = 18;
  let d = `M ${x1} ${y}`;
  let up = true;
  for (let x = x1; x <= x2; x += step) {
    d += ` L ${x} ${y - (up ? amp : 0)}`;
    up = !up;
  }
  return d;
}

export const CROSS_SECTION_Y = {
  concrete: (CONCRETE_TOP + FLOOR_BOTTOM) / 2,
  primer: (PRIMER_TOP + CONCRETE_TOP) / 2,
  matrix: (MATRIX_TOP + PRIMER_TOP) / 2,
  surface: MATRIX_TOP,
  profileTop: MATRIX_TOP,
};
