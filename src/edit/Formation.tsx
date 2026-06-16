import React from "react";
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { FontLoader } from "../components/FontLoader";
import { BRAND } from "../theme";
import { STEPS, INTRO, OUTRO, FPS, Step } from "./config";
import { Clip } from "./Clip";
import {
  BrandBug,
  StepProgress,
  Callouts,
  LowerThird,
  Intro,
  Outro,
} from "./Overlays";

const f = (sec: number) => Math.round(sec * FPS);

export const INTRO_F = f(INTRO.durationSec);
export const OUTRO_F = f(OUTRO.durationSec);
export const TOTAL_F =
  INTRO_F + STEPS.reduce((a, s) => a + f(s.durationSec), 0) + OUTRO_F;

const Fade: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 7, dur - 7, dur], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const StepScene: React.FC<{ step: Step }> = ({ step }) => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Clip step={step} />
      <BrandBug />
      {step.n !== null && step.n <= BRAND.totalSteps && (
        <StepProgress step={step.n} total={BRAND.totalSteps} />
      )}
      <Callouts items={step.callouts} />
      <LowerThird step={step} portrait={portrait} />
    </AbsoluteFill>
  );
};

export const Formation: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <FontLoader />
      <Series>
        <Series.Sequence durationInFrames={INTRO_F}>
          <Fade dur={INTRO_F}>
            <Intro title={INTRO.title} tagline={INTRO.tagline} partner={BRAND.partner} />
          </Fade>
        </Series.Sequence>

        {STEPS.map((step, i) => {
          const dur = f(step.durationSec);
          return (
            <Series.Sequence key={i} durationInFrames={dur}>
              <Fade dur={dur}>
                <StepScene step={step} />
              </Fade>
            </Series.Sequence>
          );
        })}

        <Series.Sequence durationInFrames={OUTRO_F}>
          <Fade dur={OUTRO_F}>
            <Outro headline={OUTRO.headline} contact={BRAND.contact} partner={BRAND.partner} />
          </Fade>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
