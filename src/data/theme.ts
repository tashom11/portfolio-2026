import { readEnvironmentValue } from "@/utils/environment";

const defaultAccentColor = "#c92f08";
const configuredAccentColor = readEnvironmentValue("PORTFOLIO_ACCENT_COLOR", defaultAccentColor);

if (!/^#[0-9a-f]{6}$/i.test(configuredAccentColor)) {
  throw new Error("La variable PORTFOLIO_ACCENT_COLOR doit être une couleur hexadécimale, par exemple #c92f08.");
}

export const accentColor = configuredAccentColor;
