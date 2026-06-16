/**
 * Montage de la vidéo de formation "applicateur" à partir de RUSHES RÉELS.
 *
 * Pour chaque étape : dépose ton clip filmé dans public/footage/ avec le nom
 * indiqué (`clip`), puis renseigne `inSec`/`outSec` (partie du rush à garder)
 * et `slowmo` (1 = vitesse réelle, 0.5 = ralenti ×2). Tant que le fichier n'est
 * pas présent, un panneau "RUSH À DÉPOSER" s'affiche (voir Clip.tsx).
 *
 * Relance ensuite :  npm run render
 */

export type Step = {
  n: number | null; // numéro d'étape (null = intro/outro)
  kicker: string;
  title: string;
  subtitle: string; // voix off / sous-titre FR
  callouts: string[]; // repères techniques affichés
  clip: string | null; // nom du fichier dans public/footage/ (null = placeholder)
  shot: string; // description du plan à filmer (affichée sur le placeholder)
  durationSec: number; // durée à l'écran
  inSec?: number; // début du rush conservé
  slowmo?: number; // facteur de vitesse (1 = réel, <1 = ralenti)
};

export const INTRO = {
  durationSec: 4.5,
  title: "Le système Terrazzo",
  tagline: "Formation applicateur — du support à la finition",
};

export const OUTRO = {
  durationSec: 6,
  headline: "Un terrazzo unique, sans joint, durable.",
};

export const STEPS: Step[] = [
  {
    n: 1,
    kicker: "Étape 01 · Préparation du support",
    title: "Grenaillage du béton",
    subtitle: "Le béton est grenaillé pour ouvrir la surface et garantir l'accroche.",
    callouts: ["Profil CSP 4–6", "Humidité < 75 % HR", "Traitement des fissures"],
    clip: "01-preparation.mp4",
    shot: "Grenailleuse / ponceuse diamant en action, plan large puis gros plan sur la surface ouverte. Hygromètre sur la dalle.",
    durationSec: 6,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 2,
    kicker: "Étape 02 · Primaire d'accrochage",
    title: "Application du primaire",
    subtitle: "Un primaire époxy crée le pont d'adhérence avec la résine.",
    callouts: ["Resuprime 3579", "Sablage à refus", "Pont d'adhérence"],
    clip: "02-primaire.mp4",
    shot: "Rouleau/raclette qui étale le primaire, sable saupoudré à refus. Gros plan sur la texture mouillée.",
    durationSec: 6,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 3,
    kicker: "Étape 03 · Profilés & calepinage",
    title: "Pose des profilés laiton",
    subtitle: "Les profilés en laiton dessinent les panneaux, les joints et les motifs.",
    callouts: ["Profilés laiton / zinc", "Collage à la résine", "Calepinage"],
    clip: "03-profiles.mp4",
    shot: "Mains qui posent et alignent les profilés au cordeau, collage à la résine. Vue de dessus du motif.",
    durationSec: 6,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 4,
    kicker: "Étape 04 · Préparation de la matrice",
    title: "Malaxage résine + granulats",
    subtitle: "Résine époxy, granulats de marbre et pigments, malaxés ensemble.",
    callouts: ["Époxy bi-composant", "Granulats marbre / verre / nacre", "Malaxeur mécanique"],
    clip: "04-matrice.mp4",
    shot: "Versement Part A + durcisseur + granulats dans le malaxeur, malaxage mécanique. Gros plan sur la matière.",
    durationSec: 6,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 5,
    kicker: "Étape 05 · Coulage & talochage",
    title: "Coulage et talochage",
    subtitle: "La matrice est coulée entre les profilés et talochée à l'épaisseur voulue.",
    callouts: ["≈ 9–10 mm (3/8″)", "Talochée à refus", "Resuflor Terrazzo TG"],
    clip: "05-talochage.mp4",
    shot: "PLAN HÉROS : l'applicateur taloche la matrice entre les profilés, geste régulier. Gros plan sur la taloche + ralenti.",
    durationSec: 8,
    inSec: 0,
    slowmo: 0.5,
  },
  {
    n: 6,
    kicker: "Étape 06 · Polymérisation",
    title: "Durcissement",
    subtitle: "La matrice polymérise, 18 à 24 heures.",
    callouts: ["Cure 18–24 h", "Température & HR contrôlées"],
    clip: "06-cure.mp4",
    shot: "Timelapse de la zone qui durcit / vue d'ensemble du chantier au repos.",
    durationSec: 4.5,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 7,
    kicker: "Étape 07 · Ponçage – dégrossissage",
    title: "Mise à nu des granulats",
    subtitle: "La surface est poncée pour révéler les granulats.",
    callouts: ["Diamant ~24 grit", "Arasage des profilés", "Granulats apparents"],
    clip: "07-poncage.mp4",
    shot: "Ponceuse diamant qui passe, transition résine brute → granulats apparents. Gros plan + ralenti.",
    durationSec: 6.5,
    inSec: 0,
    slowmo: 0.6,
  },
  {
    n: 8,
    kicker: "Étape 08 · Ragréage",
    title: "Bouchage des pores",
    subtitle: "Une couche de grout comble les dernières bulles.",
    callouts: ["Grout (même résine)", "Comble bulles & micro-trous"],
    clip: "08-ragreage.mp4",
    shot: "Application du grout à la raclette, remplissage des pores. Gros plan.",
    durationSec: 5,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 9,
    kicker: "Étape 09 · Polymérisation du grout",
    title: "Durcissement du grout",
    subtitle: "Nouveau durcissement, environ 24 heures.",
    callouts: ["Cure ≈ 24 h"],
    clip: "09-cure-grout.mp4",
    shot: "Vue d'ensemble / timelapse court.",
    durationSec: 4,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 10,
    kicker: "Étape 10 · Ponçage progressif & lustrage",
    title: "Du mat au poli miroir",
    subtitle: "Grain après grain, de 50 jusqu'à 3000, jusqu'au poli miroir.",
    callouts: ["50 → 100 → 200 → … → 3000", "Mat · satiné · poli"],
    clip: "10-lustrage.mp4",
    shot: "Passes successives de la ponceuse, surface de plus en plus brillante. Reflets. Gros plan sur le brillant final.",
    durationSec: 7,
    inSec: 0,
    slowmo: 0.7,
  },
  {
    n: 11,
    kicker: "Étape 11 · Protection & finition",
    title: "Vernis & perlage",
    subtitle: "Un vernis scelle le sol et le rend imperméable.",
    callouts: ["Bouche-pores / vernis — 2 couches", "Acrydur Aqua 4401 / 4503"],
    clip: "11-finition.mp4",
    shot: "Application du vernis, lustrage final. DÉMO : goutte d'eau qui perle sur la surface (gros plan).",
    durationSec: 6.5,
    inSec: 0,
    slowmo: 1,
  },
  {
    n: 12,
    kicker: "Résultat",
    title: "Le sol terrazzo fini",
    subtitle: "Le résultat : un terrazzo unique, sans joint, durable.",
    callouts: ["Panneaux & profilés laiton", "Incrustations marbre"],
    clip: "12-resultat.mp4",
    shot: "Travelling lent sur le sol fini : panneaux, profilés laiton, reflets, ambiance.",
    durationSec: 6,
    inSec: 0,
    slowmo: 1,
  },
];

export const FPS = 30;
