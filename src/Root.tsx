import React from "react";
import { Composition } from "remotion";
import { Cinematic } from "./cinematic/Cinematic";
import { DURATION_F, FPS } from "./cinematic/timeline";
import { Formation, TOTAL_F } from "./edit/Formation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ===== Vidéo de FORMATION (montage de rushes réels) — livrable principal ===== */}
      <Composition
        id="Formation-16x9"
        component={Formation}
        durationInFrames={TOTAL_F}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Formation-9x16"
        component={Formation}
        durationInFrames={TOTAL_F}
        fps={FPS}
        width={1080}
        height={1920}
      />

      {/* ===== Version animée 2.5D (sans tournage) — conservée comme alternative ===== */}
      <Composition
        id="Terrazzo-16x9"
        component={Cinematic}
        durationInFrames={DURATION_F}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Terrazzo-9x16"
        component={Cinematic}
        durationInFrames={DURATION_F}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
