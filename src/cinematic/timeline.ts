/**
 * Timeline maîtresse du plan-séquence (~80 s @ 30 fps).
 * Tout est piloté par la frame : la construction du sol (build), la caméra et
 * les sous-titres. Aucune coupe : la caméra voyage en continu.
 */
export const FPS = 30;
export const DURATION_F = 80 * FPS; // 2400

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Interpolation par points-clés [frame, valeur] avec lissage. */
export function kf(frame: number, pts: [number, number][]): number {
  if (frame <= pts[0][0]) return pts[0][1];
  const last = pts[pts.length - 1];
  if (frame >= last[0]) return last[1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [f0, v0] = pts[i];
    const [f1, v1] = pts[i + 1];
    if (frame >= f0 && frame <= f1) {
      const t = smooth(clamp01((frame - f0) / (f1 - f0)));
      return v0 + (v1 - v0) * t;
    }
  }
  return last[1];
}

// --- Construction du sol (chaque paramètre 0..1) ---
export type Build = {
  concrete: number;
  prep: number;
  primer: number;
  profiles: number;
  matrix: number;
  ground: number;
  grout: number;
  polish: number;
  varnish: number;
};

export function getBuild(f: number): Build {
  return {
    concrete: kf(f, [[10, 0], [90, 1]]),
    prep: kf(f, [[105, 0], [255, 1]]),
    primer: kf(f, [[300, 0], [450, 1]]),
    profiles: kf(f, [[480, 0], [660, 1]]),
    matrix: kf(f, [[840, 0], [1040, 1]]),
    ground: kf(f, [[1200, 0], [1380, 1]]),
    grout: kf(f, [[1410, 0], [1530, 1]]),
    polish: kf(f, [[1680, 0], [1950, 1]]),
    varnish: kf(f, [[1980, 0], [2130, 1]]),
  };
}

// --- Caméra ---
export type Cam = { tx: number; ty: number; pitch: number; yaw: number; zoom: number };

const CAM_KEYS: { f: number; c: Cam }[] = [
  { f: 0, c: { tx: -150, ty: -190, pitch: 30, yaw: -20, zoom: -520 } },
  { f: 105, c: { tx: -680, ty: -120, pitch: 17, yaw: -28, zoom: 170 } },
  { f: 300, c: { tx: -300, ty: -120, pitch: 14, yaw: -22, zoom: 300 } },
  { f: 480, c: { tx: 40, ty: -330, pitch: 56, yaw: -18, zoom: 230 } },
  { f: 690, c: { tx: 240, ty: -300, pitch: 50, yaw: -10, zoom: 250 } },
  { f: 840, c: { tx: 60, ty: -150, pitch: 20, yaw: -16, zoom: 360 } },
  { f: 1050, c: { tx: 0, ty: -200, pitch: 27, yaw: -14, zoom: 300 } },
  { f: 1200, c: { tx: -120, ty: -210, pitch: 23, yaw: -22, zoom: 430 } },
  { f: 1410, c: { tx: 120, ty: -210, pitch: 26, yaw: -12, zoom: 430 } },
  { f: 1680, c: { tx: 0, ty: -250, pitch: 40, yaw: -16, zoom: 360 } },
  { f: 1980, c: { tx: 0, ty: -235, pitch: 44, yaw: -24, zoom: 330 } },
  { f: 2190, c: { tx: 0, ty: -300, pitch: 52, yaw: -30, zoom: 120 } },
  { f: DURATION_F, c: { tx: 0, ty: -320, pitch: 47, yaw: -36, zoom: 70 } },
];

export function getCam(f: number): Cam {
  const keys = CAM_KEYS;
  if (f <= keys[0].f) return keys[0].c;
  const last = keys[keys.length - 1];
  if (f >= last.f) return last.c;
  let a = keys[0];
  let b = last;
  for (let i = 0; i < keys.length - 1; i++) {
    if (f >= keys[i].f && f <= keys[i + 1].f) {
      a = keys[i];
      b = keys[i + 1];
      break;
    }
  }
  const t = smooth(clamp01((f - a.f) / (b.f - a.f)));
  const lerp = (k: keyof Cam) => a.c[k] + (b.c[k] - a.c[k]) * t;
  // Léger flottement "caméra à l'épaule" pour la vie de l'image.
  const life = f / FPS;
  return {
    tx: lerp("tx") + Math.sin(life * 0.6) * 6,
    ty: lerp("ty") + Math.sin(life * 0.9 + 1) * 4,
    pitch: lerp("pitch") + Math.sin(life * 0.5) * 0.5,
    yaw: lerp("yaw") + Math.sin(life * 0.4 + 2) * 0.6,
    zoom: lerp("zoom") + Math.sin(life * 0.7) * 5,
  };
}

export function camTransform(c: Cam): string {
  // rotateX négatif : la caméra regarde le sol depuis le dessus (vue 3/4).
  return [
    `translateZ(${c.zoom}px)`,
    `rotateX(${-c.pitch}deg)`,
    `rotateY(${c.yaw}deg)`,
    `translate3d(${-c.tx}px, ${-c.ty}px, 0px)`,
  ].join(" ");
}

// --- Sous-titres (français) ---
export type Sub = { kicker: string; text: string };
const SUBS: { f0: number; f1: number; s: Sub }[] = [
  { f0: 110, f1: 290, s: { kicker: "01 · Préparation du support", text: "Le béton est grenaillé pour ouvrir la surface et garantir l'accroche." } },
  { f0: 300, f1: 470, s: { kicker: "02 · Primaire d'accrochage", text: "Un primaire époxy crée le pont d'adhérence avec la résine." } },
  { f0: 485, f1: 660, s: { kicker: "03 · Profilés & calepinage", text: "Les profilés en laiton dessinent les panneaux, les joints et les motifs." } },
  { f0: 690, f1: 830, s: { kicker: "04 · Préparation de la matrice", text: "Résine époxy, granulats de marbre et pigments, malaxés ensemble." } },
  { f0: 845, f1: 1030, s: { kicker: "05 · Coulage & talochage", text: "La matrice est coulée entre les profilés, à ≈ 9–10 mm." } },
  { f0: 1050, f1: 1185, s: { kicker: "06 · Polymérisation", text: "Durcissement de la matrice, 18 à 24 heures." } },
  { f0: 1200, f1: 1385, s: { kicker: "07 · Ponçage – dégrossissage", text: "La surface est poncée pour révéler les granulats." } },
  { f0: 1405, f1: 1530, s: { kicker: "08 · Ragréage", text: "Une couche de grout comble les dernières bulles." } },
  { f0: 1545, f1: 1660, s: { kicker: "09 · Polymérisation du grout", text: "Nouveau durcissement, environ 24 heures." } },
  { f0: 1680, f1: 1940, s: { kicker: "10 · Ponçage progressif", text: "Grain après grain, de 50 jusqu'à 3000, jusqu'au poli miroir." } },
  { f0: 1960, f1: 2150, s: { kicker: "11 · Protection & finition", text: "Un vernis scelle le sol et le rend imperméable." } },
];

export function getSub(f: number): { sub: Sub; opacity: number } | null {
  for (const { f0, f1, s } of SUBS) {
    if (f >= f0 - 14 && f <= f1 + 14) {
      const opacity =
        f < f0 ? (f - (f0 - 14)) / 14 : f > f1 ? Math.max(0, 1 - (f - f1) / 14) : 1;
      return { sub: s, opacity: Math.max(0, Math.min(1, opacity)) };
    }
  }
  return null;
}
