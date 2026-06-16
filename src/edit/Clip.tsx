import React from "react";
import { OffthreadVideo, staticFile, useVideoConfig, AbsoluteFill } from "remotion";
import { Step, FPS } from "./config";
import { AVAILABLE_CLIPS } from "./footage";
import { COLORS } from "../theme";
import { headingFamily, bodyFamily } from "../lib/fonts";

/**
 * Affiche le rush réel (recadré "cover", éventuellement ralenti/trim) si le
 * fichier existe dans public/footage/, sinon un panneau "RUSH À DÉPOSER"
 * décrivant le plan à filmer (utile pour la démo de montage).
 */
export const Clip: React.FC<{ step: Step }> = ({ step }) => {
  const { durationInFrames } = useVideoConfig();
  const has = step.clip && AVAILABLE_CLIPS.includes(step.clip);

  if (has && step.clip) {
    const startFrom = Math.round((step.inSec ?? 0) * FPS);
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        <OffthreadVideo
          src={staticFile(`footage/${step.clip}`)}
          startFrom={startFrom}
          playbackRate={step.slowmo ?? 1}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {/* léger étalonnage / lisibilité des incrustations */}
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)" }} />
      </AbsoluteFill>
    );
  }

  return <Placeholder step={step} durationInFrames={durationInFrames} />;
};

const Placeholder: React.FC<{ step: Step; durationInFrames: number }> = ({ step }) => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(120% 120% at 50% 35%, #2A2622 0%, #17140F 100%)",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: bodyFamily,
      color: "#EFE8DA",
    }}
  >
    {/* trame "film" discrète */}
    <AbsoluteFill style={{ opacity: 0.06, background: "repeating-linear-gradient(90deg, #fff 0 2px, transparent 2px 46px)" }} />
    <div style={{ textAlign: "center", maxWidth: "74%", padding: 40 }}>
      <div style={{ fontSize: 64, marginBottom: 8 }}>🎬</div>
      <div style={{ fontFamily: headingFamily, fontWeight: 800, letterSpacing: 4, fontSize: 24, color: COLORS.brassLight }}>
        RUSH À DÉPOSER
      </div>
      <div style={{ marginTop: 14, fontFamily: headingFamily, fontWeight: 700, fontSize: 40 }}>{step.title}</div>
      {step.clip && (
        <div
          style={{
            marginTop: 18,
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: 8,
            border: `1.5px solid ${COLORS.brass}`,
            color: COLORS.brassLight,
            fontFamily: "monospace",
            fontSize: 22,
          }}
        >
          public/footage/{step.clip}
        </div>
      )}
      <div style={{ marginTop: 22, fontSize: 23, lineHeight: 1.4, color: "#C9C0AE" }}>{step.shot}</div>
    </div>
  </AbsoluteFill>
);
