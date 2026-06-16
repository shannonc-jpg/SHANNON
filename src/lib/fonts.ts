/**
 * Polices chargées localement (paquets @fontsource embarqués dans node_modules)
 * — aucun accès réseau nécessaire au rendu. Montserrat (titres) + Inter (texte),
 * deux sans-serif géométriques. Repli system-ui si indisponible.
 *
 * L'attente du chargement effectif est gérée par <FontLoader /> (delayRender).
 */
import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/latin-700.css";
import "@fontsource/montserrat/latin-800.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";

const FALLBACK = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export const headingFamily = `Montserrat, ${FALLBACK}`;
export const bodyFamily = `Inter, ${FALLBACK}`;

const FONT_SPECS = [
  "500 1em Montserrat",
  "700 1em Montserrat",
  "800 1em Montserrat",
  "400 1em Inter",
  "500 1em Inter",
  "600 1em Inter",
];

export async function loadFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  await Promise.all(FONT_SPECS.map((s) => document.fonts.load(s)));
  await document.fonts.ready;
}
