import React from "react";
import { Box3D } from "./Box3D";
import {
  ConcreteMat,
  PrimerMat,
  BrassMat,
  TerrazzoCutMat,
  TerrazzoTopMat,
} from "./materials";
import { Build } from "./timeline";
import { COLORS } from "../theme";

/**
 * Le sol terrazzo en 2.5D : empilement de briques qui s'extrudent au fil du
 * build. Axe vertical -Y vers le haut, le sol repose sur le plan y = 0.
 */

export const FLOOR = {
  WX: 2600,
  DZ: 900,
  concreteH: 230,
  primerH: 28,
  matrixH: 235,
};

const yConcreteTop = -FLOOR.concreteH; // -230
const yPrimerTop = yConcreteTop - FLOOR.primerH; // -258
const yMatrixTop = yPrimerTop - FLOOR.matrixH; // -493
const PROFILE_X = [-650, 0, 650];

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export const Floor: React.FC<{ b: Build }> = ({ b }) => {
  const { WX, DZ, concreteH, primerH, matrixH } = FLOOR;

  const concH = concreteH * b.concrete;
  const primH = primerH;
  const matH = matrixH * b.matrix;
  const profH = matrixH * b.profiles;

  const gloss = Math.max(b.polish, b.varnish);
  const topReveal = smoothstep(0.05, 0.4, b.matrix);

  return (
    <>
      {/* Plan de sol environnant + ombre de contact */}
      <Box3D
        size={{ x: WX * 1.9, y: 6, z: DZ * 2.1 }}
        pos={{ x: 0, y: 3, z: 0 }}
        faces={{
          top: (
            <div style={{ position: "absolute", inset: 0, background: COLORS.bgDeep }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(40% 55% at 50% 50%, rgba(0,0,0,0.28), rgba(0,0,0,0) 70%)",
                }}
              />
            </div>
          ),
        }}
      />

      {/* BÉTON */}
      {b.concrete > 0.01 && (
        <Box3D
          size={{ x: WX, y: concH, z: DZ }}
          pos={{ x: 0, y: -concH / 2, z: 0 }}
          faces={{
            front: <ConcreteMat seed={11} />,
            left: <ConcreteMat seed={13} />,
            right: <ConcreteMat seed={17} />,
            back: <ConcreteMat seed={19} />,
            top: <ConcreteMat seed={23} />,
          }}
        />
      )}

      {/* PRIMAIRE */}
      {b.primer > 0.01 && (
        <Box3D
          size={{ x: WX, y: primH, z: DZ }}
          pos={{ x: 0, y: yConcreteTop - primH / 2, z: 0 }}
          opacity={b.primer}
          faces={{ front: <PrimerMat />, left: <PrimerMat />, right: <PrimerMat />, top: <PrimerMat /> }}
        />
      )}

      {/* PROFILÉS LAITON (légèrement en avant pour éviter le z-fighting) */}
      {b.profiles > 0.01 &&
        PROFILE_X.map((px, i) => (
          <Box3D
            key={i}
            size={{ x: 14, y: profH, z: DZ + 4 }}
            pos={{ x: px, y: yPrimerTop - profH / 2, z: 0 }}
            faces={{
              front: <BrassMat vertical />,
              top: <BrassMat vertical={false} />,
              left: <BrassMat vertical={false} />,
              right: <BrassMat vertical={false} />,
            }}
          />
        ))}

      {/* MATRICE TERRAZZO */}
      {b.matrix > 0.01 && (
        <Box3D
          size={{ x: WX, y: matH, z: DZ }}
          pos={{ x: 0, y: yPrimerTop - matH / 2, z: 0 }}
          faces={{
            front: <TerrazzoCutMat seed={42} revealed={b.ground} />,
            left: <TerrazzoCutMat seed={51} revealed={b.ground} />,
            right: <TerrazzoCutMat seed={61} revealed={b.ground} />,
            back: <TerrazzoCutMat seed={71} revealed={b.ground} />,
            top: (
              <div style={{ position: "absolute", inset: 0, opacity: topReveal }}>
                <TerrazzoTopMat seed={7} gloss={gloss} revealed={b.ground} grid={b.profiles} />
              </div>
            ),
          }}
        />
      )}
    </>
  );
};

export const FLOOR_Y = { yConcreteTop, yPrimerTop, yMatrixTop };
