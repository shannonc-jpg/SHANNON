import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { loadFonts } from "../lib/fonts";

/**
 * Bloque la capture des frames tant que les polices ne sont pas prêtes,
 * via le couple delayRender / continueRender de Remotion.
 */
export const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender("Chargement des polices"));
  useEffect(() => {
    loadFonts()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
  return null;
};
