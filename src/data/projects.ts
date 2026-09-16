import type { Project } from "@/types/project";
import { readEnvironmentJson } from "@/utils/environment";

const defaultProjects: Project[] = [
  {
    slug: "projet-principal",
    title: "Projet principal",
    year: "2026",
    context: "Produit web",
    role: "Conception et développement",
    description: "Présentez ici le problème résolu, votre approche et la valeur apportée.",
    technologies: ["Technologie", "Outil", "Plateforme"],
    url: "https://example.com/",
    visual: "signal",
    featured: true,
  },
  {
    slug: "projet-client",
    title: "Projet client",
    year: "2025",
    context: "Site web",
    role: "Développement front-end",
    description: "Décrivez une réalisation représentative de votre travail pour un client.",
    technologies: ["CMS", "JavaScript", "SCSS"],
    url: "https://example.com/",
    visual: "mono",
  },
  {
    slug: "side-project",
    title: "Side project",
    year: "En cours",
    context: "Side project",
    role: "Conception et développement",
    description: "Présentez une expérimentation personnelle ou un produit en construction.",
    technologies: ["Framework", "TypeScript", "Base de données"],
    url: "https://example.com/",
    visual: "atlas",
  },
];

const visuals = new Set<Project["visual"]>(["signal", "atlas", "mono"]);
const isStringRecord = (value: unknown): value is Record<string, string> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((item) => typeof item === "string");
};

const isProjectArray = (value: unknown): value is Project[] =>
  Array.isArray(value) && value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const project = item as Record<string, unknown>;
    return (
      ["slug", "title", "year", "context", "role", "description"].every((key) => typeof project[key] === "string") &&
      Array.isArray(project.technologies) &&
      project.technologies.every((technology) => typeof technology === "string") &&
      (project.image === undefined || typeof project.image === "string") &&
      typeof project.visual === "string" &&
      visuals.has(project.visual as Project["visual"])
    );
  });

const configuredProjects = readEnvironmentJson("PORTFOLIO_PROJECTS_JSON", defaultProjects, isProjectArray);
const projectImages = readEnvironmentJson<Record<string, string>>(
  "PORTFOLIO_PROJECT_IMAGES_JSON",
  {},
  isStringRecord,
);

export const projects = configuredProjects.map((project) => ({
  ...project,
  image: projectImages[project.slug] ?? project.image,
}));
