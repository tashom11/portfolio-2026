import { readEnvironmentValue } from "@/utils/environment";

const readHexColor = (name: string, fallback: string) => {
  const color = readEnvironmentValue(name, fallback);

  if (!/^#[0-9a-f]{6}$/i.test(color)) {
    throw new Error(`La variable ${name} doit être une couleur hexadécimale, par exemple ${fallback}.`);
  }

  return color;
};

export const accentColor = readHexColor("PORTFOLIO_ACCENT_COLOR", "#c92f08");
export const accentSurfaceColor = readHexColor("PORTFOLIO_ACCENT_SURFACE_COLOR", "#ff5a26");
