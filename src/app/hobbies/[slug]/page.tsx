import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BackToTop from "@/components/BackToTop/BackToTop";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { getHobbyBySlug, hobbies } from "@/data/hobbies";

import styles from "./HobbyArticle.module.scss";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return hobbies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHobbyBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/hobbies/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/hobbies/${article.slug}`,
      type: "article",
    },
  };
}

export default async function HobbyArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getHobbyBySlug(slug);

  if (!article) notFound();

  const articleIndex = hobbies.findIndex((item) => item.slug === article.slug);
  const previous = hobbies[(articleIndex - 1 + hobbies.length) % hobbies.length];
  const next = hobbies[(articleIndex + 1) % hobbies.length];

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu" tabIndex={-1}>
        <article>
          <header className={`${styles.hero} shell`}>
            <Link className={styles.back} href="/hobbies"><span aria-hidden="true">←</span> Tous les hobbies</Link>
            <div className={styles.meta}>
              <span>{article.category}</span>
              <span>{article.date} · {article.readingTime}</span>
            </div>
            <h1>{article.title}</h1>
            <p className={styles.lead}>{article.introduction}</p>
          </header>

          <div className={`${styles.articleBody} shell`}>
            <aside className={styles.aside}>
              <p>Dans cet article</p>
              <nav aria-label="Sommaire de l’article">
                <ol>
                  {article.sections.map((section, index) => (
                    <li key={section.title}>
                      <a href={`#section-${index + 1}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className={styles.content}>
              {article.sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`} aria-labelledby={`section-title-${index + 1}`}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 id={`section-title-${index + 1}`}>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <nav className={`${styles.articleNavigation} shell`} aria-label="Navigation entre les articles">
            <Link href={`/hobbies/${previous.slug}`}>
              <span>Article précédent</span>
              <strong>{previous.title}</strong>
            </Link>
            <Link href={`/hobbies/${next.slug}`}>
              <span>Article suivant</span>
              <strong>{next.title}</strong>
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
