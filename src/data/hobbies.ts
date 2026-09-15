import type { HobbyArticle } from "@/types/hobby";
import { readEnvironmentJson } from "@/utils/environment";

const defaultHobbies: HobbyArticle[] = [
  {
    slug: "homelab",
    category: "Infrastructure",
    title: "Homelab",
    excerpt: "Un environnement personnel pour héberger mes médias, protéger mes souvenirs et garder le contrôle sur mes services.",
    introduction:
      "Mon homelab est à la fois un terrain d’apprentissage et une infrastructure utile au quotidien. J’y héberge des services choisis pour reprendre le contrôle sur mes médias, mes photos et mon réseau.",
    date: "En continu",
    readingTime: "5 min",
    visual: "night",
    links: [
      { label: "Jellyfin", url: "https://jellyfin.org/" },
      { label: "Navidrome", url: "https://navidrome.org/" },
      { label: "Immich", url: "https://immich.app/" },
      { label: "Pi-hole", url: "https://pi-hole.net/" },
      { label: "Nginx Proxy Manager", url: "https://nginxproxymanager.com/" },
      { label: "Beszel", url: "https://beszel.dev/" },
    ],
    sections: [
      {
        title: "Retrouver ma médiathèque",
        paragraphs: [
          "Jellyfin centralise les films issus de mes Blu-ray et me permet de les regarder facilement sur mes différents appareils. C’est la solution que j’ai trouvée pour continuer à profiter de ma collection alors que les lecteurs physiques deviennent de plus en plus rares.",
          "Navidrome remplit le même rôle pour mes disques de musique. Léger et accessible depuis plusieurs applications, il rend ma collection disponible sans dépendre d’un service de streaming ni d’un lecteur devenu difficile à remplacer.",
        ],
      },
      {
        title: "Protéger mes photos",
        paragraphs: [
          "Immich sauvegarde et organise mes photos et vidéos dans une interface moderne. Je conserve ainsi une bibliothèque personnelle consultable facilement, tout en gardant la maîtrise du stockage et des sauvegardes.",
        ],
      },
      {
        title: "Maîtriser le réseau et les accès",
        paragraphs: [
          "Pi-hole filtre les publicités et de nombreux domaines de suivi directement au niveau du réseau. Tous les appareils de la maison en bénéficient sans nécessiter une configuration individuelle.",
          "Nginx Proxy Manager centralise l’accès aux applications, les noms de domaine et les certificats HTTPS. Il simplifie le routage vers chaque service et évite de mémoriser une collection d’adresses et de ports.",
        ],
      },
      {
        title: "Surveiller et continuer à expérimenter",
        paragraphs: [
          "Beszel fournit une vue légère sur l’état des machines et des conteneurs. Processeur, mémoire, stockage et disponibilité deviennent lisibles au même endroit, ce qui aide à repérer rapidement un problème.",
          "D’autres services rejoignent régulièrement le homelab pour les sauvegardes, l’automatisation ou de nouvelles expérimentations. Je conserve ceux qui apportent une utilité réelle et documente leur fonctionnement pour maintenir un ensemble compréhensible.",
        ],
      },
    ],
  },
  {
    slug: "reparation",
    category: "Électronique",
    title: "Réparation",
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
    const links = article.links;
    const sections = article.sections;

    return (
      ["slug", "category", "title", "excerpt", "introduction", "date", "readingTime"].every(
        (key) => typeof article[key] === "string" && article[key].length > 0,
      ) &&
      typeof article.visual === "string" &&
      visuals.has(article.visual as HobbyArticle["visual"]) &&
      (links === undefined || (
        Array.isArray(links) &&
        links.every((link) => {
          if (!link || typeof link !== "object") return false;
          const candidate = link as Record<string, unknown>;
          return typeof candidate.label === "string" && typeof candidate.url === "string";
        })
      )) &&
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
