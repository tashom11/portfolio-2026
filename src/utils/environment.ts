export function readEnvironmentValue(name: string, fallback: string) {
  const value = process.env[name]?.trim();
  return value || fallback;
}

export function readEnvironmentJson<T>(
  name: string,
  fallback: T,
  validate: (value: unknown) => value is T,
) {
  const value = process.env[name];
  if (!value) return fallback;

  try {
    const parsed: unknown = JSON.parse(value);
    if (!validate(parsed)) throw new Error("format inattendu");
    return parsed;
  } catch (error) {
    const reason = error instanceof Error ? error.message : "JSON invalide";
    throw new Error(`La variable ${name} est invalide : ${reason}`);
  }
}

export function getSiteUrl() {
  const configuredUrl = process.env.PORTFOLIO_SITE_URL?.trim();
  const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url = configuredUrl || (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000");

  return url.replace(/\/$/, "");
}

export function isIndexingEnabled() {
  return process.env.PORTFOLIO_INDEXING_ENABLED?.trim().toLowerCase() !== "false";
}
