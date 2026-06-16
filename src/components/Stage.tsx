import React from "react";
import { useVideoConfig } from "remotion";

/** Conteneur qui dimensionne le visuel central selon le format. */
export const Stage: React.FC<{
  children: React.ReactNode;
  wide?: boolean;
  offsetY?: number;
}> = ({ children, wide = true, offsetY = 0 }) => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const w = portrait ? "88%" : wide ? 1240 : 760;
  return (
    <div
      style={{
        width: w,
        maxWidth: "92%",
        transform: `translateY(${(portrait ? 40 : 70) + offsetY}px)`,
      }}
    >
      {children}
    </div>
  );
};

export function staged(
  frame: number,
  from: number,
  to: number,
  easing?: (t: number) => number
): number {
  const t = Math.max(0, Math.min(1, (frame - from) / (to - from)));
  return easing ? easing(t) : t;
}
