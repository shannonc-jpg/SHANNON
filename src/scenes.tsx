import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { COLORS, BRAND } from "./theme";
import { headingFamily, bodyFamily } from "./lib/fonts";
import { SceneFrame } from "./components/SceneFrame";
import { CrossSection, CROSS_SECTION_Y } from "./components/CrossSection";
import { TopView } from "./components/TopView";
import { Stage, staged } from "./components/Stage";
import { MixingBowl, Chrono, GritCounter } from "./components/Graphics";

const ease = Easing.bezier(0.4, 0, 0.2, 1);
const Y = CROSS_SECTION_Y;

// Les libellés de couche (à gauche de la coupe) ne tiennent pas dans le format
// portrait étroit : on les masque alors automatiquement.
function useSideAnnotations<T>(list: T[]): T[] {
  const { width, height } = useVideoConfig();
  return height > width ? [] : list;
}

// Durées (frames @ 30 fps) — modifie ici pour ajuster le rythme.
export const DUR = {
  intro: 150,
  prep: 195,
  primer: 180,
  profiles: 195,
  matrix: 195,
  pour: 195,
  cure: 150,
  grind: 195,
  grout: 180,
  cureGrout: 135,
  polish: 210,
  protect: 195,
  result: 210,
} as const;

// ------------------------------------------------------------------
// 0 — GÉNÉRIQUE D'OUVERTURE
// ------------------------------------------------------------------
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const b = spring({ frame: frame - 18, fps, config: { damping: 200 }, durationInFrames: 30 });
  const c = spring({ frame: frame - 40, fps, config: { damping: 200 }, durationInFrames: 30 });
  const line = interpolate(frame, [20, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: bodyFamily }}>
      <div style={{ textAlign: "center", maxWidth: "80%" }}>
        <div
          style={{
            opacity: a,
            transform: `translateY(${interpolate(a, [0, 1], [20, 0])}px)`,
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 18,
              background: COLORS.ink,
              color: COLORS.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: headingFamily,
              fontWeight: 800,
              fontSize: 40,
            }}
          >
            2A
          </div>
          <div style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 56, letterSpacing: 0.5 }}>
            {BRAND.name}
          </div>
        </div>

        <h1
          style={{
            opacity: b,
            transform: `translateY(${interpolate(b, [0, 1], [20, 0])}px)`,
            margin: "0 0 14px",
            fontFamily: headingFamily,
            fontWeight: 800,
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -1.5,
          }}
        >
          {BRAND.system}
        </h1>
        <div
          style={{
            opacity: b,
            fontFamily: headingFamily,
            fontWeight: 500,
            fontSize: 40,
            color: COLORS.accent,
            marginBottom: 34,
          }}
        >
          {BRAND.tagline}
        </div>

        <div style={{ height: 2, width: `${line * 320}px`, background: COLORS.hair, margin: "0 auto 26px" }} />

        <div style={{ opacity: c, fontSize: 26, color: COLORS.inkSoft, letterSpacing: 0.4 }}>
          {BRAND.partner}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------
// 1 — PRÉPARATION DU SUPPORT
// ------------------------------------------------------------------
export const PrepScene: React.FC = () => {
  const f = useCurrentFrame();
  const concrete = staged(f, 6, 34, ease);
  const prep = staged(f, 40, 95, ease);
  const annotations = useSideAnnotations([
    { text: "Béton grenaillé", atY: Y.concrete, progress: staged(f, 50, 80), color: COLORS.concreteEdge },
  ]);
  return (
    <SceneFrame
      step={1}
      title="Préparation du support"
      subtitle="Tout commence par le support : le béton est grenaillé pour ouvrir la surface et garantir l'accroche."
      tech={["Grenaillage / ponçage diamant", "Profil CSP 4–6", "Humidité < 75 % HR"]}
    >
      <Stage>
        <CrossSection
          concrete={concrete}
          prep={prep}
          annotations={annotations}
        />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 2 — PRIMAIRE D'ACCROCHAGE
// ------------------------------------------------------------------
export const PrimerScene: React.FC = () => {
  const f = useCurrentFrame();
  const primer = staged(f, 10, 70, ease);
  const sand = staged(f, 70, 110);
  const annotations = useSideAnnotations([
    { text: "Primaire époxy", atY: Y.primer, progress: staged(f, 60, 90), color: COLORS.primer },
  ]);
  return (
    <SceneFrame
      step={2}
      title="Primaire d'accrochage"
      subtitle="On applique ensuite un primaire qui crée le pont d'adhérence avec la résine."
      tech={["Primaire époxy Resuprime 3579", "Sablage à refus", "Pont d'adhérence"]}
    >
      <Stage>
        <CrossSection
          concrete={1}
          prep={1}
          primer={primer}
          sand={sand}
          annotations={annotations}
        />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 3 — POSE DES PROFILÉS / CALEPINAGE (vue de dessus)
// ------------------------------------------------------------------
export const ProfilesScene: React.FC = () => {
  const f = useCurrentFrame();
  const lines = staged(f, 12, 110, ease);
  const logo = staged(f, 110, 160, ease);
  return (
    <SceneFrame
      step={3}
      title="Pose des profilés"
      subtitle="Les profilés en laiton sont posés : ils dessinent les panneaux, les joints et les motifs."
      tech={["Profilés laiton / zinc", "Calepinage & panneaux", "Incrustations marbre / logo"]}
    >
      <Stage wide={false}>
        <TopView lines={lines} fill={staged(f, 60, 120) * 0.35} logo={logo} />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 4 — PRÉPARATION DE LA MATRICE (malaxage)
// ------------------------------------------------------------------
export const MatrixScene: React.FC = () => {
  const f = useCurrentFrame();
  const mix = staged(f, 8, 150, ease);
  return (
    <SceneFrame
      step={4}
      title="Préparation de la matrice"
      subtitle="La matrice est préparée : résine époxy, granulats de marbre et pigments, malaxés ensemble."
      tech={["Époxy bi-composant (A + durcisseur)", "Granulats marbre / verre / nacre", "Malaxeur mécanique"]}
    >
      <Stage wide={false}>
        <MixingBowl progress={mix} />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 5 — COULAGE & TALOCHAGE
// ------------------------------------------------------------------
export const PourScene: React.FC = () => {
  const f = useCurrentFrame();
  const fill = staged(f, 12, 120, ease);
  return (
    <SceneFrame
      step={5}
      title="Coulage & talochage"
      subtitle="Elle est coulée entre les profilés et talochée à l'épaisseur voulue."
      tech={["Resuflor Terrazzo TG / 3520", "Talochée à l'épaisseur", "≈ 9–10 mm (3/8″)"]}
    >
      <Stage>
        <CrossSection
          concrete={1}
          prep={1}
          primer={1}
          sand={1}
          profiles={1}
          matrixFill={fill}
          showThickness={staged(f, 110, 150)}
        />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 6 — POLYMÉRISATION
// ------------------------------------------------------------------
export const CureScene: React.FC = () => {
  const f = useCurrentFrame();
  const p = staged(f, 10, 130, ease);
  const hours = Math.round(interpolate(p, [0, 1], [0, 24]));
  return (
    <SceneFrame
      step={6}
      title="Polymérisation"
      subtitle="Après polymérisation…"
      tech={["Durcissement ≈ 18–24 h", "Température & HR contrôlées"]}
    >
      <Stage wide={false} offsetY={-10}>
        <Chrono progress={p} label={`${hours} h`} />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 7 — PONÇAGE – DÉGROSSISSAGE
// ------------------------------------------------------------------
export const GrindScene: React.FC = () => {
  const f = useCurrentFrame();
  const ground = staged(f, 16, 130, ease);
  const annotations = useSideAnnotations([
    { text: "Granulats apparents", atY: Y.surface + 18, progress: staged(f, 90, 120), color: COLORS.accent },
  ]);
  return (
    <SceneFrame
      step={7}
      title="Ponçage – dégrossissage"
      subtitle="…la surface est poncée pour révéler les granulats."
      tech={["Ponçage diamant ~24 grit", "Arasage au niveau des profilés", "Granulats mis à nu"]}
    >
      <Stage>
        <CrossSection
          concrete={1}
          prep={1}
          primer={1}
          sand={1}
          profiles={1}
          matrixFill={1}
          ground={ground}
          annotations={annotations}
        />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 8 — RAGRÉAGE / BOUCHAGE DES PORES
// ------------------------------------------------------------------
export const GroutScene: React.FC = () => {
  const f = useCurrentFrame();
  const grout = staged(f, 12, 110, ease);
  return (
    <SceneFrame
      step={8}
      title="Ragréage / bouchage des pores"
      subtitle="Un ragréage comble les dernières bulles."
      tech={["Couche de grout (même résine)", "Comble bulles & micro-trous"]}
    >
      <Stage>
        <CrossSection
          concrete={1}
          prep={1}
          primer={1}
          sand={1}
          profiles={1}
          matrixFill={1}
          ground={1}
          grout={grout}
        />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 9 — POLYMÉRISATION DU GROUT
// ------------------------------------------------------------------
export const CureGroutScene: React.FC = () => {
  const f = useCurrentFrame();
  const p = staged(f, 10, 100, ease);
  const hours = Math.round(interpolate(p, [0, 1], [0, 24]));
  return (
    <SceneFrame
      step={9}
      title="Polymérisation du grout"
      subtitle="Puis vient le ponçage progressif…"
      tech={["Durcissement ≈ 24 h"]}
    >
      <Stage wide={false} offsetY={-10}>
        <Chrono progress={p} label={`${hours} h`} />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 10 — PONÇAGE PROGRESSIF & LUSTRAGE
// ------------------------------------------------------------------
export const PolishScene: React.FC = () => {
  const f = useCurrentFrame();
  const p = staged(f, 12, 170, ease);
  return (
    <SceneFrame
      step={10}
      title="Ponçage progressif & lustrage"
      subtitle="…grain après grain, jusqu'au poli miroir."
      tech={["50 → 100 → 200 → … → 3000", "Mat · satiné · poli"]}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30, transform: "translateY(40px)" }}>
        <GritCounter progress={p} />
        <div style={{ width: "70%", maxWidth: 1100 }}>
          <CrossSection
            concrete={1}
            prep={1}
            primer={1}
            sand={1}
            profiles={1}
            matrixFill={1}
            ground={1}
            grout={1}
            polish={p}
          />
        </div>
      </div>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 11 — PROTECTION & FINITION
// ------------------------------------------------------------------
export const ProtectScene: React.FC = () => {
  const f = useCurrentFrame();
  const varnish = staged(f, 12, 80, ease);
  const drop = staged(f, 95, 150, ease);
  const annotations = useSideAnnotations([
    { text: "Goutte d'eau qui perle", atY: Y.surface - 16, progress: staged(f, 120, 150), color: COLORS.primer },
  ]);
  return (
    <SceneFrame
      step={11}
      title="Protection & finition"
      subtitle="Une protection finale scelle le sol et le rend imperméable."
      tech={["Bouche-pores / vernis — 2 couches", "Acrydur Aqua 4401 / 4503", "Lustrage final"]}
    >
      <Stage>
        <CrossSection
          concrete={1}
          prep={1}
          primer={1}
          sand={1}
          profiles={1}
          matrixFill={1}
          ground={1}
          grout={1}
          polish={1}
          varnish={varnish}
          waterDrop={drop}
          annotations={annotations}
        />
      </Stage>
    </SceneFrame>
  );
};

// ------------------------------------------------------------------
// 12 — RÉSULTAT & CLÔTURE
// ------------------------------------------------------------------
export const ResultScene: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = staged(f, 10, 70, ease);
  const out = spring({ frame: f - 90, fps, config: { damping: 200 }, durationInFrames: 34 });
  return (
    <AbsoluteFill style={{ fontFamily: bodyFamily, color: COLORS.ink }}>
      <SceneFrame step={null} title="">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, transform: "translateY(-10px)" }}>
          <div style={{ opacity: reveal, transform: `scale(${interpolate(reveal, [0, 1], [0.9, 1])})`, width: 560, maxWidth: "70vw" }}>
            <TopView lines={1} fill={1} logo={1} />
          </div>
          <div
            style={{
              opacity: out,
              transform: `translateY(${interpolate(out, [0, 1], [16, 0])}px)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 52, letterSpacing: -1 }}>
              Un terrazzo unique, sans joint, durable.
            </div>
            <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: COLORS.ink,
                  color: COLORS.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: headingFamily,
                  fontWeight: 800,
                  fontSize: 26,
                }}
              >
                2A
              </div>
              <span style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 38 }}>{BRAND.name}</span>
            </div>
            <div style={{ marginTop: 16, fontSize: 24, color: COLORS.inkSoft }}>{BRAND.contact}</div>
            <div style={{ marginTop: 8, fontSize: 22, color: COLORS.accent, fontWeight: 600 }}>{BRAND.partner}</div>
          </div>
        </div>
      </SceneFrame>
    </AbsoluteFill>
  );
};
