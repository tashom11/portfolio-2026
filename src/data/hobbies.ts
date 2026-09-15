import type { HobbyArticle } from "@/types/hobby";
import { readEnvironmentJson } from "@/utils/environment";

const defaultHobbies: HobbyArticle[] = [
  {
    slug: "photographier-pour-mieux-regarder",
    category: "Photographie",
    title: "Photographier pour mieux regarder",
    excerpt: "Une pratique simple pour ralentir, observer les détails et composer avec ce qui est déjà là.",
    introduction:
      "La photographie change la manière de traverser un lieu. Elle invite à remarquer une lumière, une texture ou un équilibre qui seraient autrement passés inaperçus.",
    date: "Mai 2026",
    readingTime: "4 min",
    visual: "ember",
    sections: [
      {
        title: "Prendre le temps de voir",
        paragraphs: [
          "Avant la technique vient l’attention. Chercher une image oblige à ralentir et à regarder plusieurs fois la même scène.",
          "Ce temps d’observation transforme une promenade ordinaire en collection de formes, de contrastes et de petits récits.",
        ],
      },
      {
        title: "Composer avec des contraintes",
        paragraphs: [
          "Un cadre impose de choisir. Ce qui reste hors champ compte autant que ce qui entre dans l’image.",
          "Cette contrainte rend chaque décision visible et apprend à retirer ce qui détourne du sujet principal.",
        ],
      },
    ],
  },
  {
    slug: "comprendre-les-regles-du-jeu",
    category: "Jeux et systèmes",
    title: "Comprendre les règles du jeu",
    excerpt: "Ce que les jeux de gestion enseignent sur les systèmes, les choix et leurs conséquences.",
    introduction:
      "Un bon jeu rend un système complexe lisible sans tout expliquer immédiatement. Il laisse expérimenter, échouer et comprendre progressivement ses règles.",
    date: "Avril 2026",
    readingTime: "5 min",
    visual: "night",
    sections: [
      {
        title: "Des décisions qui ont du poids",
        paragraphs: [
          "Les systèmes intéressants ne proposent pas toujours une solution parfaite. Ils mettent en tension plusieurs objectifs et demandent de choisir une direction.",
          "La qualité de l’expérience vient alors de la clarté des conséquences, pas de la simplicité du problème.",
        ],
      },
      {
        title: "Apprendre par la pratique",
        paragraphs: [
          "Une règle comprise après une expérimentation reste plus longtemps en mémoire qu’une longue explication préalable.",
          "Cette progression donne envie de poursuivre parce que chaque découverte ouvre une nouvelle possibilité.",
        ],
      },
    ],
  },
  {
    slug: "marcher-pour-faire-circuler-les-idees",
    category: "Plein air",
    title: "Marcher pour faire circuler les idées",
    excerpt: "Quitter temporairement l’écran pour retrouver du rythme, de la distance et des idées plus claires.",
    introduction:
      "Marcher crée un espace entre un problème et sa réponse. Le mouvement régulier libère l’attention et permet aux idées de se réorganiser sans les forcer.",
    date: "Mars 2026",
    readingTime: "3 min",
    visual: "paper",
    sections: [
      {
        title: "Changer de rythme",
        paragraphs: [
          "Une marche ne résout pas automatiquement un problème, mais elle change la manière de le regarder.",
          "Le rythme du corps remplace celui des notifications et redonne une place aux pensées moins immédiates.",
        ],
      },
      {
        title: "Revenir avec moins de bruit",
        paragraphs: [
          "La distance aide souvent à distinguer ce qui est essentiel de ce qui occupait simplement beaucoup de place.",
          "Au retour, la prochaine action paraît plus petite, plus concrète et donc plus facile à commencer.",
        ],
      },
    ],
  },
];

const visuals = new Set<HobbyArticle["visual"]>(["ember", "night", "paper"]);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isHobbyArticleArray = (value: unknown): value is HobbyArticle[] =>
  Array.isArray(value) && value.length > 0 && value.every((item) => {
    if (!item || typeof item !== "object") return false;
    const article = item as Record<string, unknown>;
    const sections = article.sections;

    return (
      ["slug", "category", "title", "excerpt", "introduction", "date", "readingTime"].every(
        (key) => typeof article[key] === "string" && article[key].length > 0,
      ) &&
      typeof article.visual === "string" &&
      visuals.has(article.visual as HobbyArticle["visual"]) &&
      Array.isArray(sections) &&
      sections.length > 0 &&
      sections.every((section) => {
        if (!section || typeof section !== "object") return false;
        const candidate = section as Record<string, unknown>;
        return typeof candidate.title === "string" && isStringArray(candidate.paragraphs);
      })
    );
  });

export const hobbies = readEnvironmentJson(
  "PORTFOLIO_HOBBIES_JSON",
  defaultHobbies,
  isHobbyArticleArray,
);

export const getHobbyBySlug = (slug: string) => hobbies.find((article) => article.slug === slug);
