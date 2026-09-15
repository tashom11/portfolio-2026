import { readEnvironmentJson, readEnvironmentValue } from "@/utils/environment";

type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  focus: string;
};

type SkillGroup = { title: string; skills: string[] };

const isString = (value: unknown): value is string => typeof value === "string";
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every(isString);

const isExperienceArray = (value: unknown): value is Experience[] =>
  Array.isArray(value) && value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const entry = item as Record<string, unknown>;
    return ["period", "role", "company", "description", "focus"].every((key) => isString(entry[key]));
  });

const isSkillGroupArray = (value: unknown): value is SkillGroup[] =>
  Array.isArray(value) && value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const entry = item as Record<string, unknown>;
    return isString(entry.title) && isStringArray(entry.skills);
  });

export const profile = {
  name: readEnvironmentValue("PORTFOLIO_NAME", "Votre nom"),
  email: readEnvironmentValue("PORTFOLIO_EMAIL", "contact@example.com"),
  role: readEnvironmentValue("PORTFOLIO_ROLE", "Développeur web"),
  yearsExperience: readEnvironmentValue("PORTFOLIO_YEARS_EXPERIENCE", "5"),
  specialty: readEnvironmentValue("PORTFOLIO_SPECIALTY", "des interfaces web accessibles et performantes"),
  availability: readEnvironmentValue("PORTFOLIO_AVAILABILITY", "À l’écoute de nouvelles opportunités"),
  location: readEnvironmentValue("PORTFOLIO_LOCATION", "Votre région ou à distance"),
  locationCode: readEnvironmentValue("PORTFOLIO_LOCATION_CODE", "LOCAL"),
  countryCode: readEnvironmentValue("PORTFOLIO_COUNTRY_CODE", "FR"),
  github: readEnvironmentValue("PORTFOLIO_GITHUB_URL", "https://github.com/"),
  githubLabel: readEnvironmentValue("PORTFOLIO_GITHUB_LABEL", "GitHub"),
  linkedin: readEnvironmentValue("PORTFOLIO_LINKEDIN_URL", "https://www.linkedin.com/"),
  repository: readEnvironmentValue("PORTFOLIO_REPOSITORY_URL", "https://github.com/"),
  aboutLead: readEnvironmentValue(
    "PORTFOLIO_ABOUT_LEAD",
    "Artisan du web, j’aide à transformer une idée en un produit fini, fonctionnel et prêt à être utilisé.",
  ),
  aboutPrimary: readEnvironmentValue(
    "PORTFOLIO_ABOUT_PRIMARY",
    "Je relie les intentions de design aux exigences concrètes du produit : SEO technique, accessibilité, performance, maintenabilité et qualité des détails.",
  ),
  aboutSecondary: readEnvironmentValue(
    "PORTFOLIO_ABOUT_SECONDARY",
    "Curieux de l’écosystème tech, je continue d’explorer de nouveaux outils et usages sans prétendre avoir fini d’apprendre.",
  ),
};

const defaultExperience: Experience[] = [
  {
    period: "2022 à aujourd’hui",
    role: "Développeur web",
    company: "Entreprise · Contrat",
    description: "Présentez ici le contexte de cette expérience professionnelle.",
    focus: "Compétence · Responsabilité · Réalisation",
  },
  {
    period: "2020 à 2022",
    role: "Poste précédent",
    company: "Entreprise · Contrat",
    description: "Ajoutez une seconde expérience pour montrer votre progression.",
    focus: "Compétence · Responsabilité · Réalisation",
  },
];

const defaultSkillGroups: SkillGroup[] = [
  { title: "Front-end", skills: ["HTML", "CSS", "SCSS", "JavaScript"] },
  { title: "Back-end", skills: ["API", "Base de données", "Authentification"] },
  { title: "Tooling", skills: ["Git", "CI/CD", "Déploiement", "Design"] },
  { title: "En progression", skills: ["Technologie à explorer", "Sujet en apprentissage"] },
];

export const experience = readEnvironmentJson("PORTFOLIO_EXPERIENCE_JSON", defaultExperience, isExperienceArray);
export const skillGroups = readEnvironmentJson("PORTFOLIO_SKILLS_JSON", defaultSkillGroups, isSkillGroupArray);
export const interests = readEnvironmentJson(
  "PORTFOLIO_INTERESTS_JSON",
  ["Open source", "Veille technique", "Automatisation", "Expérimentations"],
  isStringArray,
);
