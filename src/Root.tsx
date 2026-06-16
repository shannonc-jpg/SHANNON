import React from "react";
import { Composition } from "remotion";
import { Cinematic } from "./cinematic/Cinematic";
import { DURATION_F, FPS } from "./cinematic/timeline";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Format principal : 1920 x 1080 (H.264) */}
      <Composition
        id="Terrazzo-16x9"
        component={Cinematic}
        durationInFrames={DURATION_F}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* Version verticale réseaux sociaux : 1080 x 1920 */}
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
