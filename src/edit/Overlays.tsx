import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { COLORS } from "../theme";
import { headingFamily, bodyFamily } from "../lib/fonts";
import { Step } from "./config";

const ease = { damping: 200 };

export const BrandBug: React.FC = () => (
  <div style={{ position: "absolute", top: 54, left: 60, display: "flex", alignItems: "center", gap: 12 }}>
    <Logo size={40} />
    <span style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 24, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
      2A Résine
    </span>
  </div>
);

export const StepProgress: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div style={{ position: "absolute", top: 58, right: 60, display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ display: "flex", gap: 5 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: i + 1 === step ? 20 : 7, height: 7, borderRadius: 4, background: i + 1 <= step ? COLORS.brassLight : "rgba(255,255,255,0.4)" }} />
      ))}
    </div>
    <span style={{ fontFamily: headingFamily, fontWeight: 700, fontSize: 22, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
      {String(step).padStart(2, "0")}<span style={{ opacity: 0.7 }}> / {total}</span>
    </span>
  </div>
);

export const Callouts: React.FC<{ items: string[] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 110, right: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
      {items.map((t, i) => {
        const s = spring({ frame: frame - 26 - i * 16, fps, config: ease, durationInFrames: 18 });
        return (
          <div
            key={i}
            style={{
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [24, 0])}px)`,
              padding: "8px 15px",
              borderRadius: 8,
              background: "rgba(20,17,13,0.7)",
              border: `1px solid ${COLORS.brass}`,
              color: "#F2ECDD",
              fontFamily: bodyFamily,
              fontWeight: 600,
              fontSize: 21,
              backdropFilter: "blur(4px)",
            }}
          >
            {t}
          </div>
        );
      })}
    </div>
  );
};

export const LowerThird: React.FC<{ step: Step; portrait: boolean }> = ({ step, portrait }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: ease, durationInFrames: 24 });
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        bottom: portrait ? 240 : 78,
        opacity: a,
        transform: `translateY(${interpolate(a, [0, 1], [26, 0])}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{ width: 34, height: 4, background: COLORS.brassLight, borderRadius: 2 }} />
        <span style={{ fontFamily: headingFamily, fontWeight: 700, fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: COLORS.brassLight, textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
          {step.kicker}
        </span>
      </div>
      <div style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: portrait ? 54 : 60, lineHeight: 1.05, color: "#fff", textShadow: "0 3px 18px rgba(0,0,0,0.6)", maxWidth: portrait ? "100%" : "70%" }}>
        {step.title}
      </div>
      <div style={{ marginTop: 12, fontFamily: bodyFamily, fontWeight: 500, fontSize: portrait ? 28 : 30, color: "#F0EADB", textShadow: "0 2px 12px rgba(0,0,0,0.7)", maxWidth: portrait ? "100%" : "62%", lineHeight: 1.25 }}>
        {step.subtitle}
      </div>
    </div>
  );
};

export const Intro: React.FC<{ title: string; tagline: string; partner: string }> = ({ title, tagline, partner }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const a = spring({ frame, fps, config: ease, durationInFrames: 28 });
  const b = spring({ frame: frame - 16, fps, config: ease, durationInFrames: 28 });
  const out = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 100% at 50% 30%, ${COLORS.bg}, ${COLORS.bgDeep} 80%)`, alignItems: "center", justifyContent: "center", opacity: out }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)`, display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <Logo size={64} dark />
          <span style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 48, color: COLORS.ink }}>2A Résine</span>
        </div>
        <h1 style={{ margin: 0, opacity: b, transform: `translateY(${interpolate(b, [0, 1], [18, 0])}px)`, fontFamily: headingFamily, fontWeight: 800, fontSize: 78, letterSpacing: -1.5, color: COLORS.ink }}>
          {title}
        </h1>
        <div style={{ opacity: b, marginTop: 12, fontFamily: headingFamily, fontWeight: 500, fontSize: 32, color: COLORS.accent }}>{tagline}</div>
        <div style={{ opacity: b, marginTop: 26, fontFamily: bodyFamily, fontSize: 23, color: COLORS.inkSoft }}>{partner}</div>
      </div>
    </AbsoluteFill>
  );
};

export const Outro: React.FC<{ headline: string; contact: string; partner: string }> = ({ headline, contact, partner }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame, fps, config: ease, durationInFrames: 30 });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 100% at 50% 35%, ${COLORS.bg}, ${COLORS.bgDeep} 80%)`, alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", opacity: a, transform: `translateY(${interpolate(a, [0, 1], [18, 0])}px)` }}>
        <div style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 54, letterSpacing: -1, color: COLORS.ink, maxWidth: 1100, margin: "0 auto" }}>{headline}</div>
        <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 14 }}>
          <Logo size={52} dark />
          <span style={{ fontFamily: headingFamily, fontWeight: 800, fontSize: 38, color: COLORS.ink }}>2A Résine</span>
        </div>
        <div style={{ marginTop: 14, fontFamily: bodyFamily, fontSize: 23, color: COLORS.inkSoft }}>{contact}</div>
        <div style={{ marginTop: 6, fontFamily: bodyFamily, fontSize: 21, fontWeight: 600, color: COLORS.accent }}>{partner}</div>
      </div>
    </AbsoluteFill>
  );
};

export const Logo: React.FC<{ size: number; dark?: boolean }> = ({ size, dark }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: dark ? COLORS.ink : "#fff",
      color: dark ? "#fff" : COLORS.ink,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: headingFamily,
      fontWeight: 800,
      fontSize: size * 0.5,
      boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
    }}
  >
    2A
  </div>
);
