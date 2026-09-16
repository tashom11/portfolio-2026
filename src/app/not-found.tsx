import Link from "next/link";

import ArrowIcon from "@/components/ArrowIcon";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <Header />
      <main className={`${styles.main} shell`} id="contenu" tabIndex={-1}>
        <p className={styles.eyebrow}>Erreur 404 · Page introuvable</p>

        <div className={styles.composition}>
          <p className={styles.code} aria-hidden="true">404</p>
          <div className={styles.message}>
            <h1>Cette page n’existe pas<span>.</span></h1>
            <p>
              Le lien est peut-être incomplet ou la page a changé d’adresse.
              Vous pouvez reprendre la visite depuis l’accueil.
            </p>
            <nav className={styles.actions} aria-label="Continuer la navigation">
              <Link className={styles.primary} href="/">
                Retour à l’accueil <ArrowIcon direction="up-left" />
              </Link>
              <Link className={styles.secondary} href="/hobbies">
                Découvrir Hobbies <ArrowIcon />
              </Link>
            </nav>
          </div>
        </div>

        <div className={styles.coordinates} aria-hidden="true">
          <span>PAGE NON TROUVÉE</span>
          <span>RETOUR CONSEILLÉ</span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
