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

/**
 * Habillage commun à chaque scène : marque, compteur d'étape, titre,
 * sous-titre FR, puces techniques et barre de progression.
 * S'adapte au format paysage (16:9) ou portrait (9:16).
 */
export type SceneFrameProps = {
  step?: number | null;
  title: string;
  subtitle?: string;
  tech?: string[];
  children?: React.ReactNode;
};

export const SceneFrame: React.FC<SceneFrameProps> = ({
  step = null,
  title,
  subtitle,
  tech = [],
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const portrait = height > width;

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 26 });
  const titleY = interpolate(enter, [0, 1], [26, 0]);
  const sceneProg = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  const pad = portrait ? 70 : 90;

  return (
    <AbsoluteFill style={{ fontFamily: bodyFamily, color: COLORS.ink }}>
      {/* En-tête : marque + compteur d'étape */}
      <div
        style={{
          position: "absolute",
          top: pad - 24,
          left: pad,
          right: pad,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BrandMark />
        {step !== null && <StepCounter step={step} total={BRAND.totalSteps} />}
      </div>

      {/* Titre */}
      <div
        style={{
          position: "absolute",
          top: portrait ? pad + 60 : pad + 34,
          left: pad,
          right: pad,
          opacity: enter,
          transform: `translateY(${titleY}px)`,
        }}
      >
        {step !== null && (
          <div
            style={{
              fontFamily: headingFamily,
              fontWeight: 700,
              fontSize: portrait ? 26 : 24,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: COLORS.accent,
              marginBottom: 10,
            }}
          >
            Étape {step}
          </div>
        )}
        <h1
          style={{
            margin: 0,
            fontFamily: headingFamily,
            fontWeight: 800,
            fontSize: portrait ? 62 : 64,
            lineHeight: 1.04,
            letterSpacing: -1,
            maxWidth: portrait ? "100%" : "62%",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Scène (visuel) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Puces techniques */}
      {tech.length > 0 && (
        <div
          style={{
            position: "absolute",
            left: pad,
            bottom: subtitle ? (portrait ? 250 : 168) : pad,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            maxWidth: portrait ? "100%" : "55%",
          }}
        >
          {tech.map((t, i) => (
            <TechChip key={i} text={t} delay={i * 5} />
          ))}
        </div>
      )}

      {/* Sous-titre FR */}
      {subtitle && <Subtitle text={subtitle} bottom={portrait ? 130 : 96} pad={pad} />}

      {/* Barre de progression de la scène */}
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 5, width: "100%", background: COLORS.hair }}>
        <div style={{ height: "100%", width: `${sceneProg * 100}%`, background: COLORS.accent }} />
      </div>
    </AbsoluteFill>
  );
};

const BrandMark: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 9,
        background: COLORS.ink,
        color: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: headingFamily,
        fontWeight: 800,
        fontSize: 19,
      }}
    >
      2A
    </div>
    <div style={{ fontFamily: headingFamily, fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>
      {BRAND.name}
    </div>
  </div>
);

const StepCounter: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ display: "flex", gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === step ? 22 : 8,
            height: 8,
            borderRadius: 4,
            background: i + 1 <= step ? COLORS.accent : COLORS.hair,
            transition: "all 0.2s",
          }}
        />
      ))}
    </div>
    <div style={{ fontFamily: headingFamily, fontWeight: 700, fontSize: 24 }}>
      {step}
      <span style={{ color: COLORS.inkSoft, fontWeight: 500 }}> / {total}</span>
    </div>
  </div>
);

const TechChip: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 12 - delay, fps, config: { damping: 200 }, durationInFrames: 20 });
  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [10, 0])}px)`,
        padding: "9px 16px",
        borderRadius: 999,
        background: COLORS.card,
        border: `1.5px solid ${COLORS.hair}`,
        fontSize: 21,
        fontWeight: 600,
        color: COLORS.inkSoft,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      {text}
    </div>
  );
};

const Subtitle: React.FC<{ text: string; bottom: number; pad: number }> = ({ text, bottom, pad }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 22 });
  return (
    <div
      style={{
        position: "absolute",
        left: pad,
        right: pad,
        bottom,
        display: "flex",
        justifyContent: "center",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [14, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(30,28,25,0.92)",
          color: "#F6F3EE",
          padding: "16px 26px",
          borderRadius: 14,
          maxWidth: "90%",
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
        <div style={{ width: 4, alignSelf: "stretch", borderRadius: 4, background: COLORS.accent }} />
        <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.28 }}>{text}</div>
      </div>
    </div>
  );
};
