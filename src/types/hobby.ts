export type HobbySection = {
  title: string;
  paragraphs: string[];
};

export type HobbyLink = {
  label: string;
  url: string;
};

export type HobbyArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  introduction: string;
  date: string;
  readingTime: string;
  visual: "ember" | "night" | "paper";
  links?: HobbyLink[];
  sections: HobbySection[];
};
