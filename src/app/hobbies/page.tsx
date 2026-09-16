import type { Metadata } from "next";
import Link from "next/link";

import BackToTop from "@/components/BackToTop/BackToTop";
import ArrowIcon from "@/components/ArrowIcon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { hobbies } from "@/data/hobbies";

import styles from "./Hobbies.module.scss";

export const metadata: Metadata = {
  title: "Hobbies",
  description: "Articles personnels autour des pratiques, idées et curiosités cultivées en dehors du code.",
  alternates: { canonical: "/hobbies" },
  openGraph: {
    title: "Hobbies",
    description: "Des notes personnelles sur les pratiques et curiosités qui nourrissent la création.",
    url: "/hobbies",
  },
};

export default function HobbiesPage() {
  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main id="contenu" tabIndex={-1}>
        <header className={`${styles.hero} shell`}>
          <p className={styles.eyebrow}>Journal personnel · Hors écran</p>
          <div className={styles.heroCopy}>
            <h1>Hobbies<span>.</span></h1>
            <p>
              Des notes sur ce qui nourrit ma curiosité, déplace mon regard et prolonge la création au-delà du code.
            </p>
          </div>
          <p className={styles.count}>{String(hobbies.length).padStart(2, "0")} articles</p>
        </header>

        <section className={`${styles.articles} shell`} aria-labelledby="articles-title">
          <h2 className="sr-only" id="articles-title">Tous les articles</h2>
          {hobbies.map((article, index) => (
            <article className={styles.card} key={article.slug}>
              <Link href={`/hobbies/${article.slug}`}>
                <div className={`${styles.visual} ${styles[article.visual]}`} aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{article.category}</strong>
                  <i />
                </div>
                <div className={styles.cardMeta}>
                  <span>{article.category}</span>
                  <span>{article.date} · {article.readingTime}</span>
                </div>
                <h3>{article.title}</h3>
                <div className={styles.cardFooter}>
                  <p>{article.excerpt}</p>
                  <ArrowIcon />
                </div>
              </Link>
            </article>
          ))}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
