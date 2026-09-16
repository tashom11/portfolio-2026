export type Project = {
  slug: string;
  title: string;
  year: string;
  context: string;
  role: string;
  description: string;
  technologies: string[];
  url?: string;
  repository?: string;
  image?: string;
  visual: "signal" | "atlas" | "mono";
  featured?: boolean;
};
