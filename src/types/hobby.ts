export type HobbySection = {
  title: string;
  paragraphs: string[];
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
  sections: HobbySection[];
};
