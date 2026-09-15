import { profile } from "@/data/profile";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="shell"><strong>{profile.name}</strong><p>Conçu pour durer, construit pour évoluer.</p><span>© {new Date().getFullYear()}</span></div>
    </footer>
  );
}
