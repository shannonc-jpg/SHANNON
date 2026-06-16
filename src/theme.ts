/**
 * Charte graphique — modifie ces valeurs pour adapter la vidéo à la charte 2A Résine.
 * Couleurs, typographie et libellés de marque sont centralisés ici.
 */

export const COLORS = {
  // Fond / neutres clairs
  bg: "#F6F3EE",
  bgDeep: "#ECE7DE",
  card: "#FFFFFF",
  ink: "#1E1C19",
  inkSoft: "#5C574F",
  hair: "#D8D1C4",

  // Couleur d'accent (remplace par l'accent de la charte 2A)
  accent: "#C2693B", // terracotta / résine
  accentDeep: "#9C4F2A",

  // Matériaux de la coupe technique
  concrete: "#A29C90",
  concreteDark: "#857F73",
  concreteEdge: "#6F6A5F",
  primer: "#52707C",
  primerLight: "#71909A",
  resin: "#E9E3D6", // matrice résine (liant clair)
  resinFilm: "#F2EEE4",
  brass: "#B8923B",
  brassLight: "#E7CD79",
  brassDark: "#8A6C25",
  glossWhite: "#FFFFFF",
} as const;

// Palette des granulats terrazzo (marbre / verre / nacre / pigments)
export const AGGREGATE_PALETTE = [
  "#E7E1D5", // marbre blanc
  "#CFC7B6", // marbre crème
  "#3A3936", // anthracite
  "#C2693B", // terracotta
  "#6E8B74", // vert sauge
  "#C9A227", // ocre / laiton
  "#7E94A8", // bleu-gris
  "#A8413B", // rouge marbre
  "#F4F1EA", // nacre
] as const;

export const FONT_HEADING = "Montserrat";
export const FONT_BODY = "Inter";

export const BRAND = {
  name: "2A Résine",
  system: "Le système Terrazzo",
  tagline: "du support à la finition",
  partner: "En partenariat avec Sherwin-Williams Resuflor",
  partnerShort: "Sherwin-Williams Resuflor",
  contact: "2a-resine.fr — contact@2a-resine.fr",
  totalSteps: 11,
} as const;
