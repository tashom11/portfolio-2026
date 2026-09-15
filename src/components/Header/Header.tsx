import Link from "next/link";
import { profile } from "@/data/profile";
import styles from "./Header.module.scss";

const navItems = [
  ["Projets", "/#projets"],
  ["À propos", "/#a-propos"],
  ["Expérience", "/#experience"],
] as const;

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.inner} shell`}>
        <Link className={styles.brand} href="/#top" aria-label="Retour à l’accueil">
          {profile.name}<span>®</span>
        </Link>
        <nav className={styles.mainNav} aria-label="Navigation principale">
          <ul className={styles.links}>
            {navItems.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
          </ul>
        </nav>
        <div className={styles.actions}>
          <Link className={styles.hobbies} href="/hobbies">Hobbies</Link>
          <Link className={styles.contact} href="/#contact">
            <span className={styles.contactLong}>Me contacter</span>
            <span className={styles.contactShort}>Contact</span>
            <span aria-hidden="true">↘</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
