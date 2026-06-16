# Le système Terrazzo — Vidéo motion design

Vidéo de présentation, étape par étape, du système de sol **terrazzo résine époxy**
(de la préparation du support à la finition), réalisée avec **Remotion**
(React + TypeScript). Public : clients B2B, prescripteurs, applicateurs. Langue : français.

**2A Résine** — en partenariat avec **Sherwin-Williams Resuflor**.

## Livrables

| Fichier | Format | Détails |
| --- | --- | --- |
| `out/terrazzo-16x9.mp4` | 1920 × 1080 | H.264, 30 fps, ~80 s, piste audio silencieuse |
| `out/terrazzo-9x16.mp4` | 1080 × 1920 | Version verticale (Instagram / LinkedIn) |

Les deux vidéos contiennent **13 scènes** : générique, 11 étapes du process
(compteur « n / 11 ») et une scène de clôture. Sous-titres FR incrustés. La piste
audio est volontairement silencieuse, **prête à recevoir une voix off** (le script
FR est dans `prompt-video-terrazzo.md`).

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
| **Marque, partenaire, contact, nb d'étapes** | `src/theme.ts` (`BRAND`) |
| **Polices** | `src/lib/fonts.ts` (paquets `@fontsource/*`) |
| **Textes des scènes (titres, sous-titres, puces techniques)** | `src/scenes.tsx` |
| **Durée de chaque scène** | `src/scenes.tsx` → objet `DUR` (valeurs en frames @ 30 fps) |
| **Ordre / liste des scènes** | `src/TerrazzoVideo.tsx` → tableau `SCENES` |
| **Formats / résolutions / fps** | `src/Root.tsx` (composants `<Composition>`) |
| **La coupe technique animée (couches, géométrie)** | `src/components/CrossSection.tsx` |
| **La vue de dessus (calepinage, profilés, logo)** | `src/components/TopView.tsx` |
| **Malaxeur, chrono, compteur de grain** | `src/components/Graphics.tsx` |

### Données techniques affichées

Les valeurs (CSP 4–6, < 75 % HR, références Resuprime / Resuflor, ≈ 9–10 mm,
grains 24 → 3000, etc.) sont des **valeurs indicatives standard**, saisies dans
les puces `tech` de chaque scène (`src/scenes.tsx`). **À caler sur les fiches
techniques (TDS) Resuflor / HB Terrazzo** avant diffusion.

### Logo

L'emplacement logo utilise actuellement un placeholder texte « 2A ». Pour intégrer
un vrai logo, déposer `logo-2a.png` dans un dossier `public/` et remplacer le
placeholder dans `src/components/SceneFrame.tsx` (`BrandMark`) et
`src/scenes.tsx` (`IntroScene`, `ResultScene`) par
`<Img src={staticFile("logo-2a.png")} />`.

## Structure du projet

```
src/
  index.ts              point d'entrée Remotion (registerRoot)
  Root.tsx              déclaration des compositions 16:9 et 9:16
  TerrazzoVideo.tsx     assemblage des scènes (Series) + fondus
  theme.ts              charte : couleurs, palette, marque
  scenes.tsx            les 13 scènes + durées (DUR)
  components/
    SceneFrame.tsx      habillage commun (titre, compteur, sous-titre, puces)
    CrossSection.tsx    coupe technique animée (visuel héros)
    TopView.tsx         vue de dessus (calepinage / profilés)
    Graphics.tsx        malaxeur, chrono, compteur de grain
    TerrazzoBackground.tsx  fond moucheté terrazzo
    Stage.tsx           conteneur responsive du visuel
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
