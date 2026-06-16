import React, { useMemo } from "react";
import { Build } from "./timeline";
import { mulberry32, range } from "../lib/rng";
import { FLOOR, FLOOR_Y } from "./Floor";

/**
 * Poussières et particules en 3D (dans le repère caméra → parallaxe naturelle) :
 * - motes ambiantes qui flottent en permanence (vie de l'image, profondeur) ;
 * - poussière d'activité près de la surface pendant grenaillage / ponçage.
 */

const Mote: React.FC<{ x: number; y: number; z: number; r: number; o: number; color: string }> = ({ x, y, z, r, o, color }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: r,
      height: r,
      borderRadius: "50%",
      background: color,
      opacity: o,
      transform: `translate3d(${x - r / 2}px, ${y - r / 2}px, ${z}px)`,
    }}
  />
);

export const Particles: React.FC<{ frame: number; build: Build }> = ({ frame }) => {
  const t = frame / 30;

  const ambient = useMemo(() => {
    const rng = mulberry32(2024);
    return Array.from({ length: 48 }).map(() => ({
      bx: range(rng, -FLOOR.WX * 0.6, FLOOR.WX * 0.6),
      by: range(rng, FLOOR_Y.yMatrixTop - 360, 40),
      bz: range(rng, -FLOOR.DZ, FLOOR.DZ * 1.4),
      amp: range(rng, 14, 60),
      sp: range(rng, 0.2, 0.7),
      ph: range(rng, 0, 6.28),
      r: range(rng, 3, 9),
      o: range(rng, 0.12, 0.4),
    }));
  }, []);

  // Fenêtres d'activité : [début, fin, seed, couleur, vitesse montée]
  const activity = useMemo(() => {
    const rng = mulberry32(909);
    const make = (n: number) =>
      Array.from({ length: n }).map(() => ({
        x0: range(rng, -FLOOR.WX * 0.5, FLOOR.WX * 0.5),
        z: range(rng, -FLOOR.DZ * 0.5, FLOOR.DZ * 0.5),
        amp: range(rng, 40, 130),
        sp: range(rng, 0.6, 1.6),
        ph: range(rng, 0, 6.28),
        r: range(rng, 2.5, 6),
      }));
    return { prep: make(40), grind: make(46) };
  }, []);

  return (
    <>
      {ambient.map((m, i) => {
        const y = m.by + Math.sin(t * m.sp + m.ph) * m.amp;
        const x = m.bx + Math.cos(t * m.sp * 0.7 + m.ph) * m.amp * 0.6;
        return <Mote key={`a${i}`} x={x} y={y} z={m.bz} r={m.r} o={m.o} color="#FBF6EC" />;
      })}

      {/* Grenaillage (poussière béton) ~ frames 105-300 */}
      {frame > 95 && frame < 320 &&
        activity.prep.map((p, i) => {
          const life = ((t * p.sp + p.ph) % 2.2) / 2.2;
          const y = FLOOR_Y.yConcreteTop - life * p.amp;
          return <Mote key={`p${i}`} x={p.x0} y={y} z={p.z} r={p.r} o={(1 - life) * 0.5} color="#C9C2B2" />;
        })}

      {/* Ponçage (poussière + éclats) ~ frames 1180-1980 */}
      {frame > 1180 && frame < 1980 &&
        activity.grind.map((p, i) => {
          const life = ((t * p.sp + p.ph) % 1.6) / 1.6;
          const y = FLOOR_Y.yMatrixTop - life * p.amp;
          return <Mote key={`g${i}`} x={p.x0} y={y} z={p.z} r={p.r} o={(1 - life) * 0.6} color="#EFE7D6" />;
        })}
    </>
  );
};
