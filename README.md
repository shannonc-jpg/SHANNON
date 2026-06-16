# Le système Terrazzo — Vidéo cinématographique

Vidéo de présentation, étape par étape, du système de sol **terrazzo résine époxy**
(de la préparation du support à la finition), réalisée avec **Remotion**
(React + TypeScript). Public : clients B2B, prescripteurs, applicateurs. Langue : français.

**2A Résine** — en partenariat avec **Sherwin-Williams Resuflor**.

## Parti pris : plan-séquence 2.5D

La vidéo est un **plan-séquence continu** (pas de cartons de slide) : une **caméra
virtuelle voyage en 3D** (CSS `preserve-3d`) autour d'un **bloc de sol** qui
**s'extrude couche par couche** — béton → primaire → profilés laiton → matrice
terrazzo → surface poncée révélant les granulats → poli/vernis. Profondeur,
éclairage par face, particules (poussière de grenaillage / ponçage), parallaxe,
vignette et léger flottement « caméra à l'épaule ». Sous-titres FR discrets, sans
habillage de slide.

## Livrables

| Fichier | Format | Détails |
| --- | --- | --- |
| `out/terrazzo-16x9.mp4` | 1920 × 1080 | H.264, 30 fps, ~80 s, piste audio silencieuse |
| `out/terrazzo-9x16.mp4` | 1080 × 1920 | Version verticale (Instagram / LinkedIn) |

Les **11 étapes** du process défilent en sous-titres FR au fil du plan-séquence,
encadrées par un générique d'ouverture et une clôture. La piste audio est
volontairement silencieuse, **prête à recevoir une voix off** (le script FR est
dans `prompt-video-terrazzo.md`).

## Pré-requis

- Node.js 18+ (testé sur Node 22)
- Aucune clé / accès réseau nécessaire au rendu : les polices sont embarquées
  localement (`@fontsource`), et Remotion télécharge son propre Chrome Headless
  au premier rendu.

## Installation

```bash
npm install
```

## Relancer le rendu

```bash
npm run render          # rend les deux formats (16:9 puis 9:16)
npm run render:16x9     # uniquement 1920×1080  -> out/terrazzo-16x9.mp4
npm run render:9x16     # uniquement 1080×1920  -> out/terrazzo-9x16.mp4
```

Aperçu interactif dans le navigateur (studio Remotion) :

```bash
npm start
```

## Où modifier quoi

| Je veux changer… | Fichier |
| --- | --- |
| **Couleurs, palette des granulats, accent** | `src/theme.ts` (`COLORS`, `AGGREGATE_PALETTE`) |
| **Marque, partenaire, contact** | `src/theme.ts` (`BRAND`) |
| **Polices** | `src/lib/fonts.ts` (paquets `@fontsource/*`) |
| **Sous-titres FR + minutage des étapes** | `src/cinematic/timeline.ts` → `SUBS` |
| **Cadence de la construction (build)** | `src/cinematic/timeline.ts` → `getBuild` |
| **Trajectoire / mouvements de caméra** | `src/cinematic/timeline.ts` → `CAM_KEYS` |
| **Durée totale / fps** | `src/cinematic/timeline.ts` (`DURATION_F`, `FPS`) |
| **Formats / résolutions** | `src/Root.tsx` (composants `<Composition>`) |
| **Géométrie & couches du sol** | `src/cinematic/Floor.tsx` (`FLOOR`) |
| **Matériaux (béton, terrazzo, laiton, poli)** | `src/cinematic/materials.tsx` |
| **Particules (poussière, ponçage)** | `src/cinematic/Particles.tsx` |
| **Générique / clôture / sous-titres à l'écran** | `src/cinematic/Cinematic.tsx` |

### Données techniques affichées

Les valeurs (CSP 4–6, < 75 % HR, références Resuprime / Resuflor, ≈ 9–10 mm,
grains 24 → 3000, etc.) sont des **valeurs indicatives standard**, saisies dans
les puces `tech` de chaque scène (`src/scenes.tsx`). **À caler sur les fiches
techniques (TDS) Resuflor / HB Terrazzo** avant diffusion.

### Logo

L'emplacement logo utilise actuellement un placeholder texte « 2A » (composant
`Logo` dans `src/cinematic/Cinematic.tsx`). Pour intégrer un vrai logo, déposer
`logo-2a.png` dans un dossier `public/` et remplacer le contenu de `Logo` par
`<Img src={staticFile("logo-2a.png")} />`.

## Structure du projet

```
src/
  index.ts              point d'entrée Remotion (registerRoot)
  Root.tsx              déclaration des compositions 16:9 et 9:16
  theme.ts              charte : couleurs, palette, marque
  cinematic/
    Cinematic.tsx       composition : scène 3D, caméra, sous-titres, intro/outro
    timeline.ts         minutage : build, caméra (CAM_KEYS), sous-titres
    Floor.tsx           le sol en couches (briques 3D qui s'extrudent)
    Box3D.tsx           brique 3D générique (preserve-3d, éclairage par face)
    materials.tsx       matériaux : béton, primaire, laiton, terrazzo, poli
    Particles.tsx       poussières ambiantes + grenaillage / ponçage
  components/
    FontLoader.tsx      attente du chargement des polices
  lib/
    fonts.ts            polices locales (@fontsource)
    rng.ts              aléatoire déterministe (mouchetures stables)
```

## Pistes d'évolution

- Voix off : générer un TTS FR (script dans `prompt-video-terrazzo.md`) et le
  muxer sur la piste audio, ou enregistrer une voix studio.
- Scène comparative **coulé (cast) vs saupoudré (broadcast / HB Terrazzo)**.
- Intégration du vrai logo et de la charte couleur définitive 2A Résine.
