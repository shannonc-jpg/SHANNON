// Scanne public/footage/ et génère src/edit/footage.ts avec la liste des rushes.
// Lancé automatiquement avant chaque rendu (voir package.json).
import { readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const footageDir = join(root, "public", "footage");
if (!existsSync(footageDir)) mkdirSync(footageDir, { recursive: true });

const exts = [".mp4", ".mov", ".webm", ".m4v"];
const files = readdirSync(footageDir).filter((f) =>
  exts.includes(f.slice(f.lastIndexOf(".")).toLowerCase())
);

const out = `/**
 * Liste des rushes disponibles dans public/footage/.
 * ⚠️ Fichier GÉNÉRÉ automatiquement par \`node scripts/scan-footage.mjs\`.
 * Ne pas éditer à la main : déposez les fichiers dans public/footage/.
 */
export const AVAILABLE_CLIPS: string[] = ${JSON.stringify(files, null, 2)};
`;
writeFileSync(join(root, "src", "edit", "footage.ts"), out);
console.log(`[scan-footage] ${files.length} rush(es) détecté(s):`, files.join(", ") || "(aucun)");
