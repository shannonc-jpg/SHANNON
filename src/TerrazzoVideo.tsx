import React from "react";
import { AbsoluteFill, Series, useCurrentFrame, interpolate } from "remotion";
import { TerrazzoBackground } from "./components/TerrazzoBackground";
import { FontLoader } from "./components/FontLoader";
import {
  DUR,
  IntroScene,
  PrepScene,
  PrimerScene,
  ProfilesScene,
  MatrixScene,
  PourScene,
  CureScene,
  GrindScene,
  GroutScene,
  CureGroutScene,
  PolishScene,
  ProtectScene,
  ResultScene,
} from "./scenes";

/** Fond fixe + léger fondu d'entrée/sortie pour des transitions fluides. */
const FadeWrap: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 10, dur - 10, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const SCENES: { Comp: React.FC; dur: number }[] = [
  { Comp: IntroScene, dur: DUR.intro },
  { Comp: PrepScene, dur: DUR.prep },
  { Comp: PrimerScene, dur: DUR.primer },
  { Comp: ProfilesScene, dur: DUR.profiles },
  { Comp: MatrixScene, dur: DUR.matrix },
  { Comp: PourScene, dur: DUR.pour },
  { Comp: CureScene, dur: DUR.cure },
  { Comp: GrindScene, dur: DUR.grind },
  { Comp: GroutScene, dur: DUR.grout },
  { Comp: CureGroutScene, dur: DUR.cureGrout },
  { Comp: PolishScene, dur: DUR.polish },
  { Comp: ProtectScene, dur: DUR.protect },
  { Comp: ResultScene, dur: DUR.result },
];

export const TOTAL_FRAMES = SCENES.reduce((a, s) => a + s.dur, 0);

export const TerrazzoVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <FontLoader />
      <TerrazzoBackground />
      <Series>
        {SCENES.map(({ Comp, dur }, i) => (
          <Series.Sequence key={i} durationInFrames={dur}>
            <FadeWrap dur={dur}>
              <Comp />
            </FadeWrap>
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
