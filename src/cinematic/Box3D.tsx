import React from "react";

/**
 * Brique 3D (CSS preserve-3d) ancrée sur SON CENTRE au point (x,y,z) du monde.
 * Axe vertical : -Y vers le haut. Chaque face peut recevoir un matériau (node).
 * L'éclairage est simulé par un voile sombre dont l'opacité dépend de l'orientation.
 */

export type Vec3 = { x: number; y: number; z: number };

type FaceProps = {
  w: number;
  h: number;
  transform: string;
  children?: React.ReactNode;
  shade?: number; // 0 = pleine lumière, 1 = noir
  glow?: number; // ajout de lumière (reflet)
};

const Face: React.FC<FaceProps> = ({ w, h, transform, children, shade = 0, glow = 0 }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: w,
      height: h,
      transformOrigin: "center center",
      transform: `translate(-50%, -50%) ${transform}`,
      backfaceVisibility: "hidden",
      overflow: "hidden",
    }}
  >
    {children}
    {shade > 0 && (
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: shade }} />
    )}
    {glow > 0 && (
      <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: glow }} />
    )}
  </div>
);

export type BoxFaces = {
  front?: React.ReactNode;
  back?: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export const Box3D: React.FC<{
  size: Vec3;
  pos: Vec3;
  faces: BoxFaces;
  opacity?: number;
}> = ({ size, pos, faces, opacity = 1 }) => {
  const { x: w, y: h, z: d } = size;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transformStyle: "preserve-3d",
        transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`,
        opacity,
      }}
    >
      {/* faces visibles uniquement si un matériau est fourni */}
      {faces.top && (
        <Face w={w} h={d} transform={`translateY(${-h / 2}px) rotateX(90deg)`} shade={0}>
          {faces.top}
        </Face>
      )}
      {faces.front && (
        <Face w={w} h={h} transform={`translateZ(${d / 2}px)`} shade={0.12}>
          {faces.front}
        </Face>
      )}
      {faces.right && (
        <Face w={d} h={h} transform={`translateX(${w / 2}px) rotateY(90deg)`} shade={0.32}>
          {faces.right}
        </Face>
      )}
      {faces.left && (
        <Face w={d} h={h} transform={`translateX(${-w / 2}px) rotateY(-90deg)`} shade={0.32}>
          {faces.left}
        </Face>
      )}
      {faces.back && (
        <Face w={w} h={h} transform={`translateZ(${-d / 2}px) rotateY(180deg)`} shade={0.45}>
          {faces.back}
        </Face>
      )}
      {faces.bottom && (
        <Face w={w} h={d} transform={`translateY(${h / 2}px) rotateX(-90deg)`} shade={0.6}>
          {faces.bottom}
        </Face>
      )}
    </div>
  );
};
