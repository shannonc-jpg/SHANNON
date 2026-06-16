import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS, BRAND } from "../theme";
import { headingFamily, bodyFamily } from "../lib/fonts";
import { FontLoader } from "../components/FontLoader";
import { Floor } from "./Floor";
import { Particles } from "./Particles";
import {
  getBuild,
  getCam,
  camTransform,
  getSub,
  DURATION_F,
} from "./timeline";

export const Cinematic: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const b = getBuild(frame);
  const cam = getCam(frame);

  // Mise à l'échelle de base pour cadrer le sol selon le format.
  const baseScale = portrait ? 0.62 : 1;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(130% 110% at 50% 18%, ${COLORS.bg}, ${COLORS.bgDeep} 70%, #DED7CA 100%)`, fontFamily: bodyFamily, overflow: "hidden" }}>
      <FontLoader />

      {/* Halo lumineux qui suit vaguement la scène */}
      <AbsoluteFill style={{ background: "radial-gradient(50% 40% at 50% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0) 60%)" }} />

      {/* SCÈNE 3D */}
      <AbsoluteFill
        style={{
          perspective: 1700,
          perspectiveOrigin: portrait ? "50% 46%" : "50% 44%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: `scale(${baseScale}) ${camTransform(cam)}`,
          }}
        >
          <Floor b={b} />
          <Particles frame={frame} build={b} />
        </div>
      </AbsoluteFill>

      {/* Vignette cinématographique */}
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 240px rgba(40,32,22,0.32)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(120% 120% at 50% 50%, rgba(0,0,0,0) 58%, rgba(30,24,16,0.22) 100%)", pointerEvents: "none" }} />

      <Subtitle frame={frame} portrait={portrait} />
      <Intro frame={frame} />
      <Outro frame={frame} portrait={portrait} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Sous-titres
const Subtitle: React.FC<{ frame: number; portrait: boolean }> = ({ frame, portrait }) => {
  const res = getSub(frame);
  if (!res) return null;
  const { sub, opacity } = res;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: portrait ? 230 : 110,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity,
        textShadow: "0 2px 18px rgba(0,0,0,0.35)",
        padding: "0 8%",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: headingFamily,
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: COLORS.accent,
        }}
      >
        {sub.kicker}
      </div>
      <div style={{ fontFamily: headingFamily, fontWeight: 600, fontSize: portrait ? 40 : 44, color: "#241F18", lineHeight: 1.15, maxWidth: 1300 }}>
        {sub.text}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- Générique
const Intro: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  if (frame > 110) return null;
  const a = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const out = interpolate(frame, [78, 105], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: out, pointerEvents: "none" }}>
      <div style={{ textAlign: "center", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)` }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
          <Logo size={64} />
          <span style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 50 }}>{BRAND.name}</span>
        </div>
        <h1 style={{ margin: 0, fontFamily: headingFamily, fontWeight: 800, fontSize: 72, letterSpacing: -1.5 }}>
          {BRAND.system}
        </h1>
        <div style={{ fontFamily: headingFamily, fontWeight: 500, fontSize: 34, color: COLORS.accent, marginTop: 8 }}>
          {BRAND.tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Clôture
const Outro: React.FC<{ frame: number; portrait: boolean }> = ({ frame, portrait }) => {
  const { fps } = useVideoConfig();
  const start = DURATION_F - 130;
  if (frame < start) return null;
  const a = spring({ frame: frame - start, fps, config: { damping: 200 }, durationInFrames: 34 });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: portrait ? 360 : 130,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(246,243,238,0) 35%, rgba(246,243,238,0.55) 70%, rgba(246,243,238,0.9) 100%)",
          opacity: a,
        }}
      />
      <div style={{ position: "relative", textAlign: "center", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [16, 0])}px)`, textShadow: "0 2px 20px rgba(255,255,255,0.5)" }}>
        <div style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: portrait ? 44 : 52, letterSpacing: -1, color: "#241F18" }}>
          Un terrazzo unique, sans joint, durable.
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 16 }}>
          <Logo size={50} />
          <span style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 36 }}>{BRAND.name}</span>
        </div>
        <div style={{ marginTop: 14, fontSize: 22, color: COLORS.inkSoft }}>{BRAND.contact}</div>
        <div style={{ marginTop: 6, fontSize: 21, color: COLORS.accent, fontWeight: 600 }}>{BRAND.partner}</div>
      </div>
    </AbsoluteFill>
  );
};

const Logo: React.FC<{ size: number }> = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: COLORS.ink,
      color: COLORS.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: headingFamily,
      fontWeight: 800,
      fontSize: size * 0.5,
    }}
  >
    2A
  </div>
);
