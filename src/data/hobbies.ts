import type { HobbyArticle } from "@/types/hobby";
import { readEnvironmentJson } from "@/utils/environment";

const defaultHobbies: HobbyArticle[] = [
  {
    slug: "homelab",
    category: "Infrastructure",
    title: "Homelab",
    excerpt: "Un environnement personnel pour héberger des services, expérimenter et mieux comprendre leur fonctionnement.",
    introduction:
      "Mon homelab est un terrain d’apprentissage concret. J’y assemble du matériel, déploie des services et explore les sujets d’infrastructure dans un environnement que je peux modifier librement.",
    date: "En continu",
    readingTime: "5 min",
    visual: "night",
    sections: [
      {
        title: "Construire pour comprendre",
        paragraphs: [
          "Installer un service soi-même permet de voir tout ce qui disparaît habituellement derrière une interface. Réseau, stockage, sauvegardes et supervision deviennent des problèmes concrets à résoudre.",
          "Chaque évolution du homelab est l’occasion de tester une idée dans un environnement réel, mais sans les contraintes d’une infrastructure de production.",
        ],
      },
      {
        title: "Des services réellement utiles",
        paragraphs: [
          "Le laboratoire ne sert pas uniquement à expérimenter. Il héberge aussi des outils utilisés au quotidien pour centraliser des fichiers, automatiser certaines tâches et garder le contrôle sur mes données.",
          "L’objectif reste de construire un ensemble sobre, compréhensible et suffisamment fiable pour rendre un vrai service.",
        ],
      },
      {
        title: "Documenter et maintenir",
        paragraphs: [
          "Une installation utile doit pouvoir évoluer sans devenir incompréhensible. Je documente donc les choix, les dépendances et les procédures de restauration.",
          "Cette discipline transforme une accumulation de machines en système maintenable et facilite chaque nouvelle expérimentation.",
        ],
      },
    ],
  },
  {
    slug: "reparation-electronique",
    category: "Électronique",
    title: "Réparation électronique",
    excerpt: "Diagnostiquer une panne, comprendre un circuit et prolonger la vie d’un appareil plutôt que le remplacer.",
    introduction:
      "La réparation électronique mélange observation, méthode et patience. Chaque appareil en panne devient une enquête où il faut remonter des symptômes jusqu’à leur cause.",
    date: "Selon les projets",
    readingTime: "4 min",
    visual: "ember",
    sections: [
      {
        title: "Commencer par le diagnostic",
        paragraphs: [
          "Avant de remplacer un composant, il faut comprendre le comportement de l’appareil. L’inspection visuelle, les mesures et la documentation permettent de réduire progressivement le champ des causes possibles.",
          "Cette phase évite les réparations au hasard et donne une logique à chaque intervention.",
        ],
      },
      {
        title: "Intervenir avec précision",
        paragraphs: [
          "Dessouder, nettoyer ou remplacer une pièce demande des gestes mesurés et un poste de travail organisé. La qualité d’une réparation tient souvent à de petits détails.",
          "Je privilégie les interventions réversibles et vérifie chaque étape avant de remettre l’appareil sous tension.",
        ],
      },
      {
        title: "Réparer pour apprendre",
        paragraphs: [
          "Même lorsqu’une réparation n’aboutit pas, elle permet de mieux comprendre la conception d’un objet et les compromis faits par son fabricant.",
          "Lorsqu’elle réussit, elle évite un remplacement inutile et redonne une utilité à un appareil destiné à être écarté.",
        ],
      },
    ],
  },
  {
    slug: "bricolage",
    category: "Fabrication",
    title: "Bricolage",
    excerpt: "Imaginer une solution simple, travailler la matière et fabriquer des objets adaptés à un besoin précis.",
    introduction:
      "Le bricolage permet de passer rapidement d’une idée à un objet tangible. Il oblige à composer avec les dimensions, les matériaux, les outils disponibles et les imprévus du réel.",
    date: "Au fil des besoins",
    readingTime: "3 min",
    visual: "paper",
    sections: [
      {
        title: "Partir du besoin",
        paragraphs: [
          "Les projets les plus intéressants commencent souvent par un problème très concret. Un rangement mal adapté, une pièce à consolider ou un support absent suffit à lancer la réflexion.",
          "Je cherche d’abord la solution la plus simple avant de choisir les matériaux et la manière de la fabriquer.",
        ],
      },
      {
        title: "Mesurer, fabriquer, ajuster",
        paragraphs: [
          "Un plan donne une direction, mais la fabrication révèle toujours de nouvelles contraintes. Il faut mesurer à nouveau, corriger et parfois reprendre une étape.",
          "Cette progression par ajustements rend le résultat plus juste et développe une compréhension très concrète des matériaux.",
        ],
      },
      {
        title: "Un résultat fait pour durer",
        paragraphs: [
          "Un objet fabriqué pour un usage précis n’a pas besoin d’être compliqué. Il doit surtout être solide, réparable et agréable à utiliser.",
          "La satisfaction vient autant du résultat final que du chemin parcouru pour trouver une solution adaptée.",
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
